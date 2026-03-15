import React, { useContext } from 'react'
import './homePage.scss'
import SearchBar from '../../components/searchBar/SearchBar'
import { AuthContext } from '../../context/AuthContxt'
function HomePage() {

    const {currentUser} = useContext(AuthContext)
    // console.log(currentUser)
    return (
        <div className='homePage'>
            <div className="textContainer">
                <div className="wrapper">
                    <h1 className='title'>Find Your Dream Home</h1>
                    <p>Discover your perfect home with our comprehensive real estate platform. Browse through our listings, connect with sellers, and make informed decisions. Whether you're buying, selling, or renting, we've got you covered.</p>
                    <SearchBar/>
                    <div className="boxes">
                        <div className="box">
                            <h1>16+</h1>
                            <h2>Years of Experience</h2>
                        </div>
                        <div className="box">
                            <h1>200+</h1>
                            <h2>Awards Won</h2>
                        </div>
                        <div className="box">
                            <h1>1200+</h1>
                            <h2>Properties Ready</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="imgContainer">
                <img src="/bg.png" alt="" />
            </div>
        </div>
    )
}

export default HomePage;