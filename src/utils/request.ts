import axios from "axios";
import { Toast } from "vant";

const request = axios.create({
  baseURL: "http://localhost:8008/api",
  timeout: 5000,
});
request.interceptors.request.use((config) => {
  const token = window.localStorage.getItem("accessToken");
  if (token) {
    // @ts-ignore
    config.headers.common.Authorization = token;
  }
  return config;
});
request.interceptors.response.use((response) => {
  const res = response.data;

  if (response.status !== 200) {
    Toast("服务器错误");
    return res;
  } else {
    return res;
  }
});
