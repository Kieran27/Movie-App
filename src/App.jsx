import { useState, useEffect, useRef } from "react";
import Header from "./Components/header.jsx";
import MovieCard from "./Components/movieCard.jsx";
import ColourButton from "./Components/colourButton.jsx";

const App = () => {
  const coloursArray = ["Blue", "Red", "Yellow", "Green"];
  const dummyRef = useRef(null);

  const [movieData, setMovieData] = useState(null);
  const [colour, setColour] = useState("red");
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (colour === "all") return handleAll();
      else if (colour) {
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
    setPageNumber(1);
  }, [colour]);

  const handleAll = async (e) => {
    setColour("all");
    const red = await fetch(
      `http://www.omdbapi.com/?s=red&type=movie&page=${pageNumber}&apikey=5b2a9bfb`
    );
    const redData = await red.json();
    const blue = await fetch(
      `http://www.omdbapi.com/?s=blue&type=movie&page=${pageNumber}&apikey=5b2a9bfb`
    );
    const blueData = await blue.json();
    const green = await fetch(
      `http://www.omdbapi.com/?s=green&type=movie&page=${pageNumber}&apikey=5b2a9bfb`
    );
    const greenData = await green.json();
    const yellow = await fetch(
      `http://www.omdbapi.com/?s=yellow&type=movie&page=${pageNumber}&apikey=5b2a9bfb`
    );
    const yellowData = await yellow.json();

    const combinedData = redData.Search.concat(blueData.Search)
      .concat(greenData.Search)
      .concat(yellowData.Search);

    setMovieData(combinedData);
  };

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
      <div ref={dummyRef}></div>
      <Header />
      <div className="wrapper">
        <div className="colour-select-container">
          {coloursArray.map((colour) => {
            return <ColourButton colour={colour} handleClick={handleClick} />;
          })}
        </div>
        <button onClick={handleAll}>ALL</button>
        <div className="movies-header">
          <h2>Movies</h2>
          <span style={{ color: { colour } }}>Colour: {colour}</span>
          <span>Page: {pageNumber}</span>
        </div>
        <div className="movies-container">
          {movieData?.map((movie) => {
            return <MovieCard movie={movie} />;
          })}
        </div>
        <div className="pagination-container">
          <button
            disabled={pageNumber <= 1 ? true : false}
            onClick={changePageNumber}
          >
            Prev
          </button>
          <button
            disabled={pageNumber <= 100 ? false : true}
            onClick={changePageNumber}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default App;
