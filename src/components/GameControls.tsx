import { Button } from '@/components/ui/button';

const GameControls = ({ onNewGame }: { onNewGame: () => void }) => {
  return (
    <div className="flex gap-2">
      <Button onClick={onNewGame}>New Game</Button>
      <Button variant="outline" onClick={() => confirm('Are you sure you want to resign?')}>
        Resign
      </Button>
    </div>
  );
};

export default GameControls;