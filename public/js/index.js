(function() {
    'use strict';

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js')
            .then(function(registration) {
                return registration.pushManager.getSubscription()
                    .then(function(subscription) {
                        let result = registration.pushManager.subscribe({
                            userVisibleOnly: true
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
})();
