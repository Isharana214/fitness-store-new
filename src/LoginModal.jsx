import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { auth, provider } from './firebase.jsx'; 
import { 
  signInWithPopup, 
  sendPasswordResetEmail, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from "firebase/auth";

const LoginModal = ({ onClose, setUser }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ 
    fullName: "", phone: "", email: "", password: "", confirmPassword: "" 
  });
const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Google Login Logic
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      alert("Login Successful!");
      onClose();
    } catch (error) {
      alert("Google login failed: " + error.message);
    }
  };

  // Forgot Password Logic
  const handleForgotPassword = async () => {
    if (!formData.email) {
      alert("Please enter your email address to reset password!");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, formData.email);
      alert("Password reset email sent! Check your inbox.");
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  // Email/Password Logic (Firebase)
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (isLogin) {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      setUser(userCredential.user);
      alert("Login Successful! Welcome back.");
      onClose();

    } else {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      alert("Account created successfully!");
      setIsLogin(true);
    }

  } catch (error) {
    console.log(error);

    if (error.code === "auth/email-already-in-use") {
      alert("This email is already registered.");
    } else if (error.code === "auth/invalid-credential") {
      alert("Incorrect email or password.");
    } else {
      alert(error.message);
    }
  }
};

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <button onClick={onClose} style={closeButtonStyle}></button>
        <h1 style={{ color: "#ff5a1f" }}>{isLogin ? "Login" : "Sign Up"}</h1>
        
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {!isLogin && (
            <>
              <input name="fullName" type="text" placeholder="Full Name" onChange={handleInputChange} style={inputStyle} required />
              <input name="phone" type="tel" placeholder="Phone Number" onChange={handleInputChange} style={inputStyle} required />
            </>
          )}
          <input name="email" type="email" placeholder="Email Address" onChange={handleInputChange} style={inputStyle} required />
          <div style={{ position: "relative" }}>
  <input
    name="password"
    type={showPassword ? "text" : "password"}
    placeholder="Password"
    onChange={handleInputChange}
    style={inputStyle}
    required
  />

  <span
    onClick={() => setShowPassword(!showPassword)}
    style={{
      position: "absolute",
      right: "12px",
      top: "50%",
      transform: "translateY(-50%)",
      cursor: "pointer",
      color: "#aaa",
    }}
  >
    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
  </span>
</div>
          
          {isLogin && (
            <p style={{ fontSize: "12px", color: "#aaa", textAlign: "right", cursor: "pointer", margin: "0" }} onClick={handleForgotPassword}>
              Forgot Password?
            </p>
          )}

         {!isLogin && (
  <div style={{ position: "relative" }}>
    <input
      name="confirmPassword"
      type={showConfirmPassword ? "text" : "password"}
      placeholder="Confirm Password"
      onChange={handleInputChange}
      style={inputStyle}
      required
    />

    <span
      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
      style={{
        position: "absolute",
        right: "12px",
        top: "50%",
        transform: "translateY(-50%)",
        cursor: "pointer",
        color: "#aaa",
      }}
    >
      {showConfirmPassword ? (
        <EyeOff size={20} />
      ) : (
        <Eye size={20} />
      )}
    </span>
  </div>
)}
          
          <button type="submit" style={buttonStyle}>{isLogin ? "Login" : "Sign Up"}</button>
        </form>

        <div style={{ margin: "15px 0", color: "#888" }}>OR</div>
        
        <button onClick={handleGoogleLogin} style={googleButtonStyle}>
          Continue with Google
        </button>

        <p style={toggleTextStyle} onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span style={{ color: "#ff5a1f", fontWeight: "bold", cursor: "pointer" }}>{isLogin ? "Sign Up" : "Login"}</span>
        </p>
      </div>
    </div>
  );
};

// Styles
const overlayStyle = { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.85)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 };
const modalStyle = { width: "360px", background: "#1a1a1a", padding: "30px", borderRadius: "20px", color: "white", textAlign: "center", position: "relative" };
const inputStyle = { width: "100%", padding: "12px", background: "#252525", border: "1px solid #444", borderRadius: "10px", color: "white", boxSizing: "border-box" };
const buttonStyle = { width: "100%", padding: "12px", background: "#ff5a1f", border: "none", borderRadius: "10px", color: "white", cursor: "pointer", fontWeight: "bold", fontSize: "16px" };
const googleButtonStyle = { width: "100%", padding: "12px", background: "#fff", border: "none", borderRadius: "10px", color: "#000", cursor: "pointer", fontWeight: "bold", fontSize: "16px", marginTop: "5px" };
const closeButtonStyle = { position: "absolute", top: "15px", right: "20px", background: "none", border: "none", color: "#fff", cursor: "pointer", fontSize: "20px" };
const toggleTextStyle = { cursor: "pointer", fontSize: "14px", color: "#888", marginTop: "15px" };

export default LoginModal;