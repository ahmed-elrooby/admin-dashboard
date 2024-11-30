"use client"
import axios from "axios";
import Joi from "joi";
import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import axiosInstance from "@/_utils/axiosInstance";

export const context = createContext();

const ContextData = ({children})=>{
    const [loadding, setLoadding] = useState(false)
    const [products, setProducts] = useState(null)
const [token, setToken] = useState(Cookies.get("user") )
const router = useRouter()
   const baseUrl = "http://e-commerce-api.runasp.net/api/";


//login 
const [user, setUser] = useState(
    {
      email: "",
      password: "",
    }
  )

  //to get data from user 
  const getData = (e) => {
    const userName = e.target.name;
    const userValue = e.target.value;
    const newUser = { ...user }
    newUser[userName] = userValue;
    setUser(newUser);
  }
  // call api 

  const postData = async () => {
    setLoadding(true)
    try {
      const { data } = await axios.post(`${baseUrl}Auth/login`, user);
      console.log(data)
   
      if (data.isSuccess === true) {
        Cookies.set("tokenUser", data.data.token, { path: "/" ,secure: true});
        Cookies.set("RefreshtokenUser", data.data.refreshToken, { path: "/" });
        localStorage.setItem("token",data.data.token)
        toast.success(data.message);
        router.push("/")
     
      } else {
        toast.error("error")

      }
      console.log(data)
    }
    catch (error) {
        console.log(error)
        
      }
    finally {
      setLoadding(false)
    }
  }
  // regular expression
  const makeReg = (e) => {
    e.preventDefault();
    const schema = Joi.object({
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }).required(),
      password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{6,}$/).required(),

    })

    const res = schema.validate(user, { abortEarly: false })
    if (res.error === undefined) {
      postData();
     
    } else {
      toast.error("incorrect password or email")
    }
  }
  const logout = ()=>{
    Cookies.remove("user");
    setToken(null)
    router.push("/Login");
  }


//get all products 
const getAllProducts =async ()=>{
  const {data} =await axiosInstance.get("/api/Product");
setProducts(data.data);
console.log(data.data)
}
useEffect(() => {
  getAllProducts()
}, [])





    return <context.Provider value={{baseUrl,products ,token,logout,getData,makeReg,loadding}}>
    {children}
    </context.Provider>
}

export default ContextData;