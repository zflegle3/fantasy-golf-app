import { io } from 'socket.io-client';
// const URL = 'http://localhost:8000';
const URL = 'wss://fantasy-golf-41.herokuapp.com/';

// export const socket = io.connect(URL);

export const socket = io(URL,{
    reconnectionDelay: 1000,
    reconnection: true,
    reconnectionAttemps: 10,
    transports: ['websocket'],
    agent: false,
    upgrade: false,
    rejectUnauthorized: false
});

socket.on("message", message => {
    console.log(message)
    //save message to DB
    //emit message to other users
})

