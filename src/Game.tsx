import { useState } from 'react';

type SquareState = 'O' | 'X' | null;
type SquareProps = {
  value: SquareState;
  onClick: () => void;
};
const Square = (props: SquareProps) => {
  return (
    <button className="square" onClick={() => props.onClick()}>
      {props.value}
    </button>
  );
};

type BoardState = SquareState[];
type BoardProps = {
  squares: BoardState;
  xIsNext: boolean;
  onClick: (i: number) => void;
};
const Board = (props: BoardProps) => {
  const renderSquare = (i: number) => (
    <Square value={props.squares[i]} onClick={() => props.onClick(i)} />
  );
  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

function calculateWinner(squares: SquareState[]): SquareState {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

type HistoryData = {
  squares: BoardState;
};
type GameState = {
  readonly history: HistoryData[];
  readonly xIsNext: boolean;
  readonly stepNumber: number;
};
const Game = () => {
  const [state, setState] = useState<GameState>({
    history: [
      {
        squares: Array<SquareState>(9).fill(null),
      },
    ],
    xIsNext: true,
    stepNumber: 0,
  });
  const handleClick = (i: number) => {
    setState((state) => {
      const history = state.history.slice(0, state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return { ...state };
      } else {
        squares[i] = state.xIsNext ? 'X' : 'O';
        return {
          ...state,
          history: history.concat([
            {
              squares: squares,
            },
          ]),
          stepNumber: history.length,
          xIsNext: !state.xIsNext,
        };
      }
    });
  };
  const jumpTo = (step: number) => {
    setState({
      ...state,
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  };
  const history = state.history;
  const current = history[state.stepNumber];
  const winner = calculateWinner(current.squares);
  const moves = history.map((_step, move) => {
    const desc = move ? `Go to move ${move}` : 'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });
  const status = winner
    ? 'Winner: ' + winner
    : 'Next player: ' + (state.xIsNext ? 'X' : 'O');
  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          xIsNext={state.xIsNext}
          onClick={(i) => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

export default Game;
