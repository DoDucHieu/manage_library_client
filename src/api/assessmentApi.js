import axiosConfig from "./axiosConfig";

export const assessmentApi = {
  getAll: () => axiosConfig.get("/get-all-assessment"),
  create: (body) => axiosConfig.post("/add-assessment", body),
  update: (body) => axiosConfig.put("/update-assessment", body),
  delete: (body) => axiosConfig.delete("/delete-assessment", body),
};