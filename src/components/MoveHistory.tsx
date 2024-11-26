import { ScrollArea } from '@/components/ui/scroll-area';

const MoveHistory = ({ moves }: { moves: string[] }) => {
  return (
    <ScrollArea className="h-[300px] pr-4">
      <div className="move-history">
        {moves.map((move, index) => (
          <div key={index} className="move-history-item">
            {index + 1}. {move}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default MoveHistory;