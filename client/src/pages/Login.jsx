import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"

import { UserContext } from '../context/userContext'

const Login = () => {
    const [userData, setUserData] = useState({email: "", password: ""})
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const {setCurrentUser} = useContext(UserContext)

    const changeHandler = (e) => {
        setUserData(prevState => {
            return {...prevState, [e.target.name]: e.target.value}
        })
    }

    const loginUser = async (e) => {
        e.preventDefault();
        setError('')
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/login`, userData);
            const user = await response.data;
            if(!user) {
                setError("Please check your credentials.")
            }
            
            setCurrentUser(user)
            navigate("/")
        } catch (err) {
            setError(err?.response?.data.message);
        }
    }


    return (
        <section className="login">
            <div className="container">
                <h2>Sign In</h2>
                <form onSubmit={loginUser} className='form login__form'>
                    {error && <p className="form__error-message">{error}</p>}
                    <input type="email" placeholder='Email' name='email' value={userData.email} onChange={changeHandler} autoFocus />
                    <input type="password" placeholder='Password' name='password' value={userData.password} onChange={changeHandler} />
                    <button type="submit" className='btn primary'>Sign in</button>
                </form>
                <small>If you don't have an account, please sign up: <Link to="/register">sign up</Link></small>
            </div>
        </section>
    )
}

export default Login