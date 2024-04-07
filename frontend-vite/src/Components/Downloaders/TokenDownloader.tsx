import React from "react";
import axios from "axios";
import { API_URL } from "@/src/constants";
async function fetchTokens(username: string, password: string) {
  const user = {
    username: username,
    password: password,
  }; // Create the POST requuest
  const { data } = await axios.post(API_URL + "/token/", user, {
    headers: { "Content-Type": "application/json" },
  });
  // Initialize the access & refresh token in localstorage.
  localStorage.clear();
  localStorage.setItem("access_token", data.access);
  localStorage.setItem("refresh_token", data.refresh);
  axios.defaults.headers.common["Authorization"] = `Bearer ${data["access"]}`;
  window.location.href = "/";
}
export default fetchTokens;