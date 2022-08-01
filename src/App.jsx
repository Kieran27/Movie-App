import { useState, useEffect } from "react";
import Header from "./Components/header.jsx";

const App = () => {
  return (
    <>
      <Header />
      <div className="wrapper">
        <div className="colour-select-container">
          <div className="colour-container">
            <button>Blue</button>
          </div>
          <div className="colour-container">
            <button>Red</button>
          </div>
          <div className="colour-container">
            <button>Yellow</button>
          </div>
          <div className="colour-container">
            <button>Green</button>
          </div>
        </div>

        <div className="movies-container">
          <div className="movie">
            <img
              src="https://m.media-amazon.com/images/M/MV5BNTAyOGRjOWMtMWIxYi00NDkyLTlmYjEtYmRmNzQyODc4ZWQ5XkEyXkFqcGdeQXVyNzExNzIwMw@@._V1_SX300.jpg"
              alt=""
            />
            <div className="movie-info">
              <p>Movie Title</p>
            </div>
            <div className="movie-info-metadata">
              <p>Movie Release</p>
              <p>IMDB ID</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
