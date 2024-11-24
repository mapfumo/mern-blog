import { Navbar } from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function Layout() {
  const navigate = useNavigate();
  const user = sessionStorage.getItem("User");

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
