//localStorage.clear();
const banner = document.getElementById('cookie-banner');
const settings = document.getElementById('cookie-settings');
const acceptBtn = document.getElementById('accept-cookies');
const declineBtn = document.getElementById('decline-cookies');
const settingsBtn = document.getElementById('cookie-settings-btn');
const saveSettingsBtn = document.getElementById('save-settings');
const closeSettingsBtn = document.getElementById('close-settings');

// Anzeigen beim Laden
window.addEventListener('load', () => {
  const choice = localStorage.getItem('cookie_choice');
  if (choice === 'accepted') {
    loadAdSense();         // Direkt Werbung laden
    banner.style.display = 'none'; // Kein Banner mehr zeigen
  } else if (choice === 'custom') {
    const allowMarketing = localStorage.getItem('allow_marketing') === 'true';
    if (allowMarketing) {
      loadAdSense(); // Werbung laden nur wenn Marketing erlaubt
    }
    banner.style.display = 'none';
  } else {
    banner.style.display = 'flex'; // Banner zeigen wenn keine Entscheidung
  }
});

// Akzeptieren (alle Cookies)
acceptBtn.addEventListener('click', () => {
  localStorage.setItem('cookie_choice', 'accepted');
  localStorage.setItem('allow_analytics', 'true');
  localStorage.setItem('allow_marketing', 'true');
  alert('Cookies akzeptiert!');
  banner.style.display = 'none';
  loadAdSense(); // Werbung laden
});

// Ablehnen (keine Cookies außer notwendig)
declineBtn.addEventListener('click', () => {
  localStorage.setItem('cookie_choice', 'declined');
  localStorage.setItem('allow_analytics', 'false');
  localStorage.setItem('allow_marketing', 'false');
  alert('Cookies abgelehnt!');
  banner.style.display = 'none';
});

// Einstellungen öffnen
settingsBtn.addEventListener('click', () => {
  loadCookieSettings();
  settings.classList.remove('hidden');
  banner.style.display = 'none';
});

// Speichern der individuellen Einstellungen
saveSettingsBtn.addEventListener('click', () => {
  const analytics = document.getElementById('analytics-cookies').checked;
  const marketing = document.getElementById('marketing-cookies').checked;
  localStorage.setItem('cookie_choice', 'custom');
  localStorage.setItem('allow_analytics', analytics);
  localStorage.setItem('allow_marketing', marketing);
  alert('Einstellungen gespeichert!');
  settings.classList.add('hidden');
  if (marketing) {
    loadAdSense(); // Werbung laden, wenn Marketing erlaubt ist
  }
});

// Schließen ohne speichern
closeSettingsBtn.addEventListener('click', () => {
  settings.classList.add('hidden');
});

// Cookie Einstellungen laden
function loadCookieSettings() {
  const choice = localStorage.getItem('cookie_choice');
  if (!choice) {
    // Keine Wahl getroffen: beide Checkboxen leer lassen
    document.getElementById('analytics-cookies').checked = false;
    document.getElementById('marketing-cookies').checked = false;
  } else if (choice === 'accepted') {
    // Alles erlaubt: beide an
    document.getElementById('analytics-cookies').checked = true;
    document.getElementById('marketing-cookies').checked = true;
  } else if (choice === 'declined') {
    // Alles abgelehnt: beide aus
    document.getElementById('analytics-cookies').checked = false;
    document.getElementById('marketing-cookies').checked = false;
  } else if (choice === 'custom') {
    // Individuelle Einstellungen laden
    document.getElementById('analytics-cookies').checked = localStorage.getItem('allow_analytics') === 'true';
    document.getElementById('marketing-cookies').checked = localStorage.getItem('allow_marketing') === 'true';
  }
}

// Footer-Link: Cookie-Einstellungen anzeigen
document.getElementById('showCookieSettings').addEventListener('click', function(e) {
  e.preventDefault();
  loadCookieSettings();
  settings.classList.remove('hidden');
  banner.style.display = 'none';
  settings.scrollIntoView({ behavior: 'smooth' });
});

// Werbung nur laden, wenn erlaubt
function loadAdSense() {
  if (document.getElementById('adsense-script')) return; // Verhindert doppeltes Laden
  const script = document.createElement('script');
  script.id = 'adsense-script';
  script.async = true;
  script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
  script.setAttribute("data-ad-client", "ca-pub-XXXXXXXXXXXXXXX"); // Deine echte ID hier einsetzen
  document.head.appendChild(script);
}















