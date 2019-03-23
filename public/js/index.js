(function() {
    'use strict';

    function urlBase64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/-/g, '+')
            .replace(/_/g, '/');

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js')
            .then(function(registration) {
                return registration.pushManager.getSubscription()
                    .then(async function(subscription) {
                        if (subscription) {
                            return subscription;
                        }

                        const response = await fetch('./vapidPublicKey');
                        const vapidPublicKey = await response.text();
                        const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);

                        let result = registration.pushManager.subscribe({
                            userVisibleOnly: true,
                            applicationServerKey: convertedVapidKey
                        });

                        console.log(result);
                    });
            });
    }

    if ('Notification' in window) {
        if (Notification.permission !== 'granted') {
            Notification.requestPermission(function(permission) {
                if (permission === 'granted') {
                    var notification = new Notification("Hi there!");
                }
            });
        }
    }

    let btn = document.getElementById('webpush-btn');

    btn.addEventListener('click', function (event) {
        navigator.serviceWorker.ready
            .then(function(registration) {
                registration.pushManager.getSubscription()
                    .then(function(subscription) {
                        fetch('./push', {
                            method: 'post',
                            headers: {
                                'Content-type': 'application/json'
                            },
                            body: JSON.stringify({
                                subscription: subscription,
                                message: 'You clicked a button!'
                            })
                        });
                    });
            });
    });
})();
