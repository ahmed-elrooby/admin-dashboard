"use client"
import axiosInstance from '@/_utils/axiosInstance';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { FaSpinner } from 'react-icons/fa';
import { FiUpload } from 'react-icons/fi';
import { BiSolidErrorAlt } from "react-icons/bi";
import { GrStatusGood } from "react-icons/gr";
import { context } from '@/Providers/Context/ContextData';


const AddCateogory = () => {
   const { setLoadding, loadding, categories, getAllCategories } = useContext(context)
   const router = useRouter();
   const [img, setImg] = useState()
   const [category, setCategory] = useState({
      name: "",
      imageFile: null,
      description: "",
      isActive: "true",
      parentCategoryId: ""
   })

   const handleChange = (e) => {
      const inputName = e.target.id;
      const inputValue = e.target.value;

      if (inputName === "description" && inputValue.length > 40) {
         toast.error("Description cannot exceed 40 characters");
         return;
      }

      const newInput = { ...category };
      newInput[inputName] = inputValue;
      setCategory(newInput);
   }

   const handleChangeFile = (e) => {
      setImg(URL.createObjectURL(e.target.files[0]))
      setCategory((prev) => ({
         ...prev,
         imageFile: e.target.files[0]
      }))
   }

   const handleChanngeSelect = (e) => {
      setCategory((prev) => ({
         ...prev,
         isActive: e.target.value
      }))
   }

   const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("name", category.name);
      formData.append("description", category.description);
      formData.append("imageFile", category.imageFile);
      formData.append("isActive", category.isActive);
      formData.append("parentCategoryId", category.parentCategoryId);

      try {
         setLoadding(true);
         const { data } = await axiosInstance.post("/api/Category", formData);
         if (data.isSuccess) {
            toast.success(`"${category.name}" created successfully`);
            getAllCategories();
            router.push("/Categories");
         }else{
            toast.error("please log in first");

         }
      } catch (err) {
         toast.error(err.response?.data?.data?.message ||  `Failed to create "${category.name}"`);
      } finally {
         setLoadding(false);
      }
   }

   const options = [
      { label: "active", value: true },
      { label: "not active", value: false },
   ];

   return (
      <div className='min-h-screen'>
         <form onSubmit={handleSubmit} className='flex capitalize bg-white dark:bg-[#171717] w-[95%] md:w-[60%] mx-auto px-6 py-4 rounded-lg flex-col gap-4'>
            <h1 className='mb-3 capitalize text-[--secondary-color] font-bold relative after:absolute after:content-[""] before:content-[""] before:absolute before:bottom-[-4px] before:h-[4px] before:bg-[--main-color] before:w-full before:left-0 after:bottom-[-4px] after:left-0 pb-1 after:rounded-md after:bg-[--secondary-color] before:rounded-md after:w-1/2 after:h-[4px] w-fit'>
               new category
            </h1>
            <input
               required
               onChange={handleChange}
               type="text"
               name="name"
               id="name"
               placeholder='category name'
            />

            <textarea
               required
               onChange={handleChange}
               name="description"
               id="description"
               placeholder="description max width 60 characters"
               maxLength="40"
               value={category.description}
            />
                     {category.description.length >= 40 
  ? <p className='text-red-500 w-fit text-[15px] flex items-center gap-1'>
      <BiSolidErrorAlt /> Description cannot exceed 40 characters
    </p>
  : <p className='text-green-500 w-fit text-[15px] flex items-center gap-1'>
      <GrStatusGood color='green' /> Description is within the limit
    </p>
}

              <p className="text-sm text-gray-500">
               {category.description.length}/40 characters
            </p>

            <div className='flex flex-col gap-3 items-start'>
               <label className='text-[20px] text-[--secondary-color] capitalize font-bold'>
                  {img ? <Image src={img} width={120} alt={category.name} height={120} /> : "photos"}
               </label>
               <div className='p-0 m-0'>
                  <label className='w-30 text-[20px] cursor-pointer px-2 py-1 capitalize h-18 rounded-lg text-white font-bold flex gap-2 items-center justify-center bg-[--secondary-color]'>
                     <FiUpload size={24} />
                     <div>upload</div>
                     <input onChange={handleChangeFile} className='hidden' type="file" name="file" id="file" />
                  </label>
               </div>
            </div>

            <select onChange={handleChanngeSelect} id='isActive' name='isActive' className="w-full border p-3 border-[--secondary-color] rounded">
               {options.map((option, idx) => <option key={idx} value={option.value}>{option.label}</option>)}
            </select>

            <select className="w-full border p-3 border-[--secondary-color] rounded" name="parentCategoryId" id="parentCategoryId" onChange={handleChange}>
               <option value="">No Parent category</option>
               {categories?.map((ele) => <option key={ele.categoryId} value={ele.categoryId}>{ele.name}</option>)}
            </select>

            <button className='mr-auto px-6 font-bold text-[20px] py-1 rounded-md hover:bg-white hover:text-[--secondary-color] bg-[--secondary-color] border-2 text-white hover:border-2 hover:border-[--secondary-color] capitalize' type='submit'>
               {loadding ? <FaSpinner className="mx-auto text-[22px] animate-spin" /> : "add category"}
            </button>
         </form>
      </div>
   );
}

export default AddCateogory;
