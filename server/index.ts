
import { app, server, io } from './run_express';
import { initDb } from './db';
import { LoginRequest, SignupRequest, User, ChatMessage } from '../shared/types';
import * as db from './db';
import cookieParser from 'cookie-parser';

app.use(cookieParser());

initDb().then(() => {
  console.log('Database initialized');
}).catch((err) => {
  console.error('Failed to initialize database:', err);
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body as LoginRequest;
  const user = await db.getUserByUsername(username);
  if (user && user.password === password) {
    res.cookie('userId', user.id);
    res.json({ user });
  } else {
    res.status(401).json({ error: 'Invalid username or password' });
  }
});

app.post('/api/signup', async (req, res) => {
  const { username, password } = req.body as SignupRequest;
  try {
    await db.createUser(username, password);
    const user = await db.getUserByUsername(username);
    res.cookie('userId', user.id);
    res.json({ user });
  } catch (err) {
    res.status(400).json({ error: 'Username already taken' });
  }
});

app.get('/api/user', async (req, res) => {
  const userId = req.cookies.userId;
  if (userId) {
    const user = await db.getUserById(parseInt(userId));
    res.json({ user });
  } else {
    res.status(401).json({ error: 'Not logged in' });
  }
});

app.post('/api/logout', (req, res) => {
  res.clearCookie('userId');
  res.json({ success: true });
});

io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('chatMessage', async (message: ChatMessage) => {
    message.timestamp = Date.now();
    io.emit('chatMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

