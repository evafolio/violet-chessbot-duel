import { useState, useEffect } from 'react';
import { toast } from 'sonner';

type Piece = {
  type: string;
  color: 'white' | 'black';
} | null;

type Position = {
  row: number;
  col: number;
};

const initialBoard: Piece[][] = [
  [
    { type: 'rook', color: 'black' },
    { type: 'knight', color: 'black' },
    { type: 'bishop', color: 'black' },
    { type: 'queen', color: 'black' },
    { type: 'king', color: 'black' },
    { type: 'bishop', color: 'black' },
    { type: 'knight', color: 'black' },
    { type: 'rook', color: 'black' },
  ],
  Array(8).fill({ type: 'pawn', color: 'black' }),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill(null),
  Array(8).fill({ type: 'pawn', color: 'white' }),
  [
    { type: 'rook', color: 'white' },
    { type: 'knight', color: 'white' },
    { type: 'bishop', color: 'white' },
    { type: 'queen', color: 'white' },
    { type: 'king', color: 'white' },
    { type: 'bishop', color: 'white' },
    { type: 'knight', color: 'white' },
    { type: 'rook', color: 'white' },
  ],
];

const ChessBoard = ({ onMove }: { onMove: (move: string) => void }) => {
  const [board, setBoard] = useState<Piece[][]>(initialBoard);
  const [selectedSquare, setSelectedSquare] = useState<Position | null>(null);
  const [validMoves, setValidMoves] = useState<Position[]>([]);
  const [playerTurn, setPlayerTurn] = useState<'white' | 'black'>('white');

  const getPieceImage = (piece: Piece) => {
    if (!piece) return null;
    return `/chess/${piece.color}-${piece.type}.svg`;
  };

  const isValidMove = (from: Position, to: Position): boolean => {
    // Simplified move validation for this version
    return true;
  };

  const handleSquareClick = (row: number, col: number) => {
    const clickedSquare = { row, col };
    const piece = board[row][col];

    if (selectedSquare) {
      if (isValidMove(selectedSquare, clickedSquare)) {
        const newBoard = [...board];
        newBoard[clickedSquare.row][clickedSquare.col] = board[selectedSquare.row][selectedSquare.col];
        newBoard[selectedSquare.row][selectedSquare.col] = null;
        
        setBoard(newBoard);
        setSelectedSquare(null);
        setValidMoves([]);
        setPlayerTurn(playerTurn === 'white' ? 'black' : 'white');
        
        const move = `${String.fromCharCode(97 + selectedSquare.col)}${8 - selectedSquare.row} to ${String.fromCharCode(97 + col)}${8 - row}`;
        onMove(move);
        
        // Simulate AI move after a delay
        if (playerTurn === 'white') {
          setTimeout(makeAIMove, 1000);
        }
      } else {
        toast.error("Invalid move!");
      }
    } else if (piece && piece.color === playerTurn) {
      setSelectedSquare(clickedSquare);
      // Calculate valid moves (simplified for this version)
      setValidMoves([]);
    }
  };

  const makeAIMove = () => {
    // Simplified AI move for this version
    const availableMoves = [];
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (board[i][j]?.color === 'black') {
          availableMoves.push({ from: { row: i, col: j }, to: { row: Math.floor(Math.random() * 8), col: Math.floor(Math.random() * 8) } });
        }
      }
    }

    if (availableMoves.length > 0) {
      const move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
      const newBoard = [...board];
      newBoard[move.to.row][move.to.col] = board[move.from.row][move.from.col];
      newBoard[move.from.row][move.from.col] = null;
      
      setBoard(newBoard);
      setPlayerTurn('white');
      
      const moveNotation = `${String.fromCharCode(97 + move.from.col)}${8 - move.from.row} to ${String.fromCharCode(97 + move.to.col)}${8 - move.to.row}`;
      onMove(moveNotation);
    }
  };

  return (
    <div className="chess-board">
      {board.map((row, rowIndex) => (
        row.map((piece, colIndex) => {
          const isLight = (rowIndex + colIndex) % 2 === 0;
          const isSelected = selectedSquare?.row === rowIndex && selectedSquare?.col === colIndex;
          const isValidMove = validMoves.some(move => move.row === rowIndex && move.col === colIndex);
          
          return (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`chess-square ${isLight ? 'light' : 'dark'} ${isSelected ? 'selected' : ''} ${isValidMove ? 'valid-move' : ''}`}
              onClick={() => handleSquareClick(rowIndex, colIndex)}
            >
              {piece && (
                <img
                  src={getPieceImage(piece)}
                  alt={`${piece.color} ${piece.type}`}
                  className="chess-piece"
                />
              )}
            </div>
          );
        })
      ))}
    </div>
  );
};

export default ChessBoard;