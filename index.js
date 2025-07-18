


// Globale Listen
let distInputs = [];
let zeitInputs = [];
let anzahl_laufe = 0;

let distList = [];
let timeList = [];

let msList = [];
let kmhList = [];
let paceList = [];
let pro100List = [];

let helper_list = [];

let timeSek_list = [];




let final_avgs = [];

let final_avg_pace = 0;
let ms_sum = 0;
let kmh_sum = 0;
let pro100_sum = 0;

let total_dis = 0;

let durchschnitt_gleiche_laufe_sek = 0;

let durchschnitt_gleiche_laufe_sek_string;

let plot_bool = false;

let einheiten_bool = true;


function SETRUNS() 
{
    // Help-Tutorial Div entfernen, wenn es existiert
    const helpDiv = document.querySelector('.help-tutorial');
    if (helpDiv) {
        helpDiv.remove();
    }



    localStorage.clear();

    panel.classList.remove('visible');


    einheiten_bool = true;



    if (plot_bool == true)
    {
        CLEAR_PLOTT();
    }

    const inputElement = document.getElementById("newEntry");
    const inputValue = inputElement.value.trim();
    inputElement.value = "";
    document.getElementById('CONTAINER').innerHTML = "";
    document.getElementById('toogle').innerHTML = "";
    
    

    

    const parsed = Number(inputValue);
    if (!Number.isInteger(parsed) || parsed < 1 || parsed > 99) 
    {
        alert("❌ Bitte gib eine ganze Zahl zwischen 1 und 99 ein.");
        return;
    }

    anzahl_laufe = parsed;
    const table = document.querySelector(".table");

    // Vorherige Zeilen entfernen
    const rows = table.querySelectorAll(".row:not(.header)");
    rows.forEach(row => row.remove());

    // Listen zurücksetzen
    distInputs = [];
    zeitInputs = [];





    // Vorherige Header entfernen
    const alteHeader = table.querySelector(".row.header");
    if (alteHeader) alteHeader.remove();

    // Neue Header-Zeile erstellen
    const headerRow = document.createElement("div");
    headerRow.classList.add("row", "header");

    const runLabel = document.createElement("div");
    runLabel.id = "run";
    runLabel.classList.add("cell");
    runLabel.textContent = "Run";
    headerRow.appendChild(runLabel);

    const disLabel = document.createElement("div");
    disLabel.id = "dis";
    disLabel.classList.add("cell");
    disLabel.textContent = "Distance (m)";
    headerRow.appendChild(disLabel);

    const timeLabel = document.createElement("div");
    timeLabel.id = "time";
    timeLabel.classList.add("cell");
    timeLabel.textContent = "Time (min)";
    headerRow.appendChild(timeLabel);

    // Header einfügen
    table.appendChild(headerRow);


    // Neue Zeilen erstellen
    for (let i = 1; i <= anzahl_laufe; i++) 
    {
        const row = document.createElement("div");
        row.classList.add("row");

        const cellLauf = document.createElement("div");
        cellLauf.classList.add("cell");
        cellLauf.classList.add("cell_color");
        cellLauf.textContent = "Run " + i;
        row.appendChild(cellLauf);

        const cellDist = document.createElement("div");
        cellDist.classList.add("cell");
        const inputDist = document.createElement("input");
        inputDist.type = "text";
        inputDist.name = "dist" + i;
        distInputs.push(inputDist);
        cellDist.appendChild(inputDist);
        row.appendChild(cellDist);

        const cellZeit = document.createElement("div");
        cellZeit.classList.add("cell");
        const inputZeit = document.createElement("input");
        inputZeit.type = "text";
        inputZeit.name = "zeit" + i;
        zeitInputs.push(inputZeit);
        cellZeit.appendChild(inputZeit);
        row.appendChild(cellZeit);

        table.appendChild(row);
    }

    // Berechne-Button erzeugen
    if (!document.getElementById("berechneButton")) 
    {
        const berechneBtn = document.createElement("button");
        berechneBtn.id = "berechneButton";
        berechneBtn.textContent = "Calculate";
        berechneBtn.style.margin = "10px auto";
        berechneBtn.style.display = "block";
        berechneBtn.style.padding = "10px 275px";
        berechneBtn.style.borderRadius = "8px";
        berechneBtn.style.backgroundColor = "#4ecdff";
        berechneBtn.style.color = "white";
        berechneBtn.style.border = "none";
        berechneBtn.style.cursor = "pointer";
        berechneBtn.onclick = BERECHNE_PREP;

        table.parentNode.insertBefore(berechneBtn, table.nextSibling);
    }
}
function CLEAR_PLOTT() {
    const container = document.getElementById('myChartContainer');
    container.innerHTML = "";  // Löscht alles im Container

    // Falls die summaryLabels außerhalb vom Container hängen (z.B. irgendwo anders in DOM)
    // Entferne alle summaryLabels explizit:
    const summaryLabels = document.querySelectorAll('.summaryLabel');
    summaryLabels.forEach(el => el.remove());

    plot_bool = false;
}



