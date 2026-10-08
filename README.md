# KI Kompass

Eine deutschsprachige, responsive Lernapp für KI-Management und AI Power User. Die Grundlage sind die hochgeladenen Dateien `Lernbibliothek_KI_Management_2026.json` und `Lernquellen_und_Lernplan_KI_Management_2026.xlsx` vom 7. Oktober 2026. Sie ersetzen den ursprünglichen 20-Wochen-Plan.

## Lernen

- 12 Kompetenzmodule mit 36 ausgearbeiteten Lektionen, Unternehmensbeispielen, privaten Anwendungen, Übungen und Erklärfragen.
- 5 Minuten für eine kompakte Erklärung, 15 Minuten für eine vollständige Lektion, 45 Minuten für Verstehen, Praxis, Erklärung und Modultest.
- Alle 36 Lektionen haben ein eigenes visuelles Lernbeispiel: Abläufe, Vergleiche, Schichten, Dokumentbelege, Entscheidungsmatrizen, Kennzahlen, Kreisläufe und Zeitachsen. Die SVG-Grafiken lassen sich Schritt für Schritt erkunden und auf Wunsch abspielen; sie funktionieren auch offline. In „Erklären“ sind Beschriftungen und Beispiele zunächst verdeckt und lassen sich einzeln aufdecken. Die bestehenden acht Konzeptdiagramme bleiben für ältere Inhaltspakete verfügbar; die Tokenzerlegung ist eine gekennzeichnete didaktische Simulation.
- 36 Karteikarten mit Active Recall und zeitversetzter Wiederholung. Modul 1 ist von Anfang an aktiv; weitere Karten erscheinen nach der ersten abgeschlossenen Lektion im jeweiligen Modul.
- 60 Multiple-Choice-Fragen: Modultests mit sofortigem Feedback, Kompetenz- und Monatschecks mit Auswertung, gezielte Wiederholung früherer Fehler und eine ausgewogene Abschlussprüfung mit 36 Fragen aus allen zwölf Modulen und 45 Minuten Zeitlimit. Das interne Lernziel liegt bei 80 %. Es ist kein offizielles Zertifikat.
- 48 Lernwochen in zwölf Monaten, vier Pufferwochen und 288 geplante Stunden. Der Jahresplan sieht gezielte Quellenauswahl und umfangreiche eigene Praxis vor. Die Kurzlektionen ersetzen nicht sämtliche externen Kurs- und Praxisstunden.
- 69 Originalquellen mit Anbieter, Auswahlumfang, Sprache, Priorität, Zugang, Kostenhinweisen und den übernommenen Prüfvermerken. Die Quellen wurden von dieser App-Implementierung nicht erneut online geprüft.
- 30 Originalbegriffe, sechs ausfüllbare Portfolio-Vorlagen, 18 Prüffälle und ein Capstone-Dossier. Vorlagen und Dossier lassen sich als Markdown exportieren. Freitext und Projektabnahme werden als Selbstbewertung behandelt.

## Auf dem PC starten

Node.js 22 oder neuer verwenden. Im Repository:

```sh
npm ci
npm run build
npm start
```

Danach `http://localhost:4173` im Browser öffnen. Der mitgelieferte Server benötigt nach dem Build keine zusätzlichen Pakete. Die App wird vollständig lokal ausgeführt; sie benötigt keinen KI-API-Schlüssel und sendet keine Lernfortschritte an einen Server.

Für Entwicklung: `npm run dev`. Für Tests: `npm test`. `npm run build` führt den TypeScript-Check aus und erstellt den versionierten Offline-Cache.

## Auf dem Handy und offline

Für den dauerhaften Zugriff unterwegs wird die App auf einem statischen Webhost unter HTTPS bereitgestellt. Der normale Build verwendet das Hauptverzeichnis `/`; der GitHub-Pages-Workflow baut automatisch für den Repositorypfad `/gpt/`. Es gibt keinen Backend-Dienst und keine kostenpflichtige KI-Schnittstelle.

