import React from 'react'
import { Audio } from 'react-loader-spinner'
import { Oval } from 'react-loader-spinner'

const Loader = () => {
  return (
    <>
    <div className='flex mx-4 my-20 justify-center flex-row items-center gap-4'>
    <Oval
  visible={true}
  height="80"
  width="80"
  color="#4fa94d"
  ariaLabel="oval-loading"
  wrapperStyle={{}}
  wrapperClass=""/>
      <p className='text-[#4fa94d] text-2xl'>Loading...</p>
    </div>
    </>
  )
}

export default Loader;
