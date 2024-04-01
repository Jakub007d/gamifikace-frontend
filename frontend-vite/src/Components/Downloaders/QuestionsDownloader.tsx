async function fetchQuestions(okruhID: String): Promise<Question[]> {
  try {
    const response = await fetch(
      "http://127.0.0.1:8000/question/querry?format=json&okruhID=" + okruhID
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}
export default fetchQuestions;
