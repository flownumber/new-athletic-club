import React, { useState, useEffect } from 'react';
import usersData from '../data/users';
import './App.css';

function HomePage() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', credit: 0 });
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteUserName, setDeleteUserName] = useState('');

  useEffect(() => {
    setUsers(usersData);  // Carica i dati degli utenti
  }, []);

  const handleSearch = (e) => setSearchTerm(e.target.value);

  // Funzione per aggiungere o rimuovere caffè
  const adjustCaffe = (adjustment) => {
    if (selectedUser) {
      const updatedCredit = Math.max(selectedUser.credit + adjustment, 0);
      setSelectedUser({ ...selectedUser, credit: updatedCredit });
    }
  };

  const handleSaveChanges = () => {
    setUsers(users.map(user =>
      user.id === selectedUser.id ? selectedUser : user
    ));
    setSelectedUser(null); // Deseleziona l'utente dopo il salvataggio
  };

  const handleSelectUser = (user) => setSelectedUser(user);

  return (
    <div className="homepage">
      <header className="header">
        <a href="/" className="logo-link">
          <img src={require("../img/logo.png")} alt="Logo Azienda" className="logo" />
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
            <p>Caffè: {(user.credit / 0.7).toFixed(2)}</p>
          </div>
        ))}
      </div>

      {selectedUser && (
        <div className="user-details">
          <h2>Dettagli di {selectedUser.name}</h2>
          <p>Credito attuale: €{selectedUser.credit.toFixed(2)}</p>
          <p>Caffè: {(selectedUser.credit / 0.7).toFixed(2)}</p>
          <button onClick={() => adjustCaffe(0.7)} className="button">Aggiungi 1 Caffè</button>
          <button onClick={() => adjustCaffe(-0.7)} className="button">Rimuovi 1 Caffè</button>
          <input
            type="number"
            value={selectedUser.credit}
            onChange={(e) => setSelectedUser({ ...selectedUser, credit: parseFloat(e.target.value) })}
            className="credit-input"
          />
          <button onClick={handleSaveChanges} className="button">Salva Modifiche</button>
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
