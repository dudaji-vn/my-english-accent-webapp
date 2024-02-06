import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { register } from "swiper/element/bundle";

import { Experimental_CssVarsProvider as CssVarsProvider, StyledEngineProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

import "./input.css";
import "cropperjs/dist/cropper.css";
import App from "@/App";
import theme from "../theme";
import { store } from "./core/store";
import CommonComponent from "./components/common-component";

// register Swiper custom elements
register();
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <StyledEngineProvider injectFirst>
          <CssVarsProvider theme={theme}>
            <CssBaseline />
            <CommonComponent />
            <App />
          </CssVarsProvider>
        </StyledEngineProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
