import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./Posts.css"
import { SinglePost } from "./SinglePost"

    // const localRainbowUser = localStorage.getItem("rainbow_user")
    // const rainbowUserObject = JSON.parse(localRainbowUser)

export const PostList = () => {
    const [posts, setPosts] = useState ([])
    // const [filteredPosts, setFiltered] = useState([])
    const navigate = useNavigate()

    // useEffect(
    //     () => {
    //         const searchedPosts = posts.filter
    //         (post => {
    //             return post.name.toLowerCase().startsWith(searchTermState.toLowerCase())
    //         })
    //         setFiltered(searchedPosts)
    //     },
    //     [ searchTermState ]
    // )

    // useEffect(
    //     () => {
    //         setFiltered(posts)
    //     },
    // [posts]
    // )

    useEffect(() => {
        fetch(`http://localhost:8088/posts`)
            .then((res) => res.json())
            .then((postsArray) => {
            setPosts(postsArray)
            })
    }, [])

        return (
            <>
            <div className="top-of-posts">
                <h1 className="posts-title">Posts</h1>
            </div>
            
            <div className="posts-container">
                {posts.map((postObj) => {
                    return (
                        <div className="activity-card" key={postObj.id}>
                        <div className="each-post">
                            <h3 className="post-title" value={postObj.id}>
                                <Link to="/post-details">
                                    {postObj.title}
                                </Link>
                            </h3>
                            <p className="post-details">Author: {postObj.user.first_name} {postObj.user.last_name}</p>
                            <p className="post-details">Category: {postObj.category.label}</p>
                        </div>
                        </div>
                    )
                    
                })}
                </div>
            </>
        )
    }