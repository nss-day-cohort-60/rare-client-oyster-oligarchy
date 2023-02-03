import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Posts.css"


export const AddPostForm = () => {
    const localUser = localStorage.getItem("auth_token")
    const userObject = JSON.parse(localUser)

    const getCurrentDate = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${year}-${month}-${day}`;
    }
    
    const today = getCurrentDate()

    const [post, addPost] = useState({
        user_id: userObject,
        category_id: 0,
        title: "",
        publication_date: `${today}`,
        image_url: "",
        content: ""
    })
    const [categories, setCategory] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        fetch('http://localhost:8088/categories')
            .then((res) => res.json())
            .then((categoriesData) => {
            setCategory(categoriesData)
        })
    }, [])

    const handleSaveButtonClick = (click) => {
        click.preventDefault()


        const postToSend = {
            user_id: userObject,
            category_id: post.category_id,
            title: post.title,
            publication_date: `${today}`,
            image_url: post.image_url,
            content: post.content
        }

        return fetch(`http://localhost:8088/posts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postToSend)
            })
            .then(response => response.json())
            .then(() => {
                navigate("/my-posts")
            })
        }
        
    return (
        <>
        
        <form className="postForm">
            <h2 className="postForm_title">New Post</h2>
            <fieldset>
                <div className="">
                    <label>
                        <select className="form-group" onChange={(evt) => {
                            const copy = { ...post }
                            copy.category_id = parseInt(evt.target.value)
                            addPost(copy)
                        }} >
                            <option>Choose Category</option>
                            {categories.map(categoryObj => (
                                <option value={categoryObj.id} key={categoryObj.id}>{categoryObj.label}</option>))}
                        </select>
                    </label>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label className="act-text" htmlFor="title">Title: </label>
                    <input
                        type="text"
                        className="act-control"
                        placeholder="Title"
                        value={post.title}
                        onChange={
                            (evt)=> {
                                const copy = {...post}
                                copy.title = evt.target.value
                                addPost(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label className="act-text" htmlFor="image_url">Image URL: </label>
                    <input
                        type="text"
                        className="act-control"
                        placeholder="Image URL"
                        value={post.image_url}
                        onChange={
                            (evt)=> {
                                const copy = {...post}
                                copy.image_url = evt.target.value
                                addPost(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label className="act-text" htmlFor="content">Content: </label>
                    <input
                        type="text"
                        className="act-control2"
                        placeholder="Content"
                        value={post.content}
                        onChange={
                            (evt)=> {
                                const copy = {...post}
                                copy.content = evt.target.value
                                addPost(copy)
                            }
                        } />
                </div>
            </fieldset>

            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="save-button">
                Add Post
            </button>
        </form>
        </>
    )
}


// Uncaught (in promise) SyntaxError: Unexpected end of JSON input