import { useQuery } from "react-query";
import apiClient from "../services/axiosConfig";

const fetchItemsCount = async () => {
  const response = await apiClient.get(`/carts/items_count`);
  return response.data.total;
};

const useCartQuantity = () => {
  return useQuery(["cartQuantity"], () => fetchItemsCount());
};

export default useCartQuantity;
