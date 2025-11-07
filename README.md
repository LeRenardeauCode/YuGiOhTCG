# Projet Yu-Gi-Oh TCG

## Description
Plateforme complète de gestion de cartes Yu-Gi-Oh avec API backend Node.js/Express, base de données MySQL et frontend React/Vite.

---

## Fonctionnalités
- ✅ API REST pour gérer les cartes Yu-Gi-Oh
- ✅ Base de données MySQL avec structure relationnelle
- ✅ Interface frontend interactive pour visualiser les cartes
- ✅ Docker & Docker Compose pour un environnement isolé et reproductible
- ✅ Gestion des attributs, raretés, éditions et types de cartes

---

## Technologies utilisées
### Backend
- Node.js 18
- Express.js
- MySQL 8.0
- Sequelize (ORM)

### Frontend
- React 18 + Vite
- Axios pour les requêtes API

### DevOps
- Docker & Docker Compose
- Nginx (production)

---

## Installation & Lancement

### Prérequis
- Docker & Docker Desktop installés
- Git

### Méthode 1 : Avec Docker (Recommandé)

- Cloner le repo
git clone <repo-url>
cd YuGiOhTCG

- Lancer tout avec Docker Compose
docker-compose up -d --build

- Accéder à l'app
Frontend : http://localhost:5173

Backend API : http://localhost:3000

- MySQL : localhost:3307

### Méthode 2 : Développement local

- Backend
cd backend
npm install
npm start

- Frontend (dans un autre terminal)
cd frontend
npm install
npm run dev

---

## Structure du projet

YuGiOhTCG/
├── backend/
│ ├── Controllers/
│ ├── Models/
│ ├── Routes/
│ ├── index.js
│ └── package.json
├── frontend/
│ ├── src/
│ ├── public/
│ ├── package.json
│ └── vite.config.js
├── database/
│ └── init.sql (schéma de base)
├── docker-compose.yml
└── README.md

---

## Routes principales de l'API

| Méthode | Route | Description |
|---------|-------|-------------|
| GET | `/api/card` | Récupère toutes les cartes |
| GET | `/api/card/:id` | Récupère une carte par ID |
| POST | `/api/card` | Crée une nouvelle carte |
| PUT | `/api/card/:id` | Met à jour une carte |
| DELETE | `/api/card/:id` | Supprime une carte |

---

## Commandes Docker essentielles

- Démarrer les containers
docker-compose up -d --build

- Arrêter les containers
docker-compose down

- Arrêter + supprimer les données
docker-compose down -v

- Voir les logs
docker-compose logs -f

- Logs d'un service spécifique
docker-compose logs -f backend

---

## Gestion de la base de données

### Accès direct à MySQL

docker-compose exec mysql mysql -u yugioh_user -pyugioh_pass -D yugioh_db

- Afficher les tables
SHOW TABLES;

### Ajouter des données de test

docker exec -it yugioh-mysql mysql -u root -prootpassword yugioh_db < ./database/init.sql


---

## Contribution
Les PR sont les bienvenues ! Avant de proposer des changements :
1. Créer une branche (`git checkout -b feature/ma-feature`)
2. Tester localement avec Docker
3. Committer les changements (`git commit -m 'Add feature'`)
4. Pousser la branche (`git push origin feature/ma-feature`)
5. Ouvrir une Pull Request

---

## Notes importantes
- 🔒 Ne pas committer les fichiers `.env` avec les identifiants
- 📦 Le `database/init.sql` DOIT être versionné pour la reproductibilité
- 🐳 Les `node_modules/` et `mysql_data/` sont ignorés par `.gitignore`
- ✅ Toujours tester avec Docker avant de pusher (`docker-compose up -d --build`)

---

## Auteur
**POIRET Ewan**

---

## Licence
MIT