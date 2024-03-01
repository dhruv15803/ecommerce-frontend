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
import Products from "./Pages/Products";
import Cart from "./Pages/Cart";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [cart, setCart] = useState([]);

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

  const getUserCartItems = async () => {
    try {
      const response = await axios.get(`${backendUrl}/cart/getItems`, {
        withCredentials: true,
      });
      if (response?.data?.success) {
        setCart(response.data.cartItems);
        console.log(response.data.cartItems);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [categories,setCategories] = useState([]);

  const getAllCategories = async () => {
    try {
      const response = await axios.get(`${backendUrl}/category/getAll`);
      if (response.data.success) {
        setCategories(response.data.categories);
      }
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(()=>{
    getAllCategories();
  },[]);

  useEffect(() => {
    getUserCartItems();
    getLoggedInUser();
  }, []);

  return (
    <>
      <LoginContext.Provider
        value={{
          isLoggedIn,
          setIsLoggedIn,
          setLoggedInUser,
          loggedInUser,
          isUserAdmin,
          setIsUserAdmin,
          cart,
          setCart,
        }}
      >
        <Router>
          <Routes>
            <Route path="/" element={<Layout cart={cart} categories={categories}/>}>
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="profile" element={<Profile/>} />
              <Route path="cart" element={<Cart />}/>
              <Route path="Admin" element={<AdminLayout />}>
                <Route index element={<Admin />} />
                <Route path="category" element={<AdminCategory />} />
              </Route>
              <Route path="products">
                <Route path=":category" element={<Products />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </LoginContext.Provider>
    </>
  );
}

export default App;
