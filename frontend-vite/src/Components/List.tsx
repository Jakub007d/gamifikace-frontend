import { MouseEvent, useState } from "react";
interface Props {
  items: Question[];
  heading: string;
  //(item: string) => parrent daco chce zistit
  onSelectItem: (item: number) => void; //OnClick
}
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
function List({ items, heading, onSelectItem }: Props) {
  const [selectedIndex, setSelectedIndex] = useState("");
  const handleClick = (event: MouseEvent) => console.log(event);
  return (
    <>
      <h1>{heading}</h1>
      {items.length === 0 && <p>No item found</p>}
      <ul className="list-group">
        {items.map((item, index) => (
          <button
            key={item.id}
            className="list-group-item list-group-item-action list-group-item-primary"
            onClick={() => {
              setSelectedIndex(item.id);
              onSelectItem(index);
            }}
          >
            {item.name}
          </button>
        ))}
      </ul>
    </>
  );
}

export default List;
