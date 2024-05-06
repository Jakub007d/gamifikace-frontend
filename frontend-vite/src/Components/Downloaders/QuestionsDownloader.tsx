import { API_URL } from "@/src/constants";
import { Question } from "@/src/props/Props";
//Funkcia pre získanie otázok pre okruh.
async function fetchQuestions(okruhID: String): Promise<Question[]> {
  try {
    const response = await fetch(
      API_URL + "/question/querry?format=json&okruhID=" + okruhID
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}
export default fetchQuestions;
