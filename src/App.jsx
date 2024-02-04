import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layouts/Layout";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { createContext } from "react";
export const backendUrl = "http://localhost:5000";
export const LoginContext = createContext();
import { useState, useEffect } from "react";
import axios from "axios";
import Profile from "./Pages/Profile";
import Admin from "./Pages/Admin";
import AdminLayout from "./Layouts/AdminLayout";
import AdminCategory from "./Pages/AdminCategory";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isUserAdmin,setIsUserAdmin] = useState(false);


  console.log(isLoggedIn);
  console.log(loggedInUser);

  const getLoggedInUser = async () => {
    try {
      const response = await axios.get(`${backendUrl}/user/loggedInUser`, {
        withCredentials: true,
      });
      setIsLoggedIn(response.data.success);
      setLoggedInUser(response.data.user);
      setIsUserAdmin(response.data.user?.isAdmin);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLoggedInUser();
  }, []);

  return (
    <>
      <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn,setLoggedInUser,loggedInUser,isUserAdmin,setIsUserAdmin}}>
        <Router>
          <Routes>
            <Route path="/" element={<Layout/>}>
              <Route index element={<Home />} />
              <Route
                path="login"
                element={<Login/>}
              />
              <Route path="register" element={<Register />} />
              <Route path="profile" element={<Profile/>}/>
              <Route path="Admin" element={<AdminLayout/>}>
                <Route index element={<Admin/>}/>
                <Route path="category" element={<AdminCategory/>}/>
              </Route>
            </Route>
          </Routes>
        </Router>
      </LoginContext.Provider>
    </>
  );
}

export default App;
