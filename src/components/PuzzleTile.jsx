import React from "react";

const PuzzleTile = (props) => {
  return (
    <div
      className="puzzle-tile"
      data-card={props.number}
      onClick={props.moveTile}
    >
      <span className="noselect">{props.number}</span>
    </div>
  );
};

export default PuzzleTile;
