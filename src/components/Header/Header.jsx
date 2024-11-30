"use client"
import { context } from '@/Context/ContextData'
import Cookies from 'js-cookie'
import Link from 'next/link'
import React, { useContext, } from 'react'
const Header = () => {
  const {logout} = useContext(context);

let token = Cookies.get("tokenUser")
  return <>
<div>
  <div className='flex items-center   justify-end bg-white px-5 py-3'>
   
    <ul className='flex items-center gap-2'>
   
    {token  ? (
            <li onClick={logout} className='btn-primary cursor-pointer select-none'>
                Log out
            </li>
          ) : (
            <li>
              <Link className='btn-primary' href="/Login">
                Login
              </Link>
            </li>
          )}
    </ul>
  </div>
</div>

  </>
}

export default Header