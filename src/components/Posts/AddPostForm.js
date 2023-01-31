import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const localUser = localStorage.getItem("auth_token")
const userObject = JSON.parse(localUser)

export const AddPostForm = () => {

    const [post, addPost] = useState({
        user_id: userObject.id,
        category_id: 0,
        title: "",
        publication_date: "",
        image_url: "",
        content: "",
        approved: ""
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
            user_id: userObject.id,
            category_id: post.category_id,
            title: post.title,
            publication_date: today,
            image_url: post.image_url,
            content: post.content,
            approved: post.approved
        }

        return fetch(`http://localhost:8088/posts?_expand=category_id&_expand=user_id`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postToSend)
        })
            .then(response => response.json())
            .then(() => window.alert("Successfully Added")

            ).then(() => {
                navigate("/my-posts")
            }
            )

    }
    return (
        <>
{/*         
        <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
            {feedback}
        </div> */}
        
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
                    <label className="act-text" htmlFor="category_id">Title: </label>
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
                    <label className="act-text" htmlFor="category_id">Image_url: </label>
                    <input
                        type="text"
                        className="act-control"
                        placeholder="Image_url"
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
                    <label className="act-text" htmlFor="category_id">Content: </label>
                    <input
                        type="text"
                        className="act-control"
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
                    className="btn btn-dark btn-lg">
                    Add Post
            </button>
            {/* <button 
            onClick={(clickEvent) => handleSaveButtonClick(clickEvent) }
            className="save-button">
                Submit Post
            </button> */}
        </form>
        </>
    )
}