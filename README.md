# DSI - Scraper Tracker

Ce dépôt contient l'API backend du projet « DSI - Scraper Tracker », développée avec NestJS et MikroORM (MySQL).

## Description

Service REST responsable de la récupération (scraping/synchronisation) d'offres depuis une API externe, du stockage en base de données et de l'exposition d'un API pour consulter ces offres.

Technologies principales :
- Node.js / TypeScript
- NestJS
- MikroORM (MySQL)
- Swagger pour la documentation de l'API

## Prérequis

- Node.js 18+ / npm
- MySQL (ou conteneur compatible)
- Variables d'environnement configurées (voir section `Variables d'environnement`)

## Variables d'environnement

Les variables d'environnement importantes :

- `PORT` : port d'écoute de l'application (par défaut 3000)
- `API_URL` : URL de l'API externe à interroger pour récupérer les offres
- `DB_HOST` : hôte MySQL
- `DB_PORT` : port MySQL
- `DB_USER` : utilisateur MySQL
- `DB_PASSWORD` : mot de passe MySQL
- `DB_NAME` : nom de la base de données

Ces variables peuvent être placées dans un fichier `.env` à la racine du projet.

## Installation

1. Cloner le dépôt
2. Installer les dépendances

```powershell
npm ci
```

## Commandes utiles

- Démarrer en développement (watch)

```powershell
npm run start:dev
```

- Démarrer en production (après build)

```powershell
npm run build
npm run start:prod
```

- Lancer les tests

```powershell
npm run test
npm run test:e2e
```

- Formater le code

```powershell
npm run format
```

## Migrations (MikroORM)

Création d'une migration :

```powershell
npm run migration:create
```

Appliquer les migrations :

```powershell
npm run migration:up
```

Revenir en arrière :

```powershell
npm run migration:down
```

> Les migrations utilisent la configuration présente dans `src/config/mikro-orm.config.ts`.

## Docker

Un `Dockerfile` est présent pour builder et exécuter l'application. Un `docker-compose.yml` peut aussi être fourni pour lancer l'application et la base de données (vérifier le fichier à la racine).

## Documentation de l'API

Une documentation Swagger est exposée par l'application après démarrage à :

```
GET /api
```

## Structure du projet (extrait)

- `src/main.ts` : point d'entrée, configuration globale (Swagger, filtres/intercepteurs)
- `src/app.module.ts` : module racine
- `src/application/offres` : logique métier concernant les offres
- `src/application/destinations`, `hotels`, `offres_dates` : entités et services associés
- `src/logger` : service de logging persistant
- `src/config` : configurations (MikroORM, Swagger, intercepteurs, filtres)
- `src/migrations` : migrations MikroORM

## Fonctionnalités principales

- Récupération d'un token depuis l'API externe (`API_URL`) puis synchronisation des offres
- Mapping et persistance des entités : `Offre`, `Destination`, `Hotel`, `OffreDate`
- Endpoints pour récupérer la liste des offres et une offre par ID
- Logs persistants stockés via le service `LoggerService`

## Développement & contribution

- Respecter les règles d'ESLint/Prettier (commande `npm run lint` et `npm run format`).
- Les tests unitaires et e2e sont gérés avec Jest.

## Remarques

- Vérifier les variables d'environnement avant de lancer l'application (notamment `API_URL` et les variables de base de données).
- La configuration des migrations est prête pour l'émission en TypeScript pendant le développement.

## Licence

Projet interne (voir le champ `license` dans `package.json`).
