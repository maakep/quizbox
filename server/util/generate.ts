import { rooms } from '../room';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVXYZ0123456789';

export const generateId = (): string => {
  let name = '';

  for (var i = 0; i < 4; i++) name += alphabet[Math.floor(Math.random() * (alphabet.length - 1))];

  if (rooms[name] !== undefined) return generateId();

  return name;
};

// This wont work on server
export const getRoomIdFromUrl = (): string => {
  return window.location.pathname
    .split('/')
    .pop()
    .toUpperCase();
};

export const sleep = (ms: number) => new Promise(r => setTimeout(() => r(), ms));
