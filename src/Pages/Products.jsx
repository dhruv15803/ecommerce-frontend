import React, { useContext, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { LoginContext, backendUrl } from "../App";
import ProductUserCard from "../Components/ProductUserCard";

const Products = () => {
  const { category} = useParams();
  const [products, setProducts] = useState([]);
  const [subCategories,setSubCategories] = useState([]);
  const { cart, setCart } = useContext(LoginContext);
  const [subCategory,setSubCategory] = useState("");

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

  
  useEffect(() => {
    getProductsByCategory();
    getSubCategory();
    setSubCategory("");
  }, [category]);

  console.log(subCategories);

  return (
    <>
      <div className="mx-2 my-2 flex p-2">
        <h1 className="text-2xl font-bold">
          {category[0].toUpperCase() + category.slice(1)}
        </h1>
      </div>
      <div className="flex gap-4 m-2 p-2">
        <button className={subCategory===""? 'underline underline-offset-4 text-xl' : 'text-xl'} onClick={()=>setSubCategory("")}>All</button>
        {subCategories.map((item,i)=>{
          return <button className={subCategory===item.name ? 'underline underline-offset-4 text-xl' : 'text-xl'} onClick={()=>setSubCategory(item.name)} key={i} to={item.name}>{item.name}</button>
        })}
      </div>
      <div className="flex mx-2 flex-wrap gap-2 p-2 justify-center">
        {products.length===0 && 
        <div className="text-red-500 text-xl font-bold">
          No products available in this category
        </div>}
        {products.filter(item => {
          if(subCategory!==""){
            return item.subCategory===subCategory;
          } else {
            return item;
          }
        }).map((item, i) => {
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
