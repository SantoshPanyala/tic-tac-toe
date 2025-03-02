import { useState } from "react";
import Square from "./square";

function Board() {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);

    function calculateWinner(squares) {
        const winningPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];
        for (let pattern of winningPatterns) {
            const [a, b, c] = pattern;
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a]; // Return 'X' or 'O'
            }
        }
        return null;
    }

    function handleClick(index) {
        if (squares[index] || calculateWinner(squares)) return; // Stop if filled or game won

        const newSquares = squares.slice();
        newSquares[index] = isXNext ? "X" : "O";
        setSquares(newSquares);
        setIsXNext(!isXNext);
    }

    function handleReset() {
        setSquares(Array(9).fill(null));
        setIsXNext(true);
    }

    const winner = calculateWinner(squares);
    let status = winner ? `Winner: ${winner}` : `Next player: ${isXNext ? "X" : "O"}`;

    return (
        <div>
            <h2>{status}</h2>
            <div className="board-row">
                <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
                <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
                <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
            </div>
            <div className="board-row">
                <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
                <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
                <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
            </div>
            <div className="board-row">
                <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
                <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
                <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
            </div>


            <button onClick={handleReset} style={{ marginTop: "10px", padding: "10px", fontSize: "16px" }}>Reset Game</button>
        </div>
    );
}

export default Board;
