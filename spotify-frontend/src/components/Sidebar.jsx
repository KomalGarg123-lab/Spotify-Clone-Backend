import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  function isActive(path) {
    return location.pathname === path;
  }

  const linkStyle = (active) => ({
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "8px 12px",
    borderRadius: "6px",
    color: active ? "white" : "#b3b3b3",
    textDecoration: "none",
    fontSize: "14px",
    background: active ? "#282828" : "transparent",
  });

  return (
    <div
      style={{
        width: "240px",
        height: "100vh",
        background: "#000000",
        color: "white",
        padding: "20px 16px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div
          style={{
            width: "32px",
            height: "32px",
            background: "#1DB954",
            borderRadius: "4px",
          }}
        />
        <h2 style={{ fontSize: "20px", fontWeight: 700 }}>Spotify</h2>
      </div>

      <nav style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <Link to="/" style={linkStyle(isActive("/"))}>
          <span>🏠</span>
          <span>Home</span>
        </Link>

        <Link to="/albums" style={linkStyle(isActive("/albums"))}>
          <span>📀</span>
          <span>Albums</span>
        </Link>

        <div style={{ marginTop: "16px", fontSize: "12px", color: "#b3b3b3" }}>
          ACCOUNT
        </div>

        <Link to="/login" style={linkStyle(isActive("/login"))}>
          <span>🔐</span>
          <span>Login</span>
        </Link>

        <Link to="/register" style={linkStyle(isActive("/register"))}>
          <span>🧑</span>
          <span>Register</span>
        </Link>
      </nav>
    </div>
  );
}