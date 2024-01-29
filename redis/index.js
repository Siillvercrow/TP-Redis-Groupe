// index.js
const express = require('express');
const redis = require('redis');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const redisClient = redis.createClient(6379);
const subscriber = redisClient.duplicate();
let mongoClient;

// Middleware pour analyser les requêtes JSON
app.use(express.json());

async function setupMongoDBConnection() {
    mongoClient = new MongoClient('mongodb://localhost:27017');
    try {
        await mongoClient.connect();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

async function closeMongoDBConnection() {
    try {
        if (mongoClient) {
            await mongoClient.close();
            console.log('Closed MongoDB connection');
        }
    } catch (error) {
        console.error('Error closing MongoDB connection:', error);
    }
}

function setupMongoDBRoutes(app) {
    app.post('/forums/:forumId/messages', async (req, res) => {
        const { forumId } = req.params;
        const { message } = req.body;

        try {
            const db = mongoClient.db('mydatabase');
            const collection = db.collection('messages');
            const result = await collection.insertOne({ forumId, message });

            await redisClient.publish(`forum_${forumId}`, message);

            res.send({ messageId: result.insertedId, message: 'Message enregistré dans MongoDB' });
        } catch (error) {
            console.error('Error saving message to MongoDB:', error);
            res.status(500).send('Internal Server Error');
        }
    });
}

app.post('/forums', async (req, res) => {
    const { title } = req.body;

    try {
        const forumId = new ObjectId().toString();
        await redisClient.set(`forum_${forumId}`, title);
        res.send({ forumId, title, message: 'Forum créé et enregistré dans Redis' });
    } catch (error) {
        console.error('Error creating forum in Redis:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/forums/:forumId/subscribe', (req, res) => {
    const { forumId } = req.params;

    subscriber.subscribe(`forum_${forumId}`, (message) => {
        console.log(`Notification du forum ${forumId}: ${message}`);
    });

    res.send(`Abonné aux notifications du forum ${forumId}`);
});

(async () => {
    try {
        redisClient.on('error', (err) => console.log('Redis Client Error', err));
        await redisClient.connect();
        await subscriber.connect();

        setupMongoDBRoutes(app);
        await setupMongoDBConnection();

        const port = 3000;
        app.listen(port, () => console.log(`Server is running on port ${port}`));

    } catch (error) {
        console.error('Error setting up the application:', error);
    }
})();

process.on('SIGINT', async () => {
    try {
        await redisClient.quit();
        await subscriber.quit();
        await closeMongoDBConnection();
        console.log('Closed connections');
        process.exit(0);
    } catch (error) {
        console.error('Error closing connections:', error);
        process.exit(1);
    }
});


