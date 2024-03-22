
import React from 'react';
import { User, ChatMessage } from '../shared/types';

interface ChatProps {
  user: User;
  socket: any;
}

const Chat: React.FC<ChatProps> = ({ user, socket }) => {
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [inputText, setInputText] = React.useState('');

  React.useEffect(() => {
    socket.on('chatMessage', (message: ChatMessage) => {
      setMessages(messages => [...messages, message]);
    });

    return () => {
      socket.off('chatMessage');
    };
  }, [socket]);

  const handleSendMessage = () => {
    if (inputText.trim() !== '') {
      const message: ChatMessage = {
        userId: user.id,
        username: user.username,
        text: inputText,
        timestamp: Date.now(),
      };
      socket.emit('chatMessage', message);
      setInputText('');
    }
  };

  const handleLogout = () => {
    fetch('/api/logout', { method: 'POST' })
      .then(() => window.location.reload())
      .catch(err => console.error(err));
  };

  return (
    <div className="chat">
      <div className="header">
        <h1>Chat Room</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index} className="message">
            <span className="username">{message.username}: </span>
            <span className="text">{message.text}</span>
          </div>
        ))}
      </div>
      <div className="input">
        <input
          type="text"
          placeholder="Type a message..."
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;

