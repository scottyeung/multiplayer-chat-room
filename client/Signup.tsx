
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SignupRequest, User } from '../shared/types';

interface SignupProps {
  onSignup: (user: User) => void;
}

const Signup: React.FC<SignupProps> = ({ onSignup }) => {
  const navigate = useNavigate();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const signupRequest: SignupRequest = { username, password };
    fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(signupRequest),
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setError(data.error);
        } else {
          onSignup(data.user);
        }
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="signup">
      <h1>Sign Up</h1>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <a href="#" onClick={() => navigate('/login')}>Login</a>
      </p>
    </div>
  );
};

export default Signup;

