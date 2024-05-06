import {
  Avatar,
  Checkbox,
  CircularProgress,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import fetchCourses from "../../Downloaders/CoursesDownloader";
import uploadVisitedCourse from "../../Uploaders/VisitedCourseAddUploader";
import removeVisitedCourse from "../../Uploaders/RemoveVisitedCourseUploader";
import fetchCourseByID from "../../Downloaders/CoursesByUserID";
interface Props {
  userID: string;
}
/**
 * AddFavoriteCourses je zobrazenie rozhrania pre pridávanie oblúbených predmetov..
 * @param {object} props - object typu props.
 * @param {string} props.userID - ID aktuálneho užívateľa.
 * @returns {JSX.Element} - Vracia funkčnú komponentu AddFavoriteCourses.
 */
export const AddFavoriteCourses = ({ userID }: Props) => {
  const queryClient = useQueryClient();
  function handleToggle(value: number, state: boolean) {
    const currentIndex = checked.indexOf(value);
    const newChecked = checked;

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
      setChecked(newChecked);
    }
    if (state) {
      uploadVisitedCourse(userID, value.toString(), queryClient);
    }
    if (!state) {
      removeVisitedCourse(userID, value.toString(), queryClient);
    }
    setChecked(newChecked);
  }
  const [checked, setChecked] = React.useState([-2]);

  const { status, data: courses } = useQuery({
    queryKey: ["course"],
    queryFn: () => fetchCourses(),
  });
  const { status: user_courses_status, data: user_courses } = useQuery({
    queryKey: ["userCourses"],
    queryFn: () => fetchCourseByID(userID),
  });
  if (user_courses_status === "success") {
    for (var i = 0; i < user_courses.length; i++) {
      const currentIndex = checked.indexOf(+user_courses[i].id);
      if (currentIndex === -1) checked.push(+user_courses[i].id);
      else continue;
    }
  }
  if (status === "success" && user_courses_status === "success")
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <List
          dense
          sx={{ bgcolor: "background.paper" }}
          style={{ marginTop: "10px", width: "80%" }}
        >
          {courses.map((value, id) => {
            const labelId = `checkbox-list-secondary-label-${value}`;
            return (
              <ListItem
                key={value.id}
                secondaryAction={
                  <Checkbox
                    edge="end"
                    onChange={(_, state) => handleToggle(+value.id, state)}
                    checked={checked.indexOf(+value.id) !== -1}
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                }
                disablePadding
              >
                <ListItemButton>
                  <ListItemAvatar>
                    <Avatar {...stringAvatar(value.name)} />
                  </ListItemAvatar>
                  <ListItemText
                    id={labelId}
                    primary={`${value.name}`}
                    secondary={`${value.full_name}`}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </div>
    );
  else
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <CircularProgress />
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
