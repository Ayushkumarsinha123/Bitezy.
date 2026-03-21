import axios from "axios";
const API_URL = 'http://localhost:3000/api/reels';
export const fetchReels = async () => {
  const res = await axios.get(API_URL)
  return res.data;
}

// fetch restro own reels 

export const fetchMyReels= async(token) => {
  const response = await axios.get(`${API_URL}/my-reels`,{
    headers : {
      Authorization : `Bearer ${token}`
    }
  })
  return response.data;
}