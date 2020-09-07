import styled from "styled-components";

const StyledPuzzleBoard = styled.main`
  width: 600px;
  height: 600px;
  border-radius: 5px;
  background-color: rgb(226, 226, 226);
  grid-template-columns: repeat(${(props) => props.gridColumns}, 1fr);
  grid-template-rows: repeat(${(props) => props.gridRows}, 1fr);
  border: 12px solid #1e3f4b;
  display: grid;
  padding: 5px;
  gap: 5px;

  @media only screen and (max-width: 600px) {
    width: 100%;
    height: 500px;
  }
`;

export default StyledPuzzleBoard;