1. Die HTTPS-Adresse online öffnen und auf „Offline bereit“ warten. Das zeigt einen vollständig installierten Cache an.
2. Android/Chrome: im Browsermenü „App installieren“ oder „Zum Startbildschirm hinzufügen“. iPhone/Safari: „Teilen“ → „Zum Home-Bildschirm“.
3. Lektionen, Diagramme, Fragen, Vorlagen und Originaldateien sind danach ohne Verbindung nutzbar. Externe Kurse und Anbieter-Websites benötigen weiter Internet; das Vorlesen hängt vom Browser und den verfügbaren Gerätestimmen ab.

Für lokale Offline-Tests funktioniert auch `localhost`. Eine unverschlüsselte WLAN-IP-Adresse erfüllt die Sicherheitsanforderung für Service Worker auf dem Handy nicht. Bei Browserdatenlöschung oder vom Betriebssystem entfernten Caches muss die App erneut online geöffnet werden.

## GitHub Pages mit automatischen Updates

Der Workflow `.github/workflows/deploy-pages.yml` installiert mit Node.js 22 die festgelegten Abhängigkeiten, führt alle Tests aus, baut die App und veröffentlicht ausschließlich `dist/`. Er startet bei Änderungen an `main` und lässt sich unter **Actions → Deploy to GitHub Pages → Run workflow** manuell starten. Ein fehlgeschlagener Test verhindert die Veröffentlichung.

