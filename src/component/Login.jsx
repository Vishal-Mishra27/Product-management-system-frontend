// import React, { useState, useEffect } from "react";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import Dashboard from "../component/Dashbord";

// const Login = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [showWelcome, setShowWelcome] = useState(false);
//   const [countdown, setCountdown] = useState(3);
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [errors, setErrors] = useState({});
//   const [snackbar, setSnackbar] = useState({ open: false, message: "", type: "" });

//   useEffect(() => {
//     if (showWelcome) {
//       const timer = setInterval(() => {
//         setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
//       }, 1000);
//       setTimeout(() => {
//         setShowWelcome(false);
//         clearInterval(timer);
//       }, 3000);
//       return () => clearInterval(timer);
//     }
//   }, [showWelcome]);

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.email) newErrors.email = "Email is required";
//     else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
//     if (!formData.password) newErrors.password = "Password is required";
//     else if (formData.password.length < 6) newErrors.password = "At least 6 characters";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;
//     setLoading(true);
//     try {
//       await new Promise((resolve) => setTimeout(resolve, 1500));
//       setIsAuthenticated(true);
//       setShowWelcome(true);
//     } catch (error) {
//       setSnackbar({ open: true, message: "Authentication failed!", type: "error" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (showWelcome) {
//     return (<>
//    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
//         <div className="flex space-x-2 text-4xl font-bold">
//           {"Welcome to Dashboard".split("").map((char, index) => (
//             <span key={index} className="drop-animation" style={{ animationDelay: `${index * 0.1}s` }}>
//               {char}
//             </span>
//           ))}
//         </div>
//         <p className="text-lg mt-4 animate-pulse">Redirecting in {countdown} seconds...</p>
//       </div>
//     </>
   
//     );
//   }

//   if (isAuthenticated) {
//      return( 
//     <Dashboard/>)
//   }


//   return (
//     <div className="flex items-center justify-center min-h-screen bg-cover bg-center relative" style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?technology')" }}>
//       {/* Blur Overlay */}
//       <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md"></div>

//       <div className="relative bg-white/20 backdrop-blur-lg p-8 rounded-2xl shadow-lg w-96 max-w-full border border-white/30">
//         <h2 className="text-3xl font-semibold text-center text-white mb-6">Login</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Email Field */}
//           <div>
//             <label className="block font-medium text-white">Email</label>
//             <input
//               type="email"
//               className={`w-full px-3 py-2 border rounded-lg bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300 ${
//                 errors.email ? "border-red-500" : "border-gray-300"
//               }`}
//               placeholder="Enter your email"
//               value={formData.email}
//               onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//             />
//             {errors.email && <p className="text-red-300 text-sm">{errors.email}</p>}
//           </div>

//           {/* Password Field */}
//           <div>
//             <label className="block font-medium text-white">Password</label>
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 className={`w-full px-3 py-2 border rounded-lg bg-white/20 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300 ${
//                   errors.password ? "border-red-500" : "border-gray-300"
//                 }`}
//                 placeholder="Enter your password"
//                 value={formData.password}
//                 onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//               />
//               <button
//                 type="button"
//                 className="absolute right-3 top-2 text-gray-200"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//               </button>
//             </div>
//             {errors.password && <p className="text-red-300 text-sm">{errors.password}</p>}
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
//             disabled={loading}
//           >
//             {loading ? "Signing in..." : "Sign In"}
//           </button>
//         </form>
//       </div>

//       {/* Snackbar Notification */}
//       {snackbar.open && (
//         <div
//           className={`fixed bottom-5 left-1/2 transform -translate-x-1/2 p-3 rounded-md text-white ${
//             snackbar.type === "error" ? "bg-red-500" : "bg-blue-500"
//           }`}
//         >
//           {snackbar.message}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Login;

import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
    const navigate = useNavigate();

 const handleInputChange = (e) => {
   let { name, value } = e.target;

   if (name === "password") {
     value = value.replace(/\D/g, ""); // Remove non-numeric characters
     value = value ? Number(value) : ""; // Convert to number if not empty
   }

   setLoginData({ ...loginData, [name]: value });
 };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Logging in...");
      console.log("loginData: ", loginData);

      // ✅ Proper Axios request
      const res = await axios.post(
        "http://localhost:3000/signup/getLogin",
        loginData
      );
      const data = res.data; // Axios automatically parses JSON

      console.log("userRegister", data);

    navigate("/dashboard");
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="w-full max-w-sm p-6 bg-gray-200 rounded-lg shadow-md">
        <h1 className="mb-6 text-2xl font-semibold text-center text-black">
          Login Page
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-black">Email:</label>
            <input
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-black">Password:</label>
            <input
              type="password" // Keep it as "password" for security
              name="password"
              value={loginData.password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              placeholder="Enter your password"
              inputMode="numeric" // Suggests numeric keyboard on mobile
              pattern="[0-9]*" // Ensures only numbers are entered
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-4 text-white bg-blue-500 rounded-lg cursor-pointer hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;