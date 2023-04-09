import { Avatar, Button, Input, Paper, Stack, TextField } from "@mui/material";
import { useContext } from "react";
import { usercontext } from "../App";

export const CommentForm = ({ main }: { main?: boolean }) => {
  const { user, currentComment } = useContext(usercontext);

  const isEditing = currentComment?.user.username == user.username;

  return (
    <Paper sx={{ width: "100%", p: 3, borderRadius: 2 }} elevation={0}>
      <Stack direction={"row"} gap={3} alignItems="start" flexWrap={'wrap'} justifyContent={{xs: 'space-between'}}>
        <Avatar
          src={user.image.png}
          alt={user.username}
          sx={{ order: { xs: 2, lg: 1 } }}
        />
        <TextField
          multiline
          sx={{ flexGrow: 1, order: { xs: 1, lg: 2 }, width: {xs: '100%', lg: 'auto'} }}
          rows={2}
          value={!main && isEditing ? currentComment?.content || "" : ""}
        />
        <Button
          size="large"
          variant="contained"
          sx={{order: 3,  }}
          disableElevation
        >
          {!main && isEditing ? "Update" : "Submit"}
        </Button>
      </Stack>
    </Paper>
  );
};
