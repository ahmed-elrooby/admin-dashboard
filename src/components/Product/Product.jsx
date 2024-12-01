"use client"
import { context } from '@/Context/ContextData'
import Link from 'next/link'
import React, { useContext } from 'react'
import { MdAutoDelete } from 'react-icons/md'
import { BiSolidMessageAltEdit } from "react-icons/bi";
import SkeletonProduct from '../SkeletonProduct/SkeletonProduct'

const Product = () => {
  const {products} = useContext(context)
  return<>
  <div className='p-2'>
  <Link href="AddProduct" className='btn-primary'>add new products</Link>
  <table  className='mt-5 w-full mx-auto max-w-full'>
    <thead >
      <th>#</th>
      <th>name</th>
      <th>price</th>
      <th>description</th>
      <th>action</th>
    </thead>
 {
  products?
     <tbody>
  {
    products?.map((product,index)=><tr   key={index}>
      <td>{index + 1}</td>
      <td>{product.name}</td>
      <td className='whitespace-nowrap'>{product.price} EGP</td>
      <td>{product.shortDescription}</td>
      <td className='flex font-bold  items-center  justify-center border-none gap-[2px]'>
      <Link href={`Products/Update/${product.productId}`} className='flex group transition-all  hover:border-[--secondary-color] hover:bg-white hover:text-[--secondary-color] w-full gap-1 items-center bg-[--secondary-color] px-[3px] py-[2px] rounded-sm text-white' >
<h1 className='md:block hidden'>
edit

</h1>
          <BiSolidMessageAltEdit className='block group-hover:scale-[1.5] transition-all text-[20px] md:text-inherit mx-auto'  />


          </Link>

        <Link href={`/Products/Delete/${product.productId}`} className='flex group transition-all  hover:border-[--secondary-color] hover:bg-white hover:text-[--secondary-color] w-full gap-1 items-center bg-[--secondary-color] px-[3px] py-[2px] rounded-sm text-white'>
        <h1 className='md:block hidden'>
        delete

          </h1>
          <MdAutoDelete className='block cursor-pointer text-[22px] group-hover:text-red-500 group-hover:scale-[1.5] transition-all md:text-inherit mx-auto' />

         

        </Link>
      </td>
    </tr>)
  }
</tbody>:<SkeletonProduct />
 }
  </table>
  </div>
  </>
}

export default Product