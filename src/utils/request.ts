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
    config.headers.common.Authorization = `Bearer ${token}`;
  }
  return config;
});
request.interceptors.response.use((response) => {
  if (response.status !== 200) {
    Toast("服务器错误");
    return response;
  } else {
    return response;
  }
});

function Get(url: string) {
  return new Promise(async (resolve, reject) => {
    await request
      .get(url)
      .then((res) => {
        resolve(res.data);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

function Post(url: string, data: any) {
  return new Promise(async (resolve, reject) => {
    await request
      .post(url, data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

function Delete(url: string, data: any) {
  return new Promise(async (resolve, reject) => {
    await request
      .delete(url, data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

function Put(url: string, data: any) {
  return new Promise(async (resolve, reject) => {
    await request
      .put(url, data)
      .then((res) => {
        resolve(res.data);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

export { Get, Post, Delete, Put, request };
