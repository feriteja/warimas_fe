import axios from "axios";

const fetchProducts = async (search: string) => {
  const res = await axios.get(
    `/api/search?query=${encodeURIComponent(search)}`
  );
  const data = await res.data;
  return data;
};
