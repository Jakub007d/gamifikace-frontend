async function fetchOkruh(okruhID: String): Promise<Okruh[]> {
  try {
    const response = await fetch(
      "http://127.0.0.1:8000/okruhs/byID?format=json&okruhID=" + okruhID
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}
export default fetchOkruh;
