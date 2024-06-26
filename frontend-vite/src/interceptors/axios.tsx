import axios from "axios";
import { API_URL } from "../constants";

let refresh = false;
/** Interceptor ktorý pri uplinutí platnosti tokenu požiada o nový (Nefunguje)*/
axios.interceptors.response.use(
  (resp) => resp,
  async (error) => {
    if (error.response.status === 401 && !refresh) {
      refresh = true;
      console.log(localStorage.getItem("refresh_token"));
      const response = await axios.post(
        API_URL + "/token/refresh/",
        {
          refresh: localStorage.getItem("refresh_token"),
        },
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.status === 200) {
        axios.defaults.headers.common["Authorization"] = `Bearer 
        ${response.data["access"]}`;
        localStorage.setItem("access_token", response.data.access);
        localStorage.setItem("refresh_token", response.data.refresh);

        return axios(error.config);
      } else {
        alert(response);
      }
    } else {
      alert(error);
    }
    refresh = false;
    return error;
  }
);
