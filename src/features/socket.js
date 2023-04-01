import { io } from 'socket.io-client';
const URL = 'http://localhost:8000';

export const socket = io.connect(URL, {
    //Auto connect on
});

socket.on("message", message => {
    console.log(message)
    //save message to DB
    //emit message to other users
})

