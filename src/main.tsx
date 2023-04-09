import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

const theme = createTheme({
  palette: {
    background: {
      default: "#eaecf1",
    },
    primary: {
      main: "#5457b6",
    },
    error: {
      main: "hsl(357, 100%, 86%)",
      dark: "#ed6468",
    },
    text: {
      primary: "#2D363D",
      secondary: "#767B7F",
    },
  },
  typography: {
    fontFamily: "Rubik",
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
