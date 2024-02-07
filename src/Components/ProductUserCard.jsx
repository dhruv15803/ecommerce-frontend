import React, { useContext, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import axios from "axios";
import { LoginContext, backendUrl } from "../App";

const ProductUserCard = (props) => {
  const [isShowDescription, setIsShowDescription] = useState(false);
  const {isLoggedIn,loggedInUser} = useContext(LoginContext);

  const addToCart = async (_id) => {
    try { 
      const cartItem = props.cart.find(item=>item.cartProductId===_id);
      if(cartItem){
        const newCart = props.cart.map((item,i)=>{
            if(item.cartProductId===_id){
                return {
                    ...item,
                    "cartItemQty":item.cartItemQty+1,
                }
            } else{
                return item;
            }
        })
        props.setCart(newCart);   
      } else{
        props.setCart((prevCart) => [
            ...prevCart,
            {
              cartItemTitle: props.productTitle,
              cartItemDescription: props.productDescription,
              cartItemPrice: props.productPrice,
              cartItemQty: 1,
              cartProductId: _id,
              cartUser:loggedInUser._id,
            },
          ]);
      }
      const response = await axios.post(
        `${backendUrl}/cart/add`,
        {
          cartItemTitle: props.productTitle,
          cartItemDescription: props.productDescription,
          cartItemPrice: props.productPrice,
          cartItemQty: 1,
          cartProductId: _id,
        },
        { withCredentials: true }
      );
      console.log(response);
    } catch (error) {
      console.log("add to cart error:- ", error);
    }
  };

  return (
    <>
      <div className="flex flex-col p-2 items-center border-2 rounded-xl shadow-xl w-[45%]">
        <img className="w-full" src={props.productImg} alt="" />
        <div className="flex items-center my-2 text-xl font-bold">
          <div className="flex flex-wrap">{props.productTitle}</div>
          <button
            onClick={() => setIsShowDescription(!isShowDescription)}
            className="mx-2 text-2xl"
          >
            {isShowDescription ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </button>
        </div>
        {isShowDescription && (
          <div className="flex flex-wrap">{props.productDescription}</div>
        )}
        <div className="flex flex-wrap">Rs {props.productPrice}</div>
        <div>
            <button disabled={isLoggedIn===false}
            onClick={() => addToCart(props._id)}
            className="p-2 border-2 rounded-lg hover:bg-black hover:text-white border-black hover:duration-300 my-2 disabled:text-gray-400 border-gray-400 "
          >
            Add to cart
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductUserCard;
