import { MouseEvent, useState } from "react";
import ComentsList from "./CommentsList";
interface Question {
  id: string;
  name: string;
  text: string;
  approved: boolean;
  visible: boolean;
  created_by: string;
  likes: Number;
  created_at: Date;
  okruh: string;
}
interface Props {
  item: Question;
  //(item: string) => parrent daco chce zistit
}
function QuestionDetail({ item }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const handleClick = (event: MouseEvent) => console.log(event);
  return (
    <>
      <h1>{item.name}</h1>
      <ul className="list-group">
        <li className="list-group-item">{"Text otázky" + item.text}</li>
        <li className="list-group-item">
          {"Otazka schávlená: " + item.approved}
        </li>
        <li className="list-group-item">{"Id " + item.id}</li>
        <ComentsList questionId={item.id} />
      </ul>
    </>
  );
}

export default QuestionDetail;
