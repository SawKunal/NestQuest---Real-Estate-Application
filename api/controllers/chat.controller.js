import prisma from "../lib/prisma.js";

export const getChats = async(req, res) => {

    const tokenUserId = req.userId;
    try{
        const chats = await prisma.chat.findMany({
            where: {
                userIDs:{
                    hasSome: [tokenUserId]
                }
            }
        })

        for(const chat of chats){
            const receiverId = chat.userIDs.find((id) => id !== tokenUserId)
            
            if (receiverId) {
                const receiver = await prisma.user.findUnique({
                    where: { id: receiverId },
                    select: {
                        id: true,
                        username: true,
                        avatar: true
                    }
                })
                chat.receiver = receiver;
            } else {
                chat.receiver = null; // Or handle as needed
            }
        }

        res.status(200).json(chats)
    } catch(e){
        console.log(e);
        return res.status(500).json({message: "Failed to get chats"})
    }
};
export const getChat = async(req, res) => {
    try{
        const tokenUserId = req.userId;
        const chatId = req.params.id;
        const chat = await prisma.chat.findFirst({
            where: {
                id: chatId,
                userIDs:{
                    hasSome: [tokenUserId]
                }
            },
            include: {
                messages:{
                    orderBy: {
                        createdAt: "asc"
                    }
                }
            }
        }) 

        if (chat && !chat.seenBy.includes(tokenUserId)) {
            await prisma.chat.update({
                where: { id: chatId },
                data: {
                    seenBy: {
                        push: tokenUserId
                    }
                }
            })
        }
        if(!chat){
            return res.status(404).json({message: "Chat not found"})
        }
        res.status(200).json(chat)
    } catch(e){
        console.log(e);
        return res.status(500).json({message: "Failed to get chat"})
    }
};
export const addChat = async(req, res) => {
    const tokenUserId = req.userId;
    
    try{
        const newChat = await prisma.chat.create({
            data: {
                userIDs: [tokenUserId, req.body.receiverId]
            }
        })
        res.status(200).json(newChat)
    } catch(e){
        console.log(e);
        return res.status(500).json({message: "Failed to create chats"})
    }
};
export const readChat = async(req, res) => {
    const tokenUserId = req.userId;
    const chatId = req.params.id;
    try{
        const chat = await prisma.chat.update({
            where: {
                id: chatId,
                userIDs: {
                    hasSome: [tokenUserId]
                },
                NOT: {
                    seenBy: {
                        hasSome: [tokenUserId]
                    }
                }
            },
            data: {
                seenBy: {
                    push: tokenUserId
                }
            }
        })
        if(!chat){
            return res.status(404).json({message: "Chat not found"})
        }
        res.status(200).json(chat)
    } catch(e){
        console.log(e);
        return res.status(500).json({message: "Failed to read chats"})
    }
};