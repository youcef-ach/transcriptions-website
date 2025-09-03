import { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const apiUrl = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: apiUrl,
});

const authInterceptor = async (config) => {
  setLoading(true);
  if (localStorage.getItem("access-token")) {
    const token = jwtDecode(localStorage.getItem("access-token"));
    if (token.exp < Math.floor(Date.now() / 1000)) {
      if (localStorage.getItem("refresh-token")) {
        const result = await api.post("/api/token/refresh/", {
          refresh: localStorage.getItem("refresh-token"),
        });
        localStorage.setItem("access-token", result.data.access);
        config.headers.Authorization = `Bearer ${result.data.access}`;
      } else throw new Error("access expired and no refresh token");
    } else
      config.headers.Authorization = `Bearer ${localStorage.getItem(
        "access-token"
      )}`;
  } else throw new Error("no access token");
  return config;
};

export const secureApi = axios.create({
  baseURL: apiUrl,
});

secureApi.interceptors.request.use(authInterceptor);