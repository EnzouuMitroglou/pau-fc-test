// 1. Enregistrer le service worker (nécessaire pour le mode hors-ligne
//    et demandé par certains navigateurs pour autoriser l'installation)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js')
      .then(() => console.log('Service worker enregistré'))
      .catch((err) => console.error('Erreur service worker :', err));
  });
}

// 2. Gérer le bouton "Installer l'appli" personnalisé
//    (sur Android/Chrome, le navigateur déclenche cet événement
//    quand le site remplit les conditions pour être installé)
let deferredPrompt;
const installBtn = document.getElementById('install-btn');

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  deferredPrompt = event;
  installBtn.hidden = false;
});

installBtn.addEventListener('click', async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  await deferredPrompt.userChoice;
  deferredPrompt = null;
  installBtn.hidden = true;
});

// 3. Exemple : c'est ici que tu brancheras un fetch() vers ton API PHP
//    pour remplacer les actualités statiques par de vraies données.
// fetch('/api/actualites.php')
//   .then((res) => res.json())
//   .then((data) => { /* construire les .news-card dynamiquement */ });
