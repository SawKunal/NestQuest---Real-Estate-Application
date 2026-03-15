import React, {useState} from 'react'
import './slider.scss'
function Slider({images}) {
    const [imageIndex, setImageIndex] = useState(null);

    function changeSlide(direction) {
        if(direction === 'left') {
            setImageIndex((imageIndex-1+images.length)%images.length);
        }else{
            setImageIndex((imageIndex+1)%images.length);
        }
    }

    return (
        <div className='slider'>
            {
            imageIndex !== null &&<div className="fullSlider">
                <div className="arrow">
                    <img src="/arrow.png" alt="" onClick={()=>changeSlide('left')}/>
                </div>
                <div className="imgContainer">
                    <img src={images[imageIndex]} alt="" />
                </div>
                <div className="arrow"> 
                    <img className='right' src="/arrow.png" alt="" onClick={()=>changeSlide('right')}/>
                </div>
                <div className="close" onClick={()=>setImageIndex(null)}>x</div>
            </div>
            }
            <div className="bigImage">
                <img src={images[0]} alt="" onClick={()=>setImageIndex(0)} />
            </div>
            <div className="smallImages">
                {images.slice(1).map((image, index)=>{
                    return(
                        <img key={index} src={image} alt="" onClick={()=>setImageIndex(index+1)} />
                    )
                })}
            </div>
        </div>
    )
}

export default Slider