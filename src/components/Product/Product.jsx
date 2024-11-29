import Image from 'next/image';
import Link from 'next/link'
import React from 'react'
import { BiSolidMessageAltEdit } from "react-icons/bi";
import { MdAutoDelete } from 'react-icons/md';
import regImg from "../../images/register.svg"

const Product = () => {
  return <>
    <div className='mt-[20px]'>
      <div>
        <Link href="AddProduct" className='btn-primary'>add new products</Link>
        <div className=' mt-[20px]  mx-auto'>
          <table className='md:w-[80%] w-full bg-white mx-auto '>
            <thead>
              <tr className='capitalize border-2 text-[20px]  text-[--secondary-color] font-bold'>
                <td > name</td>
                <td>image</td>
                <td >operation</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Electronics</td>
<td><Image className='w-[50px] h-[50px]' src={regImg} alt="productimg"/></td>

                <td >
                  <div className='flex md:flex-row flex-col items-start  gap-1 md:items-center ' >
                    <Link href="/Product/categoryId" className='w-full hover:bg-white border-2 hover:text-[--secondary-color] hover:border-2 hover:border-[--secondary-color] transition-all  text-center justify-center text-[20px] px-2 py-1 text-white font-bold rounded-md items-center gap-1 bg-[--secondary-color] flex'>
                    edit
                    <BiSolidMessageAltEdit className='md:block hidden' />
                  </Link>
                    <Link href="/" className='w-full  text-center justify-center text-[20px] px-2 py-1 transition-all hover:text-red-800 hover:border-2 hover:border-red-800 hover:bg-white border-2 hover text-white font-bold rounded-md items-center gap-1  bg-red-800 flex'>
                      delete
                      <MdAutoDelete className='md:block hidden' />
                    </Link></div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </>
}

export default Product