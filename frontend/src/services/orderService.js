import { apiRequest } from "./api";

export const createOrder = async (orderData) => {
  return apiRequest("/orders", {
    method: "POST",
    body: JSON.stringify(orderData),
  });
};

export const getOrders = async () => {
  return apiRequest("/orders");
};

export const createCheckoutSession = async (orderId) => {
  return apiRequest("/checkout/create-session", {
    method: "POST",
    body: JSON.stringify({ orderId }),
  });
};

export const getAllOrders = async () => {
  return apiRequest("/orders/all");
};
