import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';

const UserCreation: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleCreateUser = async () => {
    try {
      await axios.post('http://localhost:3000/api/register', {
        username,
        password,
      });

      setUsername('');
      setPassword('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
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
      <button onClick={handleCreateUser}>Create User</button>
    </div>
  );
};

export default UserCreation;
