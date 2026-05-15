import { apiRequest } from "./api";

export const getProducts = async () => {
  return apiRequest("/products");
};

export const getProductById = async (id) => {
  return apiRequest(`/products/${id}`);
};
