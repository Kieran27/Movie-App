import React from "react";

const MovieCard = ({ movie }) => {
  return (
    <div className="movie">
      <img src={movie.Poster ? movie.Poster : "not found"} alt="" />
      <div className="movie-info">
        <p>{movie.Title}</p>
      </div>
      <div className="movie-info-metadata">
        <p>{movie.Year}</p>
        <p>{movie.Type}</p>
      </div>
    </div>
  );
};

export default MovieCard;
