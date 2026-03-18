# Portfolio — Jean-Baptiste Catois

Site portfolio statique de Jean-Baptiste Catois, étudiant en BUT Mesures Physiques
(Parcours Techniques d'instrumentation) à l'IUT de Caen, candidat à la formation
d'ingénieur ENSICAEN par l'apprentissage.

## Stack

HTML/CSS/JS vanilla — aucun framework, aucun build tool.
Déployable tel quel sur GitHub Pages.

## Structure

```
portfolio/
├── index.html
├── css/
│   ├── reset.css
│   ├── variables.css       ← tokens de design centralisés
│   ├── layout.css          ← container, nav, grilles, breakpoints
│   ├── components.css      ← timeline, cards, badges, pills, animations
│   └── sections.css        ← styles spécifiques par section
├── js/
│   ├── main.js             ← init, injection année courante
│   ├── nav.js              ← hamburger mobile, active link
│   └── animations.js       ← IntersectionObserver scroll reveal
├── assets/
│   ├── img/                ← ajouter profile.jpg ici
│   └── docs/               ← ajouter CV_JeanBaptiste_Catois.pdf ici
└── README.md
```

## Utilisation

Ouvrir `index.html` directement dans le navigateur. Aucun serveur requis.

## Déploiement GitHub Pages

1. Initialiser un dépôt Git et pousser sur GitHub
2. Settings → Pages → Source: branche `main`, dossier `/` (root)
3. Le site sera accessible à `https://<username>.github.io/<repo>/`

## Checklist avant mise en ligne

- [ ] Ajouter `assets/img/profile.jpg` (photo de profil, optionnelle)
- [ ] Ajouter `assets/docs/CV_JeanBaptiste_Catois.pdf`
- [ ] Valider HTML sur [validator.w3.org](https://validator.w3.org)
- [ ] Tester responsive sur DevTools (320px, 480px, 768px, 1024px)
- [ ] Tester navigation ancre sur desktop et mobile
- [ ] Vérifier le lien "Télécharger CV" → PDF
