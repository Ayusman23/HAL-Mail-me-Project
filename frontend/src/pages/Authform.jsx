import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "../css/Authform.module.css"; // Import CSS Modules
import logo from "./log.svg";
import mf from "./register.svg";

const Authform = () => {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const navigate = useNavigate();

  const switchMode = () => {
    setIsSignUpMode(!isSignUpMode);
  };

  return (
    <div
      className={`${styles.container} ${
        isSignUpMode ? styles["sign-up-mode"] : ""
      }`}
    >
      <div className={styles["forms-container"]}>
        <div className={styles["signin-signup"]}>
          {isSignUpMode ? (
            <SignUpForm switchMode={switchMode} navigate={navigate} />
          ) : (
            <SignInForm switchMode={switchMode} navigate={navigate} />
          )}
        </div>
      </div>

      <div className={styles["panels-container"]}>
        <div
          className={`${styles.panel} ${styles["left-panel"]} ${styles.neon}`}
        >
          <div className={`${styles.content} ${styles["neon-text"]}`}>
            <h3>Hello, Friend!</h3>
            <p>Register with your personal details to use all site features.</p>
            <button
              className={`${styles.btn} ${styles.transparent} ${styles["hover:text-white"]}`}
              id="sign-up-btn"
              onClick={switchMode}
            >
              Sign up
            </button>
          </div>
          <img src={logo} className={styles.image} alt="" />
        </div>
        <div
          className={`${styles.panel} ${styles["right-panel"]} ${styles.neon}`}
        >
          <div className={`${styles.content} ${styles["neon-text"]}`}>
            <h3>Welcome Back!</h3>
            <p>Enter your personal details to use all site features.</p>
            <button
              className={`${styles.btn} ${styles.transparent}`}
              id="sign-in-btn"
              onClick={switchMode}
            >
              Sign in
            </button>
          </div>
          <img src={mf} className={styles.image} alt="" />
        </div>
      </div>
    </div>
  );
};

// SignInForm and SignUpForm components remain unchanged
const SignInForm = ({ switchMode, navigate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5001/api/users/login",
        {
          email,
          password,
        }
      );
      const token  = response.data.accessToken;
      localStorage.setItem("authToken", token);
      localStorage.setItem("email",email);
      // console.log("Login successful", response.data);
      //  console.log(email);
      // Handle successful login, e.g., save token, redirect
      navigate("/home");
    } catch (error) {
      alert("Login failed : Check email or password", error);
      console.error("Login failed:", error.response?.data || error.message);
    }
  };

  return (
    <form onSubmit={handleLogin} className="sign-in-form">
      <h2
        className="titlem"
        style={{ fontSize: "3rem", color: "#66f6f1", marginBottom: "10px" }}
      >
        Sign In
      </h2>
      <div
        className="input-field"
        style={{
          maxWidth: "380px",
          width: "100%",
          backgroundColor: "#f0f0f0",
          margin: "10px 0",
          height: "55px",
          borderRadius: "55px",
          display: "grid",
          gridTemplateColumns: "15% 85%",
          padding: "0 0.4rem",
          position: "relative",
        }}
      >
        <i className="fas fa-envelope"></i>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            border: "none",
            outline: "none",
            backgroundColor: "transparent",
            width: "100%",
            fontSize: "1.2rem",
            paddingLeft: "0.8rem",
          }}
        />
      </div>
      <div
        className="input-field"
        style={{
          maxWidth: "380px",
          width: "100%",
          backgroundColor: "#f0f0f0",
          margin: "10px 0",
          height: "55px",
          borderRadius: "55px",
          display: "grid",
          gridTemplateColumns: "15% 85%",
          padding: "0 0.4rem",
          position: "relative",
        }}
      >
        <i className="fas fa-lock"></i>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            border: "none",
            outline: "none",
            backgroundColor: "transparent",
            width: "100%",
            fontSize: "1.2rem",
            paddingLeft: "0.8rem",
          }}
        />
      </div>
      <input
        type="submit"
        value="Login"
        className="btnm solid"
        style={{
          width: "150px",
          background: "transparent",
          border: "none",
          outline: "none",
          height: "49px",
          borderRadius: "49px",
          color: "#fff",
          textTransform: "uppercase",
          fontWeight: "600",
          margin: "10px 0",
          cursor: "pointer",
          transition: "background-color 0.5s, color 0.5s",
          borderColor: "#66f6f1",
        }}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = "#66f6f1";
          e.target.style.color = "#1f2233";
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = "transparent";
          e.target.style.color = "#fff";
        }}
      />
    </form>
  );
};

