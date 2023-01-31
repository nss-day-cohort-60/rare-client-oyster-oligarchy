import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./Posts.css"


const localUser = localStorage.getItem("auth_token")
const userObject = JSON.parse(localUser)

export const MyPosts = () => {
    const [posts, setPosts] = useState ([])
    // const [filteredPosts, setFiltered] = useState([])
    const navigate = useNavigate()

    console.log(userObject)

    useEffect(() => {
        fetch(`http://localhost:8088/posts?user_id=${userObject}`)
            .then((res) => res.json())
            .then((postsArray) => {
            setPosts(postsArray)
            })
    }, [])

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
                                <p className="post-details">Author: {postObj.first_name} {postObj.last_name}</p>
                                <p className="post-details">Category: {postObj.label}</p>
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