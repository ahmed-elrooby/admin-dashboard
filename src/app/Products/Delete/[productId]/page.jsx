"use client"
import axiosInstance from '@/_utils/axiosInstance'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import React, {  useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const page = ({params}) => {
    const [deleteProduct, setDeleteProduct] = useState(null)
    const {productId} = React.use(params)
console.log(productId)
    const router = useRouter()
   

    useEffect(() => {
      const getProductById = async ()=>{
        try{
            const {data} = await axiosInstance.get(`/api/Product/${productId}`);
setDeleteProduct(data.data)
        }catch(err){
            console.log(err)
          }
               }
               getProductById();
    }, [])
    

    const deletedProduct = async ()=>{
        try{
            const {data}  = await axiosInstance.delete(`/api/Product/${productId}`,{
                headers:{
                    Authorization: `Bearer ${Cookies.get("tokenUser")}`,
                  }
            });
            if(data.isSuccess){
                router.push("/Products")
                toast.success(`${deleteProduct.name} deleted successfully`)
            }
        }catch(err){
            console.log(err)
        }
       
    }

    return <>
    <div className='bg-white w-[80%] mx-auto p-4 rounded-lg'>
        <h1 className=' block mx-auto text-center capitalize text-[25px] font-bold text-[--secondary-color]'>do you went to delete {deleteProduct?.name}   </h1>
        <div className='mt-[40px] flex justify-center gap-2 items-center'>
        <button onClick={()=>{router.push("/Products")}} className='bg-slate-400 capitalize border  text-[20px] text-white py-[2px] px-[30px] rounded-lg font-bold'>no</button>

            <button onClick={()=>{deletedProduct()}} className='bg-red-500 capitalize border  text-[20px] text-white py-[2px] px-[30px] rounded-lg font-bold'>yes</button>

        </div>
    </div>
  </>
}

export default page