import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

type Message = {
  text: string;
  sender: 'user' | 'ai';
};

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! I'm your chess opponent. Let's play a great game!", sender: 'ai' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages(prev => [...prev, { text: input, sender: 'user' }]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Interesting move! Let me think...",
        "You're playing well! This is a challenging game.",
        "I'm enjoying our match!",
        "That was unexpected! Nice strategy.",
      ];
      const aiResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [...prev, { text: aiResponse, sender: 'ai' }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-lg font-semibold mb-4">Chat with AI</h2>
      
      <ScrollArea className="flex-1 pr-4 mb-4">
        <div className="flex flex-col">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`chat-message ${message.sender === 'ai' ? 'ai-message' : 'user-message'}`}
            >
              {message.text}
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type a message..."
          className="flex-1"
        />
        <Button onClick={handleSend}>Send</Button>
      </div>
    </div>
  );
};

export default ChatInterface;