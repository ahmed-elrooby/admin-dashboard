"use client"
import React from 'react'
import { ThemeProvider as NextThemeProvider } from 'next-themes'
const ThemeProvider = ({children}) => {
  return (
    <NextThemeProvider attribute="class" enableSystem defaultTheme='system'>
        {children}
    </NextThemeProvider>
  )
}

export default ThemeProvider