import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Header = () => {
  const { state, logout } = useAuth();
  const { user } = state;

  return (
    <header>
      <nav style={{ display: "flex", justifyContent: "space-between" }}>
        <Link to="/">Home</Link>
        {user ? (
          <div>
            <span>Welcome, {user.email}</span>
            <button onClick={logout}>Logout</button>
          </div>
        ) : (
          <div>
            <Link to="/login">Login</Link> |{" "}
            <Link to="/register">Register</Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
