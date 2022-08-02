import { useState, useEffect, useRef } from "react";
import Header from "./Components/header.jsx";
import MovieCard from "./Components/movieCard.jsx";
import ColourButton from "./Components/colourButton.jsx";
import Loading from "./Components/loading.jsx";

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
        setLoading((loading) => !loading);
        const movies = await fetch(
          `https://www.omdbapi.com/?s=${colour}&type=movie&page=${pageNumber}&apikey=5b2a9bfb`
        );
        const data = await movies.json();
        setMovieData(data.Search);
        setLoading((loading) => !loading);
      }
    };
    fetchData();
    scrollIntoView();
  }, [colour, pageNumber]);

  useEffect(() => {
    setPageNumber(1);
  }, [colour]);

  const handleAll = async (e) => {
    // If all selected, fetch movies of each colour and turn res to json format
    setColour("all");
    setLoading((loading) => !loading);
    const red = await fetch(
      `https://www.omdbapi.com/?s=red&type=movie&page=${pageNumber}&apikey=5b2a9bfb`
    );
    const redData = await red.json();
    const blue = await fetch(
      `https://www.omdbapi.com/?s=blue&type=movie&page=${pageNumber}&apikey=5b2a9bfb`
    );
    const blueData = await blue.json();
    const green = await fetch(
      `https://www.omdbapi.com/?s=green&type=movie&page=${pageNumber}&apikey=5b2a9bfb`
    );
    const greenData = await green.json();
    const yellow = await fetch(
      `https://www.omdbapi.com/?s=yellow&type=movie&page=${pageNumber}&apikey=5b2a9bfb`
    );
    const yellowData = await yellow.json();

    // Concat individual arrays into combined array - detailing 40 movies
    const combinedData = redData.Search.concat(blueData.Search)
      .concat(greenData.Search)
      .concat(yellowData.Search);

    setMovieData(combinedData);
    setLoading((loading) => !loading);
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
          <div className="colour-container">
            <button onClick={handleAll}>All</button>
          </div>
        </div>
        <div className="movies-header">
          <h2>Movies</h2>
          <span style={{ color: { colour } }}>Colour: {colour}</span>
          <span>Page: {pageNumber}</span>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <>
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
          </>
        )}
      </div>
    </>
  );
};

export default App;
