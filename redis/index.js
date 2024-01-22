// index.js
const express = require('express');
const redis = require('redis');
const { MongoClient } = require('mongodb');

const app = express();
const redisClient = redis.createClient(6379);
const subscriber = redisClient.duplicate();
let mongoClient;

// Middleware pour analyser les requêtes JSON
app.use(express.json());

async function setupMongoDBConnection() {
  try {
    // Connexion à MongoDB
    mongoClient = new MongoClient('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true });
    await mongoClient.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

async function closeMongoDBConnection() {
  try {
    // Fermeture de la connexion MongoDB
    if (mongoClient) {
      await mongoClient.close();
      console.log('Closed MongoDB connection');
    }
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
  }
}

function setupMongoDBRoutes(app) {
  // Exemple de route avec MongoDB
  app.post('/save-to-mongodb', async (req, res) => {
    const { data } = req.body;

    try {
      const db = mongoClient.db('mydatabase');
      const collection = db.collection('mycollection');
      await collection.insertOne({ data });
      res.send('Data saved to MongoDB');
    } catch (error) {
      console.error('Error saving data to MongoDB:', error);
      res.status(500).send('Internal Server Error');
    }
  });
}

(async () => {
  try {
    // Connexion à Redis
    redisClient.on('error', (err) => console.log('Redis Client Error', err));
    await redisClient.connect();
    await subscriber.connect();

    // Configurer les routes MongoDB
    setupMongoDBRoutes(app);

    // Configurer la connexion MongoDB
    await setupMongoDBConnection();

    // Routes pour Redis
    app.post('/publish/:channel', async (req, res) => {
      const { channel } = req.params;
      console.log(req.body);
      const message = req.body.message;

      await redisClient.publish(channel, message);
      res.send(`Message publié dans le canal ${channel}`);
    });

    app.get('/subscribe/:channel', (req, res) => {
      const { channel } = req.params;

      subscriber.subscribe(channel, (message) => {
        console.log(`Reçu: ${message} sur le canal ${channel}`);
      });

      res.send(`Abonné au canal ${channel}`);
    });

    // Lancer le serveur Express
    const port = 3000;
    app.listen(port, () => console.log(`Server is running on port ${port}`));

  } catch (error) {
    console.error('Error setting up the application:', error);
  }
})();

// Fermeture des connexions lors de la fermeture de l'application
process.on('SIGINT', async () => {
  try {
    await redisClient.quit();
    await subscriber.quit();
    // Fermeture des connexions MongoDB
    await closeMongoDBConnection();
    console.log('Closed connections');
    process.exit(0);
  } catch (error) {
    console.error('Error closing connections:', error);
    process.exit(1);
  }
});
