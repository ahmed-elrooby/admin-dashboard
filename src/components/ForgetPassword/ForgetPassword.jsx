"use client"
import axiosInstance from "@/_utils/axiosInstance";
import { context } from "@/Providers/Context/ContextData";
import Joi from "joi";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
import {  MdOutlineMarkEmailUnread } from "react-icons/md";


const ForgetPassword = () => {
    const { loadding } = useContext(context);

    // /api/Auth/forgot-password
const [email, setEmail] = useState("")
const PostEmail =async ()=>{
  const {data} = await axiosInstance.post(`/api/Auth/forgot-password`,{email})
console.log(data)
if(data.isSuccess){
  toast.success(data.message)
}
}
const  reg = (e) => {
  e.preventDefault();
  const schema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
 
  });
  const joiresponse = schema.validate({email}, { abortEarly: false });
  if (joiresponse.error === undefined) {
PostEmail()


} else {
  toast.error("Invalid email! Please enter a valid email address.");

  }
};




  return <>
  <div className="my-[100px] w-[90%] mx-auto">



<div >
<form onSubmit={reg}  className='flex mx-auto  relative px-6 py-10 bg-white dark:bg-[#171717] flex-col gap-5 rounded-lg w-full md:w-[60%] ' action="">
<h1 
  className="capitalize w-fit mb-7 text-[--secondary-color] relative after:absolute text-[22px] font-bold after:-bottom-2 after:left-0 after:content-[''] after:w-1/2 after:h-[4px] after:bg-[--secondary-color] after:rounded-full"
   >
  Reset Password
  </h1>
<div className='relative w-full   '>
            <div className='absolute left-[20px] border-r border-[--secondary-color] pr-2 -translate-y-[50%] top-[50%]'>
              <MdOutlineMarkEmailUnread size={28} />


            </div>
            <input onChange={(e)=>{setEmail(e.target.value)
            }} className='w-full pl-[60px]  '  type="email" name="email" id="email"   />
            <span className='absolute select-none pt-[4px] pb-[3px] capitalize -top-[5px] text-[14px] text-gray-400 left-[64px]'>email</span>

          </div>
               
          <button className='px-2 py-2 capitalize border-2 transition-all text-white rounded-full hover:bg-white hover:border-2 hover:border-[--secondary-color] hover:text-[--secondary-color] w-[80%] m-auto bg-[--secondary-color] font-bold'>
            {loadding ? <FaSpinner className="mx-auto text-[22px] animate-spin" /> : "send email"}
          </button>
  </form> 
</div>
  </div>
  
  </>
}

export default ForgetPassword
