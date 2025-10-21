# Tests de Routes API avec Postman

----

## 1. Type de Carte (typecard)

### POST /api/typecard
- Créer un nouveau type de carte
- Body JSON :
    {
    "NomTypeCarte": "testMagie"
    }
- Réponse attendue : 201 { message: "Type créé", id: <new_id> }
- Erreurs possibles : 400 (body manquant), 409 (type déjà existant)

---

### GET /api/typecard
- Récupérer tous les types de carte
- Pas de body
- Réponse : tableau de types avec id et nom

---

## 2. Edition

### POST /api/edition
- Créer une édition
- Body JSON :
    {
    "NomEdition": "testEdition Classique",
    "CodeEdition": "testEDC2025",
    "DateEdition": "2025-10-01",
    "TypeImpression": "testStandard"
    }

---

## 3. Rareté

### POST /api/rarete
- Créer une rareté
- Body JSON :
    {
    "NomRarete": "testRare"
    }

---

## 4. Attribut

### POST /api/attribut
- Créer un attribut
- Body JSON :
    {
    "NomAttribut": "testElementaire"
    }

### PUT /api/attribut/:id
- Mettre à jour un attribut existant
- Body JSON :
    {
    "NomAttribut": "testElementaireChange"
    }

### DELETE /api/attribut/:id
- Supprimer un attribut par id

---

## 5. Utilisateur

### POST /api/addUser
- Créer un utilisateur avec mot de passe hashé bcrypt
- Body JSON :
    {
    "prenomUser": "Julie",
    "nomUser": "Dupont",
    "mail": "julie@example.com",
    "motDePasse": "monmdpsecret",
    "dateNaissance": "1990-01-01",
    "roleId": 1
    }

### PUT /api/user/:id
- Mettre à jour un utilisateur (le mot de passe est optionnel et hashé si présent)
- Body JSON exemple :

    {
    "prenomUser": "Caroline",
    "nomUser": "Defrance",
    "mail": "caroline@example.com",
    "motDePasse": "nouveaumdp",
    "dateNaissance": "1991-01-01",
    "roleId": 1
    }

---

## 6. Carte (card)

### POST /api/card
- Créer une carte
- Body JSON exemple :
    {
    "NomCarte": "Dragon Wrath",
    "DescriptionCarte": "Carte puissante",
    "ImageUrl": "http://exemple.com/dragon.jpg",
    "TypeCarteId": 2,
    "AttributId": 3,
    "NiveauCarte": 5,
    "ATK": 2300,
    "DEF": 1800,
    "RangCarte": 3,
    "LienRating": 7,
    "EchellePendule": 4,
    "EffetCarte": "Inflige des dégâts"
    }

### PUT /api/card/:id
- Mettre à jour une carte, même structure que POST

### DELETE /api/card/:id
- Supprimer une carte par id

---

## Conseils

- Toujours utiliser le Header `Content-Type: application/json` sur les requêtes POST/PUT.
- Vérifier le code de statut HTTP renvoyé (200, 201, 400, 404, 409, 500).
- Sur body vide ou mal formé, tu dois recevoir une erreur 400.
- Sur conflit (doublons), une erreur 409 sera renvoyée.
- Sur ressources non trouvées avec id non existant lors de PUT/DELETE, erreur 404.

----