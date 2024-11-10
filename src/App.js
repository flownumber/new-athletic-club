import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import usersData from './data/users.json';

function App() {
  const [users, setUsers] = useState(usersData);

  return (
    <Router>
      <div className="App" style={{ backgroundColor: 'black', color: 'gold' }}>
        <Routes>
          <Route path="/" element={<HomePage users={users} setUsers={setUsers} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
