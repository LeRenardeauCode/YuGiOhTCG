# Projet Yu-Gi-Oh TCG

## Description
Plateforme complète de gestion de cartes Yu-Gi-Oh avec système d'authentification JWT, gestion des utilisateurs et collections personnelles. Backend Node.js/Express, base de données MySQL et frontend React/Vite avec Material-UI.

---

## ✨ Fonctionnalités

### Authentification & Utilisateurs
- 🔐 Système d'inscription et connexion avec JWT
- 👤 Gestion des profils utilisateurs (modifier infos, changer mot de passe)
- 🎭 Système de rôles : Admin, Modérateur, Utilisateur
- 📊 Tableau de bord pour admins et modérateurs
- 🔒 Protection des routes avec middleware d'authentification

### Gestion des cartes
- ✅ CRUD complet pour les cartes Yu-Gi-Oh
- 🎨 Visualisation interactive des cartes
- 🏷️ Gestion des attributs, raretés, éditions et types de cartes
- 📋 Filtrage et recherche de cartes

### Collections & Decks
- 📚 Collection personnelle de cartes par utilisateur
- 🃏 Création et gestion de decks personnalisés
- 🔐 Accès restreint aux utilisateurs connectés

---

## 🛠️ Technologies utilisées

### Backend
- **Node.js 18** - Runtime JavaScript
- **Express.js** - Framework web
- **MySQL 8.0** - Base de données relationnelle
- **JWT (jsonwebtoken)** - Authentification sécurisée
- **bcrypt** - Hashage des mots de passe
- **dotenv** - Gestion des variables d'environnement

### Frontend
- **React 18** - Bibliothèque UI
- **Vite** - Build tool ultra-rapide
- **Material-UI (MUI)** - Framework de composants
- **React Router** - Navigation
- **Axios** - Requêtes HTTP

### DevOps (en cours)
- Docker & Docker Compose (configuration en cours)

---

## 📦 Installation & Lancement

### Prérequis
- Node.js 18+ installé
- MySQL 8.0+ installé et démarré
- Git

### Installation locale

#### 1. Cloner le repository

git clone <repo-url>
cd YuGiOhTCG

#### 2. Configuration de la base de données

- Créer la base de données MySQL :

CREATE DATABASE yugioh_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

- Importer le schéma (si disponible) :

mysql -u root -p yugioh_db < database/schema.sql

#### 3. Backend

cd backend
npm install

- Créer le fichier `.env` :

JWT_SECRET=votre_secret_jwt_ultra_securise_ici
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=votre_mot_de_passe
DB_NAME=yugioh_db
DB_PORT=3306
PORT=3000

- Générer un JWT_SECRET sécurisé :

node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

- Lancer le serveur :

npm start

Le backend sera accessible sur [**http://localhost:3000**](http://localhost:3000)

#### 4. Frontend

cd frontend
npm install
npm run dev

Le frontend sera accessible sur [**http://localhost:5173**](http://localhost:5173)

---

## 📁 Structure du projet

YuGiOhTCG/
├── backend/
│ ├── Controllers/
│ │ ├── authController.js # Authentification (login/register)
│ │ ├── userController.js # Gestion des utilisateurs
│ │ ├── cardController.js # Gestion des cartes
│ │ └── ...
│ ├── Models/
│ │ ├── userModel.js # Modèle utilisateur
│ │ ├── cardModel.js # Modèle carte
│ │ └── ...
│ ├── Routes/
│ │ ├── authRoute.js # Routes d'authentification
│ │ ├── userRoute.js # Routes utilisateurs
│ │ ├── cardRoute.js # Routes cartes
│ │ └── ...
│ ├── middleware/
│ │ └── authMiddleware.js # Middleware JWT
│ ├── config/
│ │ └── bdd.js # Configuration MySQL
│ ├── scripts/
│ │ └── hashPasswords.js # Script de hashage des mots de passe
│ ├── index.js # Point d'entrée
│ ├── .env # Variables d'environnement (à créer)
│ └── package.json
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ │ └── NavBar.jsx # Barre de navigation
│ │ ├── pages/
│ │ │ ├── Login.jsx # Page de connexion
│ │ │ ├── Register.jsx # Page d'inscription
│ │ │ ├── Profile.jsx # Page de profil
│ │ │ ├── Account.jsx # Mon compte
│ │ │ ├── Dashboard.jsx # Tableau de bord (admin/modérateur)
│ │ │ └── ...
│ │ ├── services/
│ │ │ ├── api.js # Configuration Axios + intercepteurs JWT
│ │ │ ├── authAPI.js # Services d'authentification
│ │ │ ├── cardAPI.js # Services cartes
│ │ │ └── ...
│ │ ├── App.jsx # Composant racine
│ │ └── main.jsx
│ ├── package.json
│ └── vite.config.js
├── database/
│ └── schema.sql # Schéma de base (à créer)
├── docker-compose.yml # Configuration Docker (en cours)
└── README.md

---

## 🔌 Routes API principales

### Authentification
| Méthode | Route | Description | Protection |
|---------|-------|-------------|------------|
| POST | `/api/auth/register` | Inscription d'un utilisateur | Publique |
| POST | `/api/auth/login` | Connexion | Publique |
| GET | `/api/auth/verify` | Vérifier le token JWT | JWT requis |

### Utilisateurs
| Méthode | Route | Description | Protection |
|---------|-------|-------------|------------|
| GET | `/api/users` | Liste tous les utilisateurs | Publique |
| GET | `/api/users/:id` | Récupère un utilisateur | Publique |
| GET | `/api/profile` | Profil de l'utilisateur connecté | JWT requis |
| PUT | `/api/profile` | Modifier son profil | JWT requis |
| PUT | `/api/profile/password` | Changer son mot de passe | JWT requis |
| DELETE | `/api/users/:id` | Supprimer un utilisateur | JWT + Admin |

### Cartes
| Méthode | Route | Description | Protection |
|---------|-------|-------------|------------|
| GET | `/api/allCards` | Toutes les cartes | Publique |
| GET | `/api/card/:id` | Une carte par ID | Publique |
| POST | `/api/card` | Créer une carte | JWT requis |
| PUT | `/api/card/:id` | Modifier une carte | JWT requis |
| DELETE | `/api/card/:id` | Supprimer une carte | JWT + Admin |

### Métadonnées
| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/api/allAttributs` | Liste des attributs |
| GET | `/api/allRaretes` | Liste des raretés |
| GET | `/api/allEditions` | Liste des éditions |
| GET | `/api/allTypecards` | Liste des types de cartes |

---

## 🔐 Sécurité

### Mots de passe
- Hashage avec **bcrypt** (10 rounds)
- Vérification lors de la connexion
- Changement de mot de passe avec validation de l'ancien

### JWT (JSON Web Token)
- Token signé avec clé secrète (variable `JWT_SECRET`)
- Durée de validité : 24 heures
- Stockage dans `localStorage` côté client
- Envoi automatique dans le header `Authorization: Bearer <token>`

### Protection des routes
- Middleware `authMiddleware` pour vérifier le token
- Middleware `checkRole` pour restreindre par rôle (admin/modérateur)
- Redirection automatique vers `/login` si token invalide ou expiré

---

## 👥 Système de rôles

| RoleId | Nom | Permissions |
|--------|-----|-------------|
| 5 | Admin | Accès complet (dashboard, gestion users, suppression) |
| 6 | User | Création de cartes, gestion de son profil |
| 7 | Modérateur | Dashboard + modération de contenu |

---

## 🎨 Pages frontend

### Publiques
- **/** - Page d'accueil
- **/login** - Connexion
- **/register** - Inscription
- **/card** - Liste des cartes

### Protégées (JWT requis)
- **/profile** - Édition du profil
- **/account** - Voir mon compte
- **/new-card** - Créer une carte
- **/my-decks** - Mes decks (à venir)
- **/my-collection** - Ma collection (à venir)

### Admin/Modérateur uniquement
- **/dashboard** - Tableau de bord avec statistiques

---

## 🚀 Scripts utiles

### Backend

- Démarrer le serveur :
npm start

- Hasher les mots de passe existants (uniquement pour seed) :
node scripts/hashPasswords.js (uniquement pour seed)

### Frontend

- Mode développement avec hot reload :
npm run dev

- Build de production :
npm run build

- Prévisualiser le build :
npm run preview

---

## 🐳 Docker (Configuration en cours)

La configuration Docker est en cours d'amélioration. Pour l'instant, utiliser l'installation locale.

---

## 🔧 Développement

### Ajouter une nouvelle route protégée

1. **Backend** - Dans `Routes/maRoute.js` :

import { authMiddleware } from "../middleware/authMiddleware.js";

router.get('/ma-route', authMiddleware, monController.maFonction);

2. **Frontend** - L'instance `api` gère automatiquement le token :

import api from '../services/api';

const data = await api.get('/api/ma-route');

### Tester l'authentification

**Avec un compte de test** :

Email: yugi.muto@domino.com
Mot de passe: password123
Rôle: Admin

---

## 📝 TODO / Roadmap

- [ ] Finaliser la configuration Docker
- [ ] Page Mes Decks
- [ ] Page Ma Collection
- [ ] Système de favoris
- [ ] Recherche avancée de cartes
- [ ] Upload d'images de cartes
- [ ] Tests unitaires (Jest)
- [ ] CI/CD avec GitHub Actions

---

## ⚠️ Notes importantes

- 🔒 **Ne JAMAIS committer** le fichier `.env` avec les vraies identifiants
- 🔑 Utiliser un `JWT_SECRET` long et aléatoire (32+ caractères)
- 🗃️ Les mots de passe en BDD doivent **toujours** être hashés
- 📦 Les `node_modules/` sont ignorés par `.gitignore`
- ✅ Tester en local avant de pusher

---

## 🐛 Dépannage

### Erreur "Cannot find module"

cd backend && npm install
cd frontend && npm install

### Erreur "secretOrPrivateKey must have a value"
Vérifier que `JWT_SECRET` existe dans `backend/.env`

### Erreur MySQL "Cannot connect"
Vérifier que MySQL est démarré et les identifiants dans `.env`

### Token invalide après reconnexion
Vider le localStorage : `F12` → Console → `localStorage.clear()`


## 🤝 Contribution

Ce projet est réalisé dans le cadre de ma formation **DWWM 2025** (Développeur Web et Web Mobile).

### Pour les formateurs et évaluateurs
- 📖 Consultez le `Dictionnaire-de-donnees-YuGiOh.xlsx` pour la structure de la base de données
- 🗺️ Le schéma MCD/MLD est disponible dans `database/`
- 📝 Le code est commenté et suit les bonnes pratiques ES6+

### Pour les collègues de promo
Si tu veux contribuer ou tester :
1. **Fork** le repository
2. **Clone** ton fork : `git clone <ton-fork-url>`
3. **Crée une branche** : `git checkout -b feature/ma-fonctionnalite`
4. **Teste en local** (backend + frontend)
5. **Commit** : `git commit -m "Add: description de la feature"`
6. **Push** : `git push origin feature/ma-fonctionnalite`
7. **Ouvre une Pull Request** avec une description claire

### Standards de code
- ✅ Utiliser ES6+ (import/export, const/let, arrow functions)
- ✅ Nommer les variables en camelCase (`nomVariable`)
- ✅ Nommer les composants React en PascalCase (`MonComposant`)
- ✅ Commenter les fonctions complexes
- ✅ Tester avant de pusher

### Branches
- `main` - Version stable et fonctionnelle
- `dev` - Développement en cours
- `feature/*` - Nouvelles fonctionnalités
- `fix/*` - Corrections de bugs

---


## 👤 Auteur
**POIRET Ewan**
DWWM 2025

**Assistance technique**  
Développement assisté par **Perplexity AI** pour :
- Architecture backend (JWT, authentification, middleware)
- Optimisation des requêtes SQL
- Debugging et résolution de problèmes
- Documentation du code
- Pour m'expliquer pourquoi mon JWT était undefined à 2h du mat'
- Il a passé 3 heures à m'expliquer la différence entre `Mail` et `MAIL` dans ma BDD. Respect.

---

## Licence
MIT