import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LoginContext, backendUrl } from "../App";
import axios from "axios";

const ProductDetail = () => {
  const { id } = useParams();
  const {cart,setCart,loggedInUser} = useContext(LoginContext);
  const [product, setProduct] = useState({});
  console.log(id);

  const getProductById = async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/product/getProductById`,
        { id }
      );
      if (response.status === 200) {
        setProduct(response.data.product);
      }
    } catch (error) {
      console.log(error);
    }
  };


//   cartItemTitle: props.productTitle,
//   cartItemDescription: props.productDescription,
//   cartItemPrice: props.productPrice,
//   cartItemQty: 1,
//   cartProductId: _id,
//   cartItemImg: props.productImg,

  const addToCartForDetailProductPage = async () => {
try {
    const cartItem = cart.find(item=>item.cartProductId===id);
    if(cartItem){
      const newCart = cart.map((item,i)=>{
          if(item.cartProductId===id){
              return {
                  ...item,
                  "cartItemQty":item.cartItemQty+1,
              }
          } else{
              return item;
          }
      })
      setCart(newCart);
    }
      else {
        setCart(prevCart => [...prevCart , {
            cartItemTitle:product.productTitle,
            cartItemImg: product.productImg,
            cartItemDescription: product.productDescription,
            cartItemPrice: product.productPrice,
            cartProductId: id,
            cartUser:loggedInUser._id, 
        }]) 
      }   
        const response = await axios.post(`${backendUrl}/cart/add`,{
            cartItemTitle: product.productTitle,
            cartItemDescription: product.productDescription,
            cartItemPrice: product.productPrice,
            cartItemQty: 1,
            cartProductId: id,
            cartItemImg: product.productImg,
        }, {withCredentials:true})
        console.log(response);
} catch (error) {
    console.log(error);
}
  }

  useEffect(() => {
    getProductById();
  }, []);

  return (
    <>
    <div className="border-2 rounded-lg shadow-lg flex items-center m-4 p-2">
        <div className="w-[50%] mx-2">
            <img className="rounded-lg" src={product.productImg} alt="" />
        </div>
        <div className="flex flex-col">
            <div className="text-2xl font-bold">
                {product.productTitle}
            </div>
            <div className="text-md font-semibold">
                {product.productDescription}
            </div>
            <div className="">
                Rs {product.productPrice}
            </div>
            <div className="flex items-center">
                <p>{product.subCategory}</p>
            </div>
            <div className="">
                <button onClick={addToCartForDetailProductPage} className="border-2 rounded-lg border-black px-2 m-2 hover:bg-black hover:text-white hover:duration-300">Add to cart</button>
            </div>
        </div>
    </div>
    </>
  )
};

export default ProductDetail;
