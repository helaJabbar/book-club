import React from "react";
import { Link } from "react-router-dom";
import "./Form.css"; 

const Login = () => {
  return (
    <div className="container">
      <div className="row justify-content-center my-5">
        <div className="col-md-6">
          <h2 className="text-center book-club-title">Login</h2>
          <form>
            <div className="form-group my-4">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group my-4">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>

            <p className="text-center mt-3">
              <Link to="/register" className="nav-link btn-link">
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
