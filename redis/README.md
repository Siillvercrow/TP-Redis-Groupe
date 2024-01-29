# TP NoSQL

- **Clonez le projet :**
    ```powershell
    $ git clone https://github.com/Siillvercrow/TP-Redis-Groupe
    ```
- **Dans le projet, lancez la commande :**
    ```powershell
 
    docker-compose up -d ; npm install ; npm install mongodb ; node index.js
    ```
- **Pour tester le projet :**
    ```powershell
    $ Invoke-RestMethod -Method Post -Uri http://localhost:3000/publish/testChannel -Body '{"message": "Hello Redis"}' -ContentType 'application/json'
    ```
- **Pourquoi avoir rajouté mongodb ?**
    - MongoDB stocke les données sous forme de documents JSON BSON, ce qui peut être avantageux si le format des messages varie ou évolue avec le temps.

**Group members** : Kamel AKAR, Martin REVOL, Valentin BONOMO

-------------------------------

Pour tester les nouvelles fonctionnalités de votre application, vous aurez besoin de différentes commandes pour interagir avec les routes que vous avez définies. Voici quelques exemples de commandes que vous pouvez utiliser avec PowerShell pour tester les différentes fonctionnalités :

1. **Créer un Forum** :
   ```powershell
   Invoke-RestMethod -Method Post -Uri http://localhost:3000/forums -Body '{"title": "Forum de Technologie"}' -ContentType 'application/json'
   ```

   Cette commande crée un nouveau forum avec le titre "Forum de Technologie" et renvoie l'identifiant du forum créé.

2. **Publier un Message dans un Forum** :
   Remplacez `<forumId>` par l'identifiant du forum retourné par la commande précédente.
   ```powershell
   Invoke-RestMethod -Method Post -Uri http://localhost:3000/forums/<forumId>/messages -Body '{"message": "Bonjour, ceci est un message test."}' -ContentType 'application/json'
   ```

   Cette commande publie un message dans le forum spécifié par `<forumId>`.

3. **S'abonner à un Forum pour Recevoir des Notifications** :
   À nouveau, remplacez `<forumId>` par l'identifiant du forum.
   ```powershell
   Invoke-RestMethod -Uri http://localhost:3000/forums/<forumId>/subscribe -Method Get
   ```

   Cette commande permet de s'abonner aux notifications de nouveaux messages dans le forum spécifié. Notez que pour voir les notifications en temps réel, vous aurez besoin d'un client qui peut rester connecté à l'écoute des messages sur Redis.

Assurez-vous que votre serveur Node.js est en cours d'exécution et que MongoDB et Redis sont correctement configurés et en ligne avant d'exécuter ces commandes. Les réponses de ces commandes vous aideront à vérifier le bon fonctionnement des différentes parties de votre application.