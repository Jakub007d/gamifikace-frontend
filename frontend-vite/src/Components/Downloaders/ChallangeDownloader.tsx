async function fetchChallange(courseID: string): Promise<Question[]> {
  try {
    const response = await fetch(
      "http://127.0.0.1:8000/challange/querry?format=json&courseID=" + courseID
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}
export default fetchChallange;