Einmalig im Repository [lukasbach585-boop/gpt](https://github.com/lukasbach585-boop/gpt/settings/pages) unter **Settings → Pages → Build and deployment → Source** die Option **GitHub Actions** auswählen. Falls Actions für das Repository deaktiviert ist, muss ein Repository-Administrator den mitgelieferten Workflow erlauben. Die erforderlichen Actions sind die offiziellen GitHub-Actions für Checkout, Node und Pages. Die Verfügbarkeit von Pages bei privaten Repositories hängt vom GitHub-Tarif ab.

Nach dem erfolgreichen Workflow-Lauf wird die App unter **https://lukasbach585-boop.github.io/gpt/** bereitgestellt. Die URL gilt erst als veröffentlicht, wenn der Workflow erfolgreich ist und die Seite antwortet. GitHub verwaltet das HTTPS-Zertifikat für seine `github.io`-Adresse; eine eigene Domain ist nicht erforderlich. Vorherige lokale Fortschritte auf `localhost` werden per JSON-Sicherung auf diese Adresse übernommen. Fortschritt bleibt im jeweiligen Browser und wird nicht in das Repository geladen.

Für Updates die Änderungen nach `main` übernehmen und den erfolgreichen Actions-Lauf abwarten. Eine bereits installierte App online öffnen, ein verfügbares **App-Update laden** und auf **Offline bereit** warten. Die Adresse beibehalten, damit der auf dieser Adresse gespeicherte Fortschritt erhalten bleibt. Reine Änderungen an Manifest oder Originaldownloads erzeugen ebenfalls eine neue Offline-Version; verschiedene Installationspfade verwenden getrennte Cache-Namen.

Den Pages-Build lokal prüfen:

```sh
APP_BASE_PATH=/gpt/ npm run build
npm start
```

Der Server erkennt den eingebauten Pfad und zeigt `http://localhost:4173/gpt/` an. Unter PowerShell zunächst `$env:APP_BASE_PATH = '/gpt/'` setzen und anschließend `npm run build` ausführen. Für einen Webhost im Hauptverzeichnis erneut ohne diese Variable bauen. Bei einer eigenen Domain am Hauptverzeichnis muss auch der Workflow-Basispfad auf `/` umgestellt werden.

## Fortschritt und Gerätewechsel

Unter **Einstellungen → Fortschritt sichern & mitnehmen** eine JSON-Sicherung exportieren. Die Datei auf dem anderen Gerät importieren, den angezeigten Stand prüfen und bewusst ersetzen. Sie enthält Lektionen, Lernkarten, Prüfungsversuche, Notizen, Übungsantworten, Portfolio und Profil. Es gibt keine automatische Synchronisierung oder Benutzerkonten.

Der Browser speichert unter `ki-kompass-progress-annual-v1`. Alte 20-Wochen-Daten bleiben getrennt; ihre gleichnamigen IDs werden nicht stillschweigend auf andere Inhalte übertragen. Sicherungen sind mit `curriculum: "ki-management-annual-2026"` gekennzeichnet. Imports werden auf Format, Umfang und erlaubte Werte geprüft; ein fehlerhafter lokaler Stand wird nicht automatisch überschrieben. Speicherfehler werden sichtbar gemeldet. Dann vor dem Schließen einen Export erstellen.

Die Lernzeit zählt sichtbare Lernbereiche und pausiert bei Hintergrundtabs oder nach fünf Minuten ohne Interaktion. Geschätzte Lektionsdauern werden nicht als tatsächlich gelernte Minuten verbucht. Wochenziele beziehen sich auf die letzten sieben Tage.

## Inhalte aktualisieren

Unter **Bibliothek → Inhalte aktuell halten** das komplette App-Inhaltspaket exportieren. Es enthält aufbereitete Lektionen, Aufgaben, Prüfungsfragen sowie den gesamten Quellenkatalog, Jahresplan, Vorlagen und Capstone. Nach fachlicher Überarbeitung Version und Prüfdatum erhöhen, importieren, Vorschau prüfen und übernehmen. Fortschritt bleibt über stabile IDs verknüpft.

Die Original-JSON und XLSX bleiben als Ausgangsdateien abrufbar. Die Original-JSON hat ein anderes Schema als ein vollständiges App-Paket und wird nicht als solches akzeptiert. Updates werden manuell geprüft; die App recherchiert keine neuen Fach- oder Rechtsentwicklungen selbständig. Wenn ein Lerninhalt fachlich wesentlich geändert wird, eine neue Lesson-ID verwenden, damit ein früheres Häkchen keine neu erworbene Kompetenz suggeriert.

Die individuellen Grafiken gehören zum App-Inhaltspaket (optional `learningVisual` je Lektion) und bleiben beim Export und Import erhalten. Das Paketformat bleibt Version 1; ältere Pakete ohne Grafikfelder werden weiterhin angenommen und zeigen die bisherigen Konzeptdiagramme. Schrittbeschriftungen, Beispiele und Beziehungen können im Inhaltspaket aktualisiert werden; die erlaubten Grafikformen und Symbole sind festgelegt. Die Illustration verändert keinen Lernabschluss oder Prüfungsstand.

Ein neues Software-Build erzeugt außerdem eine neue Service-Worker-Version. Eine bereits geöffnete App bietet „App-Update laden“ an, wenn eine neue Version installiert wurde. Fortschritts- und Inhaltsimporte sind davon getrennt.

## Struktur

`src/data/source-library.json` enthält die Originalbibliothek. `weeks-early.ts` und `weeks-late.ts` enthalten die didaktischen Erweiterungen. `src/lib/learning.ts` und `source-library.ts` implementieren Wiederholungsplanung, Speicherschutz und Importvalidierung. `scripts/build-sw.mjs` erzeugt aus dem Produktionsbuild den Offline-Cache. Alle Schriftdateien und Illustrationen werden lokal mitgeliefert.

Rechtsquellen, behördliche Orientierung und freiwillige Rahmenwerke werden gemäß der gelieferten Bibliothek getrennt erläutert. Für technische oder rechtliche Projektfreigaben bleiben fachliche Prüfung und aktuelle Originalquellen erforderlich. Die App ist eine Lernumgebung und verarbeitet keine realen Projektunterlagen automatisch.
