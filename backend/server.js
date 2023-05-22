const app = require('./app.js');
const http = require('http');

const server = http.createServer(app);

const port = process.env.PORT || '3000';
app.set('port', port);

const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
}
server.on('error', errorHandler);
server.on('listening', () => {
    console.log("Listening port > " + port);
});

server.listen(port);