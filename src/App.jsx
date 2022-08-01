import { useState, useEffect } from "react";
import Header from "./Components/header.jsx";
import MovieCard from "./Components/movieCard.jsx";
import ColourButton from "./Components/colourButton.jsx";

const App = () => {
  const coloursArray = ["Blue", "Red", "Yellow", "Green"];

  const [movieData, setMovieData] = useState(null);
  const [colour, setColour] = useState("red");
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);

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
    console.log(colour);
  }, [movieData, colour]);

  const handleClick = (e) => {
    const colourText = e.target.textContent.toLowerCase();
    setColour(colourText);
  };

  const changePageNumber = (e) => {
    const changeText = e.target.textContent;
    if (changeText === "Next") {
      setPageNumber((pageNumber) => pageNumber + 1);
    } else if (changeText === "Prev") {
      setPageNumber((pageNumber) => pageNumber - 1);
    } else {
      setPageNumber((pageNumber) => pageNumber + 1);
    }
  };

  return (
    <>
      <Header />
      <div className="wrapper">
        <div className="colour-select-container">
          {coloursArray.map((colour) => {
            return <ColourButton colour={colour} handleClick={handleClick} />;
          })}
        </div>
        <div className="movies-container">
          {movieData?.map((movie) => {
            return <MovieCard movie={movie} />;
          })}
        </div>
        <div className="pagination-container">
          <button>Prev</button>
          <button>Next</button>
        </div>
      </div>
    </>
  );
};

export default App;
