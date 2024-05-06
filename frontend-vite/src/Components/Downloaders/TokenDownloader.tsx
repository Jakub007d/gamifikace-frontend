import React from "react";
import axios from "axios";
import { API_URL } from "@/src/constants";
//Funkcia pre získanie prihlasovacích tokenov.
async function fetchTokens(
  username: string,
  password: string
): Promise<boolean> {
  const user = {
    username: username,
    password: password,
  };
  var status = false;
  axios
    .post(API_URL + "/token/", user, {
      headers: { "Content-Type": "application/json" },
    })
    .then((response) => {
      localStorage.clear();
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data["access"]}`;
      window.location.href = "/";
      status = true;
    })
    .catch((error) => {
      return false;
    });
  return status;
}
export default fetchTokens;
