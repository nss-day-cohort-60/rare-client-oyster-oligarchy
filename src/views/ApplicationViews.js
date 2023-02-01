import { Outlet, Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { MyPosts } from "../components/Posts/MyPosts"
import { SinglePost } from "../components/Posts/SinglePost"
import { CategoryList } from "../components/Categories/CategoriesList"
import { Authorized } from "./Authorized"
import { PostContainer } from "../components/Posts/PostContainer"
// import { PostList } from "../components/Posts/PostsList"

export const ApplicationViews = ({ token, setToken }) => {
  return <>
    <Routes>
      <Route path="/" element={<><Outlet/></>} />
      <Route path="/login" element={<Login setToken={setToken} />}  />
      <Route path="/register" element={<Register setToken={setToken} />}  />
      <Route path="/posts" element={<PostContainer setToken={setToken} />}  />

      <Route path="/post-details/:postId" element={<SinglePost setToken={setToken} />} />

      <Route path="/categories" element={<CategoryList setToken={setToken} />}  />
      <Route element={<Authorized token={token} />}>
        {/* Add Routes here */}
      <Route path="/my-posts" element={<MyPosts setToken={setToken} />}  />
        
      </Route>
    </Routes>
  </>
}
