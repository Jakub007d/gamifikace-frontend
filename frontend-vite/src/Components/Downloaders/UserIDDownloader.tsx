import axios from "axios";

async function fetchUserID(access_token: String): Promise<string> {
  try {
    const { data } = await axios.post("http://localhost:8000/userID/", {
      access_token: access_token,
    });
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return "ERR";
  }
}
export default fetchUserID;
