import React, { useState } from 'react'
import './singlepage.scss'
import Slider from '../../components/slider/Slider'
// import { singlePostData, userData } from '../../lib/dummyData'
import Map from '../../components/map/Map'
import { redirect, useLoaderData, useNavigate } from 'react-router-dom'
import DOMPurify from 'dompurify'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContxt'
import apiRequest from '../../lib/apiRequest';

function SinglePage() {
    const post = useLoaderData();
    const [saved, setSaved] = useState(post.isSaved);
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSave = async () => {
        if (!currentUser) {
            navigate('/login');
            return;
        }
        setSaved((prev) => !prev);
        try {
            await apiRequest.post('/users/save', { postId: post.id });
        } catch (error) {
            console.log(error);
            setSaved((prev) => !prev);
        }
    };

    const handleSendMessage = async () => {
        if (!currentUser) {
            navigate('/login');
            return;
        }
        
        try {
            const res = await apiRequest.post('/chats', { receiverId: post.user.id });
            navigate('/profile');
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='singlePage'>
            <div className="details">
                <div className="wrapper">
                    <Slider images={post.images} />
                    <div className="info">
                        <div className="top">
                            <div className="post">
                                <h1>{post.title}</h1>
                                <div className="address">
                                    <img src='/pin.png' alt="" />
                                    <span>{post.address}</span>
                                </div>
                                <div className="price"> $ {post.price}</div>
                            </div>
                            <div className="user">
                                <img src={post.user.avatar || '/noavatar.png'} alt="" />
                                <span>{post.user.username}</span>
                            </div>
                        </div>
                        <div className="bottom" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.postDetail.desc) }}></div>
                    </div>
                </div>
            </div>
            <div className="features">
                <div className="wrapper">
                    <p className='title'>General</p>
                    <div className="listVertical">
                        <div className="feature">
                            <img src='/utility.png' alt="" />
                            <div className="featureText">
                                <span>Utilities</span>
                               <p>{post.postDetail.utilities}</p>
                            </div>
                        </div>
                        <div className="feature">
                            <img src='/pet.png' alt="" />
                            <div className="featureText">
                                <span>Pet Policy</span>
                                <p>Pets {post.postDetail.pet}</p>
                            </div>
                        </div>
                        <div className="feature">
                            <img src='/fee.png' alt="" />
                            <div className="featureText">
                                <span>Income Policy</span>
                                <p>{post.postDetail.income}</p>
                            </div>
                        </div>
                    </div>
                    <p className='title'>Sizes</p>
                    <div className="sizes">
                        <div className="size">
                            <img src='/size.png' alt="" />
                            <span>{post.postDetail.size} sqft</span>
                        </div>
                        <div className="size">
                            <img src='/bed.png' alt="" />
                            <span>{post.bedroom} Beds</span>
                        </div>
                        <div className="size">
                            <img src='/bath.png' alt="" />
                            <span>{post.bathroom} Bathroom</span>
                        </div>
                    </div>
                    <p className='title'>Nearby Places</p>
                    <div className="listHorizontal">
                        <div className="feature">
                            <img src='/school.png' alt="" />
                            <div className="featureText">
                                <span>School</span>
                                <p>within {post.postDetail.school < 999 ? post.postDetail.school : post.postDetail.school / 1000} {post.postDetail.school < 999 ? 'meters' : 'km'}</p>
                            </div>
                        </div>
                        <div className="feature">
                            <img src='/bus.png' alt="" />
                            <div className="featureText">
                                <span>Bus Stop</span>
                                <p>Within {post.postDetail.bus < 999 ? post.postDetail.bus : post.postDetail.bus / 1000} {post.postDetail.bus < 999 ? 'meters' : 'km'}</p>
                            </div>
                        </div>
                        <div className="feature">
                            <img src='/restaurant.png' alt="" />
                            <div className="featureText">
                                <span>Restaurant</span>
                                <p>within {post.postDetail.restaurant < 999 ? post.postDetail.restaurant : post.postDetail.restaurant / 1000} {post.postDetail.restaurant < 999 ? 'meters' : 'km'}</p>
                            </div>
                        </div>
                    </div>
                    <p className='title'>Location</p>
                    <div className="mapContainer">
                        <Map items={[post]} />
                    </div>
                    <div className="buttons">
                        <button onClick={handleSendMessage}>
                            <img src="/chat.png" alt="" />
                            Send a message
                        </button>
                        <button
                            onClick={handleSave}
                            style={{
                                backgroundColor: saved ? '#fece51' : 'white',
                            }}
                        >
                            <img src='/save.png' alt="" />
                            {saved ? 'Place Saved' : 'Save the Place'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SinglePage;