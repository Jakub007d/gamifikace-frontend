import { API_URL } from "@/src/constants";
import { Course } from "@/src/props/Props";
//Funkcia pre získanie navštevovaných kurzov užívateľom.
async function fetchCourseByID(userID: string): Promise<Course[]> {
  try {
    const response = await fetch(
      API_URL + "/courses/visited?format=json&user_id=" + userID
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
}
export default fetchCourseByID;
