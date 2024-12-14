"use client"
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
const router = useRouter()



  //  ________________________________________________________________________________________
//login
const [user, setUser] = useState(
    {
      email: "",
      password: "",
    }
  )
  const [isLoggedIn, setIsLoggedIn] = useState(false)

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
      const { data } = await axiosInstance.post(`/api/Auth/login`, user);
      console.log("token of admin   " + data.data.token)
console.log(`id of user here ${data.data.id}`)
   
      if (data.isSuccess ) {
        Cookies.set("tokenUser", data.data.token, {path: "/"} );
        Cookies.set("RefreshtokenUser", data.data.refreshToken, { path: "/" });
        Cookies.set("adminId", data.data.id)
        toast.success(data.message);
        setIsLoggedIn(true)
console.log(isLoggedIn)
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
  
// ______________________________________________________________________________________________________________________
  //get data of user 
  const [dataOfAdmin, setDataOfAdmin] = useState("")
  const getUser = async () => {
    
    try {
      const idOfAdmin = Cookies.get("adminId")
      const { data } = await axiosInstance.get(`/api/Admin/${idOfAdmin}`);
         setDataOfAdmin(data.data) 
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };

useEffect(() => {
    getUser()
 


}, [isLoggedIn])




// _________________________________________________________________________________
//get all products 
const getAllProducts =async ()=>{
  const {data} =await axiosInstance.get("/api/Product");
setProducts(data.data);
}


// _________________________________________________________________________________________________
//images
const [images, setImages] = useState([]);
const fetchImages = async () => {
  try {
    const { data } = await axiosInstance.get("/api/ProductImage");
    setImages(data.data); 
  } catch (error) {
    console.log("Failed to fetch images", error);
  }
};

// ____________________________________________________________________________________________________
// get all orders
const [orders, setOrders] = useState(null);
const [customerId, setCustomerId] = useState("")
const getAllOrders = async ()=>{
  try{
    const {data} = await axiosInstance.get("/api/Order");
    setOrders(data.data)
    setCustomerId(data.data.customerId)
  }catch(error){
    console.log(error)
  }

}
// ______________________________________________________________________________________________________________________
// get customer by id 
const [userName, setUserName] = useState([])
const getCustomerId = async ()=>{
  try{
    const {data} = await axiosInstance.get(`/api/Customer/${customerId}`);
    console.log(data)
    setUserName(data.data)
  }catch(err){
    console.log(err)
  }
 
}
// ______________________________________________________________________________________________________________________
// get categories
const [categories, setCategories] = useState(null)
const getAllCategories = async ()=>{
  try{
    const {data} = await axiosInstance.get("/api/Category");
    setCategories(data.data);
  }catch(e){
    console.log(e)
  }

  
}



// _______________________________________________________________________________
// get all customers
const [allCustomers, setAllCustomers] = useState(null)
const getAllCustomers = async ()=>{
  try{
    const {data} = await axiosInstance.get("/api/Customer");
    setAllCustomers(data.data)
    console.log(data.data)

  }catch(err){
    console.log(err)
  }

}
















useEffect(() => {
  getAllCategories();
  fetchImages();
  getAllProducts();
  getAllOrders();
  getCustomerId();
  getAllCustomers();

}, [])
    return <context.Provider value={{allCustomers,setIsLoggedIn,isLoggedIn,dataOfAdmin,orders,userName,loadding,setLoadding,categories,getAllCategories,images,fetchImages,setImages,getAllProducts,products,setProducts ,getData,makeReg,loadding,setCategories}}>
    {children}
    </context.Provider>
}

export default ContextData;