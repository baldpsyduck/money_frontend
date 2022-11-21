import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "store";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import App from 'App'

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);

reportWebVitals();
