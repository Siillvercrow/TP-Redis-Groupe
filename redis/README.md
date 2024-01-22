# TP NoSQL

- **Clonez le projet :**
    ```bash
    $ git clone https://github.com/Siillvercrow/TP-Redis-Groupe
    ```
- **Dans le projet, lancez la commande :**
    ```bash 
    $ docker-compose up -d ; npm install ; npm install mongodb ; node index.js
    ```
- **Pour tester le projet :**
    ```bash
    $ Invoke-RestMethod -Method Post -Uri http://localhost:3000/publish/testChannel -Body '{"message": "Hello Redis"}' -ContentType 'application/json'
    ```
- **Pourquoi avoir rajouté mongodb ?**
    - MongoDB stocke les données sous forme de documents JSON BSON, ce qui peut être avantageux si le format des messages varie ou évolue avec le temps.

**Group members** : Kamel AKAR, Martin REVOL, Valentin BONOMO