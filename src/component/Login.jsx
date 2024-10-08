import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  const handleChangeEmail = (e) => setEmail(e.target.value);
  const handleChangePassword = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get("https://66e7e6bbb17821a9d9da7058.mockapi.io/users");
      const user = response.data.find((user) => user.email === email && user.password === password);

      if (user) {
        localStorage.setItem("isLoggedIn", JSON.stringify(user));
        setToastMessage("Login successful!");
        localStorage.setItem("username", user.name);
        navigate("/home"); // Navigate to the Home component
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      console.error(error);
      setError("Login failed");
    }
  };

  return (
    <div className="container w-96 m-auto mt-60 max-sm:w-60">
      <h1 className="text-center text-3xl max-sm:text-lg">Login</h1>
     
      {toastMessage && <p className="text-green-500">{toastMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label className="input input-bordered flex items-center gap-2 mt-10">
          <input
            type="text"
            className="grow"
            placeholder="Email"
            value={email}
            onChange={handleChangeEmail}
            required
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 mt-5">
          <input
            type="password"
            className="grow"
            placeholder="Password"
            value={password}
            onChange={handleChangePassword}
            required
          />
        </label>
        {error && <p className="text-red-500">{error}</p>}
        <button className="btn w-full mt-5 text-lg bg-red-500 text-white" type="submit">
          Login
        </button>
      </form>
      <p>
        Create an account?{" "}
        <Link to="/" className="text-blue-600">
          Signup
        </Link>
      </p>
    </div>
  );
}

export default Login;
