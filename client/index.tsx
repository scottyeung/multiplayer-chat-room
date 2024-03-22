
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import './index.css';
import Chat from './Chat';
import Login from './Login';
import Signup from './Signup';

const socket = io();

function App() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    fetch('/api/user')
      .then(res => res.json())
      .then(data => setUser(data.user))
      .catch(err => console.error(err));
  }, []);

  if (!user) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login onLogin={setUser} />} />
          <Route path="/signup" element={<Signup onSignup={setUser} />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <div className="app">
      <Chat user={user} socket={socket} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

