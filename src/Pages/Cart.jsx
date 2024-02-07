import React, { useContext } from "react";
import { LoginContext, backendUrl } from "../App";
import CartCard from "../Components/CartCard";
import axios from "axios";

const Cart = () => {
  const { cart, setCart } = useContext(LoginContext);
  console.log(cart);

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
      setCart(newCart);
      const response = await axios.patch(
        `${backendUrl}/cart/increment`,
        {
          _id,
        },
        { withCredentials: true }
      );
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
    setCart(newCart);
    const response = await axios.patch(`${backendUrl}/cart/decrement`,{
        _id
    },{withCredentials:true});
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

  return (
    <>
      <div className="flex flex-col m-4">
        <h1 className="text-2xl font-bold">Cart</h1>
        <div className="flex flex-col mx-4 my-2 p-2 gap-2">
          {cart?.map((item, i) => {
            console.log(item);
            return (
              <CartCard
                cartItemTitle={item.cartItemTitle}
                cartItemPrice={item.cartItemPrice}
                cartItemQty={item.cartItemQty}
                cartProductId={item.cartProductId}
                cartUser={item.cartUser}
                incrementQty={incrementQty}
                decrementQty={decrementQty}
                key={i}
                _id={item._id}
                index={i}
              />
            );
          })}
        </div>
        {cart.length !== 0 && (
          <div className="flex justify-center">
            <button onClick={clearCart}>Clear cart</button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
