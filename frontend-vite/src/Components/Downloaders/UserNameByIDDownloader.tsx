import { User } from "lucide-react";

async function fetchUserName(userID: String): Promise<User[]> {
  try {
    const response = await fetch(
      "http://127.0.0.1:8000/user/querry?format=json&user_id=" + userID
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}
export default fetchUserName;
