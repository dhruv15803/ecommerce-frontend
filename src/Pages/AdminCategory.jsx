import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";

const AdminCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);

  const addCategory = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        `${backendUrl}/category/add`,
        {
          categoryName,
        },
        { withCredentials: true }
      );
      console.log(response);
      setCategories((prevCategories) => [
        ...prevCategories,
        response.data.category,
      ]);
      setCategoryName("");
    } catch (error) {
      console.log(error);
    }
  };
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
  useEffect(() => {
    getAllCategories();
  }, []);

  const deleteCategory = async (categoryName) => {
    try {
      const response = await axios.post(
        `${backendUrl}/category/delete`,
        {
          categoryName,
        },
        { withCredentials: true }
      );
      console.log(response);
      if (response.data.success) {
        const newCategories = categories.filter(
          (category) => category.categoryName !== categoryName
        );
        setCategories(newCategories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAllCategories = async () => {
    try {
      const response = await axios.delete(`${backendUrl}/category/deleteAll`);
      if (response.data.success) {
        setCategories([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex mx-4 mt-16 rounded-lg p-4">
        <form onSubmit={addCategory} className="flex">
          <input
            className="p-2 border-2 rounded-lg mx-2"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            type="text"
            name="categoryName"
            id=""
            placeholder="Enter category"
          />
          <button className="border-2 rounded-lg border-black px-4 hover:bg-black hover:text-white hover:duration-300">
            Add category
          </button>
        </form>
      </div>
      <div className=" flex flex-col mx-4 my-4">
        <h1 className="text-2xl font-bold">All categories</h1>
        <ul className="flex flex-col">
          {categories?.map((item, i) => {
            return (
              <div
                key={i}
                className="flex items-center border-2 rounded-lg mx-4 p-2 my-1"
              >
                <div className="w-[80%] flex flex-wrap">
                  {item.categoryName}
                </div>
                <button
                  onClick={() => deleteCategory(item.categoryName)}
                  className="border-2 rounded-lg border-black px-4 hover:bg-black hover:text-white hover:duration-300"
                >
                  Delete
                </button>
              </div>
            );
          })}
        </ul>
        {categories.length!==0 && <button
          onClick={deleteAllCategories}
          className="border-2 rounded-lg border-black px-4 hover:bg-black hover:text-white hover:duration-300 w-1/4 mx-auto my-7"
        >
          Clear all
        </button>}
      </div>
    </>
  );
};

export default AdminCategory;
