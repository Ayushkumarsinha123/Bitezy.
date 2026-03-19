import axios from "axios";

export const fetchReels = async () => {
  const res = await axios.get("http://localhost:3000/api/reels")
  return res.data;
}