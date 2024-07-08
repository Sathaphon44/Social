import React, { FormEvent, useContext } from 'react'
import "./style.css"
import { Link } from 'react-router-dom'
import { SignUpModel } from '../../../models/auth';
import { authContext } from '../../../context/authContext';

function RegisterPage() {
  const auth = useContext(authContext);

  const handleSubmit = async (events: React.FormEvent<HTMLFormElement>) => {
    events.preventDefault()
    const form = events.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value;
    const username = (form.elements.namedItem("username") as HTMLInputElement)?.value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)?.value;
    const confirmPassword = (form.elements.namedItem("confirmPassword") as HTMLInputElement)?.value;

    if (password != confirmPassword) {
      return alert("รหัสผ่านไม่ตรงกัน")
    }

    const data: SignUpModel = { email, username, password };
    const status = auth?.signUp(data)
    if (status) {
      form.reset();
      return alert("ลงทะเบียนเรียบร้อย");
    } else {
      return alert("เกิดข้อผิดพลาดไม่สามารถลงทะเบียนได้")
    }
  }


  return (
    <div className='register-container'>
      <div className="register-content">
        <header>
          <p>Sign Up</p>
        </header>
        <main>
          <form action="" method="post" onSubmit={handleSubmit}>
            <input name="email" type="email" placeholder='your email.' minLength={10} maxLength={255} required />
            <input name="username" type="text" placeholder='your username' minLength={6} maxLength={255} required />
            <input name="password" type="password" placeholder='your password.' minLength={8} maxLength={255} required />
            <input name="confirmPassword" type="password" placeholder='confirm password.' minLength={8} maxLength={255} required />
            <button type="submit">sign up</button>
          </form>
        </main>
        <footer>
          <Link to={"/signIn"}>sign in</Link>
          or
          <Link to={"/"}>home</Link>
        </footer>
      </div>
    </div>
  )
}

export default RegisterPage