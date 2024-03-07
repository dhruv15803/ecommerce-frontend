import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import Loader from "../Components/Loader";
import ProductCard from "../Components/ProductCard";

const Admin = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subCategory, setSubCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [productImg, setProductImg] = useState("");
  const [productTitle, setProductTitle] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productStock, setProductStock] = useState("");
  const [productAddedMsg, setProductAddedMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [productFilter,setProductFilter] = useState("");


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

  const addProduct = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      if (isEdit) {
        const response = await axios.put(
          `${backendUrl}/product/editProduct`,
          {
            newProductTitle: productTitle,
            newProductImg: productImg,
            newProductDescription: productDescription,
            newProductPrice: productPrice,
            newProductStock: productStock,
            newProductCategory: category,
            productId: editId,
            newProductSubCategory:subCategory,
          },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(response);
        setProductAddedMsg(response.data.message);
        setTimeout(() => {
          setProductAddedMsg("");
        }, 3000);
        setEditId(null);
        setIsEdit(false);
        window.location = "/Admin";
      } else {
        const response = await axios.post(
          `${backendUrl}/product/add`,
          {
            productImg,
            productTitle,
            productDescription,
            productPrice,
            productStock,
            productCategory: category,
            productSubCategory:subCategory,
          },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(response);
        setProducts((prevProducts) => [...prevProducts, response.data.product]);
        setProductAddedMsg(response.data.message);
        setTimeout(() => {
          setProductAddedMsg("");
        }, 3000);
      }
      setIsLoading(false);
      setProductTitle("");
      setProductDescription("");
      setProductImg("");
      setProductPrice("");
      setProductStock("");
    } catch (error) {
      setIsLoading(false);
      setProductAddedMsg("Please enter all the required details");
      setTimeout(() => {
        setProductAddedMsg("");
      }, 3000);
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
      const response = await axios.post(
        `${backendUrl}/product/delete`,
        {
          _id: _id,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response);
      if (response.data.success) {
        const newProducts = products.filter((product) => product._id !== _id);
        setProducts(newProducts);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editProduct = async (productId) => {
    try {
      setIsEdit(true);
      setEditId(productId);
      const productItem = products.find(
        (product) => product.productId === productId
      );
      setProductImg("");
      setProductTitle(productItem.productTitle);
      setProductDescription(productItem.productDescription);
      setProductPrice(productItem.productPrice);
      setProductStock(productItem.productStock);
      const response = await axios.post(
        `${backendUrl}/category/getCategory`,
        {
          categoryId: productItem.category,
        },
        { withCredentials: true }
      );
      response.data.success
        ? setCategory(response.data.category.categoryName)
        : setCategory("");
      console.log(response.data.category.categoryName);
    } catch (error) {
      console.log(error);
    }
  };

  const getSubCategory = async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/category/getSubCategory`,
        { categoryName: category },
        { withCredentials: true }
      );
      if (response.status === 200) {
        setSubCategories(response.data.category.subCategories);
        setSubCategory(response.data.category.subCategories[0].name);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getProductsByCategory = async () => {
    if(productFilter==="") {
      getAllProducts();
    } else {
      try {
        const response = await axios.post(`${backendUrl}/product/getProductsByCategory`,{
          category:productFilter,
        },{withCredentials:true});
        if(response.status===200){
          setProducts(response.data.products);
        } 
      } catch (error) {
        console.log(error);
      }
    }
  }


  useEffect(() => {
    getAllCategories();
    getAllProducts();
  }, []);

  useEffect(() => {
    getSubCategory();
  }, [category]);

  useEffect(() => {
    getProductsByCategory();
  },[productFilter])

  if (isLoading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  return (
    <>
      <div className="flex flex-col  rounded-lg p-2 border-2 shadow-xl mx-4 my-12">
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
          {subCategories.length !== 0 && (
            <select
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              className="mx-4 border-2 p-2 rounded-lg"
              name="subCategory"
              id=""
            >
              {subCategories.map((item, i) => {
                return (
                  <>
                    <option key={i} value={item.name}>
                      {item.name}
                    </option>
                  </>
                );
              })}
            </select>
          )}
          <button className="border-2 rounded-lg border-black p-2 w-1/2 mx-auto my-4 hover:bg-black hover:text-white hover:duration-300">
            {isEdit ? "Edit product" : "Add product"}
          </button>
          <div className="text-red-500 text-lg flex justify-center">
            {productAddedMsg}
          </div>
        </form>
      </div>
      {products.length !== 0 && (
        <>
        <div className="mx-4 flex gap-4 my-4">
          <button
            onClick={clearProducts}
            className="p-2 border-black rounded-lg border-2 hover:bg-black hover:text-white hover:duration-300"
          >
            Clear products
          </button>
        </div>
        <div className="m-2 flex flex-wrap gap-2">
          <button onClick={() => setProductFilter("")} className={productFilter==="" ? "underline underline-offset-2": "*:"}>All</button>
          {categories.map((item,i)=>{
            return <button onClick={() => setProductFilter(item.categoryName)} className={productFilter===item.categoryName ? 'underline underline-offset-2':""}>{item.categoryName}</button>
          })}
        </div>
        </>
        
      )}
      {products.length !== 0 && (
        <div className="flex p-2 flex-wrap gap-2 border-2 justify-center">
          {products?.map((item, i) => {
            return (
              <ProductCard
                key={i}
                category={item.category}
                productId={item.productId}
                productImg={item.productImg}
                productTitle={item.productTitle}
                productDescription={item.productDescription}
                productPrice={item.productPrice}
                _id={item._id}
                deleteProduct={deleteProduct}
                editProduct={editProduct}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default Admin;