import axiosConfig from "./axiosConfig";

export const userApi = {
    signUp: (body) => axiosConfig.post("/sign-up", body),
    signIn: (body) => axiosConfig.post("/sign-in", body),
    create: (body) => axiosConfig.post("/create-user", body),
    update: (body) => axiosConfig.put("/update-user", body),
    delete: (id) => axiosConfig.delete(`/delete-user/${id}`),
};