function BERECHNE_PREP() 
{
    for (let i = 0; i < distInputs.length; i++) 
    {
        const dist = distInputs[i].value.trim();
        const zeit = zeitInputs[i].value.trim();

        // Distanz muss eine ganze positive Zahl sein
        if (!/^\d+$/.test(dist)) {
            alert(`❌ Lauf ${i + 1}: Distanz ist ungültig. Nur ganze Zahlen erlaubt.`);
            return;
        }

        // Zeit darf Kommazahl sein – aber nur gültige Zahlen
        const normZeit = zeit.replace(",", ".");
        if (normZeit === "" || isNaN(normZeit) || Number(normZeit) < 0) {
            alert(`❌ Lauf ${i + 1}: Zeit ist ungültig. Nur Zahlen erlaubt.`);
            return;
        }
    }

    // ✅ Alles passt
    //alert("✅ Alle Eingaben sind gültig!");

    // Beispielausgabe: Gesamtsummen

    /*

    const gesamtDistanz = distInputs.reduce((sum, el) => sum + parseInt(el.value), 0);
    const gesamtZeit = zeitInputs.reduce((sum, el) => sum + parseFloat(el.value.replace(",", ".")), 0);
    alert(`📊 Gesamt-Distanz: ${gesamtDistanz} km\n⏱️ Gesamt-Zeit: ${gesamtZeit.toFixed(2)} min`);

    */
   BERECHNE();
}
function BERECHNE() {
    //alert("✅ Alle Eingaben sind gültig!");
    final_avgs = [];

    ms_sum = 0;
    kmh_sum = 0;
    pro100_sum = 0;

    distList = [];
    timeList = [];
    msList = [];
    kmhList = [];
    paceList = [];
    pro100List = [];

    helper_list = [];

    timeSek_list = [];

    for (let i = 0; i < distInputs.length; i++) {
        let distanz = parseInt(distInputs[i].value.trim(), 10);
        let zeitMin = parseFloat(zeitInputs[i].value.trim().replace(",", "."));

        let intMin = Math.floor(zeitMin);
        let nachkomma = (zeitMin - intMin) * 100;
        let timeSek = (intMin * 60) + nachkomma;
        let prep_pace = ((timeSek / distanz) * 1000) / 60;
        let int_prep_pace = Math.floor(prep_pace);
        let nachkomma_prep_pace = ((prep_pace - int_prep_pace) * 60) / 100;
        let final_pace = int_prep_pace + nachkomma_prep_pace;

        let helper = (int_prep_pace * 60) + ((prep_pace - int_prep_pace) * 60);


        let ms = distanz / timeSek;
        let kmh = ms * 3.6;
        let pro100 = (timeSek / distanz) * 100;


        distList.push(distanz);
        timeList.push(zeitMin);

        msList.push(ms);
        kmhList.push(kmh);
        paceList.push(final_pace);
        pro100List.push(pro100);

        helper_list.push(helper);

        timeSek_list.push(timeSek);


        //alert(`Lauf ${i + 1}:\nDistanz = ${distanz} m\nZeit = ${timeSek} s\nGeschwindigkeit = ${ms.toFixed(2)} m/s (${kmh.toFixed(2)} km/h) \nPace = ${final_pace} min/km  \npro100 = ${pro100} s/100`);
    }

    let dis_sum = 0;

    for (let i = 0; i < distList.length; i++) 
    {
        dis_sum += distList[i];
        ms_sum += msList[i];
        kmh_sum += kmhList[i];
        pro100_sum += pro100List[i];
    }

    ms_sum = ms_sum / msList.length;
    kmh_sum = kmh_sum / kmhList.length;
    pro100_sum = pro100_sum / pro100List.length;


    /*
    alert("Distanz gesamt: " + dis_sum.toFixed(3));
    alert("⌀ m/s: " + ms_sum.toFixed(3));
    alert("⌀ km/h: " + kmh_sum.toFixed(3));
    alert("⌀ pro100: " + pro100_sum.toFixed(3));
    */


    let pace_avg_sek_sum = 0;
    for (let i = 0; i < helper_list.length; i++) 
    {
        pace_avg_sek_sum += helper_list[i];
    }
    pace_avg_sek_sum = pace_avg_sek_sum / helper_list.length;
    let avg_pace_prep = pace_avg_sek_sum / 60;
    let int_prep = Math.floor(avg_pace_prep);
    let nachkomma_prep = ((avg_pace_prep - int_prep) * 60) / 100;
    final_avg_pace = int_prep + nachkomma_prep;


    total_dis = 0;

    for (let i = 0; i < distList.length; i++) {
        total_dis += distList[i];
    }


    final_avgs.push(final_avg_pace);
    final_avgs.push(ms_sum);
    final_avgs.push(kmh_sum);
    final_avgs.push(pro100_sum);

    final_avgs.push(total_dis);

    
    //alert("⌀ pace: " + final_avg_pace.toFixed(3));
    
    


    WERTE_AUS();
}

