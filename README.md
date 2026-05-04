# 📝 Todo API — NestJS

API REST pour une application de gestion de tâches avec authentification utilisateur.

Réalisée dans le cadre d'un stage, cette API permet à chaque utilisateur de gérer ses propres tâches après authentification via JWT.

---

## 👥 Équipe

| Nom | Rôle |
|---|---|
| **Luce** | Lead — Setup, configuration, entités, review |
| **Khady** | Module Auth (register, login, JWT) |
| **Khoudia** | Module Todos (CRUD) |

---

## 🛠️ Stack technique

- **NestJS** — Framework Node.js
- **TypeORM** — ORM pour la base de données
- **MySQL** — Base de données
- **Passport + JWT** — Authentification
- **bcrypt** — Hashage des mots de passe
- **class-validator** — Validation des données entrantes

---

## 📁 Structure du projet

```
src/
├── auth/
│   ├── dto/
│   │   ├── register.dto.ts
│   │   └── login.dto.ts
│   ├── user.entity.ts
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── auth.module.ts
│   ├── jwt.strategy.ts
│   └── jwt-auth.guard.ts
├── todos/
│   ├── dto/
│   │   ├── create-todo.dto.ts
│   │   └── update-todo.dto.ts
│   ├── todo.entity.ts
│   ├── todos.controller.ts
│   ├── todos.service.ts
│   └── todos.module.ts
├── app.module.ts
└── main.ts
```

---

## ⚙️ Installation

### Prérequis

- Node.js v18+
- MySQL installé et démarré

### 1. Cloner le projet

```bash
git clone https://github.com/TON_USERNAME/todo-api.git
cd todo-api
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer les variables d'environnement

Copie le fichier `.env.example` et remplis les valeurs :

```bash
cp .env.example .env
```

```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=tonMotDePasse
DB_NAME=todo_db
JWT_SECRET=unSecretTresLongEtAleatoire123!
PORT=3000
```

### 4. Créer la base de données MySQL

```sql
CREATE DATABASE todo_db;
```

### 5. Lancer le projet

```bash
# Développement
npm run start:dev

# Production
npm run start:prod
```

L'API sera disponible sur `http://localhost:3000`

> Les tables sont créées automatiquement grâce à `synchronize: true` de TypeORM.

---

## 🔐 Authentification

### Register

```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "monMotDePasse"
}
```

**Réponse :**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### Login

```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "monMotDePasse"
}
```

**Réponse :**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

> ⚠️ Toutes les routes `/todos` nécessitent ce token dans le header :
> `Authorization: Bearer <access_token>`

---

## ✅ Todos (routes protégées)

Toutes ces routes nécessitent un token JWT valide dans le header.

### Créer une tâche

```http
POST /todos/create
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Faire la vaisselle"
}
```

**Réponse :**
```json
{
  "id": 1,
  "title": "Faire la vaisselle",
  "done": false
}
```

---

### Récupérer toutes ses tâches

```http
GET /todos
Authorization: Bearer <token>
```

**Réponse :**
```json
[
  { "id": 1, "title": "Faire la vaisselle", "done": false },
  { "id": 2, "title": "Faire les courses", "done": true }
]
```

---

### Modifier le statut d'une tâche

```http
PATCH /todos/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "done": true
}
```

---

### Supprimer une tâche

```http
DELETE /todos/:id
Authorization: Bearer <token>
```

**Réponse :**
```json
{
  "message": "La tâche avec l'ID 1 a été supprimée avec succès"
}
```

---

## 🗄️ Modèle de données

### User

| Champ | Type | Description |
|---|---|---|
| `id` | int (PK) | Identifiant unique |
| `email` | string (unique) | Adresse email |
| `password` | string | Mot de passe hashé (bcrypt) |

### Todo

| Champ | Type | Description |
|---|---|---|
| `id` | int (PK) | Identifiant unique |
| `title` | string | Titre de la tâche |
| `done` | boolean | Statut (défaut : false) |
| `userId` | int (FK) | Référence vers l'utilisateur |

---

## 🌿 Branches Git

| Branche | Description |
|---|---|
| `main` | Version stable |
| `develop` | Branche d'intégration |
| `feature/auth` | Module authentification |
| `feature/todos` | Module todos |

---

## 📦 Scripts disponibles

```bash
npm run start        # Démarrer en mode normal
npm run start:dev    # Démarrer en mode watch (développement)
npm run start:prod   # Démarrer en mode production
npm run build        # Compiler le projet
```