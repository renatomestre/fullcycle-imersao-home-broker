const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        console.log('received: %s', message);
    });

    const sendAssetPrice = () => {
        const open = Math.random() * 100;
        const response = {
            time: new Date().toISOString(),
            open: open,
            high: open * 1.1,
            low: open * 0.9,
            close: open * 0.95
        };
        ws.send(JSON.stringify(response));
    };

    const setRandomInterval = () => {
        sendAssetPrice();
        const interval = Math.random() * (1000 - 100) + 100;
        setTimeout(setRandomInterval, interval);
    };

    setRandomInterval();

    ws.on('close', () => {
        // No need to clear interval as we are using setTimeout
    });
});

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
