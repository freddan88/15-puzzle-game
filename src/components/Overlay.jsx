import React from "react";

const Overlay = (props) => {
  const resetGame = () => {
    props.restart();
  };
  return (
    <section className="overlay">
      <div className="overlay__card">
        <div className="overlay__message noselect">
          Grattis du vann!. Tryck på starta om för att spela igen
        </div>
        <button className="btn btn--center" onClick={resetGame}>
          Starta om
        </button>
      </div>
    </section>
  );
};

export default Overlay;
