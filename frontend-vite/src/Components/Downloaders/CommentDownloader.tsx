async function fetchComments(questionID: String): Promise<Comment[]> {
  try {
    const response = await fetch(
      API_URL + "/comment/querry?format=json&questionID=" + questionID
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
