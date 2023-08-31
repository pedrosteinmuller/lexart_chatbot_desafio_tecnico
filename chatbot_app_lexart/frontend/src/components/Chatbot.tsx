import React, { useState, useEffect, ChangeEvent, KeyboardEvent } from 'react';
import axios from 'axios';
import LoanOptions from './LoanOptions';
import UserCreation from './UserCreation';
import styles from '../styles/Chatbot.module.css'
import styles1 from "@/src/styles/Home.module.css";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import AddIcon from "@mui/icons-material/Add";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import MicIcon from "@mui/icons-material/Mic";

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
  const [showLoanOptions, setShowLoanOptions] = useState(false);

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      setShowLoanOptions(true);
    } else if (text.toLowerCase().includes('help')) {
      setShowLoanOptions(true);
    } else {
      sendMessage("I'm sorry, I didn't understand that.", "chatbot");
    }
  };

  const handleLoanOption = (option: string) => {
    sendMessage(option, 'user');
      return processMessage(option);
  };

  return (
    <div className={styles["chatbot-container"]}>
      <UserCreation />
      <div className={`${styles['messages-container']} messages-container`}>
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.user}`}>
            {message.text}
          </div>
        ))}
        {showLoanOptions && <LoanOptions onSelectOption={handleLoanOption} />}
      </div>
      <div className={styles['user-input']}>
        <div className={styles1.chat_type_messages}>
        <AddIcon className={styles1.add_icon} />
        <CameraAltIcon />
        <InsertPhotoIcon />
        <MicIcon />
        </div>
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
    </div>
  );
};

export default Chatbot;
