"use client"
import { context } from '@/Providers/Context/ContextData'
import React, { useContext } from 'react'
import { FaBriefcase, FaUserAlt } from 'react-icons/fa'
import { IoShieldCheckmark } from 'react-icons/io5'
import { MdEmail } from 'react-icons/md'

const Profile = () => {
 const {dataOfAdmin} = useContext(context)
  return <>
  <div className='shadow-lg w-full md:w-[95%] dark:bg-[#171717] bg-white pb-[67px]   pt-8 rounded-lg pl-7'>
    <h1
     className='font-bold mt-1 mb-8 w-[95%] relative after:absolute after:bottom-0 after:left-0 pt-1 pb-3 after:h-[1px] after:w-full after:content-[""] text-[20px] md:text-[25px] after:bg-gray-500'>General Setting</h1>
  <section className='flex w-[95%] flex-col gap-4 items-start'>
    <h1 className='capitalize gap-2 dark:text-[#ddd] flex items-center p-2  bg-[--main-color] dark:bg-[#4444445e]  rounded-e-lg w-full font-bold  text-[18px] md:text-[20px]'>
      <FaUserAlt  size={24}/>
     {dataOfAdmin.firstName} {dataOfAdmin.lastName}
      </h1>
    <p className='bg-[--main-color] dark:text-[#ddd] dark:bg-[#4444445e] text-[20px] w-full flex items-center gap-2  rounded-e-lg  p-2'>
    <MdEmail size={24}/>
{dataOfAdmin.email}
    </p>
    <h6 className='capitalize flex dark:text-[#ddd] items-center gap-2 text-[20px] p-2  bg-[--main-color] dark:bg-[#4444445e] rounded-e-lg w-full   '>
    <IoShieldCheckmark size={24}/>
admin
      </h6>
    <p className='capitalize p-2 dark:text-[#ddd] flex items-center gap-2 text-[20px] bg-[--main-color] dark:bg-[#4444445e]  rounded-e-lg w-full  '>
    <FaBriefcase size={24}/>

     {dataOfAdmin.position}
     </p>
  </section>
  </div>
  </>
}

export default Profile