import { API_URL } from "@/src/constants";
import axios from "axios";
async function fetchUser(access_token: String): Promise<string> {
  try {
    const { data } = await axios.post(API_URL + "/user/", {
      access_token: access_token,
    });
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return "ERR";
  }
}
export default fetchUser;
