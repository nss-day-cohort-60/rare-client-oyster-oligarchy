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

    const navigate = useNavigate()

    const handleSaveButtonClick = (click) => {
        click.preventDefault()

        const postToSend = {
            user_id: userObject.id,
            category_id: post.category_id,
            title: post.title,
            publication_date: post.publication_date,
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
        
        <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
            {feedback}
        </div>
        
        <form className="postForm">
            <h2 className="postForm_title">New Post</h2>
            <fieldset>
                <div className="form-group">
                    <label className="act-text" htmlFor="category_id">Post Name:</label>
                    <input
                        required
                        type="text"
                        className="act-control"
                        placeholder="Category"
                        value={post.category_id}
                        onChange={
                            (evt)=> {
                                const copy = {...post}
                                copy.category_id = evt.target.value
                                addPost(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label className="act-text" htmlFor="title">Post Location:</label>
                    <input
                        required
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
                    <label className="act-text" htmlFor="date">Post Date:</label>
                    <input
                        required
                        type="date"
                        className="act-control"
                        placeholder="Date of Post"
                        value={post.date} 
                        onChange={
                            (evt)=> {
                                const copy = {...post}
                                copy.date = evt.target.value
                                addPost(copy)
                            }
                        } />
                </div>

            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label className="act-text" htmlFor="start-time">Post Start Time:</label>
                    <input
                        required
                        type="time"
                        className="act-control"
                        placeholder="Start Time"
                        value={post.startTime}
                        onChange={
                            (evt)=> {
                                const copy = {...post}
                                copy.startTime = evt.target.value
                                addPost(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label className="act-text" htmlFor="end-time">Post End Time:</label>
                    <input
                        required
                        type="time"
                        className="act-control"
                        placeholder="End Time"
                        value={post.endTime}
                        onChange={
                            (evt)=> {
                                const copy = {...post}
                                copy.endTime = evt.target.value
                                addPost(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label className="act-text" htmlFor="name">Maverick:</label>
                    <input type="radio"
                        name="kid"
                        value="1"
                        onClick={
                            (click) => {
                                const copy = {...post}
                                copy.kidId = parseInt(click.target.value)
                                addPost(copy)
                            }
                        } />
                    <label className="act-text" htmlFor="name">Adaline:</label>
                    <input type="radio"
                        name="kid"
                        value= "2"
                        onClick={
                            (click) => {
                                const copy = {...post}
                                copy.kidId = parseInt(click.target.value)
                                addPost(copy)
                            }
                        } />
                        <label className="act-text" htmlFor="name">Both:</label>
                        <input type="radio"
                        name="kid"
                        value= "3"
                        onClick={
                            (click) => {
                                const copy = {...post}
                                copy.kidId = parseInt(click.target.value)
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