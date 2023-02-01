import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { AddCategory } from "./AddCategoryForm"
import "./Categories.css"

// const localRainbowUser = localStorage.getItem("rainbow_user")
// const rainbowUserObject = JSON.parse(localRainbowUser)

export const CategoryList = () => {
    const [categories, setCategories] = useState([])
    // const [filteredPosts, setFiltered] = useState([])
    const [value, setValue] = useState('')
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
    const rerender = () => {
        fetch(`http://localhost:8088/categories`)
            .then((res) => res.json())
            .then((categoryArray) => {
                setCategories(categoryArray)
            })
    }

    const handleChange = (event) => {
        setValue(event.target.value);

    };
    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        const categoryToSendToAPI = {
            label: value

        }
        return fetch(`http://localhost:8088/categories`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(categoryToSendToAPI)
        })
            .then(rerender)





    }

    return (
        <>
            <div className="top-of-posts">
                <h1 className="posts-title">Categories</h1>
            </div>
            <div className="categories">
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
                <aside>
                <form className="category-search">
                    <label htmlFor="categoryadd">Add New Category</label>
                    <input className="categoryadd" type="text" value={value} onChange={handleChange} />
                    <button
                        onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                    >Save Category</button>
                </form>
                </aside>

                
            </div>
        </>
    )
}