import React, { useEffect, useState } from "react";
import PuzzleBoard from "./components/PuzzleBoard";
import PuzzleTile from "./components/PuzzleTile";
import _ from "lodash";

const App = () => {
  const [randomizedPuzzleTiles, setRandomizedPuzzleTiles] = useState([]);
  const [initialPuzzleTiles, setInitialPuzzleTiles] = useState([]);
  const [hasWinner, setHasWinner] = useState(false);

  console.log(hasWinner);

  // Configuration:
  const BOARD_COLUMNS = 4;
  const BOARD_ROWS = 4;

  useEffect(() => {
    const tempArray = [];
    const tiles = BOARD_COLUMNS * BOARD_ROWS - 1;
    for (let index = 1; index <= tiles; index++) {
      tempArray.push(index);
    }
    tempArray.push(0);
    randomize(tempArray);
    setInitialPuzzleTiles(tempArray);
  }, []);

  const randomize = (array) => {
    setRandomizedPuzzleTiles(_.shuffle(array));
  };

  const moveTile = (e) => {
    if (hasWinner) return;
    const order = randomizedPuzzleTiles;
    const clickedTileNumber = parseInt(e.target.dataset.card);
    const clickedTileIndex = order.indexOf(clickedTileNumber);
    const emptyTileIndex = order.indexOf(0);
    const rows = _.chunk(order, BOARD_ROWS);
    const clickedRow = rows.filter((row) => row.includes(clickedTileNumber))[0];
    const clickedRowIndex = clickedRow.indexOf(clickedTileNumber);
    const clickedColum = _.map(rows, (row) => row[clickedRowIndex]);
    // if (clickedRow.includes(0) || clickedColum.includes(0)) {
    order.splice(emptyTileIndex, 1, clickedTileNumber);
    order.splice(clickedTileIndex, 1, 0);
    // console.log({ emptyTileIndex });
    // console.log({ clickedTileIndex });
    // console.log(clickedTileIndex);
    // console.log(puzzleTiles);
    // console.log(order);
    setRandomizedPuzzleTiles(_.uniq(order));

    if (_.isEqual(initialPuzzleTiles, order)) {
      console.log("You win!!!");
      setHasWinner(true);
    }
    // }
  };

  const renderTiles = () => {
    return _.map(randomizedPuzzleTiles, (tile) => {
      if (tile === 0) return <div key={tile} data-card={tile} />;
      return <PuzzleTile key={tile} number={tile} moveTile={moveTile} />;
    });
  };

  return (
    <div className="puzzle-app">
      <button
        onClick={() => randomize(randomizedPuzzleTiles)}
        className="randomize-button"
      >
        Slumpa
      </button>
      <PuzzleBoard>{renderTiles()}</PuzzleBoard>
    </div>
  );
};

export default App;
