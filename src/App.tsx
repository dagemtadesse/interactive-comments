import { Container, Stack } from "@mui/material";
import { CommentForm } from "./components/CommentForm";
import { Comment } from "./components/Comment";
import data from "./data.json";
import { createContext, Dispatch, Reducer, useReducer, useState } from "react";
import { CommentModel } from "./components/CommentCard";
import { DeleteCommentModal } from "./components/DeleteCommentModal";

export const usercontext = createContext({
  user: data.currentUser,
  currentComment: undefined as undefined | CommentModel,
  setCurrentComment: (val: any) => {},
  setDeleteCommentId: (val: any) => {},
  deleteCommentId: undefined as CommentModel | undefined,
  commentsDispatch: {} as Dispatch<any>,
  getComment: (id: number) => {
    return {} as CommentModel;
  },
});

type State = { comments: CommentModel[]; thread: number[] };

type Payload = { type: CommentActions; payload: any };

enum CommentActions {
  ADD = "ADD",
  REMOVE = "REMOVE",
  UPDATE = "UPDATE",
}

const commentReducer = (
  state: State,
  action: {
    type: CommentActions;
    payload: { parent?: CommentModel; item: CommentModel };
  }
): State => {
  const { parent, item } = action.payload;

  switch (action.type) {
    case "ADD": {
      let comments = state.comments;

      const newParent = { ...parent };

      if (parent) {
        newParent?.replies
          ? newParent.replies.push(item.id)
          : (newParent.replies = [item.id]);

        comments = state.comments.filter((comment) => comment.id != parent.id);

        comments.push(newParent as CommentModel);
      }

      const newState = {
        comments: [...comments, item],
        thread: !parent ? [...state.thread, item.id] : state.thread,
      };

      saveState(newState);

      return newState;
    }
    case "REMOVE": {
      let comments = [
        ...state.comments.filter((comment) => comment.id != item.id),
      ];

      for (let prevComment of comments) {
        if (prevComment.replies) {
          prevComment.replies = prevComment.replies.filter(
            (id) => id != item.id
          );
        }
      }

      const newState = {
        comments: [...comments],
        thread: state.thread.filter((id) => id != item.id),
      };

      saveState(newState);

      return newState;
    }

    case "UPDATE": {
      const others = [
        ...state.comments.filter((comment) => comment.id != item.id),
      ];
      const newState = { comments: [...others, item], thread: state.thread };

      saveState(newState);
      return newState;
    }
    default:
      return state;
  }
};

function loadState(): State {
  const comments =
    JSON.parse(localStorage.getItem("comments") || "null") || data.comments;
  const thread =
    JSON.parse(localStorage.getItem("thread") || "null") || data.thread;

  return { comments, thread };
}

function saveState(state: State) {
  for (const key in state) {
    localStorage.setItem(key, JSON.stringify(state[key as keyof State]));
  }
}

function App() {
  const [currentComment, setCurrentComment] = useState<
    undefined | CommentModel
  >();
  const [deleteCommentId, setDeleteCommentId] = useState<
    undefined | CommentModel
  >(undefined);

  const [{ thread, comments }, commentsDispatch] = useReducer<
    Reducer<State, Payload>
  >(commentReducer, loadState());

  const getComment = (id: number): CommentModel => {
    return comments.find((comment) => comment.id == id)!;
  };

  return (
    <usercontext.Provider
      value={{
        user: data.currentUser,
        currentComment: currentComment,
        setCurrentComment,
        deleteCommentId,
        setDeleteCommentId,
        commentsDispatch,
        getComment,
      }}
    >
      <Container>
        <Stack sx={{ my: 8, maxWidth: "733px", mx: "auto" }} gap={2}>
          {thread.map((commentId) => {
            const comment = getComment(commentId);
            return <Comment key={commentId} comment={comment} replyForm={<CommentForm />} />;
          })}
          <CommentForm main />
        </Stack>
      </Container>

      <DeleteCommentModal />
    </usercontext.Provider>
  );
}

export default App;
