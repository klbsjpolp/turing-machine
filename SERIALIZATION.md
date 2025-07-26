# Documentation de la sérialisation des puzzles

## Objectif

Ce document décrit un format de sérialisation compact, lisible et copiable pour les puzzles du jeu Turing Machine, tout en rendant la solution et les cartes non évidentes pour l'utilisateur. Le format encode la solution, chaque carte, et si elle est de type A ou B, dans une chaîne alphanumérique courte.

## Spécification du format

- **Format général** : Une chaîne alphanumérique (Base64 URL-safe) sans caractères spéciaux.
- **Contenu sérialisé** :
  - Solution (combinaison de 3 chiffres de 1 à 5)
  - 5 cartes critères (leur identifiant et leur type A/B)

## Implémentation technique

### Encodage binaire
1. **Solution** : Chaque chiffre (1-5) est encodé sur 3 bits (valeur - 1, donc 0-4)
   - Saphir : 3 bits
   - Topaze : 3 bits
   - Améthyste : 3 bits
2. **Cartes** : Pour chaque carte (5 au total)
   - Index de la carte dans AllPossibleCards : 7 bits (permet jusqu'à 128 cartes)
   - Règle de succès (A/B) : 1 bit (0 pour A, 1 pour B)

### Obfuscation
- Les données binaires sont obfusquées par un XOR avec la clé "BTMG" (en ASCII: 0x42, 0x54, 0x4D, 0x47)
- Cette opération rend la lecture directe des valeurs impossible sans connaître la clé

### Encodage final
- Les données obfusquées sont converties en Base64 URL-safe
- Les caractères '+' sont remplacés par '-'
- Les caractères '/' sont remplacés par '_'
- Les '=' de padding sont supprimés

## Exemples

### Exemple 1: Puzzle simple
- **Solution** : { saphir: 2, topaze: 4, amethyst: 1 }
- **Cartes** :
  1. A_parity_saphir (Règle A)
  2. A_parity_topaze (Règle B)
  3. A_parity_amethyst (Règle A)
  4. B_compare_gt_saphir_topaze (Règle B)
  5. C_sum_gt8 (Règle A)
- **Chaîne sérialisée** : `blRF11r-TQ`

### Exemple 2: Puzzle expert
- **Solution** : { saphir: 5, topaze: 3, amethyst: 1 }
- **Cartes** :
  1. C_all_unique (Règle A)
  2. D_or_gt3_ST (Règle A)
  3. B_largest_is_saphir (Règle A)
  4. C_product_gt15 (Règle B)
  5. D_at_least_one_1 (Règle A)
- **Chaîne sérialisée** : `ymcNYn6dTQ`

## Sécurité/Obfuscation

- L'utilisateur ne peut pas deviner la solution ou les cartes sans connaître:
  - La structure exacte du format binaire
  - La clé d'obfuscation XOR
  - La correspondance entre indices et cartes
- L'encodage rend la lecture directe impossible, même pour un développeur sans accès au code source

## Avantages
- Format court, facile à copier/coller
- Non trivial à décoder sans la structure
- Peut être étendu pour plus de cartes ou d'options
- Résistant aux tentatives de triche par inspection visuelle

## Notes techniques
- La taille totale des données binaires est de 49 bits (9 pour la solution + 8×5 pour les cartes)
- Cela donne 7 octets (avec padding), qui produisent une chaîne Base64 d'environ 10 caractères
- L'utilisation de l'encodage Base64 URL-safe évite les caractères spéciaux qui pourraient poser problème dans les URL

---

Pour toute modification du format, mettre à jour ce document.
