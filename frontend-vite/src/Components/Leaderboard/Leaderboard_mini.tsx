import { Score } from "@/src/props/Props";
import {
  Avatar,
  Button,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import { useNavigate } from "react-router-dom";
import { FixedSizeList, ListChildComponentProps } from "react-window";

interface Props {
  data: Score[];
  userID: string | undefined;
}
//Funkčná komponenta zobrazujúca menšiu verziu rebríčka využívanej na hlavnej obrazovke.
export const Leaderboard_mini = (
  { data, userID }: Props,
  propr: ListChildComponentProps
) => {
  let navigate = useNavigate();
  function renderRow(props: ListChildComponentProps) {
    const { index, style, data } = props;
    return (
      <>
        {(data[index].user == userID && (
          <ListItem
            style={style}
            key={index}
            component="div"
            disablePadding
            dense
          >
            <ListItemButton
              autoFocus={true}
              style={{ backgroundColor: "lightblue" }}
            >
              <ListItemAvatar>{`${index + 1}`}</ListItemAvatar>
              <ListItemAvatar>
                {data.length > 0 && (
                  <Avatar {...stringAvatar(data[index].username)} />
                )}
              </ListItemAvatar>

              <ListItemText primary={`${data[index].username}`} />
              <ListItemText
                secondary={`${data[index].points} bodov`}
                style={{ textAlign: "end" }}
              />
            </ListItemButton>
          </ListItem>
        )) || (
          <ListItem
            style={style}
            key={index}
            component="div"
            disablePadding
            dense
          >
            <ListItemButton>
              <ListItemAvatar>{`${index + 1}`}</ListItemAvatar>
              <ListItemAvatar>
                {data.length > 0 && (
                  <Avatar {...stringAvatar(data[index].username)} />
                )}
              </ListItemAvatar>

              <ListItemText primary={`${data[index].username}`} />
              <ListItemText
                secondary={`${data[index].points} bodov`}
                style={{ textAlign: "end" }}
              />
            </ListItemButton>
          </ListItem>
        )}
      </>
    );
  }
  return (
    <div
      style={{
        outline: "1px solid",
        borderRadius: "5px",
        backgroundColor: "#e3e1e1",
        marginLeft: "auto",
        marginRight: "auto",
        width: "80%",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <FixedSizeList
        height={250}
        width={"100%"}
        itemSize={46}
        itemData={data}
        itemCount={data.length}
        overscanCount={5}
      >
        {renderRow}
      </FixedSizeList>
      <Button
        variant="contained"
        style={{ marginLeft: "auto", marginRight: "auto" }}
        onClick={() => {
          navigate("/Leaderboard");
        }}
      >
        Detail
      </Button>
    </div>
  );
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
