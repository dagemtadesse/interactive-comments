import { Avatar, Button, Input, Paper, Stack, TextField } from "@mui/material";
import { EventHandler, useContext, useState } from "react";
import { usercontext } from "../App";

export const CommentForm = ({ main }: { main?: boolean }) => {
  const { user, currentComment, commentsDispatch, setCurrentComment } =
    useContext(usercontext);

  const isEditing = currentComment?.user.username == user.username;

  const [content, setContent] = useState(
    !main && isEditing ? currentComment?.content || "" : ""
  );

  const submit = (e: SubmitEvent) => {
    e.preventDefault();

    if (content.trim() != "") {
      commentsDispatch({
        type: isEditing ? "UPDATE" : "ADD",
        payload: {
          parent: main ? undefined : currentComment,
          item: {
            user,
            content,
            id: isEditing ? currentComment.id : Math.random(),
            createdAt: "now",
            score: 0,
          },
        },
      });
    }

    setContent("");
    setCurrentComment(undefined);
  };

  return (
    <Paper sx={{ width: "100%", p: 3, borderRadius: 2 }} elevation={0}>
      <form onSubmit={submit as any}>
        <Stack
          direction={"row"}
          gap={3}
          alignItems="start"
          flexWrap={"wrap"}
          justifyContent={{ xs: "space-between" }}
        >
          <Avatar
            src={user.image.png}
            alt={user.username}
            sx={{ order: { xs: 2, lg: 1 } }}
          />
          <TextField
            multiline
            sx={{
              flexGrow: 1,
              order: { xs: 1, lg: 2 },
              width: { xs: "100%", lg: "auto" },
            }}
            rows={2}
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
          <Button
            size="large"
            variant="contained"
            sx={{ order: 3 }}
            disableElevation
            type="submit"
          >
            {!main && isEditing ? "Update" : "Submit"}
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};
