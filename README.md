
# Multiplayer Chatroom App

This is a multiplayer chatroom app built with Node.js, Express, Socket.IO, SQLite and React. It allows users to pick a username and password to log in, and chat with other logged in users in real-time. 

## Routes

- `/` - Serves the React frontend app
- `/api/login` (POST) - Authenticates user login 
- `/api/signup` (POST) - Creates a new user account
- `/api/user` (GET) - Gets the currently logged in user
- `/api/logout` (POST) - Logs out the current user
- `/client/:file` - Serves static files from the `client` directory 
- `/dist/:file` - Serves static files from the `dist` directory (bundled React app)

## Database

This app uses a SQLite database to store user accounts. The database is created and initialized when the server starts up. It has a single `users` table with `id`, `username`, and `password` columns.

## WebSocket (Socket.IO)

This app uses Socket.IO to enable real-time messaging between connected clients. Socket event handlers are defined on both the server and client to send and receive chat messages.

To run locally:
1. Install dependencies: `npm install` 
2. Build frontend: `npm run build`
3. Start server: `bun server/run.ts`
4. Open http://localhost:8001 in browser

