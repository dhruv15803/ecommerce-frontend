import React, { useContext, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { LoginContext, backendUrl } from "../App";
import ProductUserCard from "../Components/ProductUserCard";

const Products = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [subCategories,setSubCategories] = useState([]);
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


  const getSubCategory = async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/category/getSubCategory`,
        { categoryName: category},
        { withCredentials: true }
      );
      if (response.status === 200) {
        setSubCategories(response.data.category.subCategories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    getSubCategory();
  },[])

  useEffect(() => {
    getProductsByCategory();
  }, [category]);

  console.log(subCategories);

  return (
    <>
      <div className="mx-2 my-2 flex p-2">
        <h1 className="text-2xl font-bold">
          {category[0].toUpperCase() + category.slice(1)}
        </h1>
      </div>
      <div className="flex gap-2 m-2 p-2">
        <NavLink end to='.' className={({isActive})=> isActive ? 'underline underline-offset-4 font-semibold text-xl ' : 'font-semibold text-xl'} >All</NavLink>
        {subCategories.map((item,i)=>{
          return <NavLink key={i} className={({isActive})=> isActive ? 'underline underline-offset-4 font-semibold text-xl ' : 'font-semibold text-xl'} to={item.name}>{item.name}</NavLink>
        })}
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
