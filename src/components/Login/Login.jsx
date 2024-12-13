"use client"
import Image from 'next/image'
import React, { useContext, useState } from 'react'
import loginimg from "../../images/login.svg"

import {  FaSpinner } from "react-icons/fa";
import Link from 'next/link'
import { MdOutlineMarkEmailUnread } from 'react-icons/md'
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { RiLockPasswordLine } from "react-icons/ri";
import { context } from '@/Providers/Context/ContextData';

const Login = () => {
  const { getData,makeReg,loadding } = useContext(context);
  const [show, setShow] = useState(false)


  //show password 
  const handleShow = () => {
    setShow((prevShow) => !prevShow)
  }
  return <>
    <div className='p-3 mx-auto h-screen w-full'>
    <span className='w-[100px] my-2 block mx-auto h-[3px] bg-[--secondary-color] rounded-full'></span>

      <div className='flex flex-col md:flex-row border-2   mb-2 p-4 rounded-lg items-center gap-4'>
        <Image
          loading='lazy'

          className='w-full md:w-[400px] object-cover' src={loginimg} alt='register' />
        <form onSubmit={makeReg} className='flex  relative px-4 py-6 bg-white dark:bg-[#171717] flex-col gap-5 rounded-lg w-full md:w-[80%] ' action="">
          <h1 className='md:text-[25px] text-[16px] font-bold capitalize text-[--secondary-color] flex  gap-4 mt-8 md:mt-6 relative w-fit '>welcome back <span className=' md:text-[30px] absolute -top-1 -right-[50px]   text-[20px]'> 🤗</span>
          </h1>
          <span className='capitalize text-gray-400'>enter your email and password</span>
          <Link href="/Register" className='absolute transition-all hover:bg-white hover:text-[--secondary-color] border border-[--secondary-color]  top-2 right-2 px-1 py-2 md:px-3 md:py-[4px] text-white rounded-full capitalize font-bold bg-[--secondary-color]'>sign up</Link>
          <div className='relative w-full   '>
            <div className='absolute left-[20px] border-r border-[--secondary-color] pr-2 -translate-y-[50%] top-[50%]'>
              <MdOutlineMarkEmailUnread size={28} />

            </div>
            <input className='w-full pl-[60px]  ' onChange={getData} type="email" name="email" id="email" />
            <span className='absolute select-none pt-[4px] pb-[2px] capitalize -top-[2px] text-[14px] text-gray-400 left-[64px]'>email</span>

          </div>

          <div className='relative w-full  '>
            <div className='absolute left-[20px] border-r border-[--secondary-color] pr-2 -translate-y-[50%] top-[50%]'>
              <RiLockPasswordLine size={28} />

            </div>
            <input className='w-full pl-[60px]  '
              onChange={getData}
              type={show ? "text" : "password"}
              name="password"
              id="password" />
            <div onClick={handleShow} className='absolute cursor-pointer top-[50%] -translate-y-1/2 right-[10px]'>
              {
                show ? <VscEyeClosed /> : <VscEye />
              }

            </div>
            <span className='absolute pt-[4px] pb-[2px] capitalize -top-[2px] text-[14px] select-none text-gray-400 left-[64px]'>password</span>

          </div>

          <Link className='capitalize transition-all hover:text-[#f5522d]  text-[--secondary-color] ml-auto' href="/Forgetpassword">forget password ?</Link>

          <button className='px-2 py-2 capitalize border-2 transition-all text-white rounded-full hover:bg-white hover:border-2 hover:border-[--secondary-color] hover:text-[--secondary-color] w-[80%] m-auto bg-[--secondary-color] font-bold'>
            {loadding ? <FaSpinner className="mx-auto text-[22px] animate-spin" /> : "login"}
          </button>
        </form>

      </div>
    </div>
  </>
}

export default Login