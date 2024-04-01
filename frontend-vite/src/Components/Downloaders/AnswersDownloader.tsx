async function fetchAnswers(questionID: String): Promise<Answer[]> {
  try {
    const response = await fetch(
      "http://127.0.0.1:8000/answer/querry?format=json&questionID=" + questionID
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}
export default fetchAnswers;
