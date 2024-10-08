import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const navigate = useNavigate();
  const [formSign, setFormDataSign] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDataSign({
      ...formSign,
      [name]: value,
    });
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(formSign.email)) {
      setError("Invalid email format");
      return;
    }
    if (formSign.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (!formSign.name) {
      setError("Name is required");
      return;
    }

    setError("");
    try {
      const response = await axios.post(
        "https://66e7e6bbb17821a9d9da7058.mockapi.io/users",
        formSign
      );
      setToastMessage("User signed up successfully");
      navigate("/login");
    } catch (error) {
      console.error(error);
      setError("Sign up failed");
    }
  };

  return (
    <div className="container w-96 m-auto mt-60 max-sm:w-60">
      <h1 className="text-center text-3xl max-sm:text-lg">Signup</h1>
      {toastMessage && <p className="text-green-500">{toastMessage}</p>}
      <label className="input input-bordered flex items-center gap-2 mt-10">
        <input
          type="text"
          className="grow"
          name="name"
          placeholder="Name"
          required
          value={formSign.name || ""} 
          onChange={handleChange}
        />
      </label>
      <label className="input input-bordered flex items-center gap-2 mt-5">
        <input
          type="text"
          className="grow"
          name="email"
          placeholder="Email"
          required
          value={formSign.email || ""} 
          onChange={handleChange}
        />
      </label>
      <label className="input input-bordered flex items-center gap-2 mt-5">
        <input
          type="password"
          className="grow"
          name="password"
          placeholder="Password"
          required
          value={formSign.password || ""} 
          onChange={handleChange}
        />
      </label>
      {error && <p className="text-red-500">{error}</p>}

      <button
        className="btn w-full mt-5 text-lg bg-red-500 text-white"
        onClick={handleSubmit}
      >
        Create account
      </button>
      <p>
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600">
          Login
        </Link>
      </p>
    </div>
  );
}

export default Signup;
