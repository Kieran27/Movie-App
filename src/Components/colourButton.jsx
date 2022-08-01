import React from "react";

const ColourButton = ({ colour, handleClick }) => {
  return (
    <div className="colour-container">
      <button onClick={handleClick}>{colour}</button>
    </div>
  );
};

export default ColourButton;
