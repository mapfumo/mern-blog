import { Link } from "react-router-dom";
import { pageData } from "./pageData";
import { useNavigate } from "react-router-dom";

export function Navbar() {
  const navigate = useNavigate();

  function handleLogout() {
    // sessionStorage.clear();
    sessionStorage.removeItem("User");
    navigate("/");
  }
  return (
    <div className="navbar">
      {pageData.map((page) => {
        return (
          <Link key={page.id} to={page.path} className="navItem">
            <button>{page.name}</button>
          </Link>
        );
      })}
      {/* logout button and redirect to login page */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