function WERTE_AUS() {

    CLEAR_ALL_ROWS();

    PLOTT();
}



function CLEAR_ALL_ROWS() 
{
    const table = document.querySelector(".table");
    const rows = table.querySelectorAll(".row:not(.header)");
    rows.forEach(row => row.remove());

    // Berechne-Button entfernen, falls vorhanden
    const berechneBtn = document.getElementById("berechneButton");
    if (berechneBtn) {
        berechneBtn.remove();
    }

    // Arrays leeren
    distInputs = [];
    zeitInputs = [];
}

/*
function TRANSPORT_DATA()
{
    // Alle relevanten Daten speichern
    localStorage.setItem("distList", JSON.stringify(distList));
    localStorage.setItem("timeList", JSON.stringify(timeList));
    localStorage.setItem("msList", JSON.stringify(msList));
    localStorage.setItem("kmhList", JSON.stringify(kmhList));
    localStorage.setItem("paceList", JSON.stringify(paceList));
    localStorage.setItem("pro100List", JSON.stringify(pro100List));

    localStorage.setItem("ms_sum", ms_sum);
    localStorage.setItem("kmh_sum", kmh_sum);
    localStorage.setItem("pro100_sum", pro100_sum);
    localStorage.setItem("final_avg_pace", final_avg_pace);
    localStorage.setItem("anzahl_laufe", anzahl_laufe);
}
*/


    distList = [];
    timeList = [];
    msList = [];
    kmhList = [];
    paceList = [];
    pro100List = [];




