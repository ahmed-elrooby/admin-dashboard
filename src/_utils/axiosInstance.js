import axios from "axios";
import dayjs from "dayjs";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const baseURL = "http://e-commerce-api.runasp.net";
const tokenUser = Cookies.get("tokenUser");

const axiosInstance = axios.create({
    baseURL,
    headers:{Authorization:`Bearer ${tokenUser}`}
})

axiosInstance.interceptors.request.use(async (req)=>{

if(!tokenUser){
    tokenUser = Cookies.get("tokenUser");

req.headers.Authorization = `Bearer ${tokenUser}`
}
const user = jwtDecode(tokenUser);
const isExpired = dayjs().isAfter(dayjs(user.exp * 1000));

if(!isExpired){ // if token not expired

    return req

}
//else == if token expired

    try{
        const refreshToken = Cookies.get("RefreshtokenUser");

        const {data} = await axios.post(`${baseURL}/api/Auth/refresh-token`,{
            refreshToken:refreshToken
        });
        if (data.isSuccess) {
            Cookies.set("tokenUser", data.data.token);
            req.headers.Authorization = `Bearer ${data.data.token}`;
        } else {
            console.log(error)
        }
    
    }catch(err){
        console.log(err)
    }

return req
})






export default axiosInstance;