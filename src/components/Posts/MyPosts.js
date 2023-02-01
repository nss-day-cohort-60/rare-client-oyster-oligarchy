import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./Posts.css"


const localUser = localStorage.getItem("auth_token")
const userObject = JSON.parse(localUser)

export const MyPosts = () => {
    const [posts, setPosts] = useState ([])
    const navigate = useNavigate()


    useEffect(() => {
        fetch(`http://localhost:8088/posts?user_id=${userObject}`)
            .then((res) => res.json())
            .then((postsArray) => {
            setPosts(postsArray)
            })
    }, [])

    const formatDate = (postObj) => {
        let formattedDate = postObj.publication_date.split("-")
        formattedDate = [formattedDate[1],formattedDate[2],formattedDate[0]]
        return(formattedDate.join("/"))
    }

    const getMyPosts = () => {
        fetch(`http://localhost:8088/posts?user_id=${userObject}`)
        .then((res) => res.json())
        .then((postsArray) => {
            setPosts(postsArray)
        })
    }

    const handleDelete = (event) => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            return deleteButton(event)
        }
    }

    const deleteButton = (id) => {

            fetch(`http://localhost:8088/posts/${id}`, {
                method: "DELETE",
            })
                .then(() => {
                    getMyPosts()
                })
        }

        return(
            <>
            <div className="top-of-posts">
                <h1 className="posts-title">Posts</h1>
            </div>
            
            <div className="posts-container">
                {posts.map((postObj) => {
                    if (postObj.user_id === userObject)
                        return (
                            <div className="activity-card" key={postObj.id}>
                            <div className="each-post">
                                <h3 className="post-title">{postObj.title}</h3>
                                <img src={postObj.image_url}/>
                                <p className="post-details">{postObj.content}</p>
                                <p className="post-details">Author: {postObj.first_name} {postObj.last_name}</p>
                                <p className="post-details">Category: {postObj.label}</p>
                                <p className="post-details">Posted on: {formatDate(postObj)}</p>
                                <button>Edit</button>
                                <button className="delete-button" onClick={(event)=> (handleDelete(event))}>Delete</button>
                            </div>
                            </div>
                        )
                    else {
                        return <>
                        </>
                    }
                    })}
                </div>
            </>
        )
}