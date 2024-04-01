import { API_URL } from "@/src/constants";

async function fetchOkruh(okruhID: String): Promise<Okruh[]> {
  try {
    const response = await fetch(
      API_URL + "/okruhs/byID?format=json&okruhID=" + okruhID
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}
export default fetchOkruh;
