"use client";
import axiosInstance from '@/_utils/axiosInstance';
import { context } from '@/Providers/Context/ContextData';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaSpinner } from 'react-icons/fa';
import { FiUpload } from 'react-icons/fi';

const UpdateCategory = ({ params }) => {
  const { categoryId } = React.use(params) ;
  const [oldCategory, setOldCategory] = useState({});
  const [img, setImg] = useState();
  const { getAllCategories, categories,loadding,setLoadding } = useContext(context);
const router = useRouter()
  // Get category by ID
  const getCategoryById = async () => {
    try {
      const { data } = await axiosInstance.get(`/api/Category/${categoryId}`);
      setOldCategory(data.data);
      setImg(data.data.imageUrl);
    } catch (error) {
      console.error("Failed to fetch category data", error);
    }
  };

  useEffect(() => {
    getCategoryById();
  }, []);

  const [updCategory, setUpdCategory] = useState({
    categoryId: "",
    name: "",
    description: "",
    imageFile: null,
    isActive: "",
    parentCategoryId: "",
  });

  useEffect(() => {
    if (oldCategory) {
      setUpdCategory({
        categoryId: oldCategory.categoryId,
        name: oldCategory.name,
        description: oldCategory.description,
        imageFile: "",
        isActive: oldCategory.isActive?.toString(),
        parentCategoryId: oldCategory.parentCategoryId,
      });
    }
  }, [oldCategory]);

  const options = [
    { label: "active", value: true },
    { label: "not active", value: false },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdCategory((prev) => ({ ...prev, [name]: value }));
    console.log(updCategory)
  };

  const handleChangeFile = (e) => {
    setImg(URL.createObjectURL(e.target.files[0]));
    setUpdCategory((prev) => ({ ...prev, imageFile: e.target.files[0] }));
  };

  const updateCategory = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("categoryId", categoryId);
    formData.append("name", updCategory.name);
    formData.append("description", updCategory.description);
    formData.append("imageFile", updCategory.imageFile);
    formData.append("isActive", updCategory.isActive);
    formData.append("parentCategoryId", updCategory.parentCategoryId);

    try {
      setLoadding(true)
      const { data } = await axiosInstance.put(`/api/Category/${categoryId}`, formData);
      if (data.isSuccess) {
        toast.success("Category updated successfully");
        getAllCategories();
        router.push("/Categories");
      }
    } catch (error) {
      toast.error("Failed to update category");
      console.log(error);
    }finally{
      setLoadding(false)
    }
  };

  return (
    <div className="w-[95%] mx-auto">
      <h1 className='mb-6   capitalize text-[--secondary-color] font-bold relative after:absolute after:content-[""] before:content-[""] before:absolute before:bottom-[-4px] before:h-[4px] before:bg-[--main-color] before:w-full before:left-0 after:bottom-[-4px] after:left-0 pb-1 after:rounded-md after:bg-[--secondary-color] before:rounded-md after:w-1/2 after:h-[4px] w-fit'>
        Update Category
      </h1>
      <form onSubmit={updateCategory} className="flex capitalize bg-white dark:bg-[#171717] text-black dark:text-[#ddd] md:w-[90%] w-full mx-auto px-6 py-4 rounded-lg flex-col gap-4">
        <input
          className="hidden"
          value={updCategory.categoryId}
          type="text"
          name="categoryId"
          readOnly
        />
        <input
          onChange={handleChange}
          value={updCategory.name}
          type="text"
          name="name"
          placeholder="Category name"
        />
        <textarea
          onChange={handleChange}
          value={updCategory.description}
          name="description"
          placeholder="Description"
        ></textarea>
        <div className="flex flex-col gap-3 items-start">
          <label className="text-[20px] text-[--secondary-color] capitalize font-bold">
            {img ? <Image src={img} width={100} height={100} alt={oldCategory.name || "Category Image"} /> : "Photos"}
          </label>
          <div className="p-0 m-0">
            <label className="w-30 text-[20px] cursor-pointer px-2 py-1 capitalize h-18 rounded-lg text-white font-bold flex gap-2 items-center justify-center bg-[--secondary-color]">
              <FiUpload size={24} />
              <div>Upload</div>
              <input
                className="hidden"
                onChange={handleChangeFile}
                type="file"
                name="file"
              />
            </label>
          </div>
        </div>
        <select
          onChange={handleChange}
          value={updCategory.isActive}
          name="isActive"
          className="w-full border p-3 border-[--secondary-color] rounded"
        >
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <select className=" w-full  border p-3 border-[--secondary-color] rounded" name="parentCategoryId" id="parentCategoryId" onChange={handleChange}>
                <option value="">No Pparent category</option>
                {categories?.map((ele)=><option key={ele.categoryId} value={ele.categoryId}>{ele.name}</option>)}
            </select>
            <div className='flex justify-between'>
      <button className='btn-primary w-fit' type="submit"  >
        {
          loadding?<FaSpinner className="mx-auto text-[22px] animate-spin" />:"update"
        }
      </button>
      <div onClick={()=>{router.push("/Categories")}}  className='cursor-pointer btn-primary'>go back</div>
      </div>
      </form>
    </div>
  );
};

export default UpdateCategory;
