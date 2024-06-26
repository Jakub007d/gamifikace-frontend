import { API_URL } from "@/src/constants";
import { Okruh } from "@/src/props/Props";
//Funkcia pre získanie okruhov pre kurz.
async function fetchOkruhs(courseID: String): Promise<Okruh[]> {
  try {
    const response = await fetch(
      API_URL + "/okruhs/querry?format=json&courseID=" + courseID
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}
export default fetchOkruhs;
