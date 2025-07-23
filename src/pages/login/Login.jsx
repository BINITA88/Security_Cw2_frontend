import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import blog2 from "../../asset/imgg/blog2.png";
import "./Login.css";
import { Toaster, toast } from "react-hot-toast";
import {
  forgotPasswordApi,
  verifyOtpAndResetPasswordApi,
  getUserByGoogleEmail,
  googleLoginApi,
  loginUserApi,
  verifyMfaCodeApi,
  refreshTokenApi,
} from "../../apis/Api";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import ReCAPTCHA from "react-google-recaptcha";
import validator from "validator";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [googleToken, setGoogleToken] = useState("");
  const [googleId, setGoogleId] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [userId, setUserId] = useState("");
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [resetPasswordOtp, setResetPasswordOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);

  const showBlockToast = () => {
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } max-w-md w-full bg-[#cf5c14] text-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 p-4`}
      >
        <div className="flex-1 w-0">
          <p className="text-sm font-medium">Too Many Failed Attempts</p>
          <p className="mt-1 text-sm">You are blocked for 10 minutes.</p>
        </div>
        <div className="ml-4 flex-shrink-0 flex">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="text-white font-bold hover:text-gray-100"
          >
            OK
          </button>
        </div>
      </div>
    ));
  };

  const checkTokenExpiry = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
      } else {
        const timeUntilExpiry = (decoded.exp - currentTime) * 1000;
        if (timeUntilExpiry < 5 * 60 * 1000) {
          refreshToken();
        }
      }
    }
  };

  const refreshToken = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      try {
        const response = await refreshTokenApi(user.id);
        if (response.success) {
          localStorage.setItem("token", response.token);
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          window.location.href = "/login";
        }
      } catch (error) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
    }
  };

  useEffect(() => {
    if (failedAttempts >= 3) {
      setIsBlocked(true);
      showBlockToast();
      const timer = setTimeout(() => {
        setIsBlocked(false);
        setFailedAttempts(0);
      }, 10 * 60 * 1000); 
      return () => clearTimeout(timer);
    }
  }, [failedAttempts]);

  useEffect(() => {
    const interval = setInterval(checkTokenExpiry, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const validateForm = () => {
    let isValid = true;
    const sanitizedEmail = validator.normalizeEmail(email.trim());
    if (!sanitizedEmail || !validator.isEmail(sanitizedEmail)) {
      setEmailError("Invalid email address");
      isValid = false;
    } else {
      setEmailError("");
    }

    const sanitizedPassword = password.trim();
    if (!sanitizedPassword) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (sanitizedPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (isBlocked) {
      showBlockToast();
      return;
    }

    if (!validateForm()) {
      setFailedAttempts((prev) => prev + 1);
      return;
    }

    const data = {
      email: validator.normalizeEmail(email.trim()),
      password: password.trim(),
      captchaToken: captchaToken,
    };

    loginUserApi(data)
      .then((res) => {
        if (res.data.success) {
          toast.success("OTP is required. Please enter the OTP sent to your email.");
          setUserId(res.data.userId);
          setShowOtpModal(true);
        } else {
          toast.error(res.data.message || "Failed to login. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setFailedAttempts((prev) => prev + 1);
        showBlockToast();
      });
  };

  const handleVerifyOtp = () => {
    const sanitizedOtp = validator.escape(otp.trim());
    if (!sanitizedOtp) {
      toast.error("OTP is required");
      return;
    }

    const data = { userId, otp: sanitizedOtp };

    verifyMfaCodeApi(data)
      .then((res) => {
        if (res.data.success) {
          toast.success("OTP Verified Successfully");
          setShowOtpModal(false);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          if (res.data.user.isAdmin) {
            window.location.href = "/admin/dashboard";
          } else {
            window.location.href = "/profile";
          }
        } else {
          toast.error(res.data.message || "Failed to verify OTP");
        }
      })
      .catch((error) => {
        console.error("Error verifying OTP:", error);
        toast.error("Error verifying OTP");
      });
  };

  const handleGoogleLogin = () => {
    googleLoginApi({ token: googleToken, googleId, password })
      .then((response) => {
        if (response.status === 201) {
          toast.success("Login Successful");
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          window.location.href = "/profile";
        } else {
          console.error("Failed to send token to backend");
        }
      })
      .catch((error) => console.error("Error sending token to backend:", error));
  };

  const handleForgotPassword = () => {
    setShowForgotPasswordModal(true);
  };

  const handleSendOtp = () => {
    const sanitizedPhoneNumber = validator.escape(phoneNumber.trim());
    if (!sanitizedPhoneNumber || !validator.isMobilePhone(sanitizedPhoneNumber, "en-IN")) {
      toast.error("Invalid phone number (10 digits required)");
      return;
    }

    forgotPasswordApi({ phoneNumber: sanitizedPhoneNumber })
      .then((res) => {
        if (res.data.success) {
          toast.success("OTP sent successfully to your phone!");
          setShowForgotPasswordModal(false);
          setShowResetPasswordModal(true);
        } else {
          toast.error(res.data.message || "Failed to send OTP.");
        }
      })
      .catch((error) => {
        console.error("Error sending OTP:", error);
        toast.error("Failed to send OTP. Please try again.");
      });
  };

  const handleResetPassword = () => {
    if (isBlocked) {
      showBlockToast();
      return;
    }

    const sanitizedOtp = validator.escape(resetPasswordOtp.trim());
    const sanitizedNewPassword = newPassword.trim();

    if (!sanitizedOtp || !sanitizedNewPassword) {
      toast.error("Please enter OTP and new password.");
      return;
    }

    if (sanitizedNewPassword.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    verifyOtpAndResetPasswordApi({
      phoneNumber: validator.escape(phoneNumber.trim()),
      otp: sanitizedOtp,
      password: sanitizedNewPassword,
    })
      .then((res) => {
        if (res.data.success) {
          toast.success("Password reset successfully!");
          setShowResetPasswordModal(false);
          setFailedAttempts(0);
        } else {
          setFailedAttempts((prev) => prev + 1);
          showBlockToast();
        }
      })
      .catch((error) => {
        console.error("Error resetting password:", error);
        setFailedAttempts((prev) => prev + 1);
        showBlockToast();
      });
  };


  // return (
  //   <div className="login-container">
  //     <Toaster />
  //     <div className="login-box">
  //       <div className="login-form">
  //         <h2 className="login-title">Login</h2>
  //         <p className="login-subtitle">Please Login to Continue</p>

  //         <form onSubmit={handleLogin} className="login-fields">
  //           <div className="input-group">
  //             <input
  //               className="login-input"
  //               type="text"
  //               name="email"
  //               placeholder="Email"
  //               value={email}
  //               onChange={(e) => setEmail(e.target.value)}
  //             />
  //             {emailError && <p className="login-error">{emailError}</p>}
  //           </div>
  //           <div className="input-group">
  //             <input
  //               className="login-input"
  //               type="password"
  //               name="password"
  //               placeholder="Password"
  //               value={password}
  //               onChange={(e) => setPassword(e.target.value)}
  //             />
  //             {passwordError && <p className="login-error">{passwordError}</p>}
  //           </div>

  //           <div className="flex justify-center mb-4">
  //             <ReCAPTCHA
  //               sitekey="6LeEPLwqAAAAADqgg1ftjO4z6r14-GavrPGQLpwT"
  //               onChange={setCaptchaToken}
  //               theme="light"
  //             />
  //           </div>

  //           <button type="submit" className="login-button">
  //             Login
  //           </button>
  //         </form>

         
  //         <div className="register-link">
  //           <p>
  //             Don't have an account?{" "}
  //             <Link to="/register" className="text-blue-600 hover:underline">
  //               Register
  //             </Link>
  //           </p>
  //         </div>

  //         <div className="forgot-password-link">
  //           <p>
  //             <button
  //               onClick={handleForgotPassword}
  //               className="text-blue-600 hover:underline"
  //             >
  //               Forgot Password?
  //             </button>
  //           </p>
  //         </div>
  //       </div>

  //       <div className="login-image">
  //         <img src={blog2} alt="Login" />
  //       </div>
  //     </div>

  //     {/* OTP Modal */}
  //     {showOtpModal && (
  //       <div className="otp-modal">
  //         <div className="otp-modal-content">
  //           <h3>Enter OTP</h3>
  //           <input
  //             type="text"
  //             placeholder="Enter OTP"
  //             value={otp}
  //             onChange={(e) => setOtp(e.target.value)}
  //             className="otp-input"
  //           />
  //           <div className="otp-modal-buttons">
  //             <button onClick={handleVerifyOtp} className="otp-verify-button">
  //               Verify OTP
  //             </button>
  //             <button
  //               onClick={() => setShowOtpModal(false)}
  //               className="otp-cancel-button"
  //             >
  //               Cancel
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //     )}

  //     {/* Forgot Password Modal */}
  //     {showForgotPasswordModal && (
  //       <div className="otp-modal">
  //         <div className="otp-modal-content">
  //           <h3>Forgot Password</h3>
  //           <input
  //             type="text"
  //             placeholder="Enter Phone Number"
  //             value={phoneNumber}
  //             onChange={(e) => setPhoneNumber(e.target.value)}
  //             className="otp-input"
  //           />
  //           <div className="otp-modal-buttons">
  //             <button onClick={handleSendOtp} className="otp-verify-button">
  //               Send OTP
  //             </button>
  //             <button
  //               onClick={() => setShowForgotPasswordModal(false)}
  //               className="otp-cancel-button"
  //             >
  //               Cancel
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //     )}

  //     {/* Reset Password Modal */}
  //     {showResetPasswordModal && (
  //       <div className="otp-modal">
  //         <div className="otp-modal-content">
  //           <h3>Reset Password</h3>
  //           <input
  //             type="text"
  //             placeholder="Enter OTP"
  //             value={resetPasswordOtp}
  //             onChange={(e) => setResetPasswordOtp(e.target.value)}
  //             className="otp-input"
  //           />
  //           <input
  //             type="password"
  //             placeholder="Enter New Password"
  //             value={newPassword}
  //             onChange={(e) => setNewPassword(e.target.value)}
  //             className="otp-input"
  //           />
  //           <div className="otp-modal-buttons">
  //             <button
  //               onClick={handleResetPassword}
  //               className="otp-verify-button"
  //             >
  //               Reset Password
  //             </button>
  //             <button
  //               onClick={() => setShowResetPasswordModal(false)}
  //               className="otp-cancel-button"
  //             >
  //               Cancel
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //     )}
  //   </div>
  // );
return (
  <div className="min-h-screen flex items-center justify-center bg-[#fffaf5] text-[#5a3210]">
    <Toaster />
    <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-4xl flex flex-col md:flex-row gap-8">
      {/* Left: Form */}
      <div className="flex-1">
        <h2 className="text-3xl font-bold mb-2">Login</h2>
        <p className="text-sm text-gray-500 mb-6">Please login to continue</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-[#d3b79c] rounded-md"
            />
            {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-[#d3b79c] rounded-md"
            />
            {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
          </div>

          <div className="flex justify-center">
            <ReCAPTCHA
              sitekey="6LeEPLwqAAAAADqgg1ftjO4z6r14-GavrPGQLpwT"
              onChange={setCaptchaToken}
              theme="light"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#cf5c14] hover:bg-[#b74f10] text-white font-semibold py-3 rounded-md shadow"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-sm">
          <p>
            Don’t have an account?{' '}
            <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
          </p>
          <p className="mt-2">
            <button
              onClick={handleForgotPassword}
              className="text-blue-600 hover:underline"
            >
              Forgot Password?
            </button>
          </p>
        </div>
      </div>

      {/* Right: Image */}
      <div className="hidden md:block flex-1">
        <img
          src={blog2}
          alt="Login"
          className="rounded-lg w-full h-full object-cover"
        />
      </div>

      {/* OTP Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
            <h3 className="text-lg font-semibold mb-4">Enter OTP</h3>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-2 border border-[#d3b79c] rounded-md mb-4"
            />
            <div className="flex justify-between">
              <button onClick={handleVerifyOtp} className="bg-[#cf5c14] text-white px-4 py-2 rounded-md">
                Verify OTP
              </button>
              <button onClick={() => setShowOtpModal(false)} className="text-gray-500">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Forgot Password Modal */}
      {showForgotPasswordModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
            <h3 className="text-lg font-semibold mb-4">Forgot Password</h3>
            <input
              type="text"
              placeholder="Enter Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full p-2 border border-[#d3b79c] rounded-md mb-4"
            />
            <div className="flex justify-between">
              <button onClick={handleSendOtp} className="bg-[#cf5c14] text-white px-4 py-2 rounded-md">
                Send OTP
              </button>
              <button onClick={() => setShowForgotPasswordModal(false)} className="text-gray-500">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Password Modal */}
      {showResetPasswordModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
            <h3 className="text-lg font-semibold mb-4">Reset Password</h3>
            <input
              type="text"
              placeholder="Enter OTP"
              value={resetPasswordOtp}
              onChange={(e) => setResetPasswordOtp(e.target.value)}
              className="w-full p-2 border border-[#d3b79c] rounded-md mb-4"
            />
            <input
              type="password"
              placeholder="Enter New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2 border border-[#d3b79c] rounded-md mb-4"
            />
            <div className="flex justify-between">
              <button onClick={handleResetPassword} className="bg-[#cf5c14] text-white px-4 py-2 rounded-md">
                Reset Password
              </button>
              <button onClick={() => setShowResetPasswordModal(false)} className="text-gray-500">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
);

};

export default Login;
