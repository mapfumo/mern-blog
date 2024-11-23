import { Link } from "react-router-dom";

function BlogCard({ post }) {
  let date = new Date(post.dateCreated).toString();
  return (
    <Link to={`/readblog/${post._id}`} className="post">
      <h1>{post.title}</h1>
      <h2>{post.description}</h2>
      <h3>{date.slice(4, 15)}</h3>
    </Link>
  );
}

export default BlogCard;
