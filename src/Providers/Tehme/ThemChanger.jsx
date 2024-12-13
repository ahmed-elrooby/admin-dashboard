"use client"
import { useTheme } from 'next-themes'
import React from 'react'
import { IoSunnyOutline } from 'react-icons/io5'
import { MdDarkMode } from 'react-icons/md'

const ThemChanger = () => {
const {theme , setTheme} = useTheme()
  return (
    <div >
       {
  theme === "dark" ? (
<span className=' group'>
<IoSunnyOutline
      size={32}
      className="cursor-pointer transition-all group-hover:scale-[1.3] "
      color="#F97316"
      onClick={() => setTheme("light")}
    />
</span>
  ) : (
    <span className=' group'>
      <MdDarkMode
      size={32}
      className="cursor-pointer transition-all text-gray-500  group-hover:scale-[1.3]"
      onClick={() => setTheme("dark")}
    />
</span>
    
  )
}
    </div>
  )
}

export default ThemChanger