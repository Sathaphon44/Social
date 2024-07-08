import React, { useContext } from 'react'
import "./style.css"
import { Link, useLocation } from 'react-router-dom'
import { authContext } from '../../context/authContext'
import { CircleUserRound } from 'lucide-react'



function HeaderComponent() {
    const auth = useContext(authContext)
    const location = useLocation();

    const blockPath = ["/signin", "/signup"].includes(location.pathname.toLowerCase())
    if (blockPath) return

    return (
        <nav className='nav-container'>
            <ul>
                <li><Link to={"/"}>Home</Link></li>
                {
                    auth?.user?.id ? (
                        <div>
                            <li><CircleUserRound />{auth.user.username}</li>
                            <li><Link to={"/"} onClick={auth.signOut}>Sign Out</Link></li>
                        </div >
                    ) : (
                        <div>
                            <li><Link to={"/signIn"}>Sign In</Link></li>
                            <li><Link to={"/signUp"}>Sign Up</Link></li>
                        </div >
                    )
                }
            </ul >
        </nav >
    )
}

export default HeaderComponent