"use client"
import axiosInstance from '@/_utils/axiosInstance'
import { context } from '@/Providers/Context/ContextData'
import Joi from 'joi'
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { FaSpinner, FaUser } from 'react-icons/fa'
import { TbPasswordUser } from "react-icons/tb";
import { RiLockPasswordLine } from 'react-icons/ri'
import { VscEye, VscEyeClosed } from 'react-icons/vsc'
import { useRouter } from 'next/navigation'


const Changepassword = () => {
    const router = useRouter();
    const [show, setShow] = useState(false);
    const { loadding } = useContext(context);

    const handleShow = () => {
        setShow((prevShow) => !prevShow)
    }

    // get new data 
    const [dataOfUsr, setDataOfUsr] = useState({
        username: "",
        currentPassword: "",
        newPassword: ""
    })
    const getNewData = (e) => {
        const element = e.target.id;
        const valueOfElement = e.target.value;
        const newData = { ...dataOfUsr };
        newData[element] = valueOfElement;
        setDataOfUsr(newData)
        console.log(dataOfUsr)
    }
    // call api
    const postRestPassword = async () => {
        try {
            const { data } = await axiosInstance.post("/api/Auth/change-password", dataOfUsr);
            console.log(data)
            if (data.isSuccess) {
                toast.success(data.message);
                router.push("/")

            } else {
                console.log("error ")
            }

        } catch (e) {
            console.log(e)
        }

    }
    // regExp
    const regExp = (e) => {
        e.preventDefault();
        const schema = Joi.object({
            username: Joi.string().min(5).required(),
            currentPassword:Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{6,}$/).required(),
            newPassword: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{6,}$/).required()
        })
        const res = schema.validate(dataOfUsr, { abortEarly: false })
        console.log(res)
        if (res.error === undefined) {
            postRestPassword()
        } else {
            toast.error("incorrect password or email")
        }
    }

    return <>
        <div className='rounded-lg shadow-lg dark:bg-[#171717] w-[90%] bg-white'>
            <h1
                className='mb-3 pt-5 ml-4   md:text-[18px] text-[18px] capitalize text-[--secondary-color] font-bold relative after:absolute after:content-[""] before:content-[""] before:absolute before:bottom-[-4px] before:h-[4px] before:bg-white before:w-full before:left-0 after:bottom-[-4px] after:left-0 pb-1 after:rounded-md after:bg-[--secondary-color] before:rounded-md after:w-1/2 after:h-[4px] w-fit  '>
                Change password
            </h1>
            <form onSubmit={regExp} action="" className=' w-[90%] p-3 flex flex-col gap-9 '>
                <div className='relative w-full   '>
                    <div className='absolute left-[20px] border-r border-[--secondary-color] pr-2 -translate-y-[50%] top-[50%]'>
                        <FaUser size={28} />

                    </div>
                    <input onChange={getNewData} className='w-full pl-[60px]  ' type="text" name="username" id="username" />
                    <span className='absolute select-none pt-[4px] pb-[2px] capitalize -top-[2px] text-[14px] text-gray-400 left-[64px]'>unique username</span>

                </div>
                <div className='relative w-full  '>
                    <div className='absolute left-[20px] border-r border-[--secondary-color] pr-2 -translate-y-[50%] top-[50%]'>
                        <TbPasswordUser size={28} />

                    </div>
                    <input
                        onChange={getNewData}
                        className='w-full pl-[60px]  '
                        type={show ? "text" : "password"}
                        name="currentPassword"
                        id="currentPassword" />
                    <div onClick={handleShow} className='absolute cursor-pointer top-[50%] -translate-y-1/2 right-[10px]'>
                        {
                            show ? <VscEyeClosed /> : <VscEye />
                        }

                    </div>
                    <span className='absolute pt-[4px] pb-[2px] capitalize -top-[2px] text-[14px] select-none text-gray-400 left-[64px]'>current password</span>

                </div>
                <div className='relative w-full  '>
                    <div className='absolute left-[20px] border-r border-[--secondary-color] pr-2 -translate-y-[50%] top-[50%]'>
                        <RiLockPasswordLine size={28} />

                    </div>
                    <input
                        onChange={getNewData}
                        className='w-full pl-[60px]  '
                        type={show ? "text" : "password"}
                        name="newPassword"
                        id="newPassword" />
                    <div onClick={handleShow} className='absolute cursor-pointer top-[50%] -translate-y-1/2 right-[10px]'>
                        {
                            show ? <VscEyeClosed /> : <VscEye />
                        }

                    </div>
                    <span className='absolute pt-[4px] pb-[2px] capitalize -top-[2px] text-[14px] select-none text-gray-400 left-[64px]'>new password</span>

                </div>

                <div className='flex justify-between gap-5'>
                    <button
                        className='transition-all hover:bg-white dark:hover:bg-[#282828] w-1/2 font-semibold hover:text-[--secondary-color]  bg-[--secondary-color] py-2 capitalize text-white rounded-full'
                    >
                        {loadding ? <FaSpinner className="mx-auto text-[22px] animate-spin" /> : "save"}
                    </button>

                    <div
                    onClick={()=>{router.push("/Profile")}}
                        className='transition-all flex justify-center items-center cursor-pointer hover:bg-white w-1/2 dark:hover:bg-[#282828] font-semibold hover:text-[--secondary-color]  bg-[--secondary-color] p-1 capitalize text-white rounded-full'
                    >cancel</div>
                </div>


            </form>
            <div className='flex flex-col gap-2 ml-2 p-1'>
                <h4 className='text-red-500 capitalize'>password must:</h4>
                <p>- include lower and upper characters</p>
                <p>- include at least 1 number or symbol</p>
                <p>- be at least 8 characters long</p>
                <p>- can not contain spaces and "|" symbol</p>
            </div>
        </div>
    </>
}

export default Changepassword