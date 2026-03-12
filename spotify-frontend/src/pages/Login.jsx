import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      console.log("Login success:", res.data);
      alert("Login Success");
      navigate("/");
    } catch (err) {
      console.log("Login error:", err);
      const msg =
        err.response?.data?.message || "Login failed. Please check your details.";
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
          Log in to Spotify
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

        <form onSubmit={handleLogin}>
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
              placeholder="Enter your password"
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
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p
          style={{
            marginTop: "16px",
            textAlign: "center",
            fontSize: "13px",
            color: "#b3b3b3",
          }}
        >
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/register")}
            style={{
              background: "transparent",
              border: "none",
              color: "#1DB954",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Sign up for Spotify
          </button>
        </p>
      </div>
    </div>
  );
}