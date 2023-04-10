import {
  Backdrop,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import { usercontext } from "../App";

export const DeleteCommentModal = () => {
  const { deleteCommentId, setDeleteCommentId, commentsDispatch } =
    useContext(usercontext);

  const cancel = () => {
    setDeleteCommentId(undefined);
  };

  return (
    <Backdrop open={deleteCommentId != undefined} onClick={cancel}>
      <Card sx={{ maxWidth: 400, p: 2, borderRadius: 2 }}>
        <CardHeader
          title={<Typography variant="h6">Delete comment</Typography>}
        ></CardHeader>
        <CardContent>
          <Typography sx={{ fontSize: 14, color: "text.secondary" }}>
            Are you sure you want to remove the comment? This will remove the
            comment and can't be undone
          </Typography>
        </CardContent>
        <CardActions>
          <Stack direction="row" gap={2} sx={{ width: "100%" }}>
            <Button
              variant="contained"
              disableElevation
              sx={{ flexGrow: 1, bgcolor: "grey.400" }}
              onClick={cancel}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              disableElevation
              color="error"
              sx={{ flexGrow: 1 }}
              onClick={(e) => {
                e.stopPropagation();
                commentsDispatch({
                  type: "REMOVE",
                  payload: { item: deleteCommentId },
                });
                cancel();
              }}
            >
              Delete
            </Button>
          </Stack>
        </CardActions>
      </Card>
    </Backdrop>
  );
};
