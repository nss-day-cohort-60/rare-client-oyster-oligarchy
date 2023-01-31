import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { PostList } from "../components/Posts/PostsList"

import { SinglePost } from "../components/Posts/SinglePost"

import { CategoryList } from "../components/Categories/CategoriesList"
import { Authorized } from "./Authorized"

export const ApplicationViews = ({ token, setToken }) => {
  return <>
    <Routes>
      <Route path="/login" element={<Login setToken={setToken} />}  />
      <Route path="/register" element={<Register setToken={setToken} />}  />
      <Route path="/posts" element={<PostList setToken={setToken} />}  />

      <Route path="/post-details" element={<SinglePost setToken={setToken} />} />

      <Route path="/categories" element={<CategoryList setToken={setToken} />}  />
      <Route element={<Authorized token={token} />}>
        {/* Add Routes here */}
        
      </Route>
    </Routes>
  </>
}
