self.addEventListener('push', function(event) {
    let text = event.data ? event.data.text() : 'Empty text';

    event.waitUntil(
        self.registration.showNotification('Message', {
            body: text
        })
    );
});
