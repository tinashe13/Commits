import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(email, password);
      if (res.status === "success") {
        const role = res.user?.role;
        console.log("role is: ", role)
        console.log(res)
        navigate(role === "0x88" ? window.location.href = "http://localhost:5174" : "/user");
      } else {
        setMsg(res.message || "Login failed");
      }
    } catch {
      setMsg("Something went wrong");
    }
  };

  return (
    <div className="authentication authentication-basic d-flex align-items-center justify-content-center min-vh-100 position-relative">

      <div className="container p-0">
        <div className="row">
          <div className="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto">
            <div className="card">
              <div className="card-body p-4">
                <div className="text-center mb-4">
                  <img src="/logo.png" alt="logo" className="mb-2" width="50" />
                  <h4 className="mb-1">Sign In</h4>
                  <p className="mb-0 text-muted">Welcome back Jhon!</p>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="form-group mb-3">
                    <label htmlFor="email">User Name</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter User Name"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <small className="d-block mt-1 text-end">
                      <a href="#" className="text-danger">Forget password ?</a>
                    </small>
                  </div>
                  <div className="form-check mb-3">
                    <input className="form-check-input" type="checkbox" id="rememberMe" />
                    <label className="form-check-label" htmlFor="rememberMe">
                      Remember password ?
                    </label>
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                    Sign In
                  </button>
                  {msg && (
                    <div className="alert alert-danger mt-3 text-center">{msg}</div>
                  )}
                </form>
                <div className="text-center mt-4">
                  <p className="text-muted">OR SignIn With</p>
                  <div className="d-flex justify-content-center gap-2">
                    <button className="btn btn-outline-secondary rounded-circle">
                      <i className="fab fa-google"></i>
                    </button>
                    <button className="btn btn-outline-secondary rounded-circle">
                      <i className="fab fa-facebook"></i>
                    </button>
                    <button className="btn btn-outline-secondary rounded-circle">
                      <i className="fas fa-envelope"></i>
                    </button>
                  </div>
                </div>
                <div className="text-center mt-4">
                  <p className="text-muted">
                    Don’t have an account?{" "}
                    <a href="/register" className="text-primary">
                      Sign Up
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
