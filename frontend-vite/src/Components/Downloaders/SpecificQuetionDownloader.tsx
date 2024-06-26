import { API_URL } from "@/src/constants";
import { Question } from "@/src/props/Props";
//Funkcia pre získanie špecifickej otázky
async function fetchQuestionSpecific(question_id: String): Promise<Question[]> {
  try {
    const response = await fetch(
      API_URL + "/question/specific?format=json&questionID=" + question_id
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}
export default fetchQuestionSpecific;
