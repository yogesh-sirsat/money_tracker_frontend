import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/",
});

instance.interceptors.request.use(config => {
    const token = localStorage.getItem('auth_token');
    if (token) {
        config.headers.Authorization = `Token ${token}`;
    }
    return config;
}, error => {
    Promise.reject(error).then(r => r);
});

export default instance;
