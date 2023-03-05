import React, { useState, useEffect } from "react";
import Chessboard from "chessboardjsx";
import Status from "./Status";

function Board(props) {
  const game = props.game;
  const [fen, setFen] = useState("start");
  const [history, setHistory] = useState([]);
  const [pgn, setPgn] = useState("");
  // const [cp, setCp] = useState();

  var engine = new Worker("stockfish.js");

  useEffect(() => {
    setFen(props.game.fen());

    // // check for gameover
    // if (game.isCheckmate()) {
    //   alert("Checkmate!");
    // }
    // if (game.isDraw()) {
    //   alert("Draw!");
    // }
    // if (game.isStalemate()) {
    //   alert("Stalemate!");
    // }
  });

  const calculate_cp = (fen) => {
    let compare = 0;

    // check which side to move
    let game_history = props.game.history({ verbose: true });
    // console.log(game_history);
    let sideToMove = game_history[game_history.length - 1].color;
    // console.log(sideToMove);

    if (sideToMove === "b") {
      compare = 1;
    } else compare = -1;

    let depth = 10;
    engine.postMessage("position fen " + fen);
    // engine.postMessage("go movetime 1000");
    engine.postMessage("go depth " + depth);

    engine.onmessage = function (line) {
      // console.log(line.data);

      let last_line = line.data.match("info depth " + depth);

      if (last_line !== null) {
        // console.log(last_line.input);
        let cp_substr_start = last_line.input.indexOf("cp") + 3;
        let cp_substr_end = last_line.input.indexOf("nodes") - 1;
        let cp_value = last_line.input.substring(
          cp_substr_start,
          cp_substr_end
        );

        let final_cp = (cp_value / 100) * compare;
        props.updateCp(final_cp);

        sideToMove === "w"
          ? props.changeSideToMove("b")
          : props.changeSideToMove("w");
      }
    };
  };

  const onDrop = ({ sourceSquare, targetSquare }) => {
    if (!props.gameStated) props.onSetGameStarted(true);

    // let fen = props.game.fen();

    try {
      props.game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q", // always promote to a queen for example simplicity
      });

      setFen(props.game.fen()); //fen holds the position reached after dropping this piece

      // calculate_cp(fen);

      calculate_cp(props.game.fen());

      // check for gameover
      if (game.isCheckmate()) {
        alert("Checkmate!");
      }
      if (game.isDraw()) {
        alert("Draw!");
      }
      if (game.isStalemate()) {
        alert("Stalemate!");
      }
    } catch (error) {
      console.log("illigal move");
    }
  };
  return (
    <>
      <Chessboard
        width={450}
        position={fen}
        onDrop={onDrop}
        // onLegalMove={props.onLegalMove(game)}
        orientation={props.orientation}
        boardStyle={{
          borderRadius: "5px",
          boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`,
        }}
      />
      {/* <Status cp_value={cp} /> */}
      {/* <Status cp_value={props.cp} /> */}
    </>
  );
}

export default Board;
