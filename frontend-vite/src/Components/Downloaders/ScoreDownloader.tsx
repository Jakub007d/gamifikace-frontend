async function fetchScore(courseID: string): Promise<Score[]> {
  try {
    const response = await fetch(
      "http://127.0.0.1:8000/score/?format=json&courseID=" + courseID
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching score:", error);
    return [];
  }
}
export default fetchScore;
