import type { ExplanationSection } from '../types';

export const earlyExplanationSections: Record<string, ExplanationSection[]> = {
  'w1-l1': [
    {
      title: 'KI: der Oberbegriff',
      paragraphs: ['KI bedeutet Künstliche Intelligenz und umfasst Systeme, die beispielsweise erkennen, planen oder Sprache verarbeiten. Maschinelles Lernen ist ein Teilgebiet: Das Verfahren lernt Muster aus Beispielen, statt jede Entscheidung als feste Regel zu erhalten. Deep Learning gehört wiederum zum maschinellen Lernen und verwendet mehrschichtige neuronale Netze. Nicht jedes KI-System muss deshalb ein neuronales Netz enthalten.'],
      emphasis: ['KI', 'Künstliche Intelligenz', 'Maschinelles Lernen', 'Deep Learning', 'neuronale Netze'],
      visual: { kind: 'hierarchy', items: [
        { label: 'KI', text: 'Oberbegriff: erkennen, planen, Sprache verarbeiten.' },
        { label: 'Maschinelles Lernen', text: 'Teilgebiet der KI: Muster aus Beispielen lernen.' },
        { label: 'Deep Learning', text: 'Teilgebiet des maschinellen Lernens: mehrschichtige neuronale Netze.' },
      ] },
    },
    {
      title: 'Generative KI: neue Inhalte',
      paragraphs: ['Generative KI erzeugt neue Inhalte, etwa Texte, Bilder oder Audio. Dieser Begriff beschreibt eine Fähigkeit, nicht die gleiche Ebene wie ein Lernverfahren. Ein generatives Sprachmodell kann zugleich auf maschinellem Lernen beruhen. Für eine Lieferantenanfrage lässt es neue Formulierungen entstehen; ein Spamfilter entscheidet dagegen, welcher Kategorie eine vorhandene Nachricht zugeordnet wird.'],
      emphasis: ['Generative KI', 'neue Inhalte', 'Fähigkeit', 'Lernverfahren'],
      visual: { kind: 'comparison', items: [
        { label: 'Wie wird gelernt?', text: 'Maschinelles Lernen beschreibt das Verfahren: aus Beispielen Muster gewinnen.' },
        { label: 'Was wird erzeugt?', text: 'Generative KI beschreibt die Funktion: einen neuen Text oder ein neues Bild erstellen.' },
      ] },
    },
    {
      title: 'Die Aufgabe bestimmt den Test',
      paragraphs: ['Unterscheide im Projektalltag die Arbeitsaufgaben, bevor du ein Tool auswählst. Klassifikation, Extraktion, Formulierung und regelbasierte Prüfung lassen sich kombinieren, erfüllen aber verschiedene Zwecke. Eine richtige Kategorie belegt noch keine richtige Menge; ein guter Entwurf bestätigt keine Zahl. Entscheidend ist, welche Aufgabe zuverlässig gelöst werden muss und woran du den Erfolg prüfst.'],
      emphasis: ['Klassifikation', 'Extraktion', 'Formulierung', 'regelbasierte Prüfung'],
      bullets: ['Klassifikation: eine Nachricht einer Kategorie zuordnen.', 'Extraktion: Angaben aus einem Dokument übernehmen.', 'Formulierung: einen neuen Entwurf erstellen.', 'Regelprüfung: einen Wert mit einer festgelegten Bedingung vergleichen.', 'Das Etikett KI ist kein Qualitätsnachweis.'],
    },
  ],
  'w1-l2': [
    {
      title: 'Von Token zur Antwort',
      paragraphs: ['Ein Large Language Model verarbeitet Text als Token: kleine Einheiten, die Wörter, Wortteile oder Zeichen umfassen können. Aus dem verfügbaren Kontext berechnet es Wahrscheinlichkeiten für nächste Token und erzeugt schrittweise eine Antwort. Dafür wurden im Training Modellparameter angepasst. Inferenz heißt, das trainierte Modell aktuell zu verwenden; ein Prompt trainiert das Basismodell normalerweise nicht neu.'],
      emphasis: ['Large Language Model', 'Token', 'Kontext', 'Training', 'Modellparameter', 'Inferenz', 'Prompt'],
      visual: { kind: 'flow', items: [
        { label: 'Eingabe', text: 'Auftrag und verfügbare Informationen bilden den Kontext.' },
        { label: 'Wahrscheinlichkeiten', text: 'Das Modell gewichtet mögliche nächste Token.' },
        { label: 'Auswahl', text: 'Das System wählt eine nächste Einheit nach seinen Einstellungen.' },
        { label: 'Wiederholung', text: 'Die Einheit wird angehängt; der erweiterte Kontext führt zur nächsten Auswahl.' },
      ] },
    },
    {
      title: 'Kontext hat Grenzen',
      paragraphs: ['Das Kontextfenster begrenzt, wie viel Information ein Modell in einem Lauf berücksichtigen kann. Anweisungen, Gespräch, Dokumentstellen und Tool-Ergebnisse teilen sich diesen Raum. Die Anwendung kann ältere Inhalte kürzen oder zusammenfassen. Antworten können je nach Auswahlverfahren variieren. Weder eine lange Antwort noch geringe Variation garantiert Richtigkeit: Auch eine plausibel wirkende Artikelnummer kann erfunden sein.'],
      emphasis: ['Kontextfenster', 'Tool-Ergebnisse', 'Auswahlverfahren', 'Artikelnummer'],
      bullets: ['Mehr Kontext bedeutet nicht automatisch bessere Antworten.', 'Stabile Formulierungen sind kein Wahrheitsbeweis.', 'Wichtige Projektdaten müssen tatsächlich im verfügbaren Kontext stehen.'],
    },
    {
      title: 'Wissen und Quellen trennen',
      paragraphs: ['Trenne Modellwissen, bereitgestellte Projektdaten und aktuelle externe Quellen. Für allgemeine Formulierungen genügt Modellwissen häufig. Für einen gültigen Preis oder den freigegebenen Stand einer technischen Planung muss die Anwendung passende Informationen bereitstellen. Mehr Text hilft nur, wenn er relevant, richtig zugeordnet und aktuell ist. Eine reine Modellantwort belegt diese Eigenschaften nicht automatisch.'],
      emphasis: ['Modellwissen', 'Projektdaten', 'aktuelle externe Quellen', 'freigegebenen Stand'],
    },
  ],
  'w1-l3': [
    {
      title: 'Aufgaben sinnvoll verteilen',
      paragraphs: ['Eine Datenbank eignet sich für exakte Kennungen und freigegebene strukturierte Daten. Eine feste Regel prüft bekannte Bedingungen oder Berechnungen. Ein Sprachmodell hilft bei unterschiedlichen Formulierungen, Zusammenfassungen und Entwürfen. Eine verlässliche Lösung kombiniert diese Stärken: Artikelnummer nachschlagen, Menge regelbasiert prüfen und die bestätigte Abweichung verständlich formulieren. Kein Baustein muss alles allein erledigen.'],
      emphasis: ['Datenbank', 'feste Regel', 'Sprachmodell', 'Artikelnummer'],
      visual: { kind: 'comparison', items: [
        { label: 'Datenbank', text: 'Ist Artikel 0012-A im freigegebenen Stamm vorhanden?' },
        { label: 'Regel', text: '5 Stück × 12 € je Stück = 60 €; passt der ausgewiesene Gesamtpreis?' },
        { label: 'Sprachmodell', text: 'Die geprüfte Abweichung als verständliche Rückfrage formulieren.' },
      ] },
    },
    {
      title: 'Fehlerfolgen bestimmen Kontrolle',
      paragraphs: ['Jeder Kandidat braucht erforderliche Eingaben, einen definierten Output und eine Bewertung der Fehlerfolgen. Ein kreativer Entwurf lässt sich häufig leicht korrigieren. Eine falsche Menge in einem technischen Angebot kann teuer sein und benötigt fachliche Prüfung. Lege daher vor dem Einsatz fest, welche Quelle gebraucht wird und wer das Ergebnis gegen diese Quelle prüft.'],
      emphasis: ['Eingaben', 'Output', 'Fehlerfolgen', 'fachliche Prüfung'],
      bullets: ['Prüfende Person und Originalquelle benennen.', 'Kritische Mengen und Einheiten gezielt abgleichen.', 'Offene Daten nicht durch plausible Werte ersetzen.'],
    },
    {
      title: 'Prüfaufwand mitrechnen',
      paragraphs: ['Rechne fachliche Prüfung und Nacharbeit in den Nutzen ein. Ein schneller Entwurf kann insgesamt mehr Arbeit verursachen, wenn seine Korrektur lange dauert. Wenn die Prüfung den Zeitgewinn aufbraucht oder die nötige Quelle fehlt, ist Zurückstellen eine gute Managemententscheidung. Dokumentiere den Grund und die Voraussetzung, unter der du den Kandidaten erneut bewerten würdest.'],
      emphasis: ['Nacharbeit', 'Nutzen', 'Zeitgewinn', 'Zurückstellen'],
    },
  ],
  'w2-l1': [
    {
      title: 'Ein Prompt ist ein Arbeitsauftrag',
      paragraphs: ['Ein belastbarer Prompt beschreibt Zweck, Aufgabe, relevante Eingaben, Ergebnisformat und den Umgang mit fehlenden oder widersprüchlichen Angaben. Formuliere so konkret, dass eine andere Person das Ergebnis gegen die Originale prüfen kann. Für LV-Positionen heißt das: Welche Felder werden übernommen, welche Quellen genannt und welche Aussagen ausdrücklich nicht ergänzt? Eine Rolle wie Projektassistent orientiert höchstens den Stil.'],
      emphasis: ['Prompt', 'Zweck', 'Ergebnisformat', 'LV-Positionen', 'Originale'],
      visual: { kind: 'flow', items: [
        { label: 'Zweck', text: 'Die Menge und Einheit einer LV-Position übernehmen.' },
        { label: 'Eingabe', text: 'LV V2, Seite 7, Position 4.2 als abgegrenzte Quelle.' },
        { label: 'Grenzen', text: 'Fehlende Werte nicht ergänzen; Konflikte mit beiden Quellen nennen.' },
        { label: 'Ergebnis', text: 'Position | Menge | Einheit | Dokument | Seite | Prüfstatus.' },
      ] },
    },
    {
      title: 'Auftrag und Daten abgrenzen',
      paragraphs: ['Trenne Auftrag und Dokumentinhalt sichtbar. Der Dokumenttext ist zunächst Material, das analysiert werden soll, keine neue Anweisung an die Anwendung. Erlaube unbekannte Angaben ausdrücklich und fordere einen sichtbaren Prüfstatus bei Widersprüchen. So wird eine Informationslücke nicht absichtlich mit einer überzeugend klingenden Schätzung überdeckt. Die Ausgabe muss trotzdem gegen die tatsächlichen Angaben geprüft werden.'],
      emphasis: ['Auftrag', 'Dokumentinhalt', 'unbekannte Angaben', 'Prüfstatus'],
      bullets: ['Fehlende Menge: als unbekannt ausgeben.', 'Widerspruch: beide Werte und Fundstellen nennen.', 'Anweisungen im Dokument nicht als neuen Auftrag behandeln.'],
    },
    {
      title: 'Promptregeln haben Grenzen',
      paragraphs: ['Eine Rollenbeschreibung liefert keine fehlenden fachlichen Daten und macht ein Modell nicht automatisch zum geprüften Experten. Auch ein Sicherheitssatz verhindert weder jede falsche Interpretation noch unerlaubte Datenweitergabe. Promptregeln unterstützen die Arbeit, müssen aber mit Tests und Systemkontrollen ergänzt werden. Prüfe Ergebnisse an mehreren Fällen und setze Berechtigungen außerhalb der bloßen Formulierung technisch durch.'],
      emphasis: ['Rollenbeschreibung', 'fachlichen Daten', 'Tests', 'Systemkontrollen', 'Berechtigungen'],
    },
  ],
  'w2-l2': [
    {
      title: 'Kontext bewusst zusammenstellen',
      paragraphs: ['Context Engineering gestaltet die Informationen, die eine Anwendung dem Modell tatsächlich zur Verfügung stellt. Dazu gehören Arbeitsauftrag, relevante Dokumentstellen, Projektkennung, Versionsstand, Freigabe und Berechtigung. Ein langes Dokument ist nicht automatisch guter Kontext. Irrelevante Passagen verbrauchen Platz; alte und neue Aussagen können sich widersprechen. Auswahl und Kennzeichnung sind deshalb Teil der fachlichen Architektur.'],
      emphasis: ['Context Engineering', 'Projektkennung', 'Versionsstand', 'Freigabe', 'Berechtigung'],
      visual: { kind: 'flow', items: [
        { label: 'Auswahl', text: 'Welche Stellen beantworten genau die gestellte Projektfrage?' },
        { label: 'Zuordnung', text: 'Projekt, Dokument, Version und Status eindeutig kennzeichnen.' },
        { label: 'Zugriff', text: 'Nur Informationen bereitstellen, für die der Nutzer berechtigt ist.' },
        { label: 'Kontext', text: 'Relevante, zugeordnete und zulässige Stellen an das Modell geben.' },
      ] },
    },
    {
      title: 'Neu ist nicht automatisch gültig',
      paragraphs: ['Lege die Quellenhierarchie anhand des Prozesses fest, nicht nach Bauchgefühl. Es muss geklärt sein, welcher Stand verbindlich ist, wer ihn freigibt und wie Änderungen erkennbar werden. Eine neuere Datei kann noch ungeprüft sein. Ein Modell darf sie nicht allein aufgrund des Datums als geltende Vorgabe verwenden. Dokumentstatus und Zuständigkeit bestimmen die richtige Verwendung.'],
      emphasis: ['Quellenhierarchie', 'verbindlich', 'neuere Datei', 'Dokumentstatus'],
      bullets: ['V2 freigegeben: für den festgelegten Zweck verbindlich.', 'V3 Entwurf: Änderungsvorschlag, noch keine bestätigte Vorgabe.', 'Projektfremde Entscheidung: nicht stillschweigend übertragen.'],
    },
    {
      title: 'Konflikte sichtbar lassen',
      paragraphs: ['Bei widersprüchlichen Fassungen nennt die Ausgabe beide Fundstellen und fordert Klärung. Sie darf nicht stillschweigend eine Quelle auswählen, wenn die Freigaberegel keine eindeutige Entscheidung ermöglicht. Alte Entscheidungen gehören außerdem nicht automatisch in ein anderes Projekt. Der jeweilige Nutzer erhält ausschließlich Kontext, zu dem er berechtigt ist; Berechtigungen bleiben auch bei hilfreichen Dokumenten eine Voraussetzung.'],
      emphasis: ['widersprüchlichen Fassungen', 'Fundstellen', 'Klärung', 'berechtigt'],
    },
  ],
  'w2-l3': [
    {
      title: 'Felder und Bedeutung festlegen',
      paragraphs: ['Eine strukturierte Ausgabe verwendet feste Felder, etwa Position, Menge, Einheit, Artikel, Dokument und Seitenstelle. Definiere jeweils Bedeutung und Datentyp. Eine Artikelkennung ist meist Text; eine Menge ist eine Zahl oder ausdrücklich unbekannt. Ergänze einen Status wie bestätigt, fehlend oder widersprüchlich. So bleibt erkennbar, ob ein Feld belegt ist oder noch geklärt werden muss.'],
      emphasis: ['strukturierte Ausgabe', 'Datentyp', 'Artikelkennung', 'Status'],
      visual: { kind: 'comparison', items: [
        { label: 'Belegt', text: 'Menge: 8; Einheit: m; Status: bestätigt; Quelle: LV V2, S. 7.' },
        { label: 'Fehlend', text: 'Menge: null; Status: fehlend; keine Zahl raten.' },
        { label: 'Widersprüchlich', text: '8 m und 10 m mit beiden Quellen ausgeben; Klärung erforderlich.' },
      ] },
    },
    {
      title: 'Form und Inhalt getrennt prüfen',
      paragraphs: ['Gültiges JSON oder eine sauber formatierte Tabelle beweist die Einhaltung bestimmter Formregeln. Die Menge kann im korrekten Feld stehen und trotzdem falsch sein. Prüfe deshalb Form, Feldbedeutung, Quelle und fachlichen Wert separat. Ein automatisch weiterverarbeitbares Ergebnis braucht weiterhin einen fachlichen Abgleich; ein schönes Schema macht unbekannte Angaben nicht zu bestätigten Fakten.'],
      emphasis: ['Gültiges JSON', 'Formregeln', 'Quelle', 'fachlichen Wert'],
      bullets: ['Form: Sind Felder und Typen wie vereinbart?', 'Inhalt: Stimmen Menge, Einheit und Artikel?', 'Beleg: Verweist die Quelle auf die passende Originalstelle?'],
    },
    {
      title: 'Varianten fair vergleichen',
      paragraphs: ['Vergleiche Promptvarianten mit identischen Inputs, fachlichen Kriterien und dokumentierten Einstellungen. Nur dann ist eine beobachtete Verbesserung nachvollziehbar. Wähle nicht bloß die schönste Einzelantwort: Erfasse auch Lücken, falsche Einheiten und widersprüchliche Quellen. Mehrere gleichbleibende Testpositionen zeigen, ob das Schema stabil bleibt und die gewünschte Behandlung fehlender Angaben tatsächlich funktioniert.'],
      emphasis: ['Promptvarianten', 'identischen Inputs', 'Testpositionen', 'fehlender Angaben'],
    },
  ],
  'w3-l1': [
    {
      title: 'JSON und CSV lesen',
      paragraphs: ['JSON organisiert benannte Felder, Listen und verschachtelte Objekte. CSV speichert tabellarische Daten in Zeilen und Spalten. Beim Import müssen Trennzeichen, Anführungszeichen und Zahlenformate geklärt sein. Für Angebotspositionen brauchst du beispielsweise Artikelkennung, Menge, Einheit und Quelle. Ein Datenmodell legt fest, was diese Felder bedeuten und welche Werte die Verarbeitung darin erwartet.'],
      emphasis: ['JSON', 'CSV', 'Trennzeichen', 'Zahlenformate', 'Datenmodell'],
      visual: { kind: 'comparison', items: [
        { label: 'JSON: benannte Felder', text: '{"artikel":"0012-A","menge":5,"einheit":"m"}' },
        { label: 'CSV: Tabellenzeile', text: 'Spalten artikel;menge;einheit → Zeile 0012-A;5;m.' },
      ] },
    },
    {
      title: 'Kennungen unverändert behalten',
      paragraphs: ['Artikelnummern sind Kennungen und keine Rechenwerte. Der Text 0012-A darf nicht in eine Zahl umgewandelt und zu 12 verkürzt werden. Eine solche Änderung könnte den Artikel falsch zuordnen. Ein Schema kann Pflichtfelder und zulässige Datentypen prüfen. Es garantiert aber nicht, dass eine syntaktisch passende Kennung im freigegebenen Artikelstamm tatsächlich existiert.'],
      emphasis: ['Kennungen', 'Rechenwerte', 'Schema', 'Datentypen', 'Artikelstamm'],
      bullets: ['Führende Nullen und Sonderzeichen erhalten.', 'Feldtypen vor dem Import festlegen.', 'Artikelkennungen zusätzlich gegen den gültigen Stamm prüfen.'],
    },
    {
      title: 'Leerwert ist nicht die Zahl 0',
      paragraphs: ['In JSON bedeutet null einen fehlenden oder ausdrücklich leeren Wert; die Zahl 0 ist eine konkrete Zahlenangabe. Die Bedeutung eines CSV-Leerfelds wird im Datenvertrag festgelegt. Auch regionale Schreibweisen wie 1,5 und 1.5 brauchen eine klare Importregel. Sonst werden unbekannte Mengen zu scheinbar echten Zahlen oder gültige Zahlen unbeabsichtigt falsch interpretiert.'],
      emphasis: ['null', 'Zahl 0', 'Datenvertrag', 'Importregel'],
      visual: { kind: 'comparison', items: [
        { label: 'Menge: null', text: 'Die Information fehlt; nach der festgelegten Leerwertregel klären.' },
        { label: 'Menge: 0', text: 'Eine konkrete Menge von null ist angegeben; nicht als fehlend behandeln.' },
      ] },
    },
  ],
  'w3-l2': [
    {
      title: 'Abfragen und Verknüpfen',
      paragraphs: ['SQL fragt relationale Tabellen ab, etwa die Positionen eines Projekts oder den Stammdateneintrag einer Artikelkennung. Ein JOIN verknüpft Tabellen über passende Schlüssel. Diese müssen in der vorgesehenen Beziehung eindeutig und stabil sein. Eine Bezeichnung wie Ventil groß ist oft ungeeignet: Texte können abweichen, ähnlich sein oder mehrfach vorkommen. Exakte Artikelkennungen und gegebenenfalls Projekt- oder Versionsschlüssel sind besser geeignet.'],
      emphasis: ['SQL', 'JOIN', 'Schlüssel', 'Artikelkennungen', 'Versionsschlüssel'],
      visual: { kind: 'flow', items: [
        { label: 'Angebotsposition', text: 'Artikel 0012-A, Menge 5.' },
        { label: 'Passender Schlüssel', text: '0012-A exakt mit dem vorgesehenen Stammdatenschlüssel abgleichen.' },
        { label: 'Stammdaten', text: 'Eindeutiger Treffer liefert die freigegebenen Artikeldaten.' },
      ] },
    },
    {
      title: 'Mehrfachtreffer verändern Summen',
      paragraphs: ['Prüfe vor einer Verknüpfung fehlende Schlüssel, Duplikate und unbekannte Kennungen. Ein mehrfach vorhandener Stammdatenschlüssel kann aus einer Angebotsposition mehrere Ergebniszeilen machen. Werden diese ungeprüft summiert, ist das Ergebnis verfälscht. Eindeutigkeit und erwartete Beziehung zwischen den Tabellen sind deshalb Voraussetzungen für den Join, nicht bloß Aufräumarbeiten nach der Berechnung.'],
      emphasis: ['Duplikate', 'unbekannte Kennungen', 'Stammdatenschlüssel', 'Eindeutigkeit'],
      bullets: ['Fehlender Schlüssel: die ursprüngliche Position sichtbar behalten.', 'Doppelter Schlüssel: Mehrfachtreffer melden und Berechnung zurückhalten.', 'Unbekannte Kennung: nicht dem ähnlichsten Namen zuordnen.'],
    },
    {
      title: 'Feste Prüfregeln statt Schätzung',
      paragraphs: ['Eine unbekannte Artikelnummer darf nicht stillschweigend durch eine ähnliche Bezeichnung ersetzt werden. Bewahre die ursprüngliche Position und gib eine verständliche Meldung aus. Python oder ein No-Code-Prüfschritt kann Regeln für fehlende Schlüssel, Duplikate und unbekannte Artikel ausführen. Diese Entscheidung braucht keine kreative Modellschätzung; sie braucht einen definierten Datenvertrag und nachvollziehbare Ergebnisse.'],
      emphasis: ['ursprüngliche Position', 'Python', 'No-Code-Prüfschritt', 'Datenvertrag'],
    },
  ],
  'w3-l3': [
    {
      title: 'Anfrage und Antwort verstehen',
      paragraphs: ['Eine API ist eine definierte Schnittstelle zwischen Systemen. Bei einer HTTP-Anfrage sendet die Anwendung Methode, Zieladresse, Authentifizierung und gegebenenfalls Daten. Die Antwort enthält Status und möglicherweise Ergebnisdaten. GET wird typischerweise lesend verwendet; POST kann Daten übertragen oder Aktionen auslösen. Die konkrete Operation steht im Schnittstellenvertrag. JSON ist ein häufiges Datenformat, aber nicht gleichbedeutend mit API.'],
      emphasis: ['API', 'HTTP-Anfrage', 'Authentifizierung', 'GET', 'POST', 'Schnittstellenvertrag', 'JSON'],
      visual: { kind: 'flow', items: [
        { label: 'Request', text: 'Methode + Ziel + Berechtigung + definierte Eingabedaten.' },
        { label: 'Systemoperation', text: 'Die Schnittstelle verarbeitet die vereinbarte Abfrage oder Aktion.' },
        { label: 'Response', text: 'Statuscode + definierte Daten oder sichtbare Fehlermeldung.' },
      ] },
    },
    {
      title: 'Statuscodes einordnen',
      paragraphs: ['Statuscodes helfen, Erfolg und Fehler im Protokoll einzuordnen. 2xx steht grundsätzlich für erfolgreiche Bearbeitung; weitere Codes weisen auf unterschiedliche Probleme hin. Ein erfolgreicher Transport beweist aber nicht die fachliche Richtigkeit des Inhalts. Prüfe auch Antwortschema, Kennung und Werte. Eine Position im falschen Projekt bleibt falsch, selbst wenn die Antwort erfolgreich übertragen wurde.'],
      emphasis: ['Statuscodes', '2xx', 'fachliche Richtigkeit', 'Antwortschema'],
      bullets: ['400: häufig eine ungültige Anfrage.', '401: Authentifizierung fehlt oder ist ungültig; 403: Zugriff verweigert.', '404: Ressource nicht gefunden.', '429: Nutzungsgrenze erreicht.', '5xx: Serverproblem.'],
    },
    {
      title: 'Timeouts sicher behandeln',
      paragraphs: ['Ein Timeout beweist nicht, dass eine Schreibaktion ausgeblieben ist. Die Aktion kann erfolgt sein, während nur die Antwort fehlt. Blindes Wiederholen kann deshalb Duplikate erzeugen. Nutze für geeignete Operationen eindeutige Vorgangskennungen und die unterstützten Wiederholungsregeln. Prüfe den Status eines bestehenden Vorgangs, bevor du ihn erneut anlegst, und halte Fehler sichtbar und nachvollziehbar.'],
      emphasis: ['Timeout', 'Schreibaktion', 'Duplikate', 'Vorgangskennungen', 'Wiederholungsregeln'],
      visual: { kind: 'flow', items: [
        { label: 'Senden', text: 'Vorgang A-042 übertragen.' },
        { label: 'Timeout', text: 'Keine Antwort: Ausgang noch unbekannt.' },
        { label: 'Status prüfen', text: 'A-042 nach den API-Regeln abfragen.' },
        { label: 'Weiterarbeiten', text: 'Bestätigten Vorgang übernehmen oder unterstützt und begrenzt wiederholen.' },
      ] },
    },
    {
      title: 'Betrieb und Rückfall planen',
      paragraphs: ['Zugangsdaten werden sicher verwaltet und nicht in Notizen oder Logs kopiert. Plane für die Integration begrenzte Wiederholungen, Eskalation und einen manuellen Rückfallweg. Wer sieht einen Fehler, wer klärt ihn und wie geht die Arbeit bis dahin weiter? Diese Regeln verhindern, dass die Verbindung zwar technisch vorhanden ist, ein fehlgeschlagener Vorgang aber unbemerkt im Prozess stecken bleibt.'],
      emphasis: ['Zugangsdaten', 'Eskalation', 'manuellen Rückfallweg'],
      bullets: ['Fehleranzeige und zuständige Person festlegen.', 'Wiederholungen begrenzen und protokollieren.', 'Geheimnisse aus Ausgaben und Logs heraushalten.'],
    },
  ],
  'w4-l1': [
    {
      title: 'Die Wissensbasis beginnt im PDF',
      paragraphs: ['PDFs können echten Text, gescannte Seiten, Tabellen, Fußnoten und Zeichnungen enthalten. OCR erkennt Text in Bildern, kann jedoch Zeichen, Spalten oder Einheiten verwechseln. Wird aus 10 m plötzlich 100 m oder landet ein Wert in der falschen Tabellenzeile, entsteht der Fehler schon bei der Aufbereitung. Ein späteres Sprachmodell kann fehlende Originalinformation nicht zuverlässig rekonstruieren.'],
      emphasis: ['PDFs', 'OCR', 'Aufbereitung', 'Originalinformation'],
      visual: { kind: 'comparison', items: [
        { label: 'Original', text: '10 m; eindeutig einer bestimmten Position zugeordnet.' },
        { label: 'OCR-Fehler', text: '100 m oder richtige Zahl in der falschen Zeile.' },
        { label: 'Folge', text: 'Eine spätere Suche liefert einen fehlerhaften Wert; besserer Stil korrigiert ihn nicht.' },
      ] },
    },
    {
      title: 'Schwierige Stellen gegenprüfen',
      paragraphs: ['Prüfe eine Auswahl schwieriger Stellen gegen das Original, insbesondere Artikelnummern, Maße, Mengen, Einheiten und Fußnoten. Eine Tabellenzeile kann erst mit ihrer Überschrift oder Einschränkung vollständig verständlich sein. Lege fest, wie schlecht lesbare Stellen und fehlende Seiten markiert werden. Solche Lücken dürfen nicht als vollständig verarbeitete Information in die Wissensbasis gelangen.'],
      emphasis: ['Original', 'Artikelnummern', 'Einheiten', 'Fußnoten', 'fehlende Seiten'],
      bullets: ['Zahl und zugehörige Einheit gemeinsam kontrollieren.', 'Tabellenzeile und Einschränkung zusammen erhalten.', 'Unleserliche Stellen und fehlende Seiten sichtbar markieren.'],
    },
    {
      title: 'Belege über die Kette erhalten',
      paragraphs: ['Bewahre Dokumentkennung, Version und Seitenbezug über die gesamte Verarbeitung hinweg. Die extrahierte Textdatei ist ein Arbeitsartefakt; die gültige Originalfassung bleibt die Grundlage für Belege. Dokumentqualität und Prüfstatus gehören ins Register. So lässt sich später erkennen, welcher Stand verarbeitet wurde und wo eine auffällige Antwort gegen die tatsächliche Quelle geprüft werden kann.'],
      emphasis: ['Dokumentkennung', 'Version', 'Seitenbezug', 'Originalfassung', 'Prüfstatus'],
    },
  ],
  'w4-l2': [
    {
      title: 'RAG: erst finden, dann antworten',
      paragraphs: ['RAG steht für Retrieval-Augmented Generation. Dokumente werden ausgewählt und aufbereitet, in einem Index suchbar gemacht und passend zur Frage durchsucht. Gefundene Stellen gelangen als Kontext an das Modell. Erst dann wird eine Antwort erzeugt. Prüfe zuerst, ob die richtige Stelle gefunden wurde: Eine gut formulierte Antwort kann einen falschen oder fehlenden Suchtreffer nicht zuverlässig ausgleichen.'],
      emphasis: ['RAG', 'Retrieval-Augmented Generation', 'Index', 'Kontext', 'Suchtreffer'],
      visual: { kind: 'flow', items: [
        { label: 'Aufbereiten', text: 'Geeignete Dokumente mit Version und Quellenstellen verarbeiten.' },
        { label: 'Indexieren', text: 'Die Inhalte für passende Suchverfahren auffindbar machen.' },
        { label: 'Suchen', text: 'Zur Frage relevante und zulässige Stellen abrufen.' },
        { label: 'Antworten', text: 'Das Modell erhält die Treffer als Kontext und formuliert mit Belegen.' },
      ] },
    },
    {
      title: 'Chunks brauchen Zusammenhang',
      paragraphs: ['Chunking zerlegt Inhalte in suchbare Abschnitte. Ein Abschnitt sollte genug Zusammenhang enthalten, etwa eine Tabellenzeile mit Überschrift und Einschränkung. Zu kleine Stücke verlieren Bedeutung; zu große bringen unnötigen Kontext. Es gibt keine universell beste Chunkgröße für alle Dokumente. Wähle die Aufteilung anhand der Dokumentstruktur und prüfe sie mit Fragen, deren passende Fundstellen du kennst.'],
      emphasis: ['Chunking', 'Zusammenhang', 'Chunkgröße', 'Fundstellen'],
      bullets: ['Überschrift, Werte und Ausnahmen nicht beliebig trennen.', 'Zu kleine Abschnitte können unverständliche Treffer liefern.', 'Zu große Abschnitte können relevante Angaben verdecken.'],
    },
    {
      title: 'Bedeutung und Kennung unterscheiden',
      paragraphs: ['Semantische Suche nutzt Embeddings, numerische Repräsentationen von Inhalt, um Bedeutungsähnlichkeit zu finden. Für exakte Artikelnummern reicht sie allein häufig nicht: ähnliche Kennungen bezeichnen nicht denselben Artikel. Kombiniere genaue Suche, semantische Suche und Metadatenfilter passend zur Aufgabe. Filter zu Projekt, Dokumenttyp oder gültigem Stand schränken die Treffer ein, bevor ihre Verwendung in der Antwort geprüft wird.'],
      emphasis: ['Semantische Suche', 'Embeddings', 'Artikelnummern', 'Metadatenfilter'],
      visual: { kind: 'comparison', items: [
        { label: 'Bedeutungsfrage', text: '„Was ist zur Inbetriebnahme nötig?“ → passende Inhalte auch ohne gleiche Wörter finden.' },
        { label: 'Kennungsfrage', text: '„Artikel 0012-A?“ → exakte Kennung prüfen; 0012-B ist kein Ersatz.' },
      ] },
    },
  ],
  'w4-l3': [
    {
      title: 'Eine Quelle muss wirklich passen',
      paragraphs: ['Ein Quellenbeleg muss auf die passende Stelle im gültigen Dokumentstand zeigen. Dafür braucht der Index Metadaten wie Projekt, Dokumenttyp, Datum, Version, Freigabe und Zugriffsgruppe. Ein neuer Upload ist nicht automatisch freigegeben. Bei konkurrierenden Fassungen gelten dokumentierte Zuständigkeiten und Quellenregeln. Ist damit keine eindeutige Antwort möglich, meldet der Assistent den Konflikt statt still einen Stand auszuwählen.'],
      emphasis: ['Quellenbeleg', 'Metadaten', 'Freigabe', 'Quellenregeln', 'Konflikt'],
      bullets: ['Dokument, Version und konkrete Stelle nennen.', 'Freigabestatus vor verbindlicher Verwendung prüfen.', 'Widersprüchliche Fassungen zur Klärung markieren.'],
    },
    {
      title: 'Berechtigung vor dem Kontext',
      paragraphs: ['Berechtigungen werden in der Anwendung und Suche durchgesetzt. Projektfremde oder gesperrte Dokumente dürfen für den jeweiligen Nutzer nicht bereits als Modellkontext bereitgestellt werden. Die Aufforderung, geheime Daten zu ignorieren, reicht dafür nicht. Prüfe ebenso abgeleitete Inhalte, Zwischenspeicher und Logs. Auch dort darf der Zugriffsschutz nicht verloren gehen, nur weil die Originaldatei selbst nicht angezeigt wird.'],
      emphasis: ['Berechtigungen', 'Modellkontext', 'Zwischenspeicher', 'Logs', 'Zugriffsschutz'],
      visual: { kind: 'flow', items: [
        { label: 'Identität und Zugriff', text: 'Mara darf Projekt Nord lesen, Nord-Erweiterung jedoch nicht.' },
        { label: 'Gefilterte Suche', text: 'Projektfremde oder gesperrte Stellen nicht für diesen Nutzer abrufen.' },
        { label: 'Zulässiger Kontext', text: 'Nur erlaubte gültige Quellenstellen gelangen zum Modell.' },
      ] },
    },
    {
      title: 'Suche und Antwort separat prüfen',
      paragraphs: ['Teste Retrieval und Antwort getrennt. Zuerst prüfst du, ob eine erlaubte, gültige und passende Stelle gefunden wurde. Danach prüfst du, ob die Antwort ihre Aussage einschließlich aller wichtigen Einschränkungen korrekt verwendet. Diese Trennung zeigt, wo die Ursache eines Fehlers liegt: beim Auffinden, bei der Kontextbildung oder bei der Interpretation der bereitgestellten Informationen.'],
      emphasis: ['Retrieval', 'Antwort', 'Einschränkungen', 'Kontextbildung'],
      visual: { kind: 'comparison', items: [
        { label: 'Retrievalprüfung', text: 'Ist Plan Nord V2, Seite 7, die passende zulässige Fundstelle?' },
        { label: 'Antwortprüfung', text: 'Wurden 8 m samt Geltungsbereich korrekt und vollständig übernommen?' },
      ] },
    },
  ],
  'w5-l1': [
    {
      title: 'Ein Golden Set braucht Soll-Werte',
      paragraphs: ['Evaluation beginnt mit der fachlichen Aufgabe. Eine Extraktion prüfst du auf korrekte Felder und Werte, einen Angebotsvergleich auf erkannte Abweichungen und eine Wissensantwort auf passende Quellen sowie Vollständigkeit. Ein Golden Set enthält fachlich geprüfte Erwartungen, Originalquellen und klare Kriterien. Ohne diese Grundlage kannst du überzeugende Texte beurteilen, aber nicht zuverlässig messen, ob die Anwendung ihre Aufgabe erfüllt.'],
      emphasis: ['Evaluation', 'fachlichen Aufgabe', 'Golden Set', 'Erwartungen', 'Originalquellen'],
      visual: { kind: 'comparison', items: [
        { label: 'Extraktion', text: 'Soll: Menge und Einheit stimmen mit der konkreten Originalposition überein.' },
        { label: 'Angebotsvergleich', text: 'Soll: tatsächlich vorhandene Abweichungen werden korrekt gemeldet.' },
        { label: 'Wissensfrage', text: 'Soll: relevante Aussagen sind belegt und wichtige Einschränkungen enthalten.' },
      ] },
    },
    {
      title: 'Grenzen und Nichtwissen testen',
      paragraphs: ['Wähle Normalfälle, Grenzfälle, Widersprüche, fehlende Informationen und Berechtigungsfälle. Ein Test soll auch zeigen, ob das System angemessen nicht antwortet. Trenne Entwicklungsfälle von zurückgehaltenen Kontrollfällen. Wird ein Prompt immer an denselben Beispielen optimiert, kann die Verbesserung auf diese Beispiele begrenzt sein. Kontrollfälle dienen der unabhängigen Prüfung und werden nicht laufend als direkte Optimierungsvorlage verwendet.'],
      emphasis: ['Normalfälle', 'Berechtigungsfälle', 'Entwicklungsfälle', 'Kontrollfällen', 'unabhängigen Prüfung'],
      bullets: ['Fehlende Menge: keinen Wert erfinden.', 'Widersprüchliche Quellen: beide Stellen und Konflikt nennen.', 'Gesperrtes Projekt: keine unzulässigen Inhalte ausgeben.', 'Kontrollfälle von direkten Entwicklungsfällen getrennt halten.'],
    },
    {
      title: 'Erwartungen selbst aktuell halten',
      paragraphs: ['Dokumentiere pro Fall Aufgabe, Input, erwartete Aussagen oder Werte, Quellenstelle und Fehlerfolgen. Bei mehreren zulässigen Formulierungen bewertest du die Aussage, nicht wortwörtliche Gleichheit. Erwartungen werden fachlich geprüft und bei geänderten gültigen Quellen versioniert. Eine alte Soll-Antwort kann sonst eine korrekte neue Antwort als Fehler erscheinen lassen und wäre selbst ein Qualitätsproblem.'],
      emphasis: ['Quellenstelle', 'Fehlerfolgen', 'Aussage', 'versioniert', 'Soll-Antwort'],
    },
  ],
  'w5-l2': [
    {
      title: 'Precision: Stimmen die Meldungen?',
      paragraphs: ['Precision beschreibt beim Abweichungscheck den Anteil zutreffender Meldungen an allen gemeldeten Abweichungen. Im didaktischen Beispiel existieren sechs echte Abweichungen; das System meldet fünf und drei davon stimmen. Die Precision beträgt daher 3/5 = 60 %. Diese Zahl bewertet die Richtigkeit der Meldungen, verrät allein aber nicht, wie viele echte Abweichungen übersehen wurden.'],
      emphasis: ['Precision', 'zutreffender Meldungen', '60 %'],
      visual: { kind: 'equation', items: [
        { label: '3 zutreffende Meldungen', text: 'Drei gemeldete Abweichungen sind tatsächlich vorhanden.' },
        { label: '÷ 5 Meldungen insgesamt', text: 'Der Nenner umfasst richtige und falsche Meldungen.' },
        { label: '= 60 % Precision', text: '3/5 der Meldungen stimmen; 2/5 sind falsch.' },
      ] },
    },
    {
      title: 'Recall: Wurde alles gefunden?',
      paragraphs: ['Recall beschreibt den Anteil gefundener echter Abweichungen an allen tatsächlich vorhandenen Abweichungen. Im gleichen Beispiel wurden drei von sechs gefunden: 3/6 = 50 %. Eine hohe Precision kann deshalb mit vielen übersehenen Punkten einhergehen. Beide Kennzahlen gehören zusammen. Für Fälle ohne passenden Nenner brauchst du eine festgelegte Auswertungsregel, statt eine bedeutungslose Zahl zu erzeugen.'],
      emphasis: ['Recall', 'gefunden', '50 %', 'Nenner', 'Auswertungsregel'],
      visual: { kind: 'equation', items: [
        { label: '3 echte Abweichungen gefunden', text: 'Dieselben drei richtigen Treffer wie in der Precision-Berechnung.' },
        { label: '÷ 6 tatsächlich vorhanden', text: 'Der Nenner umfasst gefundene und übersehene echte Abweichungen.' },
        { label: '= 50 % Recall', text: '3/6 wurden gefunden; die anderen drei bleiben unerkannt.' },
      ] },
    },
    {
      title: 'Kritische Fehler separat sehen',
      paragraphs: ['Erfasse außerdem Quellenkorrektheit, Vollständigkeit, Feldfehler und Schweregrade. Eine gut belegte Antwort kann eine entscheidende Ausnahme auslassen. Falsche Mengen, Einheiten oder Projektzuordnungen wiegen häufig schwerer als Stilprobleme. Verstecke solche Fehler nicht in einer Gesamtnote. Fachlich begründete Mindestwerte und Regeln für kritische Fehler werden vor dem Test festgelegt; eine universell gültige Grenze gibt es nicht.'],
      emphasis: ['Quellenkorrektheit', 'Vollständigkeit', 'Schweregrade', 'kritische Fehler'],
      bullets: ['Belegt bedeutet nicht automatisch vollständig.', 'Mengen-, Einheiten- und Projektfehler einzeln sichtbar halten.', 'Abnahmeregeln vor der Auswertung definieren.'],
    },
    {
      title: 'Automatische Urteile kalibrieren',
      paragraphs: ['Automatische Bewertungen können viele Antworten vorsortieren, sind aber selbst prüfbedürftig. Vergleiche ihre Urteile an einer repräsentativen Auswahl mit fachkundigen menschlichen Bewertungen und untersuche Abweichungen. Ein Modell als Bewerter ist kein unabhängiger Wahrheitsbeweis. Dokumentiere, welche Kriterien automatisch messbar sind und wo ein Fachreview nötig bleibt, damit die automatische Note keine ungeprüfte Autorität erhält.'],
      emphasis: ['Automatische Bewertungen', 'menschlichen Bewertungen', 'Wahrheitsbeweis', 'Fachreview'],
    },
  ],
  'w5-l3': [
    {
      title: 'Änderungen gegen Kontrollen prüfen',
      paragraphs: ['Ein Regressionstest prüft nach einer Änderung, ob bisher funktionierende Fälle weiterhin funktionieren. Änderungen können Prompt, Modellversion, Suchindex, Chunking, Aufbereitung oder Freigaberegel betreffen. Vergleiche vorher und nachher dieselben Kontrollfälle unter dokumentierten Bedingungen. Eine bessere Durchschnittsleistung reicht nicht, wenn ein kritischer Fall neu scheitert. Die Freigabe folgt aus den vorher festgelegten Qualitätsregeln.'],
      emphasis: ['Regressionstest', 'Änderung', 'Kontrollfälle', 'Freigabe', 'Qualitätsregeln'],
      visual: { kind: 'flow', items: [
        { label: 'Alte Version', text: 'P1 beantwortet das unveränderte Kontrollset.' },
        { label: 'Geänderte Version', text: 'P2 bearbeitet dieselben Fälle unter dokumentierten Bedingungen.' },
        { label: 'Vergleich', text: 'Verbesserungen und neue kritische Fehler getrennt erfassen.' },
        { label: 'Entscheidung', text: 'Nach vorher definierten Regeln freigeben, korrigieren oder zurückstellen.' },
      ] },
    },
    {
      title: 'Den Fehler an seiner Ursache lösen',
      paragraphs: ['Ordne Fehler einer Ursache in der Verarbeitungskette zu. Fehlt eine Fußnote bereits im extrahierten Text, korrigierst du die Aufbereitung. Wurde die gültige Passage nicht gefunden, prüfst du Retrieval. Lag sie vor, wurde aber ignoriert, untersuchst du Kontext und Generierung. Eine richtige Antwort ohne zuständige Freigabe kann trotzdem ein Prozessproblem sein und benötigt eine andere Korrektur.'],
      emphasis: ['Verarbeitungskette', 'Aufbereitung', 'Retrieval', 'Generierung', 'Prozessproblem'],
      bullets: ['Datenfehler: Information fehlt oder ist falsch verarbeitet.', 'Suchfehler: richtige Information wird nicht gefunden.', 'Kontextfehler: passende Daten werden falsch zusammengestellt.', 'Modellfehler: vorhandene Information wird falsch verwendet.', 'Prozessfehler: Zuständigkeit oder Freigabe funktioniert nicht.'],
    },
    {
      title: 'Review in Verbesserung übersetzen',
      paragraphs: ['Der Reviewprozess benennt prüfende Person, Kriterien, dokumentierte Befunde und nächsten Schritt. Korrigierte Fehler fließen in neue Entwicklungsfälle und gegebenenfalls getrennte Kontrollen ein. Das Kontrollset darf nicht schrittweise zum einzigen Optimierungsziel werden. Bei unklarer Ursache wird die Ausweitung gestoppt und eine gezielte Diagnose geplant, statt denselben Lauf unverändert zu wiederholen.'],
      emphasis: ['Reviewprozess', 'Befunde', 'Entwicklungsfälle', 'Kontrollset', 'Diagnose'],
    },
  ],
  'w6-l1': [
    {
      title: 'Nutzerproblem statt Toolwunsch',
      paragraphs: ['Ein KI-Produkt beginnt mit einem wiederkehrenden Problem eines konkreten Nutzers. Beschreibe Auslöser, heutige Schritte, Fallvolumen und Fehlerfolgen. Wir brauchen einen Chatbot nennt nur eine mögliche Oberfläche. Eine nachvollziehbare Übersicht geänderter Angebotspositionen beschreibt dagegen Aufgabe und Nutzen. Mit diesem Ziel kannst du Suche, Regeln, Prozessverbesserung und KI-Unterstützung fair vergleichen, bevor du dich auf ein Produkt festlegst.'],
      emphasis: ['Nutzer', 'Auslöser', 'Fallvolumen', 'Fehlerfolgen', 'Aufgabe und Nutzen'],
      visual: { kind: 'comparison', items: [
        { label: 'Toolwunsch', text: '„Wir brauchen einen Chatbot.“ Aufgabe und messbarer Nutzen bleiben offen.' },
        { label: 'Nutzerproblem', text: '„Bei einem neuen Angebotsstand braucht die Projektleitung eine belegte Änderungsübersicht.“' },
      ] },
    },
    {
      title: 'Die Baseline misst den Gesamtprozess',
      paragraphs: ['Die Baseline erfasst den heutigen Gesamtaufwand: Suche, Übernahme, Rückfragen, Prüfung und Nacharbeit. Zeiten werden zunächst als Hypothese geschätzt und später an repräsentativen Fällen gemessen. Notiere Streuung und besondere Fälle, nicht nur einen attraktiven Durchschnitt. Qualität und Fehlerfolgen gehören neben der Zeit in diese Ausgangsmessung, damit ein späterer Vergleich nicht nur Tempo bewertet.'],
      emphasis: ['Baseline', 'Gesamtaufwand', 'Hypothese', 'Streuung', 'Ausgangsmessung'],
      bullets: ['Schätzwerte als Hypothese kennzeichnen.', 'Normale und schwierige Fälle beobachten.', 'Prüfung und Nacharbeit vollständig mitrechnen.'],
    },
    {
      title: 'Ein schneller Schritt genügt nicht',
      paragraphs: ['Wenn ein Modell schneller entwirft, die Fachperson aber länger prüft, kann der Gesamtprozess langsamer werden. Messe deshalb den vollständigen Ablauf vor und im Pilot unter vergleichbaren Bedingungen. Ein Zeitgewinn beim Erstellen ist nur ein Teilbefund. Erst zusammen mit Qualität, Prüfzeit und Nacharbeit zeigt sich, ob das Nutzerproblem tatsächlich besser gelöst wird.'],
      emphasis: ['Gesamtprozess', 'Pilot', 'Qualität', 'Prüfzeit', 'Nacharbeit'],
      visual: { kind: 'equation', items: [
        { label: '10 Minuten weniger Erstellung', text: 'Didaktisches Beispiel: Ein Arbeitsschritt wird schneller.' },
        { label: '− 12 Minuten mehr Prüfung', text: 'Der neue Output benötigt zusätzliche Kontrolle.' },
        { label: '= −2 Minuten Zeitgewinn', text: 'Der Gesamtprozess dauert zwei Minuten länger.' },
      ] },
    },
  ],
  'w6-l2': [
    {
      title: 'Kandidaten nach gleichen Kriterien',
      paragraphs: ['Priorisierung vergleicht mehrere Anwendungsfälle anhand derselben Kriterien. Bewerte Nutzen, Datenlage, technische Machbarkeit, Fehlerfolgen und notwendigen Prüfaufwand gemeinsam. Eine beeindruckende Demo allein zeigt noch keinen verlässlichen Nutzen. Dokumentiere die Annahmen hinter deiner Bewertung, damit ein Gespräch über unterschiedliche Einschätzungen möglich bleibt und später klar ist, welche neuen Informationen die Entscheidung verändern könnten.'],
      emphasis: ['Priorisierung', 'Nutzen', 'Datenlage', 'Machbarkeit', 'Prüfaufwand'],
      visual: { kind: 'comparison', items: [
        { label: 'Aufgaben extrahieren', text: 'Klare Notizen und begrenzter Zeilenabgleich ermöglichen einen überprüfbaren Pilot.' },
        { label: 'Technische Angebote vergleichen', text: 'Hoher möglicher Nutzen; Mengen, Einheiten und Ausschlüsse brauchen Fachreview.' },
        { label: 'Verträge automatisch freigeben', text: 'Hohe Fehlerfolgen und ungeklärte Verantwortung sprechen gegen einen unmittelbaren Start.' },
      ] },
    },
    {
      title: 'Muss-Kriterien vor der Punktzahl',
      paragraphs: ['Definiere Muss-Kriterien wie passende Berechtigung und gültige Quelle. Fehlt eine Voraussetzung, ist der Kandidat für den vorgesehenen Betrieb nicht bereit. Eine hohe Punktzahl für Geschwindigkeit darf das nicht verdecken. Gewichte helfen, zulässige Kandidaten nach begründeten Prioritäten zu vergleichen; sie sind eine Planungshilfe und kein allgemeingültiges Ranking, das notwendige Kontrollen ersetzen könnte.'],
      emphasis: ['Muss-Kriterien', 'Berechtigung', 'gültige Quelle', 'Gewichte', 'Planungshilfe'],
      bullets: ['Voraussetzungen zuerst prüfen.', 'Offene Berechtigung nicht durch hohe Tempowerte ausgleichen.', 'Gewichte und Bewertungsannahmen nachvollziehbar dokumentieren.'],
    },
    {
      title: 'Den kleinsten aussagekräftigen Pilot wählen',
      paragraphs: ['Ein guter erster Pilot ist begrenzt, messbar und fachlich überprüfbar; die nötigen Daten sind verfügbar. Große strategische Wirkung reicht nicht, wenn Aufgabe oder Datenlage unklar bleiben. Prüfe immer eine einfache Alternative, etwa strukturierte Suche oder feste Vergleichsregeln. Bei hohem Prüfaufwand oder geringem Zusatznutzen kann Zurückstellen sinnvoll sein. Halte fest, welche Voraussetzung eine spätere Neubewertung ermöglichen würde.'],
      emphasis: ['Pilot', 'einfache Alternative', 'Vergleichsregeln', 'Zurückstellen', 'Neubewertung'],
    },
  ],
  'w6-l3': [
    {
      title: 'Die AI-PRD verbindet Anforderungen',
      paragraphs: ['Eine AI-PRD beschreibt Produktanforderungen für eine KI-Anwendung. Sie verbindet Nutzerproblem, Daten, Funktionen, Ausgabe, Qualitätskriterien und Kontrollen. Beschreibe auch ausgeschlossene Funktionen, unbekannte Angaben und Ausnahmen. Ein Projektassistent kann eine Änderungsübersicht als Entwurf mit Fundstellen liefern; automatische Freigabe und Versand liegen dann außerhalb des Umfangs. Die Abnahme prüft das definierte Ergebnis statt eine allgemeine Behauptung, die KI sei gut.'],
      emphasis: ['AI-PRD', 'Nutzerproblem', 'Qualitätskriterien', 'Kontrollen', 'Abnahme'],
      visual: { kind: 'flow', items: [
        { label: 'Auslöser und Input', text: 'Eine freigegebene neue Angebotsfassung trifft ein.' },
        { label: 'Definierter Output', text: 'Entwurf einer Änderungsübersicht mit Positionen und Fundstellen.' },
        { label: 'Messbare Abnahme', text: 'Fachprüfung gegen Quellen und vorab festgelegte Qualitätskriterien.' },
        { label: 'Umfangsgrenze', text: 'Kein automatischer Versand oder automatische Freigabe in diesem Pilot.' },
      ] },
    },
    {
      title: 'Pilot, Stop-Regeln und Rückfallweg',
      paragraphs: ['Plane einen kleinen aussagekräftigen Pilot mit begrenzten Nutzern, repräsentativen Fällen, Fachprüfern und technischer Betreuung. Erfolgskriterien, Mindestqualität und Stop-Bedingungen stehen vor dem Start fest. Ein Rückfallverfahren beschreibt die manuelle Weiterarbeit bei Ausfall oder unzuverlässiger Ausgabe. Rückmeldungen werden dokumentiert und ausgewertet. Auch eine begründete Entscheidung gegen die nächste Ausbaustufe ist ein gültiges Pilotergebnis.'],
      emphasis: ['Pilot', 'Erfolgskriterien', 'Stop-Bedingungen', 'Rückfallverfahren', 'Pilotergebnis'],
      bullets: ['Fachprüfung und technische Betreuung benannten Personen zuordnen.', 'Unklare Quellen und unzuverlässige Ausgaben zur Klärung stoppen.', 'Bestehenden manuellen Ablauf als Rückfall bereithalten.', 'Einführung, Nachbesserung und Zurückstellen als mögliche Ergebnisse zulassen.'],
    },
    {
      title: 'Auswerten und kontrolliert aktualisieren',
      paragraphs: ['Vergleiche die Ergebnisse mit der Baseline und benenne praktische Grenzen. Zeitersparnis zählt einschließlich Review und Nacharbeit; kritische Fehler bleiben separat sichtbar. Ändern sich Modell, Daten oder Prozess, planst du passende Regressionstests. Dadurch bleibt das Produkt updatefähig: Änderungen werden versioniert, geprüft und bewusst übernommen. Ein neuer Stand ist nicht allein deshalb eine nachgewiesene Verbesserung.'],
      emphasis: ['Baseline', 'Review', 'kritische Fehler', 'Regressionstests', 'updatefähig', 'versioniert'],
      visual: { kind: 'flow', items: [
        { label: 'Änderung festhalten', text: 'Neue Modell-, Daten- oder Prozessversion dokumentieren.' },
        { label: 'Kontrollen erneut prüfen', text: 'Passende Regressionstests und fachliche Bewertung durchführen.' },
        { label: 'Bewusst übernehmen', text: 'Nur nach der dokumentierten Qualitätsentscheidung aktualisieren.' },
      ] },
    },
  ],
};
