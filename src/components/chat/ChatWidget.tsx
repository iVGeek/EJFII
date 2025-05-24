import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend } from '@react-icons/all-files/fi/FiSend';
import { FiX } from '@react-icons/all-files/fi/FiX';
import { FiMessageSquare } from '@react-icons/all-files/fi/FiMessageSquare';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

const botResponses = [
  "I'm here to listen. Can you tell me more about how you're feeling?",
  "That sounds difficult. Have you tried talking to someone about this?",
  "Remember, it's okay to not be okay. Would you like some resources to help?",
  "I'm not a therapist, but I can suggest some coping strategies if you'd like.",
  "Many people find mindfulness exercises helpful. Would you like me to share one?",
  "It's important to reach out to a professional if you're struggling. Can I help you find one?",
  "You're not alone in this. There are people who care and want to help.",
  "Taking things one step at a time can help. Is there something small you can do for yourself today?",
];

const ChatWidget: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial bot message
    if (messages.length === 0) {
      addBotMessage("Hello! I'm here to provide support. How are you feeling today?");
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addBotMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'bot',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate bot typing
    setIsTyping(true);
    setTimeout(() => {
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      addBotMessage(randomResponse);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed bottom-24 right-6 w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden z-50 border border-gray-200 dark:border-gray-700"
    >
      <div className="bg-primary p-4 flex justify-between items-center">
        <div className="flex items-center">
          <FiMessageSquare className="text-white mr-2" size={20} />
          <h3 className="text-white font-semibold">Support Chat</h3>
        </div>
        <button
          onClick={onClose}
          className="text-white hover:text-gray-200"
        >
          <FiX size={20} />
        </button>
      </div>

      <div className="h-80 overflow-y-auto p-4">
        {messages.map(message => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 ${
                message.sender === 'user'
                  ? 'bg-primary text-white rounded-br-none'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none'
              }`}
            >
              <p>{message.text}</p>
              <p className={`text-xs mt-1 ${
                message.sender === 'user' ? 'text-primary-200' : 'text-gray-500 dark:text-gray-400'
              }`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </motion.div>
        ))}
        {isTyping && (
          <div className="flex justify-start mb-4">
            <div className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg rounded-bl-none px-4 py-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="border-t border-gray-200 dark:border-gray-700 p-4">
        <div className="flex">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow border border-gray-300 dark:border-gray-600 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
          <button
            type="submit"
            className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-r-lg"
          >
            <FiSend size={20} />
          </button>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          This is a simulated chat. For real support, please contact a professional.
        </p>
      </form>
    </motion.div>
  );
};

export default ChatWidget;
