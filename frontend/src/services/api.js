import axios from "axios";
import config from "../config";

const api = axios.create({
    baseURL: config.backendUrl,
});

api.interceptors.request.use((request) => {
    const token = localStorage.getItem("access_token"); 
    if (token) {
        request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
});

export const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post("/files/upload", formData);
    return response.data;
};

export const getUserFiles = async () => {
    const response = await api.get("/files/my-files");
    return response.data;
};

export const login = async (email, password) => {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
};

export const register = async (email, password) => {
    const response = await api.post("/auth/register", { email, password });
    return response.data;
};

export const getUserDetails = async () => {
    const response = await api.get("/auth/user-details");
    console.log(response.data);
    
    return response.data;
};

export const shareFile = async (file_name, shared_with_email, permission) => {
    const res = await api.post("/share/share-file", {
      file_name,
      shared_with_email,
      permission,
    });
    return res.data;
  };

  export const getSharedFiles = async () => {
    const res = await api.get("/share/shared-files");
    return res.data;
  };

  
export default api;