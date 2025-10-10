import axios from "axios";

const privateApi = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});


privateApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


privateApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refresh = localStorage.getItem("refresh");
        const res = await axios.post("http://127.0.0.1:8000/api/token/refresh/", {
          refresh,
        });

        localStorage.setItem("access", res.data.access);

        originalRequest.headers.Authorization = `Bearer ${res.data.access}`;
        return privateApi(originalRequest);

      } catch (refreshError) {
        console.error("Refresh token failed", refreshError);
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
      }
    }

    return Promise.reject(error);
  }
);

export default privateApi;
