import React from "react";
import * as ReactDOMClient from "react-dom/client";
import App from "./App";
import "antd/dist/antd.min.css";
import { GlobalStyles } from "./styles/GlobalStyles";
import { Provider } from "react-redux";
import { store } from "./redux/reducer";

const rootElement = document.getElementById("root");

const root = ReactDOMClient.createRoot(rootElement);

root.render(
  <Provider store={store}>
    <GlobalStyles />
    <App />
  </Provider>
);
