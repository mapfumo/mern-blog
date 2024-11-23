import { verifyUser } from "../api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // axios is a library we are using to call backend routes

export function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let response = await verifyUser(user);
    if (response) {
      sessionStorage.setItem("User", response);
      axios.defaults.headers.common["Authorization"] = `Bearer ${response}`;
      navigate("/home");
    } else {
      alert("Login Failed!");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit">Login</button>
    </form>
  );
}
