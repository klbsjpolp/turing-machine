# Guide de contribution

## Prérequis

- Node.js (version >=18)
- Yarn (version >=4.0.0)

## Installation

1. Clonez le dépôt :
   ```bash
   git clone [URL_DU_REPO]
   cd [NOM_DU_REPO]
   ```

2. Installez les dépendances :
   ```bash
   yarn install
   ```

## Workflow de développement

1. Lancez le serveur de développement :
   ```bash
   yarn dev
   ```

2. Lancez les tests :
   ```bash
   yarn test
   ```

3. Vérifiez le linting :
   ```bash
   yarn lint
   ```

## Ajouter des dépendances

- Pour ajouter une dépendance de production :
  ```bash
  yarn add [package-name]
  ```

- Pour ajouter une dépendance de développement :
  ```bash
  yarn add -D [package-name]
  ```

## Mise à jour des dépendances

```bash
yarn upgrade-interactive
```

## Construire pour la production

```bash
yarn build
```

## Convention de branches et commits

- Branches : `feature/nom-de-la-feature`, `bugfix/description-du-bug`
- Commits : format conventionnel (feat, fix, docs, style, refactor, test, chore)
