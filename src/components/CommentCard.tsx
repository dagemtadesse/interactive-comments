import {
  Avatar,
  Button,
  IconButton,
  Paper,
  Stack,
  Typography,
  Box,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ReplyIcon from "@mui/icons-material/Reply";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useContext } from "react";
import { usercontext } from "../App";

export interface User {
  image: {
    png: string;
  };
  username: string;
}

export interface CommentModel {
  id: number;
  content: string;
  createdAt: string;
  user: User;
  score: number;
  replies?: number[];
}

export const CommentCard = (
  props: CommentModel & { handleReply: () => void; handleDelete: () => void }
) => {
  const { user } = useContext(usercontext);
  const isMe = user.username == props.user.username;

  const buttons = (
    <Stack direction={"row"} gap={2}>
      {!isMe && (
        <Button
          startIcon={<ReplyIcon />}
          sx={{
            textTransform: "capitalize",
          }}
          onClick={props.handleReply}
        >
          Reply
        </Button>
      )}
      {isMe && (
        <>
          <Button
            startIcon={<DeleteIcon />}
            sx={{
              textTransform: "capitalize",
              "&:hover": { color: "error.dark" },
            }}
            color="error"
            onClick={props.handleDelete}
          >
            Delete
          </Button>
          <Button
            startIcon={<EditIcon />}
            sx={{ textTransform: "capitalize" }}
            onClick={props.handleReply}
          >
            Edit
          </Button>
        </>
      )}
    </Stack>
  );

  return (
    <Paper sx={{ width: "auto", p: 3, borderRadius: 2 }} elevation={0}>
      <Stack
        direction={{ xs: "column-reverse", lg: "row" }}
        gap={3}
        alignItems={{ xs: "none", lg: "start" }}
      >
        <Stack direction="row" justifyContent="space-between">
          <Stack
            sx={{
              bgcolor: "background.default",
              borderRadius: 2,
              alignItems: "center",
              flexGrow: 0,
            }}
            justifyContent="center"
            direction={{ xs: "row", lg: "column" }}
          >
            <IconButton>
              <AddIcon sx={{ color: "#C5C6EF" }} />
            </IconButton>
            <Typography
              color="primary.main"
              fontWeight={"bold"}
              sx={{ fontSize: 14 }}
            >
              {props.score}
            </Typography>
            <IconButton>
              <RemoveIcon sx={{ color: "#C5C6EF" }} />
            </IconButton>
          </Stack>
          <Box display={{ xs: "block", lg: "none" }}>{buttons}</Box>
        </Stack>
        <Stack sx={{ flexGrow: 1 }}>
          <Stack direction={"row"} justifyContent="space-between">
            <Stack direction="row" alignItems={"center"}>
              <Avatar src={props.user.image.png} alt={props.user.username} />
              <Typography
                sx={{ ml: 2, fontWeight: "bold" }}
                variant="subtitle1"
              >
                {props.user.username}
              </Typography>
              {isMe && (
                <Typography
                  sx={{
                    bgcolor: "primary.main",
                    color: "white",
                    fontSize: 14,
                    px: 1,
                    ml: 2,
                  }}
                >
                  You
                </Typography>
              )}
              <Typography
                sx={{ ml: 1, fontSize: 14, color: "text.secondary" }}
                variant="subtitle1"
              >
                {props.createdAt}
              </Typography>
            </Stack>

            <Box display={{ xs: "none", lg: "flex" }}>{buttons}</Box>
          </Stack>
          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontSize: 14, color: "text.secondary" }}>
              {props.content}
            </Typography>
          </Box>
        </Stack>
      </Stack>
    </Paper>
  );
};
