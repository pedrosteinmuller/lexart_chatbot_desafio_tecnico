import React, { useState, useEffect, ChangeEvent, KeyboardEvent } from 'react';

interface Message {
  text: string;
  user: 'user' | 'chatbot';
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [username, setUsername] = useState<string>(''); 
  const [password, setPassword] = useState<string>('');

  
  const sendMessage = (text: string, user: 'user' | 'chatbot') => {
    const newMessage: Message = {
      text,
      user,
      timestamp: new Date(),
    };
    setMessages([...messages, newMessage]);
    setInputText('');
  };

  const handleInputKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage(inputText, 'user');
    }
  };

  useEffect(() => {
    if (messages.length > 0) {
      const latestMessage = messages[messages.length - 1];
      if (latestMessage.user === 'user') {
        return processMessage(latestMessage.text);
      }
    }
  }, [messages]);

  const processMessage = (text: string) => {
    if (text.toLowerCase().includes('hello')) {
      sendMessage("Hello! How can I assist you today?", "chatbot");
    } else if (text.toLowerCase().includes('goodbye')) {
      sendMessage("Goodbye! Have a great day.", "chatbot");
      // Lógica para armazenar conversa no histórico e finalizar
    } else if (text.toLowerCase().includes('good')) {
      sendMessage("I'm glad to hear that!", "chatbot");
    } else if (text.toLowerCase().includes('i want')) {
      sendMessage("Sure, what do you want?", "chatbot");
    } else if (text.toLowerCase().includes('loan')) {
      sendMessage("Here are your loan options:", "chatbot");
      // Lógica para exibir opções de empréstimo
    } else {
      sendMessage("I'm sorry, I didn't understand that.", "chatbot");
    }
  };

  return (
    <div className="chatbot-container">
      <div className="messages-container">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.user}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="user-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={inputText}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setInputText(e.target.value)
          }
          onKeyDown={handleInputKeyPress}
        />
        <button onClick={() => sendMessage(inputText, "user")}>Send</button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setUsername(e.target.value)
          }
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
      </div>
    </div>
  );
};

export default Chatbot;