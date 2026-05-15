import { apiRequest } from "./api";

export const getCart = async () => {
  return apiRequest("/cart");
};

export const addToCart = async (productId, quantity) => {
  return apiRequest("/cart/add", {
    method: "POST",
    body: JSON.stringify({ productId, quantity }),
  });
};

export const removeFromCart = async (productId) => {
  return apiRequest(`/cart/${productId}`, {
    method: "DELETE",
  });
};