import { Container, Stack } from "@mui/material";
import { CommentForm } from "./components/CommentForm";
import { Comment } from "./components/Comment";
import data from "./data.json";
import { createContext, useState } from "react";
import { CommentModel } from "./components/CommentCard";
import { DeleteCommentModal } from "./components/DeleteCommentModal";

export const usercontext = createContext({
  user: data.currentUser,
  currentComment: undefined as undefined | CommentModel,
  setCurrentComment: (val: any) => {},
  setDeleteCommentId: (val: any) => {},
  deleteCommentId: -1,
});

function App() {
  const [currentComment, setCurrentComment] = useState<
    undefined | CommentModel
  >();
  const [deleteCommentId, setDeleteCommentId] = useState(-1);

  return (
    <usercontext.Provider
      value={{
        user: data.currentUser,
        currentComment: currentComment,
        setCurrentComment,
        deleteCommentId,
        setDeleteCommentId,
      }}
    >
      <Container>
        <Stack sx={{ my: 8, maxWidth: "733px", mx: "auto" }} gap={2}>
          {data.comments.map((comment) => {
            return <Comment comment={comment} replyForm={<CommentForm />} />;
          })}
          <CommentForm main />
        </Stack>
      </Container>

      <DeleteCommentModal />
    </usercontext.Provider>
  );
}

export default App;
