const SMTPServer = require("smtp-server").SMTPServer;

const server = new SMTPServer({
    allowInsecureAuth: true,
    authOptional: true, // disable auth otherwise we have to setup ssl certificates
    onConnect(session, cb) {
        console.log('onConnect: ', session.id);
        cb() // Accept the connection
        // cb(new Error('Cannot Accept'))
    },
    onMailFrom(address, session, cb) {
        console.log('onMailFrom: ', address.address, session.id); // save to db
        cb()
    },
    onRcptTo(address, session, cb) {
        console.log('onRcptTo: ', address.address, session.id); // save to db
        cb()
    },
    onData(stream, session, cb) {
        stream.on('data', (data) => console.log('onData: ', data.toString())); // save to db
        stream.on('end', cb())
    }
});

server.listen(25, () => console.log("server running on port 25..."));