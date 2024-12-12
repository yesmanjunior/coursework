import React from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <section className="error-page">
      <div className="center">
        <Link to='/' className='btn primary'>Onto the homepage</Link>
        <h2>Page not found.</h2>
      </div>
    </section>
  )
}

export default ErrorPage