import React, { useEffect, useState } from "react";
import { FaLessThan } from "react-icons/fa";
import { FaGreaterThan } from "react-icons/fa";
import ProductCard from "../Components/ProductCard";
import axios from "axios";
import { backendUrl } from "../App";
import ProductUserCard from "../Components/ProductUserCard";

const Home = () => {
  const [homePageProducts, setHomePageProducts] = useState([]);
  const homePageProductCategory = "men's clothing";
  const [currCarouselImg, setCurrCarouselImg] = useState(0);
  const numImages = 3;

  // const changeImage = () => {
  //   setCurrCarouselImg(prevImg => (prevImg + 1) % 3);
  // };

  // useEffect(() => {
  //   // Start interval when component mounts
  //   const interval = setInterval(changeImage, 5000);

  //   // Clear interval when component unmounts
  //   return () => clearInterval(interval);
  // }, []); // Empty dependency array ensures effect runs only once when component mounts

  const getHomePageProducts = async () => {
    try {
      const response = await axios.get(`${backendUrl}/product/${homePageProductCategory}`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setHomePageProducts(response.data.products);
        console.log(response.data.products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHomePageProducts();
  }, []);

  return (
    <>
      <div className="w-full flex items-center">
        <FaLessThan
          onClick={() =>
            setCurrCarouselImg((prevImg) => (prevImg - 1 + numImages) % 3)
          }
          className="z-20 absolute left-2 text-white text-2xl"
        />
        <img
          src={`./src/Images/carousel-img-${currCarouselImg + 1}.jpg`}
          className="z-10 opacity-85 rounded-b-lg "
          alt=""
        />
        <FaGreaterThan
          onClick={() => setCurrCarouselImg((prevImg) => (prevImg + 1) % 3)}
          className="z-20 absolute right-2 text-white text-2xl"
        />
      </div>
      <div className="p-2 font-semibold text-2xl">{homePageProductCategory}</div>
      <div className="flex flex-wrap gap-2 p-2 justify-center">
        {homePageProducts?.map((item, i) => {
          return <ProductUserCard key={i} productTitle={item.productTitle} productDescription={item.productDescription} productImg={item.productImg} productPrice={item.productPrice} />
        })}
      </div>
    </>
  );
};

export default Home;
