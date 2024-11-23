import { createUser } from "../api";
import { useState } from "react";

export function CreateUser() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let response = await createUser(user);
    console.log(response);
    if (response.status !== 200) {
      alert("Error creating user");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder={"Name"}
        onChange={handleChange}
        name="name"
        required
        maxLength={20}
      />
      <input
        type="email"
        placeholder={"Email"}
        onChange={handleChange}
        name="email"
        required
        maxLength={50}
      />
      <input
        type="password"
        placeholder={"Password"}
        onChange={handleChange}
        name="password"
        required
        maxLength={20}
      />
      <button type="submit">Create Account</button>
    </form>
  );
}
