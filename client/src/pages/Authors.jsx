import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Loader from '../components/Loader'

const Authors = () => {
    const [authors, setAuthors] = useState([])
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        const getauthors = async () => {
            setIsLoading(true)
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users`)
                setAuthors(response.data);
            } catch (error) {
                console.log(error)
            }
            setIsLoading(false)
        }

        getauthors()
    }, [])


    if(isLoading) {
        return <Loader/>
    }


  return (
    <section className="authors">
        {authors.length ? <div className="container authors__container">
            {authors.map(author => {
                return <Link key={author?._id} to={`/posts/users/${author?._id}`} className="author">
                <div className="author__avatar">
                    <img src={`${process.env.REACT_APP_ASSET_URL}/uploads/${author.avatar}`} alt={author?.name} />
                </div>
                <div className='author__info'>
                    <h4>{author?.name}</h4>
                    <p>{author?.posts} posts</p>
                </div>
            </Link>
            })}
        </div> : <h2 className='center'>No Authors Found</h2>}
    </section>
  )
}

export default Authors