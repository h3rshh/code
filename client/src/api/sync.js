// src/api/sync.js
app.post('/api/sync', async (req, res) => {
    const offlineChanges = req.body;

    // Fetch the latest version from the server
    const latestVersion = await getLatestVersion();

    if (latestVersion.timestamp > offlineChanges.timestamp) {
        // Handle conflict
        return res.status(409).json({ message: 'Conflict detected' });
    }

    // Save changes to the database
    await saveChanges(offlineChanges);
    res.status(200).json({ message: 'Sync successful' });
});