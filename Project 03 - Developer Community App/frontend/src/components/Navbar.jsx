import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
      <Link to="/" style={{ marginRight: "10px", marginLeft: "10px" }}>Home</Link>
      <Link to="/login" style={{ marginRight: "10px", marginLeft: "10px" }}>Login</Link>
      <Link to="/register">Register</Link>
    </nav>
  );
};

export default Navbar;
