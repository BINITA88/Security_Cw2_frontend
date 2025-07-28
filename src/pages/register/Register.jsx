// import React, { useState } from "react";
// import contactus from "../../asset/imgg/contactus.png";
// import "./Register.css";
// import { Link } from "react-router-dom";
// import { Toaster, toast } from "react-hot-toast";
// import { registerUserApi, verifyRegistrationOtpApi } from "../../apis/Api";
// import validator from "validator";

// function Register() {
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [userName, setUsername] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [otp, setOtp] = useState("");
//   const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);

//   const [firstNameError, setFirstNameError] = useState("");
//   const [lastNameError, setLastNameError] = useState("");
//   const [usernameError, setUsernameError] = useState("");
//   const [phoneNumberError, setPhoneNumberError] = useState("");
//   const [emailError, setEmailError] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const [confirmPasswordError, setConfirmPasswordError] = useState("");

//   const [failedAttempts, setFailedAttempts] = useState(0);
//   const [isBlocked, setIsBlocked] = useState(false);

//   // Password validation function
//   const validatePassword = (password) => {
//     const passwordRegex =
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
//     return passwordRegex.test(password);
//   };

//   const validateForm = () => {
//     let isValid = true;

//     // Sanitize inputs
//     const sanitizedFirstName = validator.escape(firstName.trim());
//     const sanitizedLastName = validator.escape(lastName.trim());
//     const sanitizedUsername = validator.escape(userName.trim());
//     const sanitizedPhoneNumber = validator.escape(phoneNumber.trim());
//     const sanitizedEmail = validator.normalizeEmail(email.trim());
//     const sanitizedPassword = password.trim();
//     const sanitizedConfirmPassword = confirmPassword.trim();

//     // Validate First Name
//     if (!sanitizedFirstName) {
//       setFirstNameError("First Name is required");
//       isValid = false;
//     } else {
//       setFirstNameError("");
//     }

//     // Validate Last Name
//     if (!sanitizedLastName) {
//       setLastNameError("Last Name is required");
//       isValid = false;
//     } else {
//       setLastNameError("");
//     }

//     // Validate Username
//     if (!sanitizedUsername) {
//       setUsernameError("Username is required");
//       isValid = false;
//     } else {
//       setUsernameError("");
//     }

//     // Validate Phone Number
//     if (
//       !sanitizedPhoneNumber ||
//       !validator.isMobilePhone(sanitizedPhoneNumber, "en-IN")
//     ) {
//       setPhoneNumberError("Invalid Phone Number (10 digits required)");
//       isValid = false;
//     } else {
//       setPhoneNumberError("");
//     }

//     // Validate Email
//     if (!sanitizedEmail || !validator.isEmail(sanitizedEmail)) {
//       setEmailError("Invalid Email Address");
//       isValid = false;
//     } else {
//       setEmailError("");
//     }

//     // Validate Password
//     if (!sanitizedPassword) {
//       setPasswordError("Password is required");
//       isValid = false;
//     } else if (!validatePassword(sanitizedPassword)) {
//       setPasswordError(
//         "Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number, 1 special character, and be at least 6 characters long"
//       );
//       isValid = false;
//     } else {
//       setPasswordError("");
//     }

//     // Validate Confirm Password
//     if (!sanitizedConfirmPassword) {
//       setConfirmPasswordError("Confirm Password is required");
//       isValid = false;
//     } else if (sanitizedPassword !== sanitizedConfirmPassword) {
//       setConfirmPasswordError("Passwords do not match");
//       isValid = false;
//     } else {
//       setConfirmPasswordError("");
//     }

//     return isValid;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Check if user is blocked
//     if (isBlocked) {
//       toast.error(
//         "You are blocked for 15 minutes due to too many failed attempts."
//       );
//       return;
//     }

