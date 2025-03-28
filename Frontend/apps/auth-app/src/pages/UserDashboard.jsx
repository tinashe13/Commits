import { useEffect, useState } from "react";

export default function UserDashboard() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/user", { credentials: "include" })
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(() => setMessage("Unauthorized or Error"));
  }, []);

  return (
    <div className="container mt-5 text-center">
      <h2>{message}</h2>
    </div>
  );
}
