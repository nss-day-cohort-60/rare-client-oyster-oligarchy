import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom";
export const AddCategory = () => {
  const [value, setValue] = useState('');

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
        .then(()=> {
        Navigate("/categories")
    })
}


  

  return (
    <form>
        <label htmlFor="categoryadd">Add New Category</label>
      <input className="categoryadd" type="text" value={value} onChange={handleChange} />
      <button
      onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
      >Save Category</button>
    </form>
  );
}

