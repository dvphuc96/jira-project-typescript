import axios from "axios";
import { history } from "../index";
import { isExpired } from "react-jwt";

export const ACCESS_TOKEN = "accessToken";
export const USER_LOGIN = "userLogin";
export const USER_PROFILE = "userProfile";
export const USER_REGISTER = "userRegister";
const TOKEN_CYBERSOFT =
  "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL2V4cGlyZWQiOiIyLzQvMjA0NiAzOjE2OjM4IFBNIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6ImI5Mzc2NDk3LTE2NzgtNDJlMC1iOGY4LWQ1Y2NhYTAzMjc0ZiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImFkbWluQGdtYWlsLmNvbSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6WyJDX0tIIiwiQU5ZIiwiQ19MTCIsIkNfTE9QIiwiQ19ORCIsIkNIRUNLX01FTlRPUl9MT1AiLCJEX0RBTkgiLCJEX0tIIiwiRF9MTCIsIkRfTkQiLCJGX0dDIiwiRl9MT1AiLCJHRF9MSCIsIktfVFQiLCJOX1FVWUVOIiwiUUxfQkwiLCJRTF9CTSIsIlFMX0NMIiwiUUxfR0MiLCJRTF9ITVQiLCJRTF9LSCIsIlFMX0xUIiwiUUxfVFQiLCJSX0JIIiwiUl9LSCIsIlJfTEwiLCJSX0xPUCIsIlJfTkQiLCJSX1ZMIiwiVV9LSCIsIlVfTEwiLCJVX0xPUCIsIlVfTkQiLCJYX0tIX0wiLCJRTF9MQ04iLCJRTF9US0QiLCJRTF9DSFRMIiwiUUxfUk0iLCJEX0JUIiwiS19DSEVDS19MIiwiUUxfQ0NOIiwiUUxfS0tIViIsIlVfTkdBWV9CSCIsIlFMX0NPTkZJRyJdLCJuYmYiOjE2NzU0OTg1OTgsImV4cCI6MTY3NTUwMjE5OH0.qDwGahgmxsJyfRjjpEUJk3i-fjLHKTCEOs3VKhTMVyo";
export const { saveStore, saveStoreJson, getStore, getStoreJson, removeStore } =
  {
    saveStore: (name: string, stringValue: string) => {
      localStorage.setItem(name, stringValue);
      return stringValue;
    },
    saveStoreJson: (name: string, object: object) => {
      let stringObject = JSON.stringify(object);
      localStorage.setItem(name, stringObject);
      return stringObject;
    },
    getStore: (name: string) => {
      console.log(name);
      if (localStorage.getItem(name)) {
        return localStorage.getItem(name);
      }
      return null;
    },
    getStoreJson: (name: any) => {
      if (localStorage.getItem(name)) {
        return JSON.parse(localStorage.getItem(name) || "{}");
      }
      return null;
    },
    removeStore: (name: any) => {
      if (localStorage.getItem(name)) {
        return localStorage.removeItem(name);
      }
    },
  };

export const https = axios.create({
  baseURL: "https://jiranew.cybersoft.edu.vn",
  timeout: 30000,
});
// Cấu hình cho tất cả các request api

https.interceptors.request.use(
  (config: any) => {
    config.headers = {
      ...(config.headers || {}),
      Authorization: `Bearer ${getStore(ACCESS_TOKEN)}` || "",
      TokenCybersoft: TOKEN_CYBERSOFT || "",
    };
    console.log(config.headers.Authorization);
    console.log(config.headers.TokenCybersoft);
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// Cấu hình cho tất cả các responese api
https.interceptors.response.use(
  (result) => {
    return result;
  },
  (err) => {
    if (err.response?.status === 400 || err.response?.status === 404) {
      history.push("/");
    }
    if (err.response?.status === 401 || err.response?.status === 403) {
      const isMyTokenExpired = isExpired(getStore(ACCESS_TOKEN) || "");
      if (isMyTokenExpired) {
        removeStore(ACCESS_TOKEN);
        removeStore(USER_LOGIN);
        window.location.href = "/login";
      }
      history.push("/login");
    }
    return Promise.reject(err);
  }
);
