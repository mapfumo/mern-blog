import { useState } from "react";
import { createPost } from "../api";

export function CreateBlog() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");

  async function handleSubmit() {
    let submitObject = {
      title: title,
      description: description,
      content: content,
      author: null,
      dateCreated: new Date(),
    };

    await createPost(submitObject);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Blog Post Title: </label>
      <input
        onChange={(e) => setTitle(e.target.value)}
        maxLength={100}
        required
        type="text"
        name="title"
        placeholder="Title"
      />
      <label>Blog Post Description: </label>
      <input
        onChange={(e) => setDescription(e.target.value)}
        maxLength={200}
        required
        type="text"
        name="description"
        placeholder="Description"
      />
      <label>Blog Post Content: </label>
      <textarea
        onChange={(e) => setContent(e.target.value)}
        maxLength={5000}
        required
        name="content"
        placeholder="Content"
      ></textarea>
      <button type="submit">Submit</button>
    </form>
  );
}
