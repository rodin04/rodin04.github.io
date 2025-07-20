

const panel = document.getElementById('infoPanel');
const closeBtn = document.getElementById('closePanel');
const content = document.getElementById('panelContent');

function CLEAR_PLOTTS_FOR_FOOTER()
{
    // Header entfernen, wenn vorhanden
    const table = document.querySelector(".table");
    const header = table.querySelector(".row.header");
    if (header) {
        header.remove();
    }

    const container = document.getElementById('myChartContainer');
    container.innerHTML = "";                                     //Plott zeilen cleare
    document.getElementById('CONTAINER').innerHTML = "";        //  create pdf button cleare
    document.getElementById('toogle').innerHTML = "";           // toggle switch clear
}


document.getElementById('showImpressum').addEventListener('click', function(e) {
  e.preventDefault();
  content.innerHTML = `
    <h2>Impressum</h2>

    <p>Angaben gemäß § 5 TMG:<br><br>
    Rodin Aksünger<br>
    Bohnapfelweg 27<br>
    70437 Stuttgart<br>
    Deutschland</p>

    <p><strong>Kontakt:</strong><br>
    E-Mail: <a href="mailto:contact.instantpace@yahoo.com" style="color: white; text-decoration: underline;">contact.instantpace@yahoo.com</a></p>

    <p>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:<br>
    Rodin Aksünger</p>

    <p>Diese Webseite ist derzeit eine private, nicht-kommerzielle Webseite.<br>
    Sollte die Webseite zukünftig kommerziell genutzt werden, wird dieser Hinweis entsprechend angepasst.</p>

    <p>Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links.<br>
    Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.</p>
  `;

  panel.classList.add('visible');
  panel.scrollIntoView({behavior: "smooth"});
  CLEAR_ALL_ROWS();
  CLEAR_PLOTTS_FOR_FOOTER();
});

document.getElementById('showDatenschutz').addEventListener('click', function(e) {
  e.preventDefault();
  content.innerHTML = `
    <h2>Datenschutzerklärung</h2>

    <p>Der Schutz deiner persönlichen Daten ist uns wichtig. Wir behandeln deine personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften.</p>

    <h3>Erhebung und Verarbeitung von Daten</h3>
    <p>Beim Besuch unserer Webseite werden automatisch Informationen wie z.B. deine IP-Adresse, der verwendete Browser, Datum und Uhrzeit des Zugriffs sowie die angefragten Seiten von unserem Webserver erfasst und gespeichert. Diese Daten sind notwendig, um den Betrieb der Webseite zu gewährleisten, und werden anonymisiert verarbeitet, sodass keine direkte Zuordnung zu einzelnen Personen möglich ist.</p>

    <h3>Kontaktformular und Kommentare</h3>
    <p>Wenn du uns per Kontaktformular Nachrichten sendest oder Kommentare hinterlässt, werden die von dir angegebenen Daten (z.B. Name, E-Mail-Adresse) gespeichert, um deine Anfrage zu bearbeiten und ggf. Rückfragen zu stellen.</p>

    <h3>Cookies</h3>
    <p>Unsere Webseite verwendet Cookies, um dir ein optimales Nutzererlebnis zu bieten. Beim ersten Besuch kannst du selbst entscheiden, welche Arten von Cookies gesetzt werden dürfen:</p>

    <ul>
      <li><strong>Notwendige Cookies:</strong> Für den Betrieb der Seite technisch erforderlich und können nicht deaktiviert werden.</li>
      <li><strong>Analyse-Cookies:</strong> Helfen uns, das Verhalten der Nutzer anonymisiert zu analysieren, um die Webseite zu verbessern.</li>
      <li><strong>Marketing-Cookies:</strong> Dienen dazu, personalisierte Werbung anzuzeigen (z.B. über Google AdSense).</li>
    </ul>

    <p>Du kannst deine Cookie-Einstellungen jederzeit am Seitenende unter „Cookie-Einstellungen“ anpassen.</p>

    <h3>Google AdSense</h3>
    <p>Diese Website verwendet Google AdSense, einen Dienst zum Einbinden von Werbeanzeigen der Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland („Google“). Google AdSense nutzt Cookies und ähnliche Technologien, um dir personalisierte Werbung anzuzeigen. Dabei können Informationen über dein Surfverhalten gesammelt und pseudonymisiert ausgewertet werden.</p>

    <p>Die Nutzung von Google AdSense erfolgt auf Grundlage deiner Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO. Du kannst diese Einwilligung jederzeit über die „Cookie-Einstellungen“ am Seitenende widerrufen oder anpassen.</p>

    <p>Weitere Informationen zur Datenverarbeitung durch Google findest du unter:</p>
    <ul>
      <li><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style="color: white; text-decoration: underline;">https://policies.google.com/privacy</a></li>
      <li><a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" style="color: white; text-decoration: underline;">https://policies.google.com/technologies/ads</a></li>
    </ul>


    <h3>Datensicherheit</h3>
    <p>Wir setzen technische und organisatorische Maßnahmen ein, um deine Daten gegen Verlust, Manipulation und unbefugten Zugriff zu schützen.</p>

    <h3>Rechte der Nutzer</h3>
    <p>Du hast das Recht, Auskunft über die von uns gespeicherten personenbezogenen Daten zu erhalten, diese berichtigen oder löschen zu lassen sowie die Verarbeitung einzuschränken. Außerdem kannst du der Nutzung deiner Daten widersprechen.</p>

    <h3>Kontakt</h3>
    <p>Bei Fragen zur Erhebung, Verarbeitung oder Nutzung deiner personenbezogenen Daten kannst du dich gerne an uns wenden:<br>
    E-Mail: <a href="mailto:contact.instantpace@yahoo.com" style="color: white; text-decoration: underline;">contact.instantpace@yahoo.com</a></p>

  `;
  panel.classList.add('visible');
  panel.scrollIntoView({behavior: "smooth"});
  CLEAR_ALL_ROWS();
  CLEAR_PLOTTS_FOR_FOOTER();
});
/*
<h3>Werbeanzeigen und Google AdSense</h3>
<p>Unsere Webseite verwendet Google AdSense, einen Dienst zum Einblenden von Werbeanzeigen. Google kann Cookies verwenden, um personalisierte Werbung anzuzeigen. Weitere Informationen zur Datenverarbeitung durch Google findest du in der <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Datenschutzerklärung</a>.</p>
<p>Du kannst der Nutzung von Cookies für personalisierte Werbung widersprechen, indem du die Einstellungen in deinem Browser änderst oder die Seite <a href="https://adssettings.google.com/authenticated" target="_blank" rel="noopener noreferrer">Google Ads-Einstellungen</a> besuchst.</p>
*/