function PLOTT() {

    plot_bool = true;

    // Header entfernen, wenn vorhanden
    const table = document.querySelector(".table");
    const header = table.querySelector(".row.header");
    if (header) {
        header.remove();
    }
    
    const container = document.getElementById('myChartContainer');

    // ✅ Inhalt vorher löschen, falls vorher schon Daten erzeugt wurden
    container.innerHTML = "";

    const run_label = document.createElement('div');
    run_label.classList.add('data_labels');
    //run_label.classList.add('data_labels_except');
    run_label.textContent = `Run`;

    const dis_label = document.createElement('div');
    dis_label.classList.add('data_labels');
    dis_label.textContent = `Distance`;

    const time_label = document.createElement('div');
    time_label.classList.add('data_labels');
    time_label.textContent = `Time`;

    const ms_label = document.createElement('div');
    ms_label.classList.add('data_labels');
    ms_label.textContent = `m/s`;

    const kmh_label = document.createElement('div');
    kmh_label.classList.add('data_labels');
    kmh_label.textContent = `km/h`;

    const pace_label = document.createElement('div');
    pace_label.classList.add('data_labels');
    pace_label.textContent = `Pace`;

    const pro100_label = document.createElement('div');
    pro100_label.classList.add('data_labels');
    pro100_label.textContent = `per/100m`;


    container.appendChild(run_label);
    container.appendChild(dis_label);
    container.appendChild(time_label);
    container.appendChild(ms_label);
    container.appendChild(kmh_label);
    container.appendChild(pace_label);
    container.appendChild(pro100_label);







    const toogle_container = document.getElementById('toogle');

    toogle_container.innerHTML = "";

    const togle_label = document.createElement('div');
    togle_label.classList.add('togle_label');
    togle_label.textContent = `Hide units`;
    const toggleWrapper = document.createElement('div');
    toggleWrapper.classList.add('toggle-wrapper');
    const toggleLabel = document.createElement('label');
    toggleLabel.classList.add('switch');
    const toggleInput = document.createElement('input');
    toggleInput.type = 'checkbox'; // Standard: deaktiviert
    const toggleSlider = document.createElement('span');
    toggleSlider.classList.add('slider');

    toggleLabel.appendChild(toggleInput);
    toggleLabel.appendChild(toggleSlider);
    toggleWrapper.appendChild(toggleLabel);

    toogle_container.appendChild(togle_label);
    toogle_container.appendChild(toggleWrapper);

    // Toggle checkbox setzen
    toggleInput.checked = !einheiten_bool;

    toggleInput.addEventListener('change', () => {
        if (toggleInput.checked) {
            EINHEITEN_VERBERGEN();
        } else {
            EINHEITEN_ANZEIGEN();
        }
    });




    /*
    // === Toggle 2: AVGS anzeigen ===
    const avgs_label = document.createElement('div');
    avgs_label.classList.add('togle_label');
    avgs_label.textContent = `AVGS ausblenden`;

    const avgsWrapper = document.createElement('div');
    avgsWrapper.classList.add('toggle-wrapper');

    const avgsToggleLabel = document.createElement('label');
    avgsToggleLabel.classList.add('switch');

    const avgsToggleInput = document.createElement('input');
    avgsToggleInput.type = 'checkbox';

    const avgsSlider = document.createElement('span');
    avgsSlider.classList.add('slider');

    avgsToggleLabel.appendChild(avgsToggleInput);
    avgsToggleLabel.appendChild(avgsSlider);
    avgsWrapper.appendChild(avgsToggleLabel);

    toogle_container.appendChild(avgs_label);
    toogle_container.appendChild(avgsWrapper);
    */


    /*
    // Falls du einen boolean wie `avgs_bool` hast
    avgsToggleInput.checked = !avgs_bool;

    avgsToggleInput.addEventListener('change', () => {
        if (avgsToggleInput.checked) {
            AVGS_VERBERGEN();
        } else {
            AVGS_ANZEIGEN();
        }
    });
    */

    

    


    if(einheiten_bool)
    {
        for (let i = 0; i < anzahl_laufe; i++) 
        {
            const cellLauf = document.createElement('div');
            cellLauf.classList.add('cell2', 'lauf-cell');
            cellLauf.textContent = `${i + 1}`;

            const cellDist = document.createElement('div');
            cellDist.classList.add('cell2');
            cellDist.textContent = distList[i].toFixed(0) + " m";
            
            let loc_time = timeList[i];
            let einheit = " min";
            if (loc_time < 1) 
            {
                loc_time = loc_time * 100;
                einheit = " sek";
            }

            const cellZeit = document.createElement('div');
            cellZeit.classList.add('cell2');
            cellZeit.textContent = loc_time.toFixed(2) + einheit;

            const cellOrt = document.createElement('div');
            cellOrt.classList.add('cell2');
            cellOrt.textContent = msList[i].toFixed(2) + " ms";

            const cellTemp = document.createElement('div');
            cellTemp.classList.add('cell2');
            cellTemp.textContent = kmhList[i].toFixed(2) + " km/h";

            const cellPuls = document.createElement('div');
            cellPuls.classList.add('cell2');
            cellPuls.textContent = paceList[i].toFixed(2) + " min/km";

            const cellKommentar = document.createElement('div');
            cellKommentar.classList.add('cell2');
            cellKommentar.textContent = pro100List[i].toFixed(2) + " s/100m";

            container.appendChild(cellLauf);
            container.appendChild(cellDist);
            container.appendChild(cellZeit);
            container.appendChild(cellOrt);
            container.appendChild(cellTemp);
            container.appendChild(cellPuls);
            container.appendChild(cellKommentar);
        }
    }
    else
    {
        for (let i = 0; i < anzahl_laufe; i++) 
        {
            const cellLauf = document.createElement('div');
            cellLauf.classList.add('cell2', 'lauf-cell');
            cellLauf.textContent = `${i + 1}`;

            const cellDist = document.createElement('div');
            cellDist.classList.add('cell2');
            cellDist.textContent = distList[i].toFixed(0);
            
            
            let loc_time = timeList[i];
            
            
            let einheit = " min";
            if (loc_time < 1) 
            {
                loc_time = loc_time * 100;
                einheit = " sek";
            }    
            
            


            const cellZeit = document.createElement('div');
            cellZeit.classList.add('cell2');
            cellZeit.textContent = loc_time.toFixed(2);

            const cellOrt = document.createElement('div');
            cellOrt.classList.add('cell2');
            cellOrt.textContent = msList[i].toFixed(2);

            const cellTemp = document.createElement('div');
            cellTemp.classList.add('cell2');
            cellTemp.textContent = kmhList[i].toFixed(2);

            const cellPuls = document.createElement('div');
            cellPuls.classList.add('cell2');
            cellPuls.textContent = paceList[i].toFixed(2);

            const cellKommentar = document.createElement('div');
            cellKommentar.classList.add('cell2');
            cellKommentar.textContent = pro100List[i].toFixed(2);

            container.appendChild(cellLauf);
            container.appendChild(cellDist);
            container.appendChild(cellZeit);
            container.appendChild(cellOrt);
            container.appendChild(cellTemp);
            container.appendChild(cellPuls);
            container.appendChild(cellKommentar);
        }
    }
    

    let einheiten = ["","","","",""];
    if(einheiten_bool)
    {
        einheiten = ["min/km","ms","km/h","s/100m","m total"];
    }
    else
    {
        einheiten = ["","","","",""];
    }
    
    
    for (let i = 0; i < final_avgs.length; i++) 
    {
        // 🟢 AVGS
        const labelGesamt = document.createElement('div');
        labelGesamt.classList.add('avgs');  // oder eigene Klasse, z. B. 'summaryLabel'
        labelGesamt.style.gridColumn = "span 1"; // damit es über ganze Breite geht
        labelGesamt.style.marginTop = "20px";
        //labelGesamt.style.fontWeight = "bold";
        //labelGesamt.style.backgroundColor = "#4ecdff";
        //labelGesamt.style.color = "black";
        labelGesamt.textContent = `${final_avgs[i].toFixed(2)} ${einheiten[i]}`;
        container.appendChild(labelGesamt);
    }
    
    let einheit_d = "sek";
    if(einheiten_bool == false)
    {
        einheit_d = "";
    }

    let alleGleich = true;
    for (let i = 1; i < distList.length; i++) {
        const tolerance = 0.01; // 1 cm Toleranz z.B.
        if (Math.abs(distList[i] - distList[0]) > tolerance) 
        {
            alleGleich = false;
            break;
        }
    }

    if (alleGleich) 
    {
        //console.log("✅ Alle Distanzen sind gleich.");
        let summe = 0;

        for (let i = 0; i < timeSek_list.length; i++) 
        {
            summe += timeSek_list[i];
        }

        durchschnitt_gleiche_laufe_sek = summe / timeSek_list.length;

        if(durchschnitt_gleiche_laufe_sek > 60)
        {
            let avg_runs = durchschnitt_gleiche_laufe_sek / 60;
            let int_avg_runs = Math.floor(avg_runs);
            let nachkomma_avg_runs = avg_runs - int_avg_runs;
            let nachkomma_sek = (nachkomma_avg_runs * 60) / 100;
            durchschnitt_gleiche_laufe_sek = int_avg_runs + nachkomma_sek;
            einheit_d = "min";
            if(einheiten_bool == false)
            {
                einheit_d = "";
            }
        }
        

        // 🟢 AVGS
        const labelGesamt = document.createElement('div');
        labelGesamt.classList.add('avgs');  // oder eigene Klasse, z. B. 'summaryLabel'
        labelGesamt.style.gridColumn = "span 1"; // damit es über ganze Breite geht
        labelGesamt.style.marginTop = "20px";
        //labelGesamt.style.fontWeight = "bold";
        //labelGesamt.style.backgroundColor = "#4ecdff";
        //labelGesamt.style.color = "black";
        labelGesamt.textContent = `⌀ ${durchschnitt_gleiche_laufe_sek.toFixed(2)} ${einheit_d}`;
        container.appendChild(labelGesamt);

        durchschnitt_gleiche_laufe_sek_string = durchschnitt_gleiche_laufe_sek.toFixed(2) + " " + einheit_d;
    } 

    else{
        console.log("pech.");
    }


    const container2 = document.getElementById('CONTAINER');
    container2.innerHTML = "";

    // Wrapper für Flex-Zentrierung
    const buttonWrapper = document.createElement('div');
    buttonWrapper.classList.add('button-container'); // Flexbox-Zentrierung

    // Der Button selbst
    const druck_button = document.createElement('button');
    druck_button.classList.add('druck_button');
    druck_button.textContent = `Create PDF of your runs`;

    druck_button.addEventListener('click', GENERATE_PDF);


    // Button in Wrapper, Wrapper in Container
    buttonWrapper.appendChild(druck_button);
    container2.appendChild(buttonWrapper);

}





