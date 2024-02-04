import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import Loader from "../Components/Loader";
import ProductCard from "../Components/ProductCard";

const Admin = () => {

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [productImg, setProductImg] = useState("");
  const [productTitle, setProductTitle] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productStock, setProductStock] = useState("");
  const [productAddedMsg, setProductAddedMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  console.log(category);

  const getAllProducts = async () => {
    try {
      const response = await axios.get(`${backendUrl}/product/getAll`, {
        withCredentials: true,
      });
      setProducts(response.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllCategories = async () => {
    try {
      const response = await axios.get(`${backendUrl}/category/getAll`);
      if (response.data.success) {
        setCategories(response.data.categories);
        setCategory(response.data.categories[0]?.categoryName);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllCategories();
    getAllProducts();
  }, []);



  const addProduct = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const response = await axios.post(
        `${backendUrl}/product/add`,
        {
          productImg,
          productTitle,
          productDescription,
          productPrice,
          productStock,
          productCategory: category,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      setIsLoading(false);
      setProducts((prevProducts) => [...prevProducts, response.data.product]);
      setProductAddedMsg(response.data.message);
      setTimeout(() => {
        setProductAddedMsg("");
      }, 3000);
      setProductTitle("");
      setProductDescription("");
      setProductImg("");
      setProductPrice("");
      setProductStock("");
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const clearProducts = async () => {
    try {
      const response = await axios.delete(`${backendUrl}/product/deleteAll`, {
        withCredentials: true,
      });
      if (response.data.success) {
        setProducts([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (_id) => {
    console.log(_id);
    try {
      const response = await axios.post(`${backendUrl}/product/delete`,{
        "_id":_id,
      },{
        withCredentials: true,
      });
      console.log(response);
      if (response.data.success) {
        const newProducts = products.filter((product) => product._id !== _id);
        setProducts(newProducts);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  return (
    <>
      <div className="flex flex-col border-2 mx-4 my-12">
        <h1 className="font-bold text-2xl">Add products</h1>
        <form onSubmit={addProduct} className="flex flex-col gap-2 my-4">
          <input
            className="mx-4"
            onChange={(e) => setProductImg(e.target.files[0])}
            type="file"
            name="productImg"
            id=""
          />
          <input
            className="p-2 border-2 rounded-lg mx-4"
            value={productTitle}
            onChange={(e) => setProductTitle(e.target.value)}
            type="text"
            name="productTitle"
            id=""
            placeholder="Enter product title"
          />
          <input
            className="p-2 border-2 rounded-lg mx-4"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            type="text"
            name="productDescription"
            id=""
            placeholder="Enter product description"
          />
          <input
            className="p-2 border-2 rounded-lg mx-4"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            type="number"
            name="productPrice"
            id=""
            placeholder="eg: 400 rs"
          />
          <input
            className="p-2 border-2 rounded-lg mx-4"
            value={productStock}
            onChange={(e) => setProductStock(e.target.value)}
            type="number"
            name="productStock"
            id=""
            placeholder="Enter stock"
          />
          <select
            className="mx-4 border-2 p-2 rounded-lg"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            name="category"
            id=""
          >
            {categories?.map((item, i) => {
              return (
                <option key={i} value={item.categoryName}>
                  {item.categoryName}
                </option>
              );
            })}
          </select>
          <button className="border-2 rounded-lg border-black p-2 w-1/2 mx-auto my-4 hover:bg-black hover:text-white hover:duration-300">
            Add product
          </button>
          <p>{productAddedMsg}</p>
        </form>
      </div>
      {products.length !== 0 && (
        <div className="mx-4 flex gap-4 my-4">
          <button
            onClick={clearProducts}
            className="p-2 border-black rounded-lg border-2 hover:bg-black hover:text-white hover:duration-300"
          >
            Clear products
          </button>
        </div>
      )}
      {products.length !== 0 && (
        <div className="flex p-2 flex-wrap gap-2 border-2 justify-center">
          {products?.map((item, i) => {
            return (
              <ProductCard
                key={i}
                productImg={item.productImg}
                productTitle={item.productTitle}
                productDescription={item.productDescription}
                productPrice={item.productPrice}
                _id={item._id}
                deleteProduct={deleteProduct}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default Admin;
