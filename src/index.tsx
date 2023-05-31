import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from "./page/Main";
import { Provider } from "react-redux";
import { store } from "./store/store";
import './main.scss'


const router = createBrowserRouter([{ path: "/", element: <Main /> }]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <RouterProvider router={router}></RouterProvider>{" "}
  </Provider>
);
