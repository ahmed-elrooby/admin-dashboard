"use client"
import axiosInstance from '@/_utils/axiosInstance'
import { context } from '@/Providers/Context/ContextData'
import { useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FaSpinner } from 'react-icons/fa'

const page = ({ params }) => {
    const [deleteProduct, setDeleteProduct] = useState([])
const {getAllProducts,setLoadding,loadding} = useContext(context);
    const { productId } = React.use(params)
      const [imageId, setImageId] = useState(null)

    const router = useRouter()


    useEffect(() => {
        const getProductById = async () => {
            try {
                const response = await axiosInstance.get(`/api/Product/${productId}`);
                setDeleteProduct(response.data.data)
            } catch (err) {
                console.log(err)
            }
        }
        getProductById();
    }, [])


    const deletedProduct = async () => {
        setLoadding(true)

        try {
            const {data} = await axiosInstance.delete(`/api/Product/${productId}`);
            if(data.isSuccess){
                getAllProducts()
                router.replace("/Products")
                toast.success(`${deleteProduct.name} deleted successfully`)
            }
            
        } catch (err) {
            toast.error(`Faild to delete product "${deleteProduct.name}" `)
        }finally{
            setLoadding(false)
        }

    }
// ______________________________________________________________________

    //delete image 
    const getProductById =async ()=>{
        try{
            const {data} = await axiosInstance.get(`/api/ProductImage/product/${productId}`)
            setImageId(data?.data[0]?.imageId);
        }catch(err){console.log(err)} 
       
        
        
      }
      
       useEffect(() => {
        getProductById();
       }, [])

const deletedImage = async ()=>{
    try{
        const {data} = await axiosInstance.delete(`/api/ProductImage/${imageId}`)

    }catch(err){
        console.log(err)
    }

}

    return <>
     <div className=' bg-white dark:bg-[#171717] text-black dark:text-[#ddd] w-[80%] mx-auto p-4 rounded-lg'>
            <h1 className=' block mx-auto text-center capitalize text-[25px] font-bold text-[--secondary-color]'>do you went to delete "{deleteProduct?.name}"  </h1>
            <div className='mt-[40px] flex justify-center gap-2 items-center'>
                <button onClick={
                    (e)=>{
                        deletedProduct();
                        deletedImage();
                    }
                } className='bg-red-400 rounded-sm text-white capitalize px-6 font-bold py-[4px] '>{loadding?<FaSpinner className="mx-auto text-[22px] animate-spin" />:"yes"}</button>
                <button onClick={()=>{router.push("/Products")}} className='bg-gray-600 text-white capitalize font-bold px-6 py-1'>no</button>
            </div>
        </div>
   
    
        
    </>
}

export default page