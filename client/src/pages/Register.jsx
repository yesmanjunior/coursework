import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

const Register = () => {
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
        password2: "",
    })
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const changeInputHandler = (e) => {
        setUserData(prevState => {
            return {...prevState, [e.target.name]: e.target.value}
        })
    }

    const registerUser = async (e) => {
        e.preventDefault();
        setError('')
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/register`, userData)
            const newUser = await response.data;
            if(!newUser) {
                setError("Couldn't register user. Please try again.")
            }
            navigate('/login')
        } catch (err) {
            setError(err.response.data.message);
        }
    }


    return (
        <section className="register">
            <div className="container">
                <h2>Sign Up</h2>
                <form onSubmit={registerUser} className='form register__form'>
                    {error && <p className='form__error-message'>{error}</p>}
                    <input type="text" placeholder='Full Name' name="name" value={userData.name} onChange={changeInputHandler} autoFocus/>
                    <input type="email" placeholder='Email' name="email" value={userData.email} onChange={changeInputHandler} />
                    <input type="password" placeholder='Password' name="password" value={userData.password} onChange={changeInputHandler} />
                    <input type="password" placeholder='Confirm Password' name="password2" value={userData.password2} onChange={changeInputHandler} />
                    <button type="submit" className='btn primary'>Sign Up</button>
                </form>
                <small>If you already have an account, please sign in: <Link to="/login">sign in</Link></small>
            </div>
        </section>
    )
}

export default Register