import { Box, Stack } from "@mui/material";
import { ReactNode, useContext, useState } from "react";
import { usercontext } from "../App";
import { CommentCard } from "./CommentCard";
import { CommentModel } from "./CommentCard";

export const Comment = ({
  comment,
  replyForm,
}: {
  comment: CommentModel;
  replyForm: ReactNode;
}) => {
  const { currentComment, setDeleteCommentId, setCurrentComment, getComment } =
    useContext(usercontext);

  return (
    <>
      <CommentCard
        {...comment}
        handleReply={() => {
          setCurrentComment(comment);
        }}
        handleDelete={() => {
          setDeleteCommentId(comment);
        }}
      />

      {currentComment && currentComment.id == comment.id && replyForm}

      {comment.replies && comment.replies.length > 0 && (
        <Box
          sx={{
            ml: { lg: 5 },
            pl: { xs: 2, lg: 5 },
            borderLeft: 1,
            borderLeftColor: "#d5d5d5",
          }}
        >
          <Stack gap={2}>
            {comment.replies.map((commentId) => {
              const reply = getComment(commentId);
              return (
                <Comment
                  comment={reply}
                  key={reply.id}
                  replyForm={replyForm}
                />
              );
            })}
          </Stack>
        </Box>
      )}
    </>
  );
};
