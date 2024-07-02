import React, { useContext, useEffect } from "react";
import "./App.css"; // Import CSS for styling the App component
import { Context } from "./main"; // Import the context from the main file
import { BrowserRouter, Route, Routes } from "react-router-dom"; // Import React Router components for routing
import Login from "./components/Auth/Login"; // Import Login component
import Register from "./components/Auth/Register"; // Import Register component
import { Toaster } from "react-hot-toast"; // Import Toaster for displaying toast notifications
import axios from "axios"; // Import axios for making HTTP requests
import Navbar from "./components/Layout/Navbar"; // Import Navbar component
import Footer from "./components/Layout/Footer"; // Import Footer component
import Home from "./components/Home/Home"; // Import Home component
import Jobs from "./components/Job/Jobs"; // Import Jobs component
import JobDetails from "./components/Job/JobDetails"; // Import JobDetails component
import Application from "./components/Application/Application"; // Import Application component
import MyApplications from "./components/Application/MyApplications"; // Import MyApplications component
import PostJob from "./components/Job/PostJob"; // Import PostJob component
import NotFound from "./components/NotFound/NotFound"; // Import NotFound component
import MyJobs from "./components/Job/MyJobs"; // Import MyJobs component

function App() {
  // Destructure isAuthorized, setIsAuthorized, and setUser from the context
  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);

  useEffect(() => {
    // Define an asynchronous function to fetch the current user
    const fetchUser = async () => {
      try {
        // Make a GET request to fetch user data, including credentials
        const response = await axios.get(
          "https://job-backend-xbsw.onrender.com/api/v1/user/getuser",
          {
            withCredentials: true,
          }
        );
        // If successful, update the user state and set authorization to true
        setUser(response.data.user);
        setIsAuthorized(true);
      } catch (error) {
        // If there is an error, set authorization to false
        setIsAuthorized(false);
      }
    };

    // Call the fetchUser function
    fetchUser();
  }, [isAuthorized]); // Dependency array includes isAuthorized to refetch data if it changes

  return (
    <>
      <BrowserRouter>
        {/* Navbar component */}
        <Navbar />
        {/* Define routes and their corresponding components */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/job/getall" element={<Jobs />} />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="/application/:id" element={<Application />} />
          <Route path="/applications/me" element={<MyApplications />} />
          <Route path="/job/post" element={<PostJob />} />
          <Route path="/job/me" element={<MyJobs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {/* Footer component */}
        <Footer />
        {/* Toaster component for displaying toast notifications */}
        <Toaster />
      </BrowserRouter>
    </>
  );
}

export default App;
