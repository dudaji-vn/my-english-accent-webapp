import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import {
  Experimental_CssVarsProvider as CssVarsProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import "./input.css";
import App from "@/App";
import theme from "../theme";
import { store } from "@/store";

declare global {
  interface Window { google: any; }
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <StyledEngineProvider injectFirst>
          <CssVarsProvider theme={theme}>
            <CssBaseline />
            <App />
          </CssVarsProvider>
        </StyledEngineProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