function GENERATE_PDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const pageWidth = doc.internal.pageSize.getWidth();

    // Textzeilen (Werte müssen vorher definiert sein!)
    const zeilen = [
        `total dis:             ${total_dis} m`,
        `avg pace:           ${final_avg_pace.toFixed(2)} min/km`,
        `avg ms:              ${ms_sum.toFixed(2)} m/s`,
        `avg kmh:            ${kmh_sum.toFixed(2)} km/h`,
        `avg pro 100:      ${pro100_sum.toFixed(2)} /100m`,
        `avg runs:            ${durchschnitt_gleiche_laufe_sek_string}`
    ];

    // Alle Zeilen linksbündig ausgeben
    let y = 10;
    const leftMarginText = 30;
    for (let text of zeilen) {
        doc.text(text, leftMarginText, y);
        y += 10; // Abstand zwischen den Zeilen
    }

    // Tabelle direkt unter den Textzeilen
    y += 5; // Kleiner Abstand zur Tabelle

    const cols = 6;
    const rows = 5;
    const cellWidth = 22;  // kleiner als vorher für kompaktere Tabelle
    const cellHeight = 8;  // etwas kleinere Zeilenhöhe

    // Breite der gesamten Tabelle
    const tableWidth = cellWidth * cols;
    // Tabelle mittig platzieren
    const startX = (pageWidth - tableWidth) / 2;
    const startY = y;

    // Erste Zeile mit Überschriften
    doc.setFontSize(12);

    const headers = ["Distance", "Time", "Pace", "KM/H", "M/S", "per100m"];
    for (let col = 0; col < cols; col++) {
        const x = startX + col * cellWidth;
        const textY = startY + 6; // Text vertikal positionieren (etwas Padding)
        doc.text(headers[col], x + 2, textY);
    }

    // Tabellenlinien zeichnen
    // Horizontale Linien
    for (let row = 0; row <= rows; row++) {
        const yLine = startY + row * cellHeight;
        doc.line(startX, yLine, startX + tableWidth, yLine);
    }

    // Vertikale Linien
    for (let col = 0; col <= cols; col++) {
        const xLine = startX + col * cellWidth;
        doc.line(xLine, startY, xLine, startY + rows * cellHeight);
    }

    doc.save("runs.pdf");
}







