import axiosConfig from "./axiosConfig";

export const bookApi = {
  getAll: () => axiosConfig.get("/get-all-book"),
  getDetail: (id) => axiosConfig.get(`/get-detail-book?id=${id}`),
  create: (body) => axiosConfig.post("/create-book", body),
  update: (body) => axiosConfig.put("/update-book", body),
  delete: (id) => axiosConfig.delete(`/delete-book?id=${id}`),
};
