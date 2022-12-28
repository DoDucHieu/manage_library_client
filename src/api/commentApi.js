import axiosConfig from "./axiosConfig";

export const commentApi = {
  getAll: (id) => axiosConfig.get(`/get-all-comment?bookId=${id}`),
  create: (body) => axiosConfig.post("/add-comment", body),
  update: (body) => axiosConfig.put("/update-comment", body),
  delete: (body) => axiosConfig.delete("/delete-comment", body),
};
