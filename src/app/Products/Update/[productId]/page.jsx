"use client"
import axiosInstance from '@/_utils/axiosInstance'
import { context } from '@/Providers/Context/ContextData'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FaSpinner } from 'react-icons/fa'
import { FiUpload } from 'react-icons/fi'

const EditProduct = ({params}) => {
  const{setProducts,categories,fetchImages,loadding,setImages,setLoadding} = useContext(context)

  const [imgFile, setImgFile] = useState()
  const [alt, setAlt] = useState("")
  const router = useRouter();
  const {productId} = React.use(params);
  const [img, setImg] = useState()
  const [imageId, setImageId] = useState("")
  const [title, setTitle] = useState("")
  const [product, setProduct] = useState({
    productId:"",
    name:"",
    description:"",
    shortDescription:"",
    price:"" ,
    compareAtPrice:"",
    costPrice:"",
    status:""

  })
  const getData =(e)=>{
    const productName = e.target.name;
    const productValue = e.target.value;
    const newProduct = {... product};
    newProduct[productName] = productValue;
    setProduct(newProduct);
    console.log(product)
  }

// update img 
const getProductById =async ()=>{
  const {data} = await axiosInstance.get(`/api/ProductImage/product/${productId}`)
  console.log(data.data[0])
  setImageId(data.data[0].imageId);
  setTitle(data.data[0].altText);
  setImg(data.data[0].imageUrl)
  
}

 useEffect(() => {
  getProductById();
 }, [productId])
 

//update image 
const handleChange = (e)=>{
  const file = e.target.files[0];
  if(file){
     setImgFile(file)
  setImg(URL.createObjectURL(file))
  }else{
    toast.error("Please select a valid image file.")
  }
 
  
}

const updateImage = async ()=>{
  const formdata = new FormData();
  formdata.append("ImageId",imageId);
  formdata.append("ImageFile",imgFile);
  formdata.append("AltText",alt);
  formdata.append("DisplayOrder",1)
  try{
    const res = await axiosInstance.put(`/api/ProductImage/${imageId}`,formdata)
    console.log("data of images " + data)
    if (res.data.isSuccess) {
     
      setImages((prev) =>
        prev.map((item) =>
          item.imageId === imageId
            ? { ...item, imageUrl: res.data.data.imageUrl, altText: res.data.data.altText }
            : item
        )
      );
      fetchImages()
      toast.success("Image updated successfully");
    } else {
      toast.error("If you want to update the image, you must update the alt property as well.");
    }
  }catch(err){console.log(err)}
  
}

    
const updateProduct =async ()=>{
  console.log("product id " +productId)
  setLoadding(true)
  try{
    const { data } = await axiosInstance.put(`/api/Product/${productId}`, product);
    
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
    toast.error( err.message)
  }finally{
    setLoadding(false)
  }

}


// اسال علي ان المفروض يظهر المنتج ده تبع انهي كلتيجوري بالظيط ولو عاوز اضيفه لكاتيجوري معين اعمل تي 

// get category for product 
const [selectedCategoryId, setSelectedCategoryId] = useState(null);
const getCategoryProduct = async ()=>{
  const {data} = await axiosInstance.get(`/api/ProductCategory/product/${productId}/categories`);
  console.log(data.data)
}




// add product to category  ==> productid && categoryId

const addProductToCategory = async ()=>{
 
  try{
    const {data} = await axiosInstance.post(`/api/ProductCategory/product/${productId}/category/${selectedCategoryId}`)
    if(data.isSuccess){
      getCategoryProduct()
  
    }
  }catch(err){
    console.log(err)
  }
  
}

//get data of product 
const [oldProduct, setOldProduct] = useState([])
const getProductData = async ()=>{
  const {data} = await axiosInstance.get(`/api/Product/${productId}`)
  setOldProduct(data.data)
  console.log(data.data)
}
useEffect(() => {
  getProductData()
}, [])


useEffect(() => {
  if (oldProduct) {
    setProduct({
      productId:oldProduct.productId,
      name:oldProduct.name,
      description:oldProduct.description,
      shortDescription:oldProduct.shortDescription,
      price:oldProduct.price ,
      compareAtPrice:oldProduct.compareAtPrice,
      costPrice:oldProduct.costPrice,
      status:oldProduct.status
    });
  }
}, [oldProduct]);
  return <>
  <div className='w-full mx-auto'>
    <h1 className=' relative after:absolute after:content-[""] after:w-[50px] w-fit mx-auto after:left-0 after:-bottom-2 after:bg-[--secondary-color] after:transition-all after:hover:w-full after:h-[4px] after:rounded-lg  text-[18px] font-bold text-[--secondary-color] capitalize mb-6 mt-4 md:text-[25px]'>update your product here</h1>
    <form onSubmit={(e)=>{
e.preventDefault();
updateProduct()
updateImage()
addProductToCategory()
    }} className='flex rounded-lg  bg-white dark:bg-[#171717] text-black dark:text-[#ddd] flex-col py-[50px] px-[30px] mx-auto gap-4 w-full md:w-[60%]' action="">
      <input type="text" defaultValue={product.productId} name="productId" id="productId" className='hidden'  />
      <input  onChange={getData} type="text" defaultValue={product.name}  placeholder='product name' name="name" id="name" />
     
      <div className='flex flex-col  gap-3 items-start'>
     <label className='text-[20px] text-[--secondary-color] capitalize font-bold'>
      {img?<Image  src={img} width={100} alt={title} height={100} />:"photos"}
     </label>
        <div className='p-0 m-0'>
          <label className='w-30 text-[20px] cursor-pointer px-2 py-1 capitalize  h-18 rounded-lg text-white font-bold flex  gap-2 items-center justify-center bg-[--secondary-color]'>
            <FiUpload size={24}/>
             <div>upload</div>
             <input type="file"  onChange={handleChange} className='hidden'/>

          </label>
        </div>
        <span className='text-red-500 text-[14px]'>if u went to update image must update alt properity also </span>
        <input onChange={(e)=>setAlt(e.target.value)} required className='w-full'  defaultValue={title}  type="text"  placeholder=' write alt properity ' name="compareAtPrice" id="compareAtPrice"  />

     </div>
       
      
        <select
        className='mb-2 '
          onChange={(e) => setSelectedCategoryId(e.target.value)}
          value={selectedCategoryId || ""}
        >
          <option  value="" disabled>
            Select a category
          </option>
{
  categories?.map((ele)=><option className='bg-transparent dark:bg-[#171717]' key={ele.categoryId} value={ele.categoryId}>{ele.name}</option>)
}          
        </select>
       
     
      <input onChange={getData} type="text" defaultValue={product.description} placeholder='description' name="description" id="description"  />
      <input onChange={getData} type="text" defaultValue={product.shortDescription} placeholder='short description' name="shortDescription" id="shortDescription"  />
      <div className="flex md:flex-row flex-col gap-4 md:gap-x-4 w-full items-center">

      <input onChange={getData} className='w-full md:w-1/2' type="number" defaultValue={product.compareAtPrice} placeholder=' price ' name="compareAtPrice" id="compareAtPrice"  />
      <input onChange={getData} className='w-full md:w-1/2' type="number" defaultValue={product.price} placeholder='discount price' name="price" id="price" />
      </div>
      <div className="flex md:flex-row flex-col gap-4 md:gap-x-4 w-full items-center">

      <input onChange={getData} type="number" className='w-full md:w-1/2' defaultValue={product.costPrice} placeholder='costPrice' name="costPrice" id="costPrice"  />
      <select value={product.status} onChange={getData} name="status" className=" w-full md:w-1/2 border p-3 border-[--secondary-color] rounded">
                <option value="Active">Active</option>
                <option value="Notactive">Not active</option>
            </select>
      </div>
      <div className='flex justify-between'>
      <button className='btn-primary w-fit' type="submit"  >
        {
          loadding?<FaSpinner className="mx-auto text-[22px] animate-spin" />:"update"
        }
      </button>
      <div onClick={()=>{router.push("/Products")}}  className='cursor-pointer btn-primary'>go back</div>
      </div>
    </form>
  </div>
  </>
}

export default EditProduct