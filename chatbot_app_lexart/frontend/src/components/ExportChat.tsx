import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Papa from 'papaparse';
import styles from "../styles/Export.module.css";

const ExportChat: React.FC = () => {
  const [conversations, setConversations] = useState<string[]>([]);

  useEffect(() => {
    // aqui faço a requisicao para o backend
    axios.get('/api/conversations').then(response => {
      setConversations(response.data);
    }).catch(error => {
      console.error('Error fetching conversations:', error);
    });
  }, []);

  const handleExportCSV = () => {
    const csv = Papa.unparse(conversations);
    const blob = new Blob([csv], { type: 'text/csv' });
    const csvUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = csvUrl;
    link.download = 'conversations.csv';
    link.click();
  };

  return (
    <button className={styles['button-export']} onClick={handleExportCSV}>Export Conversations as CSV</button>
  );
};

export default ExportChat;
