"use client"
import axiosInstance from '@/_utils/axiosInstance'
import { context } from '@/Providers/Context/ContextData'
import { useRouter } from 'next/navigation'
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { BiSolidErrorAlt } from 'react-icons/bi'
import { FaSpinner } from 'react-icons/fa'
import { GrStatusGood } from 'react-icons/gr'


const AddProducts = () => {
  const { setProducts,setLoadding,loadding } = useContext(context)
  const [product, setProduct] = useState({
    name: "",
    description: "",
    shortdescription: "",
    price: "",
    compareAtPrice: "",
    costPrice: "",
    status: ""
  })

  const router = useRouter()

  //  get datat from user 
  const handleChange = (e) => {
    const productName = e.target.name;
    const productValue = e.target.value;
    if(productName === "shortdescription" && productValue.length > 50){
toast.error("must character of description")
return;
    }
    const data = { ...product };
    data[productName] = productValue;
    setProduct(data)
    console.log(data)
  }

  // send data to bakend 

  const sendData = async () => {
    setLoadding(true)
    try {
      const { data } = await axiosInstance.post("/api/Product", product)
      toast.success("Product created successfully")
      setProducts((prevProducts) => [...prevProducts, data.data]); // هات العناصر القديمه وضيف عليها العناصر الجديده
console.log(data)

      router.push("/Products")
    } catch (err) {
toast.error(`failed to create '${product.name}'`)
    }finally{
      setLoadding(false)
    }

  }

  //handle submit function
  const handleSubmit = (e) => {
    e.preventDefault();
    sendData();
  }
  // ________________________________________________________________________________________________
 
 
 



  return <>
    <div className='h-screen'>
      <form onSubmit={handleSubmit} className='flex dark:bg-[#171717]  bg-white w-[95%] md:w-[80%] mx-auto px-6 py-4 rounded-lg flex-col gap-4'>
        <h1 className='mb-3 capitalize text-[--secondary-color] font-bold relative after:absolute after:content-[""] before:content-[""] before:absolute before:bottom-[-4px] before:h-[4px] before:bg-[--main-color] before:w-full before:left-0 after:bottom-[-4px] after:left-0 pb-1 after:rounded-md after:bg-[--secondary-color] before:rounded-md after:w-1/2 after:h-[4px] w-fit  '>new product </h1>
        <input required onChange={handleChange} type="text" name="name" id="productname" placeholder='product name' />
        <textarea  required onChange={handleChange} name="description" id="description" placeholder=' description'></textarea>
       
        <input maxLength="50" value={product.shortdescription} onChange={handleChange} type="text" id=' shortdescription' name='shortdescription' placeholder='shortdescription'  />
        {product.shortdescription.length >= 50 
  ? <p className='text-red-500 w-fit text-[15px] flex items-center gap-1'>
      <BiSolidErrorAlt /> Description cannot exceed 50 characters
    </p>
  : <p className='text-green-500 w-fit text-[15px] flex items-center gap-1'>
      <GrStatusGood color='green' /> Description is within the limit
    </p>
}

              <p className="text-sm text-gray-500">
               {product.shortdescription.length}/50 characters
            </p>
        <div className="flex md:flex-row flex-col gap-4 md:gap-x-4 w-full items-center">
          <input required onChange={handleChange} className='w-full md:w-1/2' type="number" name="price" id="price" placeholder='price' />
          <input required onChange={handleChange} className='w-full md:w-1/2' type="number" name="compareAtPrice" id="compareAtPrice" placeholder='compareAtPrice' />
        </div>
        <div className="flex md:flex-row flex-col gap-4 md:gap-x-4 w-full items-center">
        <input type="number" onChange={handleChange} className='w-full md:w-1/2' name="costPrice" id="costPrice" placeholder='costPrice' />
        <select onChange={handleChange} name="status" className=" w-full md:w-1/2 border p-3 border-[--secondary-color] rounded">
                <option value="Active">Active</option>
                <option value="Notactive">Notactive</option>
            </select>
</div>
        
        <button className='mr-auto px-6 font-bold text-[20px] py-1 rounded-md hover:bg-white hover:text-[--secondary-color] bg-[--secondary-color] border-2 text-white hover:border-2 hover:border-[--secondary-color] capitalize' type='submit'>
          {loadding?<FaSpinner className="mx-auto text-[22px] animate-spin" />:"add product"}
        </button>
      </form>

    </div>
  </>
}

export default AddProducts