document.getElementById('showUrheberrecht').addEventListener('click', function(e) {
  e.preventDefault();
  content.innerHTML = `
    <h2>Urheberrecht und geistiges Eigentum</h2>

    <p><u>Urheberrechtlicher Hinweis gemäß § 7 UrhG:</u></p>

    <p>Alle Inhalte dieser Webseite – insbesondere Layout, Gestaltung, Quelltexte, Texte, Konzepte, Ideen, Struktur und grafische Elemente – sind geistiges Eigentum von Rodin Aksünger und unterliegen dem deutschen Urheberrecht, soweit nicht ausdrücklich anders gekennzeichnet.</p>

    <p>Jegliche Nutzung – wie Vervielfältigung, Verbreitung, Speicherung, Bearbeitung oder öffentliche Zugänglichmachung – ohne ausdrückliche, schriftliche Genehmigung ist untersagt.</p>

    <p>Die automatisierte oder manuelle Übernahme von Inhalten, Ideen oder Strukturen dieser Webseite stellt eine <u>Rechtsverletzung</u> dar und kann <u>zivil- und strafrechtlich</u> verfolgt werden (§§ 97 ff. UrhG, ggf. i.V.m. UWG).</p>

    <p>Dies gilt auch für die ungefragte Nachahmung des Webdesigns oder technischer Funktionen, da auch das Design und die Funktionalität durch das <u>Recht am geistigen Eigentum</u> geschützt sind.</p>

    <p>Bei Interesse an einer Nutzung von Inhalten dieser Webseite bitte vorab schriftlich Kontakt aufnehmen.</p>
  `;




  panel.classList.add('visible');
  panel.scrollIntoView({behavior: "smooth"});
  CLEAR_ALL_ROWS();
  CLEAR_PLOTTS_FOR_FOOTER();
});

document.getElementById('showKontakt').addEventListener('click', function(e) {
  e.preventDefault();
  content.innerHTML = `
    <h2>Kontakt</h2>
    <p>Schreib mir gerne eine Mail an: <a href="mailto:contact.instantpace@yahoo.com" style="color: white; text-decoration: underline;">contact.instantpace@yahoo.com</a></p>
  `;
  panel.classList.add('visible');
  panel.scrollIntoView({behavior: "smooth"});
  CLEAR_ALL_ROWS();
  CLEAR_PLOTTS_FOR_FOOTER();
});

closeBtn.addEventListener('click', function() {
  panel.classList.remove('visible');

  CLEAR_ALL_ROWS();
  CLEAR_PLOTTS_FOR_FOOTER();
});