const SignUpForm = ({ switchMode, navigate }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5001/api/users/register",
        {
          username,
          email,
          password,
        }
      );
      console.log("Signup successful", response.data);
      // Handle successful signup, e.g., redirect to login or home
      try {
        const response = await axios.post(
          "http://localhost:5001/api/users/login",
          {
            email,
            password,
          }
        );
        const token  = response.data.accessToken;
        localStorage.setItem("authToken", token);
        localStorage.setItem("email",email);
        // console.log("Login successful", response.data);
        //  console.log(email);
        // Handle successful login, e.g., save token, redirect
        navigate("/home");
      } catch (error) {
        alert("Login failed : Check email or password", error);
        console.error("Login failed:", error.response?.data || error.message);
      }
      navigate("/home");
    } catch (error) {
      alert(error.message);
      console.error("Signup failed:", error.response?.data || error.message);
    }
  };

  return (
    <form onSubmit={handleSignup} className="sign-up-form">
      <h2
        className="titlem"
        style={{ fontSize: "3rem", color: "#2959a6", marginBottom: "10px" }}
      >
        Create Account
      </h2>

      <div
        className="input-field"
        style={{
          maxWidth: "380px",
          width: "100%",
          backgroundColor: "#f0f0f0",
          margin: "10px 0",
          height: "55px",
          borderRadius: "55px",
          display: "grid",
          gridTemplateColumns: "15% 85%",
          padding: "0 0.4rem",
          position: "relative",
        }}
      >
        <i className="fas fa-user"></i>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            border: "none",
            outline: "none",
            backgroundColor: "transparent",
            width: "100%",
            fontSize: "1.2rem",
            paddingLeft: "0.8rem",
          }}
        />
      </div>
      <div
        className="input-field"
        style={{
          maxWidth: "380px",
          width: "100%",
          backgroundColor: "#f0f0f0",
          margin: "10px 0",
          height: "55px",
          borderRadius: "55px",
          display: "grid",
          gridTemplateColumns: "15% 85%",
          padding: "0 0.4rem",
          position: "relative",
        }}
      >
        <i className="fas fa-envelope"></i>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            border: "none",
            outline: "none",
            backgroundColor: "transparent",
            width: "100%",
            fontSize: "1.2rem",
            paddingLeft: "0.8rem",
          }}
        />
      </div>

      <div
        className="input-field"
        style={{
          maxWidth: "380px",
          width: "100%",
          backgroundColor: "#f0f0f0",
          margin: "10px 0",
          height: "55px",
          borderRadius: "55px",
          display: "grid",
          gridTemplateColumns: "15% 85%",
          padding: "0 0.4rem",
          position: "relative",
        }}
      >
        <i className="fas fa-lock"></i>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            border: "none",
            outline: "none",
            backgroundColor: "transparent",
            width: "100%",
            fontSize: "1.2rem",
            paddingLeft: "0.8rem",
          }}
        />
      </div>
      <input
        type="submit"
        className="btnm"
        value="Sign up"
        style={{
          width: "150px",
          background: "transparent",
          border: "none",
          outline: "none",
          height: "49px",
          borderRadius: "49px",
          color: "#fff",
          textTransform: "uppercase",
          fontWeight: "600",
          margin: "10px 0",
          cursor: "pointer",
          transition: "background-color 0.5s, color 0.5s",
          borderColor: "#66f6f1",
        }}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = "#66f6f1";
          e.target.style.color = "#1f2233";
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = "transparent";
          e.target.style.color = "#fff";
        }}
      />
    </form>
  );
};

export default Authform;
