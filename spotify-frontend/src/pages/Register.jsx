import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await API.post("/auth/register", {
        username,
        email,
        password,
      });

      console.log("Register success:", res.data);
      alert("User registered successfully");

      navigate("/login");
    } catch (err) {
      console.log("Register error:", err);
      const msg =
        err.response?.data?.message ||
        "Registration failed. Please check your details.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #121212, #000000)",
        color: "white",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          background: "#181818",
          padding: "32px",
          borderRadius: "12px",
          boxShadow: "0 12px 40px rgba(0,0,0,0.8)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "24px", fontSize: "26px" }}>
          Sign up for Spotify
        </h2>

        {error && (
          <div
            style={{
              marginBottom: "16px",
              padding: "8px 12px",
              borderRadius: "6px",
              background: "rgba(255,0,0,0.1)",
              border: "1px solid rgba(255,0,0,0.5)",
              fontSize: "14px",
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleRegister}>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", fontSize: "14px", marginBottom: "6px" }}>
              Username
            </label>
            <input
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: "6px",
                border: "none",
                outline: "none",
                background: "#303030",
                color: "white",
              }}
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", fontSize: "14px", marginBottom: "6px" }}>
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: "6px",
                border: "none",
                outline: "none",
                background: "#303030",
                color: "white",
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", fontSize: "14px", marginBottom: "6px" }}>
              Password
            </label>
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: "6px",
                border: "none",
                outline: "none",
                background: "#303030",
                color: "white",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "10px 0",
              borderRadius: "999px",
              border: "none",
              cursor: loading ? "default" : "pointer",
              background: "#1DB954",
              color: "black",
              fontWeight: 700,
              fontSize: "15px",
            }}
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}