# Documentation API - Gestion de Cartes

## 1. Type de Carte (`typecard`)

### POST /api/typecard

Créer un nouveau type de carte.

**Body JSON attendu :**
```json
{
  "NomTypeCarte": "testMagie"
}
```

**Réponse attendue :**
- Statut : 201
- Contenu : `{ "message": "Type créé", "id": <new_id> }`

**Erreurs possibles :**
- 400 : corps manquant ou mal formé
- 409 : type déjà existant

### GET /api/typecard

Récupérer tous les types de carte.

**Requête :**
- Pas de corps (body) dans la requête.

**Réponse :**
- Tableau d'objets contenant `id` et `nom`.

---

## 2. Édition

### POST /api/edition

Créer une édition.

**Body JSON attendu :**
```json
{
  "NomEdition": "testEdition Classique",
  "CodeEdition": "testEDC2025",
  "DateEdition": "2025-10-01",
  "TypeImpression": "testStandard"
}
```

---

## 3. Rareté

### POST /api/rarete

Créer une rareté.

**Body JSON attendu :**
```json
{
  "NomRarete": "testRare"
}
```

---

## 4. Attribut

### POST /api/attribut

Créer un attribut.

**Body JSON attendu :**
```json
{
  "NomAttribut": "testElementaire"
}
```

### PUT /api/attribut/:id

Mettre à jour un attribut existant identifié par `id`.

**Body JSON attendu :**
```json
{
  "NomAttribut": "testElementaireChange"
}
```

### DELETE /api/attribut/:id

Supprimer un attribut par `id`.

---

## 5. Utilisateur

### POST /api/addUser

Créer un utilisateur avec un mot de passe hashé via bcrypt.

**Body JSON attendu :**
```json
{
  "PrenomUser": "Julie",
  "NomUser": "Dupont",
  "Mail": "julie@example.com",
  "MotDePasse": "monmdpsecret",
  "DateNaissance": "1990-01-01",
  "RoleId": 1
}
```

### PUT /api/user/:id

Mettre à jour un utilisateur identifié par `id`.

**Remarque :** Le mot de passe est optionnel et sera hashé si présent.

**Exemple de body JSON :**
```json
{
  "PrenomUser": "Caroline",
  "NomUser": "Defrance",
  "Mail": "caroline@example.com",
  "MotDePasse": "nouveaumdp",
  "DateNaissance": "1991-01-01",
  "RoleId": 1
}
```

---

## 6. Carte (`card`)

### POST /api/card

Créer une carte.

**Body JSON attendu :**
```json
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
```

### PUT /api/card/:id

Mettre à jour une carte existante.

**Body JSON :** Même structure que POST.

### DELETE /api/card/:id

Supprimer une carte par `id`.

---

## Conseils Généraux

- Toujours utiliser l'en-tête HTTP `Content-Type: application/json` pour les requêtes POST et PUT.

- Vérifier le code de statut HTTP renvoyé :
  - **200 (OK) / 201 (Créé)** : Succès
  - **400 (Requête mal formée)** : Corps vide ou mal formé
  - **404 (Ressource non trouvée)** : ID invalide lors des opérations PUT ou DELETE
  - **409 (Conflit)** : Doublons ou ressource déjà existante
  - **500 (Erreur serveur)** : Erreur serveur

- En cas de corps vide ou mal formé, une erreur 400 doit être renvoyée.
- En cas de conflit de ressource (doublons), une erreur 409 sera renvoyée.
- En cas de ressource non trouvée (id invalide) lors des opérations PUT ou DELETE, une erreur 404 sera renvoyée.