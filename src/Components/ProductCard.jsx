import React, { useState } from 'react'
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from 'react-icons/io';


const ProductCard = (props) => {
    const [isShowDescription,setIsShowDescription] = useState(false);
  return (
    <>
    <div className='flex flex-col p-2 border-2 rounded-lg w-[40%] mx-4 gap-2'>
        <img className='w-full h-48' src={props.productImg} alt="" />
        <div className='flex items-center'>
            <div className='font-semibold text-xl w-[90%] flex flex-wrap'>{props.productTitle}</div>
            {!isShowDescription ? <IoIosArrowDown onClick={()=>setIsShowDescription(true)}/> : <IoIosArrowUp onClick={()=>setIsShowDescription(false)}/>}
            
        </div>
        {isShowDescription && <p className='text-md'>{props.productDescription}</p>}
        <p>Rs {props.productPrice}</p>
        <div className='flex justify-center gap-2 items-center'>
        <button className='my-2 w-[50%] p-2 border-2 rounded-lg border-black hover:text-white hover:bg-black hover:duration-300' onClick={()=>props.deleteProduct(props._id)}>Delete</button>
        <button className='my-2 p-2 w-[50%] border-2 rounded-lg border-black hover:text-white hover:bg-black hover:duration-300' onClick={()=>props.editProduct(props.productId)}>Edit</button>
        </div>
    </div>
    </>
  )
}

export default ProductCard;