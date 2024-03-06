import React, { useContext, useEffect, useState } from "react";
import { LoginContext, backendUrl } from "../App";
import CartCard from "../Components/CartCard";
import axios from "axios";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, setCart } = useContext(LoginContext);
  console.log(cart);
  const [totalPrice, setTotalPrice] = useState(null);

  const incrementQty = async (index) => {
    try {
      let _id = null;
      const newCart = cart.map((item, i) => {
        if (i === index) {
          _id = item._id;
          return {
            ...item,
            cartItemQty: item.cartItemQty + 1,
          };
        } else {
          return item;
        }
      });
      const response = await axios.patch(
        `${backendUrl}/cart/increment`,
        {
          _id,
        },
        { withCredentials: true }
      );
      setCart(newCart);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const decrementQty = async (index) => {
    let _id = null;
    const newCart = cart.map((item, i) => {
      if (i === index) {
        _id = item._id;
        return {
          ...item,
          cartItemQty: item.cartItemQty - 1,
        };
      } else {
        return item;
      }
    });
    const response = await axios.patch(
      `${backendUrl}/cart/decrement`,
      {
        _id,
      },
      { withCredentials: true }
    );
    setCart(newCart);
    console.log(response);
  };

  const clearCart = async () => {
    try {
      const response = await axios.delete(`${backendUrl}/cart/clear`, {
        withCredentials: true,
      });
      if (response?.data?.success) {
        setCart([]);
      }
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

  const deleteCartItem = async (_id) => {
    try {
      const newCartItems = cart.filter((item) => item._id !== _id);
      const response = await axios.post(
        `${backendUrl}/cart/delete`,
        {
          _id,
        },
        { withCredentials: true }
      );
      console.log(response);
      setCart(newCartItems);
    } catch (error) {
      console.log(error);
    }
  };

  const getTotalPrice = async () => {
    try {
      const response = await axios.get(`${backendUrl}/cart/getTotalPrice`, {
        withCredentials: true,
      });
      if (response?.data?.success) {
        setTotalPrice(response.data.totalPrice);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTotalPrice();
  },[cart]);

  useEffect(() => {
    getUserCartItems();
  }, []);




  return (
    <>
      <div className="flex flex-col m-4">
        <h1 className="text-2xl font-bold">Cart</h1>
        {cart.length!==0 ?         <div className="flex flex-col mx-4 my-2 p-2 gap-2">
          {cart?.map((item, i) => {
            console.log(item);
            return (
              <CartCard
                cartItemTitle={item.cartItemTitle}
                cartItemPrice={item.cartItemPrice}
                cartItemQty={item.cartItemQty}
                cartProductId={item.cartProductId}
                cartItemImg={item.cartItemImg}
                cartUser={item.cartUser}
                incrementQty={incrementQty}
                decrementQty={decrementQty}
                deleteCartItem={deleteCartItem}
                key={i}
                _id={item._id}
                index={i}
              />
            );
          })}
        </div> :  <>
        <div className="text-lg flex gap-2">
          <p>Cart is empty.</p>
          <Link className="text-red-500" to='/'>Click here to shop</Link>
        </div>
        </>}
        {cart.length !== 0 && (
        <>
          <div className="my-2 font-bold text-xl mx-4">
            Total price: Rs {totalPrice}
          </div>
            <div className="flex justify-center">
            <button
              className="border-2 rounded-lg p-2 border-black hover:bg-black hover:text-white hover:duration-300 "
              onClick={clearCart}
            >
              Clear cart
            </button>
          </div>
        </>
        )}
      </div>
    </>
  );
};

export default Cart;
