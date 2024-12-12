import React, { useContext, useEffect, useState } from 'react'

import { Link, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import PostAuthor from '../components/PostAuthor'
import { UserContext } from '../context/userContext'
import Loader from '../components/Loader'

const PostDetail = () => {
    const {id} = useParams()
    const [post, setPost] = useState(null);
    const [creatorID, setCreatorID] = useState(null)
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const {currentUser} = useContext(UserContext)
    const token = currentUser?.token;


    useEffect(() => {
        const getPost = async () => {
            setIsLoading(true)
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/${id}`)
                setPost(response.data);
                setCreatorID(response.data.creator)
            } catch (error) {
                console.log(error)
            }
            setIsLoading(false)
        }
        getPost();
    }, [])



    if(isLoading) {
        return <Loader/>
    }

    const removePost = async () => {
        const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/posts/${id}`, {withCredentials: true, headers: {Authorization: `Bearer ${token}`}})
        if(!response) {
            setError("Post deletion failed. Please try again")
        }

        navigate('/')
    }
    


  return (
    <section className='post-detail'>
        {error && <p className='error'>{error}</p>}
        {post && <div className="container post-detail__container">
            <div className="post-detail__header">
                <PostAuthor authorID={creatorID} createdAt={post?.createdAt} />
                {currentUser?.id === post?.creator && <div className="post-detail__buttons">
                    <Link to={`/posts/${post?._id}/edit`} className="btn sm primary">Edit</Link>
                    <Link className='btn sm danger' onClick={removePost}>Delete</Link>
                </div>}
            </div>
            <h1>{post?.title}</h1>
            <div className="post-detail__thumbnail">
                <img src={`${process.env.REACT_APP_ASSET_URL}/uploads/${post?.thumbnail}`} alt="" />
            </div>
            <p dangerouslySetInnerHTML={{__html: post?.description}}/>
        </div>}
    </section>
  )
}

export default PostDetail