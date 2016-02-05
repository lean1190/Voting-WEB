var FirebaseServer = require('firebase-server'),
    port = 5000,
    host = "test.firebase.localhost";

new FirebaseServer(port, host, {
});

console.log("Server listening on " + host + ":" + port);
