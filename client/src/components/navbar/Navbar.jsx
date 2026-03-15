import React, {useState} from 'react'
import "./navbar.scss"
import { Link, NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContxt';
import { useNotificationStore } from '../../lib/notificationStore';
import { SocketContext } from '../../context/SocketContext';
import { useEffect } from 'react';

const navLinkStyles = ({ isActive }) => {
  return {
    fontWeight: isActive ? 'bold' : 'normal',
    color: isActive ? 'blue' : 'black'
  };
};

function Navbar(){
    const [open , setOpen] = useState(false);

    const {currentUser} = useContext(AuthContext)
    const {socket} = useContext(SocketContext)

    const fetch = useNotificationStore(state => state.fetch)
    const number = useNotificationStore(state => state.number)

    useEffect(() => {
        if (currentUser) {
            fetch();
        }
    }, [currentUser, fetch]);

    useEffect(() => {
        socket?.on("getMessage", (data) => {
            fetch();
        });
        return () => {
            socket?.off("getMessage");
        };
    }, [socket, fetch]);

    return(
        <nav>
            <div className="left">
                <Link className='logo' to="/">
                    <img src="/logo.png" alt="" />
                    <span>NestQuest</span>
                </Link>
                <NavLink to="/" style={navLinkStyles}>Home</NavLink>
                <NavLink to="/about" style={navLinkStyles}>About</NavLink>
                <NavLink to="/contact" style={navLinkStyles}>Contact</NavLink>
                <NavLink to="/agents" style={navLinkStyles}>Agents</NavLink>
            </div>
            <div className="right">
                {currentUser ? (
                    <div className="user">
                        <img src={currentUser.avatar || '/noavatar.png'} alt="" />
                        <span>{currentUser.username}</span>
                        <Link className='profile' to="/profile">
                            {number > 0 && <div className="notification">{number}</div>}
                            <span>Profile</span>
                        </Link>
                        {/* <Link to="/logout">Logout</Link> */}
                    </div>
                ) : (
                    <><Link to="/login">Sign In</Link>
                    <Link to="/register" className='register'>Sign Up</Link></>
                )}
                <div className="menuIcon">
                    <img src="/menu.png" alt="" onClick={() => setOpen(!open)} />
                </div>
                <div className={open ? "menu active" : "menu"}>
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/contact" >Contact</NavLink>
                    <NavLink to="/agents" >Agents</NavLink>
                    <NavLink to="/login" >Sign In</NavLink>
                    <NavLink to="/register" className='register' >Sign Up</NavLink>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;