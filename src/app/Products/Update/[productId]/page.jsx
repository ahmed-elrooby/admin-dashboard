"use client"
import axiosInstance from '@/_utils/axiosInstance'
import { context } from '@/Context/ContextData'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const EditProduct = ({params}) => {
  const{setProducts} = useContext(context)
  const router = useRouter()
  const {productId} = React.use(params)
  // console.log(productId)
  const [product, setProduct] = useState({
    productId:productId,
    name:"",
    description:"",
    shortDescription:"",
    price:null ,
    compareAtPrice:null,
    costPrice:null,
    status:''

  })
  const getData =(e)=>{
    const productName = e.target.name;
    const productValue = e.target.value;
    const newProduct = {... product};
    newProduct[productName] = productValue;
    setProduct(newProduct);
  }


const updateProduct =async ()=>{
  console.log("product id " +productId)
  try{
    const { data } = await axiosInstance.put(`/api/Product/${productId}`, product,{
      headers:{
        Authorization: `Bearer ${Cookies.get("tokenUser")}`,
      }
    });
    
      if(data.isSuccess){ 
        setProducts((prevProducts) =>
          
          prevProducts.map((item) =>
            item.productId === productId ? data.data : item
          )
        );
                toast.success("Product updated successfully")
        router.push("/Products")
      }
  }catch(err){
    console.log("there are error when u update product" + err)
    toast.error("Please log in first" || err)
  }

}

const handleSubmit =(e)=>{
  e.preventDefault();
  updateProduct()

}

// getdata of product 

useEffect(()=>{
  const getProductData = async ()=>{
    try{
      const {data} = await axiosInstance.get(`/api/Product/${productId}`);
      console.log(data)
      setProduct(data.data)
    }catch(err){
      console.log(err)
    }
   
  }
  getProductData();
},[productId])
  return <>
  <div className='w-full mx-auto'>
    <h1 className=' relative after:absolute after:content-[""] after:w-[50px] w-fit mx-auto after:left-0 after:-bottom-2 after:bg-[--secondary-color] after:transition-all after:hover:w-full after:h-[4px] after:rounded-lg  text-[18px] font-bold text-[--secondary-color] capitalize mb-6 mt-4 md:text-[25px]'>update your product her</h1>
    <form onSubmit={handleSubmit} className='flex rounded-lg bg-white flex-col py-[50px] px-[30px] mx-auto gap-4 w-full md:w-[60%]' action="">
      <input type="text" defaultValue={productId} name="productId" id="productId" className='hidden'  />
      <input  onChange={getData} type="text" defaultValue={product.name}  placeholder='product name' name="name" id="name" />
      <input onChange={getData} type="text" defaultValue={product.description} placeholder='description' name="description" id="description"  />
      <input onChange={getData} type="text" defaultValue={product.shortDescription} placeholder='short description' name="shortDescription" id="shortDescription"  />
      <input onChange={getData} type="number" defaultValue={product.compareAtPrice} placeholder=' price ' name="compareAtPrice" id="compareAtPrice"  />
      <input onChange={getData} type="number" defaultValue={product.price} placeholder='discount price' name="price" id="price" />
      <input onChange={getData} type="number" defaultValue={product.costPrice} placeholder='costPrice' name="costPrice" id="costPrice"  />
      <input onChange={getData} type="text" defaultValue={product.status} placeholder='status' name="status" id="status"  />
      <input className='btn-primary w-fit' type="submit" value="update" />
    </form>
  </div>
  </>
}

export default EditProduct