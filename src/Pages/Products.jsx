import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { LoginContext, backendUrl } from "../App";
import ProductUserCard from "../Components/ProductUserCard";

const Products = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const { cart, setCart } = useContext(LoginContext);

  const getProductsByCategory = async () => {
    try {
      const response = await axios.get(`${backendUrl}/product/${category}`);
      console.log(response);
      setProducts(response.data.products);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getProductsByCategory();
  }, [category]);

  return (
    <>
      <div className="mx-2 my-2 flex p-2">
        <h1 className="text-2xl font-bold">
          {category[0].toUpperCase() + category.slice(1)}
        </h1>
      </div>
      <div className="flex mx-2 flex-wrap gap-2 p-2 justify-center">
        {products.length===0 && 
        <div className="text-red-500 text-xl font-bold">
          No products available in this category
        </div>}
        {products.map((item, i) => {
          return (
            <ProductUserCard
              _id={item._id}
              productId={item.productId}
              cart={cart}
              setCart={setCart}
              productDescription={item.productDescription}
              key={i}
              productImg={item.productImg}
              productTitle={item.productTitle}
              productPrice={item.productPrice}
            />
          );
        })}
      </div>
    </>
  );
};

export default Products;
