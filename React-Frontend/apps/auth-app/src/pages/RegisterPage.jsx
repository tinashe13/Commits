import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/auth";

export default function RegisterPage() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await register(form);
      if (res.status === "success") {
        navigate("/login");
      } else {
        setMsg(res.message || "Registration failed");
      }
    } catch {
      setMsg("Something went wrong");
    }
  };

  return (
    <div className="authentication authentication-basic d-flex align-items-center justify-content-center">
      <div className="container p-0">
        <div className="row">
          <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto">
            <div className="card">
              <div className="card-body p-4">
                <div className="text-center mb-4">
                  <img src="/logo.png" alt="logo" className="mb-2" width="50" />
                  <h4 className="mb-1">Create Account</h4>
                  <p className="mb-0 text-muted">Sign up to get started</p>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="form-group mb-3">
                    <label>First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="first_name"
                      placeholder="Enter First Name"
                      value={form.first_name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="last_name"
                      placeholder="Enter Last Name"
                      value={form.last_name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="Enter Email"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      placeholder="Enter Password"
                      value={form.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                    Sign Up
                  </button>
                  {msg && (
                    <div className="alert alert-danger mt-3 text-center">{msg}</div>
                  )}
                </form>
                <div className="text-center mt-4">
                  <p className="text-muted">
                    Already have an account?{" "}
                    <a href="/login" className="text-primary">
                      Sign In
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
}
