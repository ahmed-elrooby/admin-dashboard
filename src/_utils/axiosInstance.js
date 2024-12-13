import axios from "axios";
import dayjs from "dayjs";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode"; 

const baseURL = "http://e-commerce-api.runasp.net";
const axiosInstance = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${Cookies.get("tokenUser")}`,
  },
});

axiosInstance.interceptors.request.use(async (req) => {
  let tokenUser = Cookies.get("tokenUser");
  let refreshTokenuser =Cookies.get("RefreshtokenUser")

  if (!tokenUser) {
    tokenUser = Cookies.get("tokenUser");
    req.headers.Authorization = `Bearer ${tokenUser}`;
  }

  try {
    const user = jwtDecode(tokenUser);
    const isExpired = dayjs().isAfter(dayjs(user.exp * 1000));

    if (isExpired) {
      try {
        const { data } = await axios.post(`${baseURL}/api/Auth/refresh-token`, {
          accessToken:tokenUser ,
          refreshToken: refreshTokenuser,
        });
console.log("data is " + data)
        if (data.isSuccess) {
          console.log("Token refreshed successfully");
          Cookies.set("tokenUser", data.data.token);
          req.headers.Authorization = `Bearer ${data.data.token}`;
        } else {
          console.error("Token refresh failed:", data.message);
        }
      } catch (err) {
        console.log("Error during token refresh:", err);
        
      }
    }
  } catch (err) {
    console.log("Invalid token:", err.message);

  }

  return req;
});

export default axiosInstance;
