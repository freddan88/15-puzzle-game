import React, { useEffect, useState } from "react";
import StyledPuzzleBoard from "./components/StyledPuzzleBoard";
import PuzzleTile from "./components/PuzzleTile";
import Overlay from "./components/Overlay";
import _ from "lodash";

const App = () => {
  const [randomizedPuzzleTiles, setRandomizedPuzzleTiles] = useState([]);
  const [initialPuzzleTiles, setInitialPuzzleTiles] = useState([]);
  const [hasWinner, setHasWinner] = useState(false);

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

  const resetGame = () => {
    setRandomizedPuzzleTiles(_.shuffle(initialPuzzleTiles));
    setHasWinner(false);
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
    if (clickedRow.includes(0) || clickedColum.includes(0)) {
      order.splice(emptyTileIndex, 1, clickedTileNumber);
      order.splice(clickedTileIndex, 1, 0);
      // console.log({ emptyTileIndex });
      // console.log({ clickedTileIndex });
      // console.log(clickedTileIndex);
      // console.log(puzzleTiles);
      // console.log(order);
      setRandomizedPuzzleTiles(_.uniq(order));

      if (_.isEqual(initialPuzzleTiles, order)) {
        setHasWinner(true);
      }
    }
  };

  const renderTiles = () => {
    return _.map(randomizedPuzzleTiles, (tile) => {
      if (tile === 0) return <div key={tile} data-card={tile} />;
      return <PuzzleTile key={tile} number={tile} moveTile={moveTile} />;
    });
  };

  return (
    <div className="puzzle-app">
      {hasWinner && <Overlay restart={resetGame} />}
      <button onClick={() => randomize(randomizedPuzzleTiles)} className="btn">
        Slumpa
      </button>
      <StyledPuzzleBoard gridColumns={BOARD_COLUMNS} gridRows={BOARD_ROWS}>
        {renderTiles()}
      </StyledPuzzleBoard>
    </div>
  );
};

export default App;
