import { Link } from "react-router-dom";

export function About() {
  return (
    <div>
      <h1>About Us</h1>
      <p>
        Welcome to BorgBlogs, a modern platform designed to inspire creativity
        and connection through blogging. Whether you’re passionate about sharing
        ideas, exploring unique perspectives, or building your personal brand,
        BorgBlogs provides the tools you need to bring your voice to life. Our
        intuitive platform allows you to read, write, and connect with a vibrant
        community of bloggers who share your enthusiasm for engaging content.
      </p>

      <p>
        Join us today and become part of our growing community. Register to
        start your own blog, share your stories, and connect with readers and
        writers from around the world. Whether you’re a seasoned blogger or
        taking your first step into writing, BorgBlogs is the perfect place to
        express yourself, grow your audience, and leave your mark. Your story
        starts here—start blogging with us today! Visit our
        <Link to="/createblog">Create a Blog</Link> page
      </p>
    </div>
  );
}