function EINHEITEN_ANZEIGEN()
{
    //alert("anzeigen");
    einheiten_bool = true;
    PLOTT();
}



function EINHEITEN_VERBERGEN()
{
    //alert("verbergen");
    einheiten_bool = false;
    PLOTT();

}







function DEUTSCH()
{
    document.getElementById("h1").innerText = "Leichtathletik";
    document.getElementById("design").innerText = "Design / Farbe";
    document.getElementById("language").innerText = "Sprache";
    document.getElementById("deutsch").innerText = "German";
    document.getElementById("englisch").innerText = "English";
    document.getElementById("social_media").innerText = "Soziale Medien";
    document.getElementById("feedback_kontakt").innerText = "Feedback / Kontaktformular";
    //document.getElementById("home").innerText = "";
    document.getElementById("about").innerText = "Über uns";
    document.getElementById("help_support").innerText = "Hilfe / Support";
    //document.getElementById("kontakt").innerText = "";
    document.getElementById("amount_runs").innerText = "Anzahl Läufe";
    document.getElementById("addEntry").innerText = "Bestätigen";
    document.getElementById("run").innerText = "Lauf";
    document.getElementById("dis").innerText = "Distanz";
    document.getElementById("time").innerText = "Zeit";
    document.getElementById("footer").innerText = "Fußzeile";

    document.getElementById("berechneButton").innerText = "Berechne";

}


