import React, { useState } from 'react';
import { Brain } from 'lucide-react';

const Education: React.FC = () => {
  const [userInput, setUserInput] = useState('');
  const [conversation, setConversation] = useState<Array<{ role: 'user' | 'ai'; content: string }>>([
    {
      role: 'ai',
      content: "Hello! I'm your π guide. What would you like to learn about π today?"
    }
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    // Add user message to conversation
    setConversation(prev => [...prev, { role: 'user', content: userInput }]);

    // Simulate AI response
    // In a real application, this would call an AI API
    const response = await simulateAIResponse(userInput);
    setConversation(prev => [...prev, { role: 'ai', content: response }]);
    setUserInput('');
  };

  const simulateAIResponse = async (input: string): Promise<string> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simple response logic
    if (input.toLowerCase().includes('what is')) {
      return "π (pi) is the ratio of a circle's circumference to its diameter. It's approximately 3.14159, but it goes on forever without repeating!";
    } else if (input.toLowerCase().includes('history')) {
      return "The history of π is fascinating! Ancient civilizations, including the Babylonians and Egyptians, used approximations of π in their calculations. The symbol π was first used by William Jones in 1706.";
    } else if (input.toLowerCase().includes('use')) {
      return "π is used everywhere! In engineering, architecture, physics, and even in GPS systems. It's essential for calculating areas, volumes, and understanding waves and circular motion.";
    }
    
    return "That's an interesting question about π! Would you like to learn about its history, its uses in the real world, or its mathematical properties?";
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Learn About π</h2>
      <div className="bg-gray-900/50 rounded-lg p-4 h-[400px] mb-4 overflow-y-auto">
        {conversation.map((message, index) => (
          <div
            key={index}
            className={`mb-4 flex ${
              message.role === 'ai' ? 'justify-start' : 'justify-end'
            }`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.role === 'ai'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-white'
              }`}
            >
              {message.role === 'ai' && (
                <div className="flex items-center mb-2">
                  <Brain className="w-4 h-4 mr-2" />
                  <span className="font-semibold">π Guide</span>
                </div>
              )}
              <p>{message.content}</p>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Ask anything about π..."
          className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Education;