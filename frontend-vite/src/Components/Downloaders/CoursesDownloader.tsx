import { API_URL } from "@/src/constants";

async function fetchCourses(): Promise<Course[]> {
  try {
    const response = await fetch(API_URL + "/courses/?format=json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}
export default fetchCourses;