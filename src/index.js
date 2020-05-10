import React from "react";
import ReactDOM from "react-dom";
import MoviesList from "./MoviesList";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <MoviesList />
  </React.StrictMode>,
  rootElement
);
