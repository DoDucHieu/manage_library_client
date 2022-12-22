import axiosConfig from "./axiosConfig";

export const cartApi = {
  getAll: () => axiosConfig.get("/get-all-cart"),
  create: (body) => axiosConfig.post("/add-to-cart", body),
  delete: (body) => axiosConfig.delete("/remove-from-cart", body)
};