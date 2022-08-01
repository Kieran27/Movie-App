import { useState, useEffect, useRef } from "react";
import Header from "./Components/header.jsx";
import MovieCard from "./Components/movieCard.jsx";
import ColourButton from "./Components/colourButton.jsx";
import { isDisabled } from "@testing-library/user-event/dist/utils/index.js";

const App = () => {
  const coloursArray = ["Blue", "Red", "Yellow", "Green"];
  const dummyRef = useRef(null);

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
    scrollIntoView();
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
    console.log(e.target);
    const changeText = e.target.textContent;
    if (changeText === "Next") {
      setPageNumber((pageNumber) => pageNumber + 1);
    } else if (changeText === "Prev") {
      setPageNumber((pageNumber) => pageNumber - 1);
    } else {
      setPageNumber((pageNumber) => pageNumber + 1);
    }
  };

  const scrollIntoView = () => {
    dummyRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Header />
      <div className="wrapper">
        <div ref={dummyRef}></div>
        <div className="colour-select-container">
          {coloursArray.map((colour) => {
            return <ColourButton colour={colour} handleClick={handleClick} />;
          })}
        </div>
        <div className="movies-header">
          <h2>Movies</h2>
          <span>Colour: {colour}</span>
          <span>Page: {pageNumber}</span>
        </div>
        <div className="movies-container">
          {movieData?.map((movie) => {
            return <MovieCard movie={movie} />;
          })}
        </div>
        <div className="pagination-container">
          <button onClick={changePageNumber}>Prev</button>
          <button onClick={changePageNumber}>Next</button>
        </div>
      </div>
    </>
  );
};

export default App;
