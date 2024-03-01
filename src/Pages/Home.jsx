import React, { useEffect, useState } from 'react'
import { FaLessThan } from "react-icons/fa";
import { FaGreaterThan } from 'react-icons/fa';

const Home = () => {

  const [currCarouselImg,setCurrCarouselImg] = useState(0);
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

  return (
    <>
    <div className='w-full flex items-center'>
      <FaLessThan onClick={()=>setCurrCarouselImg(prevImg=>(prevImg-1 + numImages)%3)} className='z-20 absolute left-2 text-white text-2xl'/>
      <img src={`./src/Images/carousel-img-${currCarouselImg+1}.jpg`} className='z-10 opacity-85 rounded-b-lg ' alt=""  />
      <FaGreaterThan onClick={()=>setCurrCarouselImg(prevImg=>(prevImg+1)%3)} className='z-20 absolute right-2 text-white text-2xl'/>
    </div>
    

    </>
  )
}

export default Home