import React, { useState, useEffect } from 'react';
import usersData from '../data/users.json';
import './App.css';

function HomePage() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', credit: 0 });
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteUserName, setDeleteUserName] = useState(''); // Stato per il nome dell'utente da eliminare

  useEffect(() => {
    setUsers(usersData);
  }, []);

  const handleSearch = (e) => setSearchTerm(e.target.value);

  // Funzione per aggiungere o rimuovere caffè
  const adjustCaffe = (adjustment) => {
    if (selectedUser) {
      const updatedCredit = selectedUser.credit + adjustment;
      setSelectedUser({ ...selectedUser, credit: Math.max(updatedCredit, 0) });
    }
  };

  // Funzione per selezionare un'immagine casuale per un nuovo utente
  const getRandomUserImage = () => {
    const images = ['prova.png', 'prova1.png', 'prova2.png', 'prova3.png', 'prova4.png', 'prova5.png'];
    return `../img/user/${images[Math.floor(Math.random() * images.length)]}`;
  };

  const handleCreateUser = () => {
    if (newUser.name && newUser.credit >= 0) {
      const newId = users.length + 1;
      const newUserWithImage = { ...newUser, id: newId, image: getRandomUserImage() };
      setUsers([...users, newUserWithImage]);
      setCreateModalOpen(false);
      setNewUser({ name: '', credit: 0 });
    }
  };

  // Funzione per eliminare l'utente basato sul nome inserito
  const handleDeleteUser = () => {
    const updatedUsers = users.filter(user => user.name.toLowerCase() !== deleteUserName.toLowerCase());
    setUsers(updatedUsers);
    setDeleteModalOpen(false);
    setDeleteUserName(''); // Reset del campo di input
    if (selectedUser && selectedUser.name.toLowerCase() === deleteUserName.toLowerCase()) {
      setSelectedUser(null);
    }
  };

  const coffeeEquivalent = (credit) => (credit / 0.7).toFixed(2);

  const handleSelectUser = (user) => setSelectedUser(user);

  return (
    <div className="homepage">
      <header className="header">
        <a href="/" className="logo-link">
          <img src="../img/logo.png" alt="Logo Azienda" className="logo" />
        </a>
        <h1>Caffeinomani di New Athletic Club</h1>
        <button className="button" onClick={() => setCreateModalOpen(true)}>Crea Utente</button>
        <button className="button" onClick={() => setDeleteModalOpen(true)}>Elimina Utente</button>
      </header>

      <input
        type="text"
        placeholder="Cerca Utente"
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />

      <div className="user-grid">
        {users.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase())).map(user => (
          <div onClick={() => handleSelectUser(user)} key={user.id} className="user-card">
            <img src={user.image} alt="user" className="user-image" />
            <h3>{user.name}</h3>
            <p>Credito: €{user.credit.toFixed(2)}</p>
            <p>Caffè: {coffeeEquivalent(user.credit)}</p>
          </div>
        ))}
      </div>

      {selectedUser && (
        <div className="user-details">
          <h2>Dettagli di {selectedUser.name}</h2>
          <p>Credito attuale: €{selectedUser.credit.toFixed(2)}</p>
          <p>Caffè: {coffeeEquivalent(selectedUser.credit)}</p>
          <button onClick={() => adjustCaffe(0.7)} className="button">Aggiungi 1 Caffè</button>
          <button onClick={() => adjustCaffe(-0.7)} className="button">Rimuovi 1 Caffè</button>
          <input
            type="number"
            value={selectedUser.credit}
            onChange={(e) => setSelectedUser({ ...selectedUser, credit: parseFloat(e.target.value) })}
            className="credit-input"
          />
          <button onClick={() => setUsers(users.map(u => u.id === selectedUser.id ? selectedUser : u))} className="button">Salva Modifiche</button>
        </div>
      )}

      {isCreateModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setCreateModalOpen(false)}>&times;</span>
            <h2>Crea Nuovo Utente</h2>
            <input
              type="text"
              placeholder="Nome"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="modal-input"
            />
            <input
              type="number"
              placeholder="Credito"
              value={newUser.credit}
              onChange={(e) => setNewUser({ ...newUser, credit: parseFloat(e.target.value) })}
              className="modal-input"
            />
            <button onClick={handleCreateUser} className="modal-button">Crea</button>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setDeleteModalOpen(false)}>&times;</span>
            <h2>Elimina Utente</h2>
            <input
              type="text"
              placeholder="Nome dell'utente da eliminare"
              value={deleteUserName}
              onChange={(e) => setDeleteUserName(e.target.value)}
              className="modal-input"
            />
            <button onClick={handleDeleteUser} className="modal-button">Conferma Eliminazione</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
