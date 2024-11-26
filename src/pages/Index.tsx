import { useState } from 'react';
import { Card } from '@/components/ui/card';
import ChessBoard from '@/components/ChessBoard';
import ChatInterface from '@/components/ChatInterface';
import GameControls from '@/components/GameControls';
import MoveHistory from '@/components/MoveHistory';

const Index = () => {
  const [gameId, setGameId] = useState<number>(1);
  const [moveHistory, setMoveHistory] = useState<string[]>([]);

  const handleNewGame = () => {
    setGameId(prev => prev + 1);
    setMoveHistory([]);
  };

  const handleMove = (move: string) => {
    setMoveHistory(prev => [...prev, move]);
  };

  return (
    <div className="min-h-screen p-8 flex items-center justify-center">
      <div className="flex gap-8">
        <div className="flex flex-col gap-4">
          <Card className="p-4">
            <GameControls onNewGame={handleNewGame} />
          </Card>
          <ChessBoard key={gameId} onMove={handleMove} />
        </div>
        
        <div className="flex flex-col gap-4 w-80">
          <Card className="p-4 flex-1">
            <h2 className="text-lg font-semibold mb-4">Move History</h2>
            <MoveHistory moves={moveHistory} />
          </Card>
          
          <Card className="p-4 h-[400px]">
            <ChatInterface />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;