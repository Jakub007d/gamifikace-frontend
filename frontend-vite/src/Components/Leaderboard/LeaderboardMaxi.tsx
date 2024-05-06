import * as React from "react";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import { Score } from "@/src/props/Props";
import { useQuery } from "@tanstack/react-query";
import fetchScore from "../Downloaders/ScoreDownloader";
import {
  Avatar,
  CircularProgress,
  List,
  ListItemAvatar,
  Typography,
} from "@mui/material";
import fetchUserID from "../Downloaders/UserIDDownloader";
import { useNavigate } from "react-router-dom";

function renderRow(props: ListChildComponentProps) {
  const { index, style } = props;

  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton>
        <ListItemText primary={`Item ${index + 1}`} />
      </ListItemButton>
    </ListItem>
  );
}

interface Props {
  courseID: string;
}
//Funkčná komponenta zobrazujúca rebríček vo veľkom formáte.
export const Leaderboard_maxi = (
  { courseID }: Props,
  propr: ListChildComponentProps
) => {
  let navigate = useNavigate();
  const { status, data: scores } = useQuery({
    queryKey: ["score", courseID],
    queryFn: () => fetchScore(courseID),
  });
  const { status: status_user, data: userID } = useQuery({
    queryKey: ["userID"],
    enabled: !!localStorage.getItem("access_token"),
    queryFn: () => fetchUserID(localStorage.getItem("access_token")!),
  });
  if (status === "success")
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h1>Rebríček</h1>
        <List
          sx={{ width: "80%", bgcolor: "background.paper" }}
          component="div"
          disablePadding
          dense
        >
          {scores.map((score, index) => (
            <>
              {(userID && status_user === "success" && score.user == userID && (
                <ListItemButton
                  key={score.id}
                  disableGutters
                  autoFocus
                  style={{ backgroundColor: "lightblue" }}
                >
                  <ListItemAvatar>{`${index + 1}`}</ListItemAvatar>
                  <ListItemAvatar>
                    <Avatar {...stringAvatar(score.username)} />
                  </ListItemAvatar>
                  <ListItemText primary={`${score.username}`} />
                  <ListItemText
                    secondary={`${score.points} bodov`}
                    style={{ textAlign: "end" }}
                  />
                </ListItemButton>
              )) || (
                <ListItemButton key={score.id} disableGutters>
                  <ListItemAvatar>{`${index + 1}`}</ListItemAvatar>
                  <ListItemAvatar>
                    <Avatar {...stringAvatar(score.username)} />
                  </ListItemAvatar>
                  <ListItemText primary={`${score.username}`} />
                  <ListItemText
                    secondary={`${score.points} bodov`}
                    style={{ textAlign: "end" }}
                  />
                </ListItemButton>
              )}
            </>
          ))}
        </List>
      </div>
    );
  else if (status === "pending") {
    return <CircularProgress />;
  } else {
    return <h1>ERROR</h1>;
  }
};
function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name[0]}${name[1]}`,
  };
}
function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}
