import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import styles from '../styles/User.module.css';

const UserCreation: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [popupMessage, setPopupMessage] = useState<string>('');

  const handleCreateUser = async () => {
    try {
      await axios.post('http://localhost:3001/api/register', {
        username,
        password,
      });

      setUsername('');
      setPassword('');
      setShowPopup(true);
      setPopupMessage('User created successfully!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles['user-container']}>
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
      <button onClick={handleCreateUser}>Create User</button>
      <div className={`${styles.popup} ${showPopup ? styles.show : ''}`}>
        <p>{popupMessage}</p>
      </div>
    </div>
  );
};

export default UserCreation;
