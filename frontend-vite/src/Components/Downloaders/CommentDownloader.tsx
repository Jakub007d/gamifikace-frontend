async function fetchComments(questionID: String): Promise<Comment[]> {
  try {
    const response = await fetch(
      "http://127.0.0.1:8000/comment/querry?format=json&questionID=" +
        questionID
    );
    const data = await response.json();
    return data;
    console.log(data);
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}
export default fetchComments;
