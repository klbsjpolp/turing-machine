# Documentation de la sérialisation des puzzles

## Objectif

Ce document décrit un format de sérialisation compact, lisible et copiable pour les puzzles du jeu Turing Machine, tout en rendant la solution et les cartes non évidentes pour l'utilisateur. Le format encode la solution, chaque carte, et si elle est de type A ou B, dans une chaîne alphanumérique courte.

## Spécification du format

- **Format général** : Une chaîne alphanumérique (Base64 URL-safe) sans caractères spéciaux.
- **Contenu sérialisé** :
  - Solution (ex : combinaison de 3 chiffres de 1 à 5)
  - 5 cartes critères (leur critère et leur type A/B)

### Détails d'encodage

#### 1. Solution
- La solution est une combinaison de 3 chiffres, chacun de 1 à 5 (ex : 2-4-1).
- Chaque chiffre est encodé sur 3 bits (permet de coder 1 à 5, 0 et 6-7 inutilisés).
- Total : 9 bits pour la solution.

#### 2. Cartes critères
- Il y a toujours 5 cartes.
- Chaque carte a :
  - Un critère (ex : "plus grand que 3", "pair", etc.), supposé numéroté de 0 à N-1 (N = nombre total de critères possibles, par exemple 16 → 4 bits).
  - Un type : A (0) ou B (1), codé sur 1 bit.
- Chaque carte = 4 bits (critère) + 1 bit (A/B) = 5 bits.
- Total pour 5 cartes : 25 bits.

#### 3. Concaténation et encodage
- On concatène les bits : solution (9) + cartes (25) = 34 bits.
- On convertit en bytes, puis on encode en Base64 URL-safe.

### Ordre d'encodage et de décodage

- **Ordre des bits** :
  - Les 9 premiers bits (de poids fort) correspondent à la solution : d'abord le chiffre du saphir (3 bits), puis celui de la topaze (3 bits), puis celui de l'améthyste (3 bits).
  - Les 25 bits suivants correspondent aux 5 cartes, dans l'ordre : pour chaque carte, 4 bits pour le critère (index dans la liste des critères), puis 1 bit pour le type (A=0, B=1).
- **Décodage** :
  - Toujours lire la solution en premier (bits de poids fort), puis les cartes dans l'ordre d'encodage.

## Exemple d'encodage

Supposons :
- Solution : 2-4-1
- Cartes :
  - Carte 1 : critère 3, type A
  - Carte 2 : critère 7, type B
  - Carte 3 : critère 12, type A
  - Carte 4 : critère 0, type B
  - Carte 5 : critère 5, type A

**Étape 1 : Encodage**
- Solution : 2 (010), 4 (100), 1 (001) → `010100001`
- Cartes :
  - 3 (0011), A (0) → `00110`
  - 7 (0111), B (1) → `01111`
  - 12 (1100), A (0) → `11000`
  - 0 (0000), B (1) → `00001`
  - 5 (0101), A (0) → `01010`
- Cartes concaténées : `00110 01111 11000 00001 01010`

**Étape 2 : Concaténation**
- Tout concaténé : `0101000010011001111110000000101010` (34 bits)

**Étape 3 : Encodage Base64**
- On convertit en bytes, puis on encode en Base64 URL-safe.
- Exemple fictif : `Uk9x2g` (la chaîne réelle dépend de l'implémentation)

## Exemple complet

| Solution | Cartes (critère, type)                              | Chaîne sérialisée |
|----------|-----------------------------------------------------|-------------------|
| 2-4-1    | (3,A), (7,B), (12,A), (0,B), (5,A)                 | Uk9x2g            |
| 5-1-3    | (8,B), (2,A), (15,B), (4,A), (9,B)                 | Z1Jv8w            |

## Décodage

Pour décoder :
1. Décoder la chaîne Base64 en bytes.
2. Lire les 9 premiers bits pour la solution (3 chiffres de 3 bits).
3. Lire les 25 bits suivants pour les 5 cartes (5 x [4 bits critère + 1 bit A/B]).
4. Reconstituer la solution et les cartes.

## Sécurité/Obfuscation

- L'utilisateur ne peut pas deviner la solution ou les cartes sans connaître la structure exacte du format.
- L'ordre des bits et l'encodage Base64 rendent la lecture directe difficile.

## Avantages
- Format court, facile à copier/coller.
- Non trivial à décoder sans la structure.
- Peut être étendu pour plus de cartes ou d'options.

## Notes
- Adapter le nombre de bits selon le nombre de critères possibles.
- Utiliser l'encodage Base64 URL-safe pour éviter les caractères spéciaux.

---

Pour toute modification du format, mettre à jour ce document.
