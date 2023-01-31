import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./Categories.css"

    // const localRainbowUser = localStorage.getItem("rainbow_user")
    // const rainbowUserObject = JSON.parse(localRainbowUser)

export const CategoryList = () => {
    const [categories, setCategories] = useState ([])
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
        fetch(`http://localhost:8088/categories`)
            .then((res) => res.json())
            .then((categoryArray) => {
            setCategories(categoryArray)
            })
    }, [])

        return (
            <>
            <div className="top-of-posts">
                <h1 className="posts-title">Categories</h1>
            </div>
            
            <div className="categories-container">
                {categories.map((categoryObj) => {
                    return (
                        <div className="activity-card" key={categoryObj.id}>
                        <div className="each-post">
                            <h3 className="categories-title">{categoryObj.label}</h3>
                        </div>
                        </div>
                    )
                })}
                </div>
            </>
        )
    }