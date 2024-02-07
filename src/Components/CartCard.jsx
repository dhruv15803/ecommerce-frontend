import React from 'react'

const CartCard = (props) => {
  return (
    <>
    <div className='flex flex-col  px-4 py-2 border-2 shadow-xl rounded-lg'>
        <div className='flex font-semibold text-xl'>
            {props.cartItemTitle}
        </div>
        <div className='flex'>
            Rs {props.cartItemPrice}
        </div>
        <div className='flex items-center gap-2'>
            <button onClick={()=>props.decrementQty(props.index)} className='border-2 p-2 rounded-full border-black hover:bg-black hover:text-white hover:duration-300'>-</button>
            <p>{props.cartItemQty}</p>
            <button onClick={()=>props.incrementQty(props.index)} className='border-2 p-2 rounded-full border-black hover:bg-black hover:text-white hover:duration-300'>+</button>
        </div>
        <div>
            <button onClick={()=>props.deleteCartItem(props._id)} className='border-2 my-2 rounded-lg p-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white hover:duration-300'>Delete</button>
        </div>
    </div>
    </>
  )
}

export default CartCard