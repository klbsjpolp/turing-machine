# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/89930604-971f-4e2c-addb-d68d5cc4c72c

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/89930604-971f-4e2c-addb-d68d5cc4c72c) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/89930604-971f-4e2c-addb-d68d5cc4c72c) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

---

# Turing Machine — Version Numérique Steampunk

## Concept et Objectif

Ce projet implémente une version solo numérique du jeu de déduction « Turing Machine » dans un univers steampunk avancé. Le joueur, Maître-Machiniste, doit découvrir une combinaison secrète à 3 chiffres (1-5, associée à Saphir/Bleu, Topaze/Jaune, Améthyste/Violet) en interrogeant une machine via des schémas de test et des cartes critères à double règle logique.

## Mécaniques de Jeu

- **Combinaison Maîtresse** : Code secret à 3 chiffres (1-5), chacun lié à une couleur (Saphir/Bleu, Topaze/Jaune, Améthyste/Violet).
- **Cartes Critères (Vérificateurs)** : 5 par partie, choisies parmi un large éventail. Chaque carte propose une opposition logique (ex: Pair/Impair). Le joueur voit les deux règles mais ignore laquelle donne le succès (✓).
- **Assignation secrète** : Pour chaque carte, la condition de succès (✓) est choisie aléatoirement et cachée.
- **Déroulement** : 7 manches maximum. À chaque manche, le joueur peut mener **jusqu'à 3 analyses** (il n'est pas obligé de toutes les utiliser). Après chaque test, la machine affiche ✓ ou ✗ et consigne le résultat.
- **Objectif** : Déduire la combinaison ET la règle de succès de chaque carte avant la fin de la 7e manche.

### Liste des Cartes Critères (48 Vérificateurs)

Pour garantir une grande rejouabilité, la machine sélectionne ses critères parmi les catégories suivantes :

**Catégorie A : Conditions de Valeur (15 cartes)**
- `[Couleur]` est PAIR / IMPAIR (3 cartes)
- `[Couleur]` est < 3 / ≥ 3 (3 cartes)
- `[Couleur]` est > 3 / ≤ 3 (3 cartes)
- `[Couleur]` est = 1 / ≠ 1 (3 cartes)
- `[Couleur]` est = 3 / ≠ 3 (3 cartes)

**Catégorie B : Comparaisons entre Couleurs (12 cartes)**
- `Saphir` > `Topaze` / `Saphir` ≤ `Topaze` (et permutations, 3 cartes)
- `Saphir` = `Topaze` / `Saphir` ≠ `Topaze` (et permutations, 3 cartes)
- Le plus petit chiffre est `[Couleur]` / N'est pas `[Couleur]` (3 cartes)
- Le plus grand chiffre est `[Couleur]` / N'est pas `[Couleur]` (3 cartes)

**Catégorie C : Conditions sur l'Ensemble du Code (12 cartes)**
- La somme des chiffres est > 8 / ≤ 8
- Le nombre de chiffres pairs est = 1 / ≠ 1
- Le nombre de chiffres impairs est > 1 / ≤ 1
- Tous les chiffres sont uniques / Au moins deux sont identiques
- Exactement deux chiffres sont égaux / (Tous uniques ou tous identiques)
- Tous les chiffres sont < 4 / Au moins un chiffre est ≥ 4
- Les chiffres sont en ordre croissant strict (`S`<`T`<`A`) / Ne le sont pas
- Les chiffres sont en ordre décroissant strict (`S`>`T`>`A`) / Ne le sont pas
- La somme des chiffres est paire / impaire
- Le produit des chiffres est > 20 / ≤ 20

**Catégorie D : Conditions Logiques et Complexes (9 cartes)**
- (`Saphir` est PAIR) OU (`Topaze` est PAIR) / (`Saphir` est IMPAIR) ET (`Topaze` est IMPAIR)
- (`Saphir` > 3) OU (`Améthyste` > 3) / (`Saphir` ≤ 3) ET (`Améthyste` ≤ 3)
- Le chiffre du milieu (ni min, ni max) est PAIR / IMPAIR
- La somme (`Saphir` + `Topaze`) > `Améthyste` / ≤ `Améthyste`
- L'écart entre le max et le min est > 2 / ≤ 2
- Au moins un chiffre = 2 / Aucun chiffre = 2
- Au moins un chiffre = 4 / Aucun chiffre = 4
- Le nombre de chiffres > 3 est égal au nombre de chiffres < 3 / N'est pas égal

## Logique de Validation

- Le système génère la combinaison, choisit 5 cartes, assigne ✓ à une règle par carte, et vérifie l’unicité de la solution.
- **Gestion des égalités** : Pour les comparaisons (ex: `Saphir > Topaze`), la condition opposée (`Saphir ≤ Topaze`) inclut le cas d'égalité. Les règles sont conçues pour être mutuellement exclusives.
- Lors d’un test, la machine compare le schéma proposé à la règle secrète de la carte testée et retourne ✓ ou ✗.

## Interface et Expérience Utilisateur

- **Sélection** : 3 panneaux (Saphir, Topaze, Améthyste), chacun avec 5 boutons-poussoirs (1-5). Un seul bouton actif par couleur.
- **Lancer l’Analyse** : Grand levier animé, effet d’étincelles et son lourd lors de l’action.
- **Fin de Manche** : Bouton-poussoir animé avec retour sonore et lumineux.
- **Affichage des résultats** : LED/tube à côté de chaque carte, s’allume en vert (✓) ou rouge (✗) après test. Résultats animés façon tube Nixie.
- **Journal de bord** : Effet machine à écrire pour chaque nouvelle entrée.
- **Compteur de manche** : Compteur mécanique à rouleaux animé et sonore.

### Feedback Visuel Instantané
Lorsqu’un bouton-poussoir est pressé, une micro-animation se déclenche : le bouton s'enfonce avec une lueur interne, et des étincelles discrètes jaillissent sur les côtés. Le panneau de contrôle subit une légère secousse pour simuler l'impact mécanique.

### Effets de Lumière Dynamiques
L'interface est éclairée par des sources de lumière virtuelles qui créent des reflets réalistes sur les surfaces métalliques (laiton, cuivre) et des ombres portées. L'activation d'un levier ou l'affichage d'un résultat projette une lueur intense et brève sur les éléments environnants.

## Génération Procédurale et Direction Artistique

- **Bordures** : Ornement victorien industriel généré dynamiquement, engrenages animés dans les coins.
- **Arrière-plan** : Shaders/textures procédurales (bois poli, métal usé), particules de vapeur.
- **Éléments interactifs** : Boutons et leviers animés, sons mécaniques lourds, effets de lumière.

### Librairies recommandées
- **Graphique** : Three.js, Babylon.js, ou un moteur de jeu comme Godot/Unity.
- **Audio** : Web Audio API, Howler.js, ou FMOD.

## Succès et Fin de Partie
- **Victoire** : Le joueur trouve la combinaison.
- **Surcharge** : Échec après 7 manches.
- **Abandon** : L'arrêt d’urgence met fin à la partie et révèle la Combinaison Maîtresse ainsi que les règles secrètes (✓) de chaque carte.
