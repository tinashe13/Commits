import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../api/auth";

export default function AdminDashboard() {
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const res = await fetch("http://localhost:5000/admin", {
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Unauthorized");
        }

        const data = await res.json();
        setMsg(data.message);
      } catch (err) {
        setError("Access denied. Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      }
    };

    fetchMessage();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      alert("Logout failed");
    }
  };

  return (
    <div className="container text-center mt-5">
      {msg ? (
        <>
          <h1 className="mb-4">{msg}</h1>
          <button className="btn btn-outline-danger" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <p>{error || "Loading..."}</p>
      )}
    </div>
  );
}
