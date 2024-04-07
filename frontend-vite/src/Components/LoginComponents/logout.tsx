import { API_URL } from "@/src/constants";
import axios from "axios";
import { useEffect } from "react";

async function Logout() {
  localStorage.clear();
  try {
    const { data } = await axios.post(
      API_URL + "/logout/",
      {
        refresh_token: localStorage.getItem("refresh_token"),
      },
      { headers: { "Content-Type": "application/json" } }
    );
    localStorage.clear();
    axios.defaults.headers.common["Authorization"] = null;
    window.location.href = "/login";
  } catch (e) {
    console.log("logout not working", e);
  }
}
export default Logout;
