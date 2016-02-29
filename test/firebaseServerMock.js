/**
 * Este script levanta un pequeño servidor node
 * que simula un servidor de firebase (gracias a FirebaseServer).
 * De esta manera se pueden ejecutar todas las operaciones
 * de firebase sin necesidad de estar conectados a una base en la nube
 */

var FirebaseServer = require('firebase-server'),
    port = 5000,
    host = "localhost.firebaseio.test";

new FirebaseServer(port, host, {
    Posts: {
        K7M3w6OFhNfJNHm96V8: {
            done: false,
            likes: 0,
            owner: "10204838025222122",
            category: "categoria 1",
            photo: "",
            post: "mock post 1",
            show: true,
            timestamp: "2015-12-06T10:15:17-03:00",
            title: "titulo mock post 1",
            whoLikesMe: false
        },
        K7OBJg66dIyZ7nBwNIH: {
            done: true,
            likes: 2,
            owner: "645916238883318",
            category: "categoria 1",
            photo: "",
            post: "mock post 2",
            show: true,
            timestamp: "2016-01-04T20:06:47-03:00",
            title: "titulo mock post 2",
            whoLikesMe: {
                1074509804: "10204838025222122",
                1868911433: "645916238883318"
            }
        },
        K895Jg66dIyZ7nHzPOK: {
            done: true,
            likes: 2,
            owner: "645916238883318",
            category: "categoria 2",
            photo: "",
            post: "mock post 3",
            show: false,
            timestamp: "2015-03-04T20:08:41-03:00",
            title: "titulo mock post 3",
            whoLikesMe: {
                1074509804: "10204838025222122",
            }
        }
    },

    Users: {
        10204838025222122: {
            image: "https://s-media-cache-ak0.pinimg.com/236x/76/bc/e5/76bce5f1fe956f10d106a627188900bb.jpg",
            name: "Leito"
        },
        645916238883318: {
            image: "http://cdn.24.co.za/files/Cms/General/d/2466/914608f4f891439a849e9cc70b3e731d.jpg",
            name: "Sarse"
        }
    }
});


console.info("Server listening on " + host + ":" + port);
