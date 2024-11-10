import React, { useState, useEffect } from 'react';
import usersData from './data/users.json';
import HomePage from './pages/HomePage';
import './pages/App.css';

function App() {
  const [users, setUsers] = useState(usersData);

  return (
    <div className="App" style={{ backgroundColor: 'black', color: 'gold' }}>
      <HomePage users={users} setUsers={setUsers} />
    </div>
  );
}

export default App;
