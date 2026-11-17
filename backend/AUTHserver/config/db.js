const { MongoClient } = require('mongodb');
const config = require('./env');

const uri = config.MONGODB_URI;
const client = new MongoClient(uri);

async function connectToMongoDB() {
    try {
        await client.connect();
        console.log("You successfully connected to MongoDB!");
        return client;
    } catch (err) {
        console.dir(err);
    }
}

// Call this only when your application terminates
async function disconnectFromMongoDB() {
    await client.close();
}

// Salva o aggiorna l'utente che fa sign-in con Google
async function saveGoogleUser(profile) {
    const db = client.db(config.MONGODB_DB_NAME || "auth_db");
    const users = db.collection("users");

    const filter = { googleId: profile.id };
    const update = {
        $set: {
            googleId: profile.id,
            displayName: profile.displayName || "",
            firstName: profile.name?.givenName || profile.displayName?.split(" ")[0] || "utente",
            email: profile.emails?.[0]?.value || "",
            avatar: profile.photos?.[0]?.value || "",
            provider: "google",
            lastLogin: new Date()
        },
        $setOnInsert: {
            createdAt: new Date()
        }
    };

    await users.updateOne(filter, update, { upsert: true });
    return await users.findOne(filter);
}

module.exports = {
    client,
    connectToMongoDB,
    disconnectFromMongoDB,
    saveGoogleUser
};
