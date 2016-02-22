var FirebaseServer = require('firebase-server'),
    port = 5000,
    host = "test.firebase.localhost";

new FirebaseServer(port, host, {
    Posts: {
        K7M3w6OFhNfJNHm96V8: {
            done: false,
            likes: 0,
            owner: "10204838025222122",
            photo: "",
            post: "mock post 1",
            show: true,
            timestamp: "2015-12-06T10:15:17-03:00",
            title: "titulo mock post 1",
            whoLikesMe: false
        },
        K7OBJg66dIyZ7nBwNIH  : {
            done: true,
            likes: 2,
            owner: "645916238883318",
            photo: "",
            post: "mock post 2",
            show: true,
            timestamp: "2016-01-04T20:06:47-03:00",
            title: "titulo mock post 2",
            whoLikesMe: {
                1074509804: "10204838025222122",
                1868911433: "645916238883318"
            }
        }
    }
});


console.info("Server listening on " + host + ":" + port);