function ENGLISCH()
{
    document.getElementById("h1").innerText = "Track & Field";
    document.getElementById("design").innerText = "Design / Color";
    document.getElementById("language").innerText = "Language";
    document.getElementById("deutsch").innerText = "German";
    document.getElementById("englisch").innerText = "English";
    document.getElementById("social_media").innerText = "Social media";
    document.getElementById("feedback_kontakt").innerText = "Feedback contact";
    //document.getElementById("home").innerText = "";
    document.getElementById("about").innerText = "About us";
    document.getElementById("help_support").innerText = "Help / Support";
    //document.getElementById("kontakt").innerText = "";
    document.getElementById("amount_runs").innerText = "Amount runs:";
    document.getElementById("addEntry").innerText = "Submit";
    document.getElementById("run").innerText = "Run";
    document.getElementById("dis").innerText = "Distance";
    document.getElementById("time").innerText = "Time";
    document.getElementById("footer").innerText = "Footer";

    document.getElementById("berechneButton").innerText = "Calculate";
}


function DARK()
{
    document.getElementById("theme-style").setAttribute("href", "dark.css");
}


function LIGHT()
{
    document.getElementById("theme-style").setAttribute("href", "light.css");
    document.getElementById("about-style").setAttribute("href", "about_light.css");
}






