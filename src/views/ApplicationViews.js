import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { MyPosts } from "../components/Posts/MyPosts"
import { PostList } from "../components/Posts/PostsList"
import { CategoryList } from "../components/Categories/CategoriesList"
import { Authorized } from "./Authorized"

export const ApplicationViews = ({ token, setToken }) => {
  return <>
    <Routes>
      <Route path="/login" element={<Login setToken={setToken} />}  />
      <Route path="/register" element={<Register setToken={setToken} />}  />
      
      <Route path="/posts" element={<PostList setToken={setToken} />}  />
      <Route path="/categories" element={<CategoryList setToken={setToken} />}  />
      <Route element={<Authorized token={token} />}>
      <Route path="/my-posts" element={<MyPosts setToken={setToken} />}  />
        
      </Route>
    </Routes>
  </>
}
