import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import Layouts from "./shared/layouts";
import WebRoutes from "./shared/routes";
import { Provider } from "react-redux";
import store from "shared/store/index";
import { Toaster } from "react-hot-toast";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Layouts>
        <WebRoutes>
          <App />
        </WebRoutes>
        <Toaster />
      </Layouts>
    </BrowserRouter>
  </Provider>
);
