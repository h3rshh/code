// client/src/service-worker.js
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-offline-changes') {
        event.waitUntil(syncOfflineChanges());
    }
});

async function syncOfflineChanges() {
    const offlineChanges = await getOfflineChanges();
    if (offlineChanges) {
        // Send changes to the server
        await fetch('/api/sync', {
            method: 'POST',
            body: JSON.stringify(offlineChanges),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        // Clear local changes after successful sync
        clearLocalStorage('offlineChanges');
    }
}

async function getOfflineChanges() {
    return getFromLocalStorage('offlineChanges');
}