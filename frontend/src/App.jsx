import "./App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { CreateBlog } from "./pages/CreateBlog";
import { Home } from "./pages/Home";
import { Landing } from "./pages/Landing";
import { Profile } from "./pages/Profile";
import { ReadBlog } from "./pages/ReadBlog";
import { Layout } from "./components/Layout";

function App() {
  // PAGES
  // Landing Page
  // Home Page (filtered by recency)
  // ReadBlog Page
  // CreateBlog Page
  // Profile Page (users can see their posts, etc)
  // About
  // Contact

  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/createblog" element={<CreateBlog />} />
          <Route path="/readblog/:id" element={<ReadBlog />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
