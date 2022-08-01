import { useState, useEffect } from "react";
import Header from "./Components/header.jsx";
import MovieCard from "./Components/movieCard.jsx";

const App = () => {
  const [movieData, setMovieData] = useState(null);
  const [colour, setColour] = useState("red");
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const baseURL =
    "http://www.omdbapi.com/?s=red&type=movie&page=1&apikey=5b2a9bfb";

  useEffect(() => {
    const fetchData = async () => {
      if (colour) {
        setLoading(true);
        const movies = await fetch(
          `http://www.omdbapi.com/?s=${colour}&type=movie&page=${pageNumber}&apikey=5b2a9bfb`
        );
        const data = await movies.json();
        setMovieData(data.Search);
      }
    };
    fetchData();
  }, [colour, pageNumber]);

  useEffect(() => {
    console.log(movieData);
  }, [movieData]);

  const handleClick = (e) => {
    const colourText = e.target.textContent.toLowerCase();
    setColour(colourText);
  };

  return (
    <>
      <Header />
      <div className="wrapper">
        <div className="colour-select-container">
          <div className="colour-container">
            <button onClick={handleClick}>Blue</button>
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
          {loading ? "Loading" : "hello"}
          {movieData?.map((movie) => {
            return <MovieCard movie={movie} />;
          })}
        </div>
      </div>
    </>
  );
};

export default App;
