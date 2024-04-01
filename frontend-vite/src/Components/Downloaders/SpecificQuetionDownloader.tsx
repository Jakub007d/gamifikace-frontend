async function fetchQuestionSpecific(question_id: String): Promise<Question[]> {
  try {
    const response = await fetch(
      "http://127.0.0.1:8000/question/specific?format=json&questionID=" +
        question_id
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}
export default fetchQuestionSpecific;
