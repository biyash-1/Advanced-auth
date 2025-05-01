import axios from "axios"
const BASEURL = "http://localhost:5000"
export const axiosInstance = axios.create({
    baseURL: BASEURL,
    headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true
})