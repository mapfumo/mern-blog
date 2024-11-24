import BlogCard from "../components/BlogCard";
import { useState, useEffect } from "react";
import { getPosts } from "../api";
import { jwtDecode } from "jwt-decode";

export function Profile() {
  const [post, setPosts] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    async function loadUserData() {
      const token = sessionStorage.getItem("User");
      const decodedUser = jwtDecode(token);
      const allPosts = await getPosts();
      const filteredPosts = allPosts.filter(
        (post) => post.author === decodedUser._id
      );
      setPosts(filteredPosts);
      setUser(decodedUser);
    }
    loadUserData();
  }, []);

  return (
    <>
      <label>Name:</label>
      <h2>{user.name}</h2>
      <label>Email:</label>
      <h2>{user.email}</h2>
      <label>Joined On:</label>
      <h2>{new Date(user.joinDate).toString().slice(4, 15)}</h2>
      <label>Posts:</label>
      <div className="posts">
        {post.map((post) => {
          return (
            <>
              <BlogCard post={post} />
            </>
          );
        })}
        <button>Create New Post</button>
      </div>
    </>
  );
}
