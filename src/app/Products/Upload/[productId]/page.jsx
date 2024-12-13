"use client"
import axiosInstance from '@/_utils/axiosInstance'
import { context } from '@/Providers/Context/ContextData'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { FaSpinner } from 'react-icons/fa'
import { FiUpload } from 'react-icons/fi'

 const page = ({params}) => {
    const {setImages,setLoadding,loadding} = useContext(context)
    const { productId } = React.use(params);
    const [alt, setAlt] = useState("");
    const [files, setFiles] = useState()
    const router = useRouter()

const [img, setImg] = useState(null)
    const handleChange = (e)=>{
        const file = e.target.files[0];
        setImg(URL.createObjectURL(file)); 
        setFiles(file)

    }
    const handleSubmitImage = async (e)=>{
        e.preventDefault();

        if (!img ) {
            toast.error("No image selected!");
            return;
          }else if(!alt){
            toast.error("Please provide an alt text for the image!");
            return;
          }
          setLoadding(true)
          const formData = new FormData();
        formData.append("ProductId", productId); 
        formData.append("ImageFile", files);
        formData.append("AltText", alt);
        formData.append("DisplayOrder", 1);
        try{
            const {data} = await axiosInstance.post("api/ProductImage",formData)
if(data.isSuccess){
    toast.success("Product image created successfully")
    router.push("/Products")
    setImages((prevImages) => [...prevImages, data.data]);

}
        }catch(err){console.log(err)

        }finally{
            setLoadding(false)
        }



    }


  return <>
<div className='w-[80%] mx-auto '>
    <form action="" onSubmit={handleSubmitImage} >


    <div className='flex flex-col items-center justify-center gap-2 mb-4'>
<h1 className='font-bold text-[22px] capitalize text-[--secondary-color] '>upload your image </h1>
<p className='capitalize text-[18px] text-gray-400'>image should be jpg, png</p>
</div>



    <div className='border-[3px] flex flex-col justify-center items-center gap-4 p-4 rounded-lg border-dashed border-[--secondary-color]'>
{
    img?<Image src={img} alt="Selected" width={140} height={140} className="mt-4 rounded-lg border border-[--secondary-color]  object-cover" />:    <FiUpload  className='font-bold text-[30px] md:text-[67px] text-[--secondary-color]'/>

}
<div className='flex flex-col gap-2 items-start'>
<label className='text-gray-400 capitalize' htmlFor="alt">write name of image here</label>
<input type="text" name="alt" id="alt" placeholder='alt properity' className='py-1 border px-2' onChange={(e)=>{
    setAlt(e.target.value)
}} />
</div>
<div className='w-fit capitalize font-bold border-2 bg-red-500 text-white py-2 px-4 cursor-pointer rounded-lg'>
          <label className=' cursor-pointer   rounded-lg text-white font-bold flex  gap-2 items-center justify-center '>
             <div>Browser</div>
             <input type="file" onChange={handleChange}   className='hidden'/>


          </label>
</div>

<button type="submit"  className='cursor-pointer border-2 border-[--secondary-color] p-2 rounded-lg capitalize transition-all hover:bg-[--secondary-color] hover:text-white font-bold text-[--secondary-color]' >
    {loadding?<FaSpinner className="mx-auto text-[22px] animate-spin" />:"upload"}
</button>

    </div>
    </form>

  </div>
  
  </>
}
export default page;
