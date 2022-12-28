import axiosConfig from "./axiosConfig";

export const cartApi = {
  getAll: (userName) => axiosConfig.get(`/get-all-cart?userName=${userName}`),
  create: (body) => axiosConfig.post("/add-to-cart", body),
  delete: (body) => axiosConfig.delete("/remove-from-cart", body),
};
