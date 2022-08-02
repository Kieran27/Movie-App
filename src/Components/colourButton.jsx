import { v4 as uuidv4 } from "uuid";

const ColourButton = ({ colour, handleClick }) => {
  return (
    <div className="colour-container">
      <button onClick={handleClick}>{colour}</button>
    </div>
  );
};

export default ColourButton;
