const jwt = require("jsonwebtoken");
const websocket = require('ws');
const { generateRandomNumber } = require('../service/utils');
const winston = require("winston");

const wss = new websocket.Server({
    port: process.env.PORT_SOCKET
})

const buildResponse = (ws, hasError, message, uid = "", number = 0, purpose = "") => {
    ws.send(JSON.stringify({
        error: hasError,
        message: message,
        uid : uid,
        number : number,
        purpose : purpose
    }))
}

const messageMiddleware = (ws, message, next) => {
    try {
        const parsedMessage = JSON.parse(message);  
        
        const token = parsedMessage.token;
        
        if (token) {            

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            parsedMessage.user = decoded

            next(ws, parsedMessage);
        } else {
            buildResponse(ws, true, 'Access denied. No token provided...')
        }
    } catch (err) {
        winston.error(err)        
        buildResponse(ws, true, 'Access denied. Invalid token....')
    }
}

const messageHandler = (ws, message) => {
    const randomNumber = generateRandomNumber()
    const uid = message.user.uuid;

    const text = `uuid : ${uid} | A random number : ${randomNumber}`

    buildResponse(ws, false, text, uid, randomNumber, message.purpose)
}

wss.on('connection', (ws) => {
    console.log('New client connected');

    buildResponse(ws, false, 'Welcome to the WebSocket server!');

    ws.on('message', (message) => {        
        messageMiddleware(ws, message, messageHandler)
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });

    ws.on('error', (error) => {
        console.error(`Error occurred: ${error}`);
    });
});