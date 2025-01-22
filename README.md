# OC-Movies
# 🎥 Site web JustStreamIt 

Ce projet est un site web interactif pour afficher, explorer et consulter des informations sur des films. L'interface inclut une section de "Meilleur Film", une grille de films par catégorie, et une modale responsive.

## 🚀 Fonctionnalités Principales
- **Affichage du meilleur film** : Image et détails alignés quel que soit l'écran.
- **Grille de films par catégorie** : Affichage responsive de films (3 par ligne, ajustable en fonction de la taille de l'écran).
- **Modale interactive** : Affiche les détails d'un film dans une fenêtre pop-up adaptée à tous les écrans.

---

## 🛠️ Configuration et Installation

1. **Cloner le Répertoire :**
   ```bash
   git clone https://github.com/santultimate/OC-Movies.git
   ```
   Accédez au répertoire du projet :
   ```bash
   cd votre-repo
   ```

2. **Installer un Serveur Local (si nécessaire)** :
   - Si vous n'avez pas de serveur local installé, vous pouvez utiliser Python pour démarrer un serveur simple :
     ```bash
     python -m http.server
     ```
   - Sinon, utilisez un outil comme XAMPP, MAMP ou un serveur intégré dans votre IDE.

3. **Accéder au Site** :
   - Ouvrez votre navigateur et accédez à : 
     ```
     http://localhost:8000
     ```

---

## 📂 Structure du Projet
```
votre-repo/
├── index.html        # Page principale
├── styles.css        # Feuille de style
├── scripts.js        # Scripts JavaScript
├── assets/logo           # Contient les images et autres fichiers
└── README.md         # Documentation
```

---

## ✅ Instructions de Test

1. **Tester la Grille des Films** :
   - Vérifiez que la grille affiche 3 films par ligne sur les écrans larges.
   - Réduisez la taille de la fenêtre pour vérifier qu’elle passe à 2 ou 1 film par ligne sur les écrans plus petits.

2. **Tester la Section "Meilleur Film"** :
   - Assurez-vous que l'image est alignée à gauche et les détails à droite.
   - Vérifiez que l'apparence est cohérente sur différents appareils (mobile, tablette, PC).

3. **Tester la Modale** :
   - Cliquez sur un film pour ouvrir la modale.
   - Vérifiez que la modale s'affiche bien au centre de l'écran.
   - Confirmez que la disposition (image + texte) reste correcte sur différents appareils.

4. **Tester les Boutons "Détails"** :
   - Passez votre souris sur un film pour voir le bouton apparaître.
   - Cliquez sur le bouton pour afficher les informations dans la modale.

5. **Responsive Design** :
   - Testez le site sur différentes tailles d'écran (mobile, tablette, bureau).
   - Vérifiez que les éléments s'adaptent correctement (grille, modale, boutons).

---

## 🌐 Technologies Utilisées

- **HTML5**
- **CSS3** (avec focus sur le responsive design)
- **JavaScript** pour les interactions (ex. modale).

---

## 📢 Suggestions ou Problèmes
Si vous rencontrez des problèmes ou avez des suggestions, ouvrez une **issue** sur le dépôt GitHub.

---

## 🏆 Auteur
Créé avec ❤️ par Yacouba SANTARA.