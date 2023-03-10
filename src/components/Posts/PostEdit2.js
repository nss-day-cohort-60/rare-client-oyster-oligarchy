import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./Posts.css"

export const PostEditForm2 = () => {
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

    const [post, setPost] = useState({
            category_id: 0,
            title: "",
            publication_date: `${today}`,
            image_url: "",
            content: "",
            user_id: userObject
    })
    const [categories, setCategories] = useState ([])
    const navigate = useNavigate()
    const {postId} = useParams()

    // useEffect(() => {
    //     fetch(`http://localhost:8088/posts?id=${postId}`)
    //     .then(response => response.json())
    //     .then((data) => {
    //         setPost(data[0])
    //     })
    // }, [])

    useEffect(() => {
        fetch(`http://localhost:8088/posts/${postId}`)
        .then(response => response.json())
        .then((data) => {
            setPost(data)
        })
    }, [])

    useEffect(() => {
        fetch(`http://localhost:8088/categories`)
            .then((res) => res.json())
            .then((catArray) => {
            setCategories(catArray)
            })
    }, [])

    const handleSaveButtonClick = (clickEvent) => {
        clickEvent.preventDefault()

            fetch(`http://localhost:8088/posts/${postId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(post)
            })
            .then(() => {
                    navigate("/my-posts");
        })
    }

        return (
            <>
            
            <form className="postForm">
                <h2 className="postForm_title">Edit Post</h2>
                <fieldset>
                    <div className="">
                        <label>
                            <select className="form-group" onChange={(evt) => {
                                const copy = { ...post }
                                copy.category_id = parseInt(evt.target.value)
                                setPost(copy)
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
                                    setPost(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label className="act-text" htmlFor="image_url">Image_url: </label>
                        <input
                            type="text"
                            className="act-control"
                            placeholder="Image URL"
                            value={post.image_url}
                            onChange={
                                (evt)=> {
                                    const copy = {...post}
                                    copy.image_url = evt.target.value
                                    setPost(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label className="act-text2" htmlFor="content">Content: </label>
                        <input
                            type="text"
                            className="act-control2"
                            placeholder="Content"
                            value={post.content}
                            onChange={
                                (evt)=> {
                                    const copy = {...post}
                                    copy.content = evt.target.value
                                    setPost(copy)
                                }
                            } />
                    </div>
                </fieldset>
    
                <button
                    onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                    className="save-button">
                    Save Post
                </button>
            </form>
            </>
        )}