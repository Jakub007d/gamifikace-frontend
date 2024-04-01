import { API_URL } from "@/src/constants";

async function fetchAnswers(questionID: String): Promise<Answer[]> {
  try {
    const response = await fetch(
      API_URL+"/answer/querry?format=json&questionID=" + questionID
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}
export default fetchAnswers;