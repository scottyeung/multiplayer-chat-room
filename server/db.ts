
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export let db: sqlite3.Database;

export async function initDb() {
  db = await open({
    filename: './database.db',
    driver: sqlite3.Database
  });
  
  await db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )
  `);
}

export async function createUser(username: string, password: string) {
  await db.run('INSERT INTO users (username, password) VALUES (?, ?)', username, password);
}

export async function getUserByUsername(username: string) {
  return await db.get('SELECT * FROM users WHERE username = ?', username);
}

export async function getUserById(id: number) {
  return await db.get('SELECT * FROM users WHERE id = ?', id);
}

