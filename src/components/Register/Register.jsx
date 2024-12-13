"use client"
import Image from 'next/image'
import React, { useContext, useState } from 'react'
import regImage from "../../images/register.svg"
import Joi from 'joi'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import {  FaSpinner} from "react-icons/fa";
import { VscEye, VscEyeClosed } from 'react-icons/vsc'
import { PiHandWavingLight } from "react-icons/pi";

import Link from 'next/link'
import { context } from '@/Providers/Context/ContextData'
import axiosInstance from '@/_utils/axiosInstance'
const Register = () => {
  const router = useRouter()
const [loadding, setLoadding] = useState(false)
const [show, setShow] = useState(false)

const [user, setUser] = useState(
  {
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    position: ""
  }
)
//to get data from user 
const getData = (e)=>{
  const userName = e.target.name;
  const userValue = e.target.value;
  const newUser = {... user}
newUser[userName] = userValue;
setUser(newUser);
console.log(user)
}
// call api 
const postData = async ()=>{
  setLoadding(true)
 try{
  const {data} = await axios.post(`http://e-commerce-api.runasp.net/api/Auth/register/admin`,user);
  console.log(`data for register ${data}`)
  if(data.isSuccess ){
    toast.success("Admin registered successfully");
router.push("/Login")
  }else{
    toast.error(data.message)

  }
  console.log(data)
 }
 catch(err){
  console.log(err)
 }
 finally{
  setLoadding(false)
 }
}
// regular expression
const makeReg = (e)=>{
  e.preventDefault();
  const schema = Joi.object( {
    username:Joi.string().min(3).required(),
    email:Joi.string().email({minDomainSegments:2,tlds:{allow:["com","net"]}}).required(),
    password:Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{6,}$/).required(),
    firstName:Joi.string().min(3).required(),
    lastName:Joi.string().min(3).required(),
    position:Joi.string().required()
    
  })

  const res = schema.validate(user,{abortEarly:false})
  if(res.error === undefined){
    postData();
    toast.success("Admin registered successfully. Please check your email to confirm your account.")
  }else{
    toast.error("Email is required",
    "Password must be at least 8 characters long")
  }
}
//handle show password
const handleShow = () => {
  setShow((prevShow) => !prevShow)
}
  return <>
  <div className='p-3 mx-auto min-h-screen w-full'>
    <span className='w-[100px] block mx-auto h-[3px] bg-[--secondary-color] rounded-full'></span>
    <div className='flex flex-col md:flex-row  p-4  items-center gap-4'>
        <form onSubmit={makeReg} className='flex dark:bg-[#171717] bg-white rounded-lg  p-6 flex-col gap-3 w-full ' action="">
          <h1 className='text-center flex gap-2 capitalize text-[--secondary-color] text-[20px] md:text-[25px] font-bold'>create account <span className='transition-all animate select-none'><PiHandWavingLight size={36}/></span></h1>
          <span className='capitalize text-[12px] md:text-[17px] text-gray-400'>get starting by creating your new account</span>
        <input onChange={getData} type="text" name="firstName" id="firstName" placeholder='firstName' />
        <input  onChange={getData} type="text" name="lastName" id="lastName" placeholder='lastName' />
            <input  onChange={getData} type="email" name="email" id="email" placeholder='email' />
            <div className='relative w-full  '>
           
            <input className='w-full '
              onChange={getData}
              type={show ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Enter a strong password (e.g., Abc123@)"              />
            <div onClick={handleShow} className='absolute cursor-pointer top-[50%] -translate-y-1/2 right-[10px]'>
              {
                show ? <VscEyeClosed /> : <VscEye />
              }

            </div>

          </div>
            <input    onChange={getData} type="text" name="username" id="username" placeholder='unique username' />
            <input  onChange={getData} type="text" name="position" id="position" placeholder='position' />
            <button className='px-2 py-2 capitalize border-2 transition-all text-white rounded-full hover:bg-white hover:border-2 hover:border-[--secondary-color] hover:text-[--secondary-color] w-[80%] m-auto bg-[--secondary-color] font-bold'>
            {loadding ? <FaSpinner className="mx-auto text-[22px] animate-spin" /> : "sign up"}
          </button>
        </form>
        <div>
            <Image
                    loading='lazy'

            className='w-max object-cover' src={regImage} alt='register' />
           <div className='flex flex-col mt-3 items-center gap-2'>
            <h1 className='md:text-[22px] text-[18px] capitalize font-bold text-[--secondary-color]'>already having an account ?</h1>
            <span className='text-gray-400 capitalize'>we are happy to have you back</span>
            <Link className='w-fit py-1 px-8 rounded-lg capitalize text-white font-bold hover:text-[--secondary-color] hover:bg-white border border-[--secondary-color] bg-[--secondary-color] transition-all ' href="/Login">login</Link>
           </div>
        </div>
    </div>
  </div>
  </>
}

export default Register