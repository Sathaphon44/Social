import React, { useContext } from 'react'
import { SignInModel } from '../../../models/auth';
import { authContext } from '../../../context/authContext';
import { Link, useNavigate } from 'react-router-dom';
import "./style.css"

function LoginPage() {
    const auth = useContext(authContext)
    const navigate = useNavigate();


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const form = event.currentTarget;
        const email = (form.elements.namedItem("email") as HTMLInputElement)?.value;
        const password = (form.elements.namedItem("password") as HTMLInputElement)?.value;
        const data: SignInModel = {
            email,
            password
        }
        const login = await auth?.signIn(data)
        if (login?.status) {
            alert("login success.")
            return navigate("/")
        } else if (!login?.status || !login) {
            return alert("login failed.")
        }

    }

    return (
        <div className='login-container'>
            <div className="login-content">
                <header>
                    <p>Sign In</p>
                </header>
                <main>
                    <form method='post' onSubmit={handleSubmit}>
                        <input type="email" id='email' placeholder='your email.' required />
                        <input type="password" id='password' placeholder='your password.' required />
                        <button type='submit'>sign in</button>
                    </form>
                </main>
                <footer>
                    <Link to={"/signUp"}>sign up</Link>
                    or
                    <Link to={"/"}>home</Link>
                </footer>
            </div>
        </div>
    )
}

export default LoginPage