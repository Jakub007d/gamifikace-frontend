import { useEffect, useState } from "react";
import { Comment } from "@/src/props/Props";
interface Props {
  questionId: string;
  //(item: string) => parrent daco chce zistit
}

function ComentsList({ questionId }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const fetchComments = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/comment/querry?format=json&questionID=" +
          questionId
      );
      const data = await response.json();
      setComments(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  return (
    <>
      <button>
        <h2 onClick={fetchComments}>Komentáre</h2>
      </button>
      <ul className="list-group">
        {comments.map((comment: Comment, index) => (
          <li className="list-group-item" key={comment.id}>
            {comment.created_by}: {comment.text} at {comment.question}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ComentsList;
