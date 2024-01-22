- Clonez le projet
- allez dans le projet et lancer la commande
    - docker-compose up -d
    - npm install
    - npm install mongodb
    - node index.js
- pour tester le projet 
    - curl -X POST -H "Content-Type: application/json" -d '{"message": "Hello Redis"}' http://localhost:3000/publish/testChannel

Group members : Kamel AKAR, Martin REVOL, Valentin BONOMO