import React , {useContext, useEffect, useState, useRef} from 'react';
import './chat.scss'
import apiRequest from '../../lib/apiRequest';
import { AuthContext } from '../../context/AuthContxt';
import {format} from 'timeago.js';
import { data, useRevalidator } from 'react-router-dom';
import { SocketContext } from '../../context/SocketContext';
import { useNotificationStore } from '../../lib/notificationStore';

function Chat ({chats}) {

    const [chat, setChat] = useState(null);
    const [chatList, setChatList] = useState(chats);
    const {currentUser} = useContext(AuthContext);
    const {socket} = useContext(SocketContext);
    const { revalidate } = useRevalidator();
    const messageEndRef = useRef(null);
    const decrease = useNotificationStore((state) => state.decrease);
    const fetch = useNotificationStore((state) => state.fetch);

    useEffect(() => {
        setChatList(chats);
    }, [chats]);

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({behavior: "smooth"})
    }, [chat])

    const handleOpenChat = async (id, receiver) => {

        try{
            const res = await apiRequest("/chats/" + id);
            if (!res.data.seenBy.includes(currentUser.id)) {
                setChatList((prev) => 
                    prev.map((c) => 
                        c.id === id ? { ...c, seenBy: [...c.seenBy, currentUser.id] } : c
                    )
                );
                decrease();
            }
            setChat({...res.data, receiver})
            revalidate();
        } catch(err) {
            console.log(err);
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const text = formData.get("text");
        if(!text) return;
        try{
            const res = await apiRequest.post("/messages/" + chat.id, {text});
            setChat({...chat, messages: [...chat.messages, res.data.message]})
            
            // Update lastMessage and seenBy in chatList
            setChatList((prev) => 
                prev.map((c) => 
                    c.id === chat.id ? { ...c, lastMessage: text, seenBy: [currentUser.id] } : c
                )
            );

            e.target.reset();
            socket.emit("sendMessage", {
                receiverId: chat.receiver.id,
                data: res.data.message,
            });
        } catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        const read = async (id) => {
            try {
                await apiRequest.put("/chats/read/" + id);
                fetch();
            } catch (err) {
                console.log(err);
            }
        };

        if (socket) {
            socket.on("getMessage", (data) => {
                // Update chat list last message and unread status
                setChatList((prev) => 
                    prev.map((c) => {
                        if (c.id === data.chatId) {
                            const isChatOpen = chat?.id === data.chatId;
                            let newSeenBy = c.seenBy;
                            
                            if (isChatOpen) {
                                if (!newSeenBy.includes(currentUser.id)) {
                                    newSeenBy = [...newSeenBy, currentUser.id];
                                }
                            } else {
                                newSeenBy = newSeenBy.filter(id => id !== currentUser.id);
                            }

                            return { 
                                ...c, 
                                lastMessage: data.text,
                                seenBy: newSeenBy
                            };
                        }
                        return c;
                    })
                );

                // If chat is open, update messages
                if (chat?.id === data.chatId) {
                    setChat((prev) => ({ ...prev, messages: [...prev.messages, data] }));
                    read(chat.id);
                }
            });
        }
        return () => {
            socket?.off("getMessage");
        };
    }, [socket, chat, currentUser.id]);    

    return (
        <div className="chat">
            <div className="messages">
                <h1>Messages</h1>
                {chatList?.map((c) =>(
                        <div 
                            className="message" 
                            key={c.id}
                            style={{
                                backgroundColor: c.seenBy.includes(currentUser.id) || chat?.id === c.id
                                    ? "white"
                                    : "#fecd514e"
                            }}
                            onClick={()=>handleOpenChat(c.id, c.receiver)}
                        >
                            <img src={c.receiver?.avatar || '/noavatar.png'} alt="" />
                            <span>{c.receiver?.username}</span>
                            <p>{c.lastMessage}</p>
                        </div>
                    ))
                }                
            </div>
            {chat && (
                <div className="chatBox">
                    <div className="top">
                        <div className="user">
                            <img src={chat.receiver.avatar || '/noavatar.png'} alt="" />
                            {chat.receiver.username}
                        </div>
                        <span className="close" onClick={()=>setChat(null)}>⨯</span>
                    </div>
                    <div className="center">
                        {
                            chat.messages?.map((message) => (
                                <div 
                                    className="chatMessage"
                                    key={message.id}
                                    style={{
                                        alignSelf: message.userId === currentUser.id? "flex-end" : "flex-start",
                                        textAlign: message.userId === currentUser.id? "right" : "left"
                                    }}
                                >
                                    <p>{message.text}</p>
                                    <span>{format(message.createdAt)}</span>
                                </div>
                            ))
                        }
                        <div ref={messageEndRef}></div>
                    </div>
                    <form onSubmit={handleSubmit} className="bottom">
                        <textarea name="text" required></textarea>
                        <button>Send</button>
                    </form>
                </div>
            )}
        </div>
    )
}

export default Chat
