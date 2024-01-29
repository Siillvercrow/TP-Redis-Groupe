# TP NoSQL

- ## Cloner le projet :
    ```powershell
    $ git clone https://github.com/Siillvercrow/TP-Redis-Groupe
    ```
- ## Dans le projet, lancer la commande :
    ```powershell
 
    docker-compose up -d ; npm install ; npm install mongodb ; node index.js
    ```
- ## Tester le projet :
    1. **Créer un Forum** :
    ```powershell
    Invoke-RestMethod -Method Post -Uri http://localhost:3000/forums -Body '{"title": "Forum de Technologie"}' -ContentType 'application/json'
    ```

    Cette commande crée un nouveau forum avec le titre "Forum de Technologie" et renvoie l'identifiant du forum créé.

    2. **S'abonner à un Forum pour Recevoir des Notifications** :
    À nouveau, remplacez `<forumId>` par l'identifiant du forum.
    ```powershell
    Invoke-RestMethod -Uri http://localhost:3000/forums/<forumId>/subscribe -Method Get
    ```

    Cette commande permet de s'abonner aux notifications de nouveaux messages dans le forum spécifié. Notez que pour voir les notifications en temps réel, vous aurez besoin d'un client qui peut rester connecté à l'écoute des messages sur Redis.

    3. **Publier un Message dans un Forum** :
    Remplacez `<forumId>` par l'identifiant du forum retourné par la commande précédente.
    ```powershell
    Invoke-RestMethod -Method Post -Uri http://localhost:3000/forums/<forumId>/messages -Body '{"message": "Bonjour, ceci est un message test."}' -ContentType 'application/json'
    ```

    Cette commande publie un message dans le forum spécifié par `<forumId>`.

- ## Pour visualiser les données :
    - ### Redis :
        Aller sur ```localhost:8001```, et créer une db avec pour options :
        - Host : `redis`
        - Port : `6379`
        - Name : `mydatabase`
    - ### MongoDB :
        Installer cette extention -> [MongoDB for VS Code - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=mongodb.mongodb-vscode)


- ## Pourquoi avoir rajouté mongodb ?
    - MongoDB stocke les données sous forme de documents JSON BSON, ce qui peut être avantageux si le format des messages varie ou évolue avec le temps.

**Group members** : Kamel AKAR, Martin REVOL, Valentin BONOMO