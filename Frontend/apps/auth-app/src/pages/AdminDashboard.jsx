import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/admin", { credentials: "include" })
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(() => setMessage("Unauthorized or Error"));
  }, []);

  return (
    <div className="container mt-5 text-center">
        <h1>
            We are in the Admin Dashboard
        </h1>
      <h2>{message}</h2>
    </div>
  );
}
