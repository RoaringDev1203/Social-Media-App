import {io} from 'socket.io-client';

const socket = io('ws://localhost:5000'); // Ensure this URL matches your server

export default socket;
