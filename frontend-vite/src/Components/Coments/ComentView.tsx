import { useQuery } from "@tanstack/react-query";
import React from "react";
import fetchUserName from "../Downloaders/UserNameByIDDownloader";
interface Props {
  userID: string;
  commentID: string;
}
export const ComentView = ({ userID, commentID }: Props) => {
  const { status, data: name } = useQuery({
    queryKey: [userID, commentID],
    queryFn: () => fetchUserName(userID),
  });
  if (status === "success") {
    return <h5>{name[0].username}</h5>;
  } else if (status === "pending") return <h5>...</h5>;
  else return <h5>ERROR</h5>;
};
