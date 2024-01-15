const express = require('express');
const axios = require('axios');
const redis = require('redis');

const app = express();
const client = redis.createClient(6379);
const subscriber = client.duplicate();

// Middleware pour analyser les requêtes JSON
app.use(express.json());

(async () => {
  client.on('error', (err) => console.log('Redis Client Error', err));
  await client.connect();
  await subscriber.connect();
})();


// Route pour publier un message
app.post('/publish/:channel', async (req, res) => {
  const { channel } = req.params;
  console.log(req.body);
  const message = req.body.message;

  await client.publish(channel, message);
  res.send(`Message publié dans le canal ${channel}`);
});

// Route pour s'abonner à un canal
app.get('/subscribe/:channel', (req, res) => {
  const { channel } = req.params;

  subscriber.subscribe(channel, (message) => {
    console.log(`Reçu: ${message} sur le canal ${channel}`);
  });

  res.send(`Abonné au canal ${channel}`);
});

app.listen(3000, () => console.log('Server is running on port 3000'));