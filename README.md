# Calculateur d'Intérêts Composés

Un calculateur d'intérêts composés complet avec deux modes de calcul :
1. **Simulateur** : Calculez la croissance de votre épargne avec des versements réguliers
2. **Objectif** : Déterminez combien investir pour atteindre un montant cible

## 🚀 Fonctionnalités

### Onglet Simulateur
- **Capital initial** : Montant de départ de votre investissement
- **Versements flexibles** : Choix entre versement mensuel, trimestriel, semestriel ou annuel
- **Taux d'intérêt annuel** : Rendement attendu de votre placement
- **Durée d'investissement** : Horizon de placement en années
- **Options avancées** :
  - Augmentation annuelle des versements (pour suivre l'inflation)
  - Fréquence de capitalisation des intérêts
  - Taux d'imposition sur les plus-values

### Onglet Objectif
- **Montant cible** : L'objectif financier à atteindre
- **Capital initial** : Montant de départ (optionnel)
- **Durée** : Nombre d'années pour atteindre l'objectif
- **Taux d'intérêt** : Rendement attendu
- **Résultats** : Affiche le montant de versement nécessaire pour chaque fréquence :
  - Mensuel
  - Trimestriel
  - Semestriel
  - Annuel

## 💱 Devises supportées

### Devises principales
- Euro (€)
- Dollar américain ($)
- Livre sterling (£)
- Yen japonais (¥)
- Franc suisse (CHF)
- Dollar canadien (CAD)
- Dollar australien (AUD)

### Devises africaines
- Franc CFA UEMOA et CEMAC (FCFA)
- Rand sud-africain (ZAR)
- Naira nigérian (₦)
- Et plus de 25 autres devises africaines...

## 📊 Visualisation

Chaque calcul génère un graphique interactif montrant :
- L'évolution de la valeur totale du portefeuille
- Le cumul des montants investis
- Les intérêts générés au fil du temps
- (Onglet Objectif) Une ligne d'objectif pour visualiser la progression

## 🧮 Formules utilisées

### Intérêts composés avec versements réguliers
```
FV = PV × (1 + r/n)^(n×t) + PMT × [((1 + r/n)^(n×t) - 1) / (r/n)]
```

Où :
- FV = Valeur future
- PV = Capital initial
- r = Taux d'intérêt annuel
- n = Fréquence de capitalisation
- t = Durée en années
- PMT = Montant du versement périodique

### Calcul du versement pour atteindre un objectif
```
PMT = (FV - PV × (1 + r)^n) × r / ((1 + r)^n - 1)
```

## 🛠️ Technologies utilisées

- HTML5
- CSS3
- JavaScript (Vanilla)
- Chart.js pour les graphiques

## 📱 Responsive

L'interface s'adapte automatiquement aux différentes tailles d'écran (desktop, tablette, mobile).

## 🚀 Utilisation

1. Clonez le repository
2. Ouvrez `index.html` dans votre navigateur
3. Ou accédez directement via GitHub Pages

## 📄 Licence

MIT License - Libre d'utilisation et de modification.