//     // Validation
//     if (!validateForm()) {
//       setFailedAttempts((prev) => prev + 1);
//       if (failedAttempts >= 3) {
//         setIsBlocked(true);
//         setTimeout(() => setIsBlocked(false), 15 * 60 * 1000); // Block for 15 minutes
//       }
//       return;
//     }

//     // Prepare data for API call
//     const data = {
//       firstName: validator.escape(firstName.trim()),
//       lastName: validator.escape(lastName.trim()),
//       userName: validator.escape(userName.trim()),
//       phoneNumber: validator.escape(phoneNumber.trim()),
//       email: validator.normalizeEmail(email.trim()),
//       password: password.trim(),
//     };

//     // Make API call
//     registerUserApi(data)
//       .then((response) => {
//         if (response.data.success) {
//           toast.success(response.data.message);
//           setIsOtpModalOpen(true); // Open OTP modal
//         } else {
//           toast.error(response.data.message);
//         }
//       })
//       .catch(() => {
//         toast.error("Registration failed. Please try again.");
//       });
//   };

//   const handleOtpVerification = () => {
//     const data = {
//       email: validator.normalizeEmail(email.trim()),
//       otp,
//       password,
//     };

//     verifyRegistrationOtpApi(data)
//       .then((response) => {
//         if (response.data.success) {
//           toast.success(response.data.message);
//           setIsOtpModalOpen(false); // Close OTP modal
//         } else {
//           toast.error(response.data.message);
//         }
//       })
//       .catch(() => {
//         toast.error("OTP verification failed. Please try again.");
//       });
//   };

// //   return (
// //     <div className="register-container">
// //       <Toaster />
// //       <div className="register-box">
// //         <div className="register-form">
// // <h2 className="register-title ">Register Now</h2>
          

// //           <form onSubmit={handleSubmit} className="register-fields">
// //             <div className="input-container">
// //               <input
// //                 className="register-input"
// //                 type="text"
// //                 name="firstname"
// //                 placeholder="First Name"
// //                 value={firstName}
// //                 onChange={(e) => setFirstName(e.target.value)}
// //               />
// //               {firstNameError && (
// //                 <p className="error-message">{firstNameError}</p>
// //               )}
// //             </div>
// //             <div className="input-container">
// //               <input
// //                 className="register-input"
// //                 type="text"
// //                 name="lastname"
// //                 placeholder="Last Name"
// //                 value={lastName}
// //                 onChange={(e) => setLastName(e.target.value)}
// //               />
// //               {lastNameError && (
// //                 <p className="error-message">{lastNameError}</p>
// //               )}
// //             </div>
// //             <div className="input-container">
// //               <input
// //                 className="register-input"
// //                 type="text"
// //                 name="username"
// //                 placeholder="Username"
// //                 value={userName}
// //                 onChange={(e) => setUsername(e.target.value)}
// //               />
// //               {usernameError && (
// //                 <p className="error-message">{usernameError}</p>
// //               )}
// //             </div>
// //             <div className="input-container">
// //               <input
// //                 className="register-input"
// //                 type="email"
// //                 name="email"
// //                 placeholder="Email"
// //                 value={email}
// //                 onChange={(e) => setEmail(e.target.value)}
// //               />
// //               {emailError && <p className="error-message">{emailError}</p>}
// //             </div>
// //             <div className="input-container">
// //               <input
// //                 className="register-input"
// //                 type="phone"
// //                 name="phone"
// //                 placeholder="Phone Number"
// //                 value={phoneNumber}
// //                 onChange={(e) => setPhoneNumber(e.target.value)}
// //               />
// //               {phoneNumberError && (
// //                 <p className="error-message">{phoneNumberError}</p>
// //               )}
// //             </div>
// //             <div className="input-container">
// //               <input
// //                 className="register-input"
// //                 type="password"
// //                 name="password"
// //                 placeholder="Password"
// //                 value={password}
// //                 onChange={(e) => setPassword(e.target.value)}
// //               />
// //               {passwordError && (
// //                 <p className="error-message">{passwordError}</p>
// //               )}
// //             </div>
// //             <div className="input-container">
// //               <input
// //                 className="register-input"
// //                 type="password"
// //                 name="confirm-password"
// //                 placeholder="Confirm Password"
// //                 value={confirmPassword}
// //                 onChange={(e) => setConfirmPassword(e.target.value)}
// //               />
// //               {confirmPasswordError && (
// //                 <p className="error-message">{confirmPasswordError}</p>
// //               )}
// //             </div>
// //             <button type="submit" className="register-button">
// //               Register
// //             </button>
// //           </form>

// //           <div className="login-link">
// //             <p>
// //               Already have an account?{" "}
// //               <Link to="/login" className="text-blue-600 hover:underline">
// //                 Login
// //               </Link>
// //             </p>
// //           </div>
// //         </div>

// //         <div className="register-image">
// //           <img src={contactus} alt="Register" />
// //         </div>
// //       </div>
// //       {/* OTP Modal */}
// //       {isOtpModalOpen && (
// //         <div className="otp-modal">
// //           <div className="otp-modal-content">
// //             <h3>Verify Your OTP</h3>
// //             <input
// //               type="text"
// //               placeholder="Enter OTP"
// //               value={otp}
// //               onChange={(e) => setOtp(e.target.value)}
// //               className="register-input"
// //             />
// //             <button onClick={handleOtpVerification} className="register-button">
// //               Verify OTP
// //             </button>
// //             <button
// //               onClick={() => setIsOtpModalOpen(false)}
// //               className="register-button cancel-button"
// //             >
// //               Cancel
// //             </button>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// return (
//   <div className="min-h-screen flex items-center justify-center bg-[#fffaf5] text-[#5a3210]">
//     <Toaster />
//     <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-5xl flex flex-col md:flex-row gap-8">
//       {/* Left: Form */}
//       <div className="flex-1">
//         <h2 className="text-3xl font-bold mb-2">Register Now</h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <input
//               type="text"
//               name="firstname"
//               placeholder="First Name"
//               value={firstName}
//               onChange={(e) => setFirstName(e.target.value)}
//               className="w-full p-3 border border-[#d3b79c] rounded-md"
//             />
//             {firstNameError && <p className="text-red-500 text-sm mt-1">{firstNameError}</p>}
//           </div>

//           <div>
//             <input
//               type="text"
//               name="lastname"
//               placeholder="Last Name"
//               value={lastName}
//               onChange={(e) => setLastName(e.target.value)}
//               className="w-full p-3 border border-[#d3b79c] rounded-md"
//             />
//             {lastNameError && <p className="text-red-500 text-sm mt-1">{lastNameError}</p>}
//           </div>

//           <div>
//             <input
//               type="text"
//               name="username"
//               placeholder="Username"
//               value={userName}
//               onChange={(e) => setUsername(e.target.value)}
//               className="w-full p-3 border border-[#d3b79c] rounded-md"
//             />
//             {usernameError && <p className="text-red-500 text-sm mt-1">{usernameError}</p>}
//           </div>

//           <div>
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full p-3 border border-[#d3b79c] rounded-md"
//             />
//             {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
//           </div>

//           <div>
//             <input
//               type="text"
//               name="phone"
//               placeholder="Phone Number"
//               value={phoneNumber}
//               onChange={(e) => setPhoneNumber(e.target.value)}
//               className="w-full p-3 border border-[#d3b79c] rounded-md"
//             />
//             {phoneNumberError && <p className="text-red-500 text-sm mt-1">{phoneNumberError}</p>}
//           </div>

//           <div>
//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full p-3 border border-[#d3b79c] rounded-md"
//             />
//             {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
//           </div>

//           <div>
//             <input
//               type="password"
//               name="confirm-password"
//               placeholder="Confirm Password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               className="w-full p-3 border border-[#d3b79c] rounded-md"
//             />
//             {confirmPasswordError && <p className="text-red-500 text-sm mt-1">{confirmPasswordError}</p>}
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-[#cf5c14] hover:bg-[#b74f10] text-white font-semibold py-3 rounded-md shadow"
//           >
//             Register
//           </button>
//         </form>

//         <div className="mt-4 text-sm">
//           <p>
//             Already have an account?{' '}
//             <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
//           </p>
//         </div>
//       </div>

//       {/* Right: Image */}
//       <div className="hidden md:block flex-1">
//         <img
//           src={contactus}
//           alt="Register"
//           className="rounded-lg w-full h-full object-cover"
//         />
//       </div>

//       {/* OTP Modal */}
//       {isOtpModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
//             <h3 className="text-lg font-semibold mb-4">Verify Your OTP</h3>
//             <input
//               type="text"
//               placeholder="Enter OTP"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               className="w-full p-3 border border-[#d3b79c] rounded-md mb-4"
//             />
//             <div className="flex justify-between">
//               <button onClick={handleOtpVerification} className="bg-[#cf5c14] text-white px-4 py-2 rounded-md">
//                 Verify OTP
//               </button>
//               <button onClick={() => setIsOtpModalOpen(false)} className="text-gray-500">
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   </div>
// );

// }

// export default Register;

import React, { useState } from "react";
import contactus from "../../asset/imgg/contactus.png";
import otpImage from "../../asset/imgg/contactus.png";
import "./Register.css";
import { Link } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { registerUserApi, verifyRegistrationOtpApi } from "../../apis/Api";
import validator from "validator";

function Register() {
  const [userName, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpScreen, setIsOtpScreen] = useState(false);

  const [usernameError, setUsernameError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [failedAttempts, setFailedAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);

  const [passwordChecks, setPasswordChecks] = useState({
    length: false,
    upper: false,
    lower: false,
    number: false,
    special: false,
  });

  const handlePasswordChange = (value) => {
    setPassword(value);
    setPasswordChecks({
      length: value.length >= 8,
      upper: /[A-Z]/.test(value),
      lower: /[a-z]/.test(value),
      number: /[0-9]/.test(value),
      special: /[@$!%*?&#]/.test(value),
    });
  };

  const validateForm = () => {
    let isValid = true;
    const sanitizedUsername = validator.escape(userName.trim());
    const sanitizedPhoneNumber = validator.escape(phoneNumber.trim());
    const sanitizedEmail = validator.normalizeEmail(email.trim());
    const sanitizedPassword = password.trim();
    const sanitizedConfirmPassword = confirmPassword.trim();

    if (!sanitizedUsername) {
      setUsernameError("Username is required");
      isValid = false;
    } else {
      setUsernameError("");
    }

    if (!sanitizedPhoneNumber || !validator.isMobilePhone(sanitizedPhoneNumber, "en-IN")) {
      setPhoneNumberError("Invalid Phone Number (10 digits required)");
      isValid = false;
    } else {
      setPhoneNumberError("");
    }

    if (!sanitizedEmail || !validator.isEmail(sanitizedEmail)) {
      setEmailError("Invalid Email Address");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!sanitizedPassword) {
      setPasswordError("Password is required");
      isValid = false;
    } else if (!Object.values(passwordChecks).every(Boolean)) {
      setPasswordError("Password does not meet all requirements");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (!sanitizedConfirmPassword) {
      setConfirmPasswordError("Confirm Password is required");
      isValid = false;
    } else if (sanitizedPassword !== sanitizedConfirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isBlocked) {
      toast.error("You are blocked for 10 minutes due to too many failed attempts.");
      return;
    }

    if (!validateForm()) {
      setFailedAttempts((prev) => prev + 1);
      if (failedAttempts >= 3) {
        setIsBlocked(true);
        setTimeout(() => setIsBlocked(false), 10 * 60 * 1000);
      }
      return;
    }

    const data = {
      userName: validator.escape(userName.trim()),
      phoneNumber: validator.escape(phoneNumber.trim()),
      email: validator.normalizeEmail(email.trim()),
      password: password.trim(),
    };

    registerUserApi(data)
      .then((response) => {
        if (response.data.success) {
          toast.success(response.data.message);
          setIsOtpScreen(true);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch(() => {
        toast.error("Registration failed. Please try again.");
      });
  };

  const handleOtpVerification = () => {
    const data = {
      email: validator.normalizeEmail(email.trim()),
      otp,
      password,
    };

    verifyRegistrationOtpApi(data)
      .then((response) => {
        if (response.data.success) {
          toast.success(response.data.message);
          setIsOtpScreen(false);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch(() => {
        toast.error("OTP verification failed. Please try again.");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fffaf5] text-[#5a3210]">
      <Toaster />
      <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-6xl min-h-[540px] flex flex-col md:flex-row gap-8">
        {!isOtpScreen ? (
          <>
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-2">Register Now</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="username" placeholder="Username" value={userName} onChange={(e) => setUsername(e.target.value)} className="w-full p-3 border border-[#d3b79c] rounded-md" />
                {usernameError && <p className="text-red-500 text-sm">{usernameError}</p>}

                <input type="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 border border-[#d3b79c] rounded-md" />
                {emailError && <p className="text-red-500 text-sm">{emailError}</p>}

                <input type="text" name="phone" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="w-full p-3 border border-[#d3b79c] rounded-md" />
                {phoneNumberError && <p className="text-red-500 text-sm">{phoneNumberError}</p>}

                <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => handlePasswordChange(e.target.value)} className="w-full p-3 border border-[#d3b79c] rounded-md" />
                {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}

                <div className="text-sm space-y-1">
                  <p className={passwordChecks.length ? "text-green-600" : "text-red-500"}>{passwordChecks.length ? "✔" : "✘"} At least 8 characters</p>
                  <p className={passwordChecks.upper ? "text-green-600" : "text-red-500"}>{passwordChecks.upper ? "✔" : "✘"} One uppercase letter</p>
                  <p className={passwordChecks.lower ? "text-green-600" : "text-red-500"}>{passwordChecks.lower ? "✔" : "✘"} One lowercase letter</p>
                  <p className={passwordChecks.number ? "text-green-600" : "text-red-500"}>{passwordChecks.number ? "✔" : "✘"} One number</p>
                  <p className={passwordChecks.special ? "text-green-600" : "text-red-500"}>{passwordChecks.special ? "✔" : "✘"} One special character (@$!%*?&#)</p>
                </div>

                <input type="password" name="confirm-password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full p-3 border border-[#d3b79c] rounded-md" />
                {confirmPasswordError && <p className="text-red-500 text-sm">{confirmPasswordError}</p>}

                <button type="submit" className="w-full bg-[#cf5c14] hover:bg-[#b74f10] text-white font-semibold py-3 rounded-md shadow">Register</button>
              </form>
              <div className="mt-4 text-sm">
                <p>Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link></p>
              </div>
            </div>
            <div className="hidden md:block flex-1">
              <img src={contactus} alt="Register" className="rounded-lg w-full h-full object-cover" />
            </div>
          </>
        ) : (
          <>
            <div className="hidden md:block flex-1">
              <img src={otpImage} alt="OTP Verification" className="rounded-lg w-full h-full object-cover" />
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <h3 className="text-2xl font-semibold mb-4">Verify Your OTP</h3>
              <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} className="w-full p-3 border border-[#d3b79c] rounded-md mb-4" />
              <div className="flex gap-4">
                <button onClick={handleOtpVerification} className="bg-[#cf5c14] text-white px-4 py-2 rounded-md">Verify OTP</button>
                <button onClick={() => setIsOtpScreen(false)} className="text-gray-500">Back</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Register;
