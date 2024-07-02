import React, { useContext, useState } from "react"; // Importing necessary modules from React and other libraries
import { FaRegUser } from "react-icons/fa"; // Importing user icon from react-icons library
import { MdOutlineMailOutline } from "react-icons/md"; // Importing mail icon from react-icons library
import { RiLock2Fill } from "react-icons/ri"; // Importing lock icon from react-icons library
import { FaPencilAlt } from "react-icons/fa"; // Importing pencil icon from react-icons library
import { FaPhoneFlip } from "react-icons/fa6"; // Importing phone icon from react-icons library
import { Link, Navigate } from "react-router-dom"; // Importing Link and Navigate components from react-router-dom
import axios from "axios"; // Importing axios for making HTTP requests
import toast from "react-hot-toast"; // Importing toast for showing notifications
import { Context } from "../../main"; // Importing Context for managing global state

const Register = () => {
  const [email, setEmail] = useState(""); // useState hook to manage email state
  const [name, setName] = useState(""); // useState hook to manage name state
  const [phone, setPhone] = useState(""); // useState hook to manage phone state
  const [password, setPassword] = useState(""); // useState hook to manage password state
  const [role, setRole] = useState(""); // useState hook to manage role state

  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context); // Using useContext hook to access global state

  const handleRegister = async (e) => {
    e.preventDefault(); // Preventing the default form submission behavior
    try {
      const { data } = await axios.post(
        "https://job-backend-xbsw.onrender.com/api/v1/user/register", // API endpoint for registration
        { name, phone, email, role, password }, // Payload containing name, phone, email, role, and password
        {
          headers: {
            "Content-Type": "application/json", // Setting content type header
          },
          withCredentials: true, // Sending cookies with the request
        }
      );
      toast.success(data.message); // Showing success notification
      setName(""); // Clearing name input field
      setEmail(""); // Clearing email input field
      setPassword(""); // Clearing password input field
      setPhone(""); // Clearing phone input field
      setRole(""); // Clearing role input field
      setIsAuthorized(true); // Updating global state to indicate user is authorized
    } catch (error) {
      toast.error(error.response.data.message); // Showing error notification
    }
  };

  if (isAuthorized) {
    return <Navigate to={"/"} />; // Redirecting to home page if user is authorized
  }

  return (
    <>
      <section className="authPage">
        <div className="container">
          <div className="header">
            <img src="/JobZeelogo.png" alt="logo" /> {/* Logo */}
            <h3>Create a new account</h3> {/* Header */}
          </div>
          <form>
            <div className="inputTag">
              <label>Register As</label> {/* Label for role selection */}
              <div>
                <select value={role} onChange={(e) => setRole(e.target.value)}> {/* Dropdown for selecting role */}
                  <option value="">Select Role</option> {/* Default option */}
                  <option value="Employer">Employer</option> {/* Employer option */}
                  <option value="Job Seeker">Job Seeker</option> {/* Job Seeker option */}
                </select>
                <FaRegUser /> {/* User icon */}
              </div>
            </div>
            <div className="inputTag">
              <label>Name</label> {/* Label for name input */}
              <div>
                <input
                  type="text"
                  placeholder="Rishant" // Placeholder text for name input
                  value={name}
                  onChange={(e) => setName(e.target.value)} // Updating name state on input change
                />
                <FaPencilAlt /> {/* Pencil icon */}
              </div>
            </div>
            <div className="inputTag">
              <label>Email Address</label> {/* Label for email input */}
              <div>
                <input
                  type="email"
                  placeholder="rk@gmail.com" // Placeholder text for email input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Updating email state on input change
                />
                <MdOutlineMailOutline /> {/* Mail icon */}
              </div>
            </div>
            <div className="inputTag">
              <label>Phone Number</label> {/* Label for phone input */}
              <div>
                <input
                  type="number"
                  placeholder="12345678" // Placeholder text for phone input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)} // Updating phone state on input change
                />
                <FaPhoneFlip /> {/* Phone icon */}
              </div>
            </div>
            <div className="inputTag">
              <label>Password</label> {/* Label for password input */}
              <div>
                <input
                  type="password"
                  placeholder="Your Password" // Placeholder text for password input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Updating password state on input change
                />
                <RiLock2Fill /> {/* Lock icon */}
              </div>
            </div>
            <button type="submit" onClick={handleRegister}> {/* Submit button */}
              Register
            </button>
            <Link to={"/login"}>Login Now</Link> {/* Link to login page */}
          </form>
        </div>
        <div className="banner">
          <img src="/register.png" alt="login" /> {/* Banner image */}
        </div>
      </section>
    </>
  );
};

export default Register; 
// Exporting the Register component as default
