import { API_URL } from "@/src/constants";
import { Question } from "@/src/props/Props";

async function fetchChallange(courseID: string): Promise<Question[]> {
  try {
    const response = await fetch(
      API_URL + "/challange/querry?format=json&courseID=" + courseID
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}
export default fetchChallange;
