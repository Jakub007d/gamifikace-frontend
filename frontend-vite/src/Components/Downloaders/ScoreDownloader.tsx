import { API_URL } from "@/src/constants";

async function fetchScore(courseID: string): Promise<Score[]> {
  try {
    const response = await fetch(
      API_URL + "/score/?format=json&courseID=" + courseID
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching score:", error);
    return [];
  }
}
export default fetchScore;
