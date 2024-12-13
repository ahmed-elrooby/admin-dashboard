"use client"
import Lottie from 'lottie-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import notFoundAnimate from "../../images/notFound.json"
const Notfound = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; 

  return <>
  <div className='flex w-[95%] bg-white p-3 rounded-lg dark:bg-[#171717]  mx-auto  sm:flex-col md:flex-row gap-3 items-center'>
   <div className='flex flex-col items-center gap-3'>
   <p className="text-xl  capitalize font-bold text-[#EAAF2C]">Page Not Found</p>
      <p className="text-md text-gray-500 mt-4">
        The page you're looking for does not exist.
      </p>
   <Link className='border-2 border-[#EAAF2C] hover:bg-[#EAAF2C] hover:text-white text-[#EAAF2C]  font-semibold capitalize transition-all rounded-md p-2' href={"/"}>
    home page
    </Link>
   </div>
    <Lottie className='object-cover w-[60%]' animationData={notFoundAnimate} />
  </div>
  </>
}

export default Notfound