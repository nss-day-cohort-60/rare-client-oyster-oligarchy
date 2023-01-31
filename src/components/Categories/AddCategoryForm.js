import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const categoryAdd = () => {


    const [category, addCategory] = useState({
        label: ""
    })

    const navigate = useNavigate()

    const handleSaveButtonClick = (click) => {
        click.preventDefault()

        return fetch(`http://localhost:8088/categories`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(guitar)
        })
            .then(response => response.json())
            .then(() => window.alert("Successfully Added")

            ).then(() => {
                navigate("/categories")
            }
            )


    }
    return (
        <div className="form-group">
            <label htmlFor="specialty"></label>
            <input
                required autoFocus
                type="text"
                className="form-control"
                placeholder="Brand"
                value={guitar.brand}
                onChange={
                    (evt) => {
                        const copy = { ...guitar }
                        copy.label = (evt.target.value)
                        addCategory(copy)
                    }
                } />
            <div>

                <button
                    onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                    className="btn btn-dark btn-lg">
                    Add Equipment
                </button>
            </div>
        </div>


    )

}