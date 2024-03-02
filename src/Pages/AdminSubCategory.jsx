import React, { useContext, useEffect, useState } from "react";
import { LoginContext, backendUrl } from "../App";
import axios from "axios";

const AdminSubCategory = () => {
  const { categories } = useContext(LoginContext);
  const [categoryName, setCategoryName] = useState("men's clothing");
  const [subCategories, setSubCategories] = useState([]);
  const [subCategory, setSubCategory] = useState([]);

  console.log(subCategories);
  console.log(categoryName);

  const getSubCategory = async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/category/getSubCategory`,
        { categoryName: categoryName },
        { withCredentials: true }
      );
      if (response.status === 200) {
        setSubCategories(response.data.category.subCategories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addSubCategory = async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/category/addSubCategory`,
        { categoryName, subCategoryName: subCategory },
        { withCredentials: true }
      );
      console.log(response);
      if (response.status === 200) {
        setSubCategories(response.data.category.subCategories);
        setSubCategory("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteSubCategory = async (index) => {
    const response = await axios.post(
      `${backendUrl}/category/deleteSubCategory`,
      { categoryName, subCategoryName: subCategories[index].name },
      { withCredentials: true }
    );
    console.log(response);
    const temp = [...subCategories];
    temp.splice(index, 1);
    setSubCategories(temp);
  };

  const clearAllSubCategories = async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/category/clearAllSubCategories`,
        { categoryName },
        { withCredentials: true }
      );
      console.log(response);
      if (response.status === 200) {
        setSubCategories([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSubCategory();
  }, []);

  return (
    <>
      <div className="flex gap-2 justify-center">
        <select
          className="border-2 border-black p-2 rounded-md"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
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
        <button
          onClick={getSubCategory}
          className="border-2 border-black rounded-lg px-2 hover:bg-black hover:text-white hover:duration-300"
        >
          Select
        </button>
      </div>
      <div className=" m-2">
        <h1 className="font-semibold text-2xl">sub categories</h1>
        <div className="flex gap-2 items-center m-2">
          <input
            className="border-2 rounded-lg p-2"
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            type="text"
            name="subCategory"
            id=""
            placeholder="Enter sub category"
          />
          <button
            onClick={addSubCategory}
            className="border-2 rounded-lg border-black hover:bg-black hover:text-white hover:duration-300 px-2"
          >
            add
          </button>
        </div>
        <div className="flex flex-col gap-2 justify-center">
          {subCategories.length !== 0 &&
            subCategories.map((item, i) => {
              return (
                <div
                  key={i}
                  className="flex  p-2 items-center border-b-2 border-b-black"
                >
                  <div className="flex flex-wrap w-[60%]">{item.name}</div>
                  <button
                    onClick={() => deleteSubCategory(i)}
                    className="border-2 rounded-lg border-black hover:bg-black hover:text-white hover:duration-300 px-2"
                  >
                    delete
                  </button>
                </div>
              );
            })}
          {subCategories.length!==0 && <div className="mx-2">
            <button
              onClick={clearAllSubCategories}
              className="border-2 rounded-lg border-black hover:bg-black hover:text-white hover:duration-300 px-2"
            >
              Clear all
            </button>
          </div>}
        </div>
      </div>
    </>
  );
};

export default AdminSubCategory;
