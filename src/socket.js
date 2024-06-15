import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === 'production' ? "https://art-space-v9.onrender.com" : 'https://art-space-v9.onrender.com';

export const socket = io(URL);