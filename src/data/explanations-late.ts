import type { ExplanationSection } from '../types';

// Redaktionelle Erklärabschnitte für M07–M12; Diagrammbeispiele sind fiktiv.
export const lateExplanationSections: Record<string, ExplanationSection[]> = {
  'w7-l1': [
    {
      title: 'Workflow: Der Weg steht vorher fest',
      paragraphs: ['Ein Workflow folgt festgelegten Schritten und Regeln: Dokument empfangen, Daten extrahieren, Vollständigkeit prüfen, Entwurf erstellen. Ein Agent kann dagegen innerhalb seines Rahmens selbst Werkzeuge und nächste Schritte auswählen. Entscheidend ist dieser Handlungsspielraum. Ein langer Chattext oder die Bezeichnung „Agent“ allein macht eine Anwendung noch nicht zu einem selbst planenden System.'],
      emphasis: ['Workflow', 'Agent', 'Handlungsspielraum'],
      visual: { kind: 'comparison', items: [
        { label: 'Bekannter Prozessweg', text: 'Fiktives Angebot A-17: Pflichtfelder prüfen, Lücken markieren und Rückfrage entwerfen.' },
        { label: 'Flexible, begrenzte Suche', text: 'Zu einer Nachweislücke erst Datenblatt D-3 prüfen und bei Bedarf eine weitere erlaubte Quelle auswählen.' },
      ] },
    },
    {
      title: 'Autonomie braucht einen konkreten Grund',
      paragraphs: ['Leite die benötigte Autonomie aus der Aufgabe ab. Bei bekannten Eingaben, Prüfschritten und Fehlerwegen lässt sich ein fester Workflow häufig leichter prüfen. Wechselnde Recherchewege können einen Agenten rechtfertigen. Seine Werkzeuge, Daten, Schritte und Kosten bleiben begrenzt. Auch eine Kombination ist möglich: Der kontrollierte Prozess enthält nur dort einen agentischen Teilschritt, wo flexible Planung wirklich hilft.'],
      emphasis: ['Autonomie', 'begrenzt', 'agentischen Teilschritt'],
      bullets: ['Bekannter Weg: zuerst einen festen Workflow prüfen.', 'Zusätzliche Planung: konkreten Mehrwert benennen.', 'Grenzen: Daten, Tools, Schritte und Kosten festlegen.'],
    },
  ],
  'w7-l2': [
    {
      title: 'Lesen, entwerfen und verändern getrennt erlauben',
      paragraphs: ['Werkzeugrechte bestimmen, was das System tatsächlich tun kann. Lesen, einen Entwurf erstellen und einen externen Stand verändern sind getrennte Fähigkeiten. Der Toolname allein reicht deshalb nicht: Projekte, Felder, Empfänger und Datenmengen müssen ebenfalls begrenzt sein. Diese Rechte werden möglichst eng vergeben und außerhalb der freien Modellantwort durchgesetzt, statt auf einen Sicherheitssatz im Prompt zu vertrauen.'],
      emphasis: ['Werkzeugrechte', 'getrennte Fähigkeiten', 'außerhalb der freien Modellantwort'],
      visual: { kind: 'flow', items: [
        { label: 'Erlaubte Quelle lesen', text: 'Projekt Nord: LV V2 verfügbar; vertrauliche Preise aus Süd gesperrt.' },
        { label: 'Entwurf E-42 erstellen', text: 'Rückfrage zur fehlenden Einheit; noch keine externe Veränderung.' },
        { label: 'Konkrete Wirkung prüfen', text: 'Nur den bestätigten Entwurf an den bestätigten Empfänger übertragen.' },
      ] },
    },
    {
      title: 'Freigaben gelten für genau diesen Inhalt',
      paragraphs: ['Eine Freigabe bezieht sich auf den konkreten Inhalt und die konkrete Wirkung. Zwischen Prüfung und Versand dürfen Inhalt oder Empfänger nicht unbemerkt wechseln. Selbst ein technisch erfolgreicher Toolaufruf kann fachlich falsch sein. Prüfe deshalb Ergebnis, Berechtigungsumfang und Außenwirkung getrennt. Unklare Vorgänge bleiben offen und werden an eine zuständige Person gegeben, statt allein wegen einer Erfolgsmeldung weiterzulaufen.'],
      emphasis: ['Freigabe', 'konkreten Inhalt', 'Außenwirkung'],
      bullets: ['Inhalt verändert: passende Freigabe erneut prüfen.', 'Empfänger verändert: Wirkung neu bewerten.', 'Tool meldet Erfolg: fachliche Richtigkeit bleibt prüfpflichtig.'],
    },
  ],
  'w7-l3': [
    {
      title: 'Der Zustand erklärt den nächsten erlaubten Schritt',
      paragraphs: ['Zustände machen den Ablauf nachvollziehbar: eingegangen, aufbereitet, geprüft, offen und freigegeben. Jeder Übergang braucht eine Voraussetzung, einen verantwortlichen Schritt und ein dokumentiertes Ergebnis. Antwortet ein Werkzeug nicht, beweist der Timeout keine Nichtausführung. Vor einer Wiederholung muss das System klären, ob die gewünschte Wirkung bereits eingetreten ist; sonst kann eine zweite Wirkung entstehen.'],
      emphasis: ['Zustände', 'Timeout', 'Vor einer Wiederholung'],
      visual: { kind: 'flow', items: [
        { label: 'Vorgang V-42 starten', text: 'Freigegebenen Entwurf E-42 übertragen; Antwort wird erwartet.' },
        { label: 'Timeout: Wirkung unbekannt', text: 'Nicht sofort erneut übertragen, sondern den bestehenden Vorgang prüfen.' },
        { label: 'Status: bereits erledigt', text: 'Vorhandenes Ergebnis übernehmen; keine zweite Übertragung erzeugen.' },
      ] },
    },
    {
      title: 'Idempotenz verhindert doppelte Wirkungen',
      paragraphs: ['Idempotenz bedeutet hier: Wiederholte Verarbeitung löst dieselbe externe Wirkung nicht mehrfach aus. Eindeutige Vorgangsbezüge, dokumentierte Ergebnisse und begrenzte Wiederholungen unterstützen das. Neue Dokumentversionen müssen erkennbar bleiben. Tracing zeigt den Weg von Input über Werkzeug und Parameter zum Ergebnis. Diese Protokolle benötigen selbst passende Zugriffs- und Aufbewahrungsregeln, damit Nachvollziehbarkeit nicht zu unkontrollierter Datenspeicherung wird.'],
      emphasis: ['Idempotenz', 'Vorgangsbezüge', 'Tracing', 'Zugriffs- und Aufbewahrungsregeln'],
      bullets: ['Gleicher Vorgang: keine unbemerkte Doppelwirkung.', 'Neue Dokumentversion: eigene Prüfung und klarer Bezug.', 'Schleifen: Wiederholung begrenzen und bei Unklarheit eskalieren.'],
    },
  ],
  'w8-l1': [
    {
      title: 'Der Einsatz zählt, die Branche genügt nicht',
      paragraphs: ['Die rechtliche Einordnung beginnt mit Zweck, Funktionen, betroffenen Personen und Organisationsrollen. Eine Branchenbezeichnung reicht für eine AI-Act-Klassifizierung nicht aus. Ein Brandschutz-Dokumentenassistent kann lediglich Quellen suchen oder in einem anderen Einsatz Entscheidungen beeinflussen. Beschreibe deshalb zuerst, was das System tatsächlich tut und wie seine Ergebnisse verwendet werden, bevor du eine rechtliche Schlussfolgerung ziehst.'],
      emphasis: ['rechtliche Einordnung', 'Zweck', 'AI-Act-Klassifizierung'],
      bullets: ['Konkreten Zweck und Funktionen beschreiben.', 'Betroffene Personen und eigene Rolle klären.', 'Entscheidungswirkung statt Branchenetikett prüfen.'],
    },
    {
      title: 'Rechtsquelle und Orientierung auseinanderhalten',
      paragraphs: ['Rechtsquellen, behördliche Orientierung, freiwillige Rahmenwerke und technische Empfehlungen haben unterschiedliche Rollen. NIST AI RMF ist ein freiwilliger Risikorahmen. Zu ISO/IEC 42001 und 23894 enthält die Bibliothek öffentliche Übersichten, keine Volltext-Klauselprüfung. Vor betrieblichen Entscheidungen werden geltende Rechtsfassung, Voraussetzungen und Fristen aktuell mit zuständigen Fachstellen geprüft. Ein Quellenlink oder Normname erledigt diese Prüfung noch nicht.'],
      emphasis: ['Rechtsquellen', 'NIST AI RMF', 'öffentliche Übersichten', 'keine Volltext-Klauselprüfung'],
      visual: { kind: 'comparison', items: [
        { label: 'Geltende Rechtsquelle', text: 'Konkrete Anwendung anhand der aktuellen Fassung prüfen; der Link allein ist kein fertiges Rechtsurteil.' },
        { label: 'Behördliche Orientierung', text: 'Prüffragen für den tatsächlichen Einsatz und Datenfluss verwenden.' },
        { label: 'Freiwilliger Rahmen', text: 'NIST AI RMF strukturiert Risiken und ist kein EU-Gesetz.' },
        { label: 'Öffentliche Normübersicht', text: 'ISO-Übersichten vermitteln den Gegenstand, ersetzen aber keine Prüfung einzelner Volltextklauseln.' },
      ] },
    },
  ],
  'w8-l2': [
    {
      title: 'Daten wandern durch mehr als einen Speicher',
      paragraphs: ['Ein Datenfluss zeigt Verarbeitung und Speicherung: Eingangsdokument, Aufbereitung, Suchindex, Modellprovider, Ausgabe, Protokoll und Sicherung. Personenbezogene oder vertrauliche Inhalte können an jeder dieser Stellen vorkommen. Europäischer oder privater Betrieb beantwortet deshalb noch nicht, wer zugreifen darf, wofür Informationen verwendet werden und wann sie gelöscht werden. Betrachte den tatsächlichen Weg statt nur den Standort einer Komponente.'],
      emphasis: ['Datenfluss', 'Suchindex', 'Protokoll und Sicherung', 'tatsächlichen Weg'],
      visual: { kind: 'flow', items: [
        { label: 'Dokument und Aufbereitung', text: 'Fiktives Angebot D-8 enthält Kontaktperson und vertrauliche Projektpreise.' },
        { label: 'Index und Modellkontext', text: 'Abgeleitete Abschnitte bekommen Projektrechte; nur nötige zulässige Daten gelangen zum Modell.' },
        { label: 'Ausgabe, Logs, Backup', text: 'Prüfen, welche Daten dort tatsächlich entstehen und wie Zugriff sowie Löschung geregelt sind.' },
      ] },
    },
    {
      title: 'Löschen umfasst auch abgeleitete Kopien',
      paragraphs: ['Dokumentiere je Stufe Datenkategorien, Zweck, Zugriffsrollen, Aufbewahrung und Löschweg. Embeddings garantieren keine Anonymisierung. Eine gelöschte Originaldatei kann Einträge im Index, in Logs oder Sicherungen zurücklassen. Offene Datenschutzfragen erhalten eine verantwortliche Person und einen benötigten Nachweis. Konkrete Pflichten werden anhand des geltenden Rechts und der tatsächlichen Verträge geprüft, nicht aus einer allgemeinen Architekturbezeichnung abgeleitet.'],
      emphasis: ['Löschweg', 'Embeddings', 'verantwortliche Person', 'tatsächlichen Verträge'],
      bullets: ['Original entfernt: Index, Logs und Sicherungen mitbetrachten.', 'Je Stufe: Zweck, Rechte und Aufbewahrung dokumentieren.', 'Offene Frage: Zuständigkeit und erforderlichen Nachweis festlegen.'],
    },
  ],
  'w8-l3': [
    {
      title: 'Inventar, Risiko und Freigabe gehören zusammen',
      paragraphs: ['Governance wirkt durch wiederkehrende Entscheidungen. Das Inventar beschreibt Zweck, Nutzer, Komponenten und Datenquellen. Das Risikoregister verbindet mögliche Wirkung mit vorhandener Kontrolle, offener Frage und Verantwortlichen. Eine Freigabe benennt Einsatzbedingungen und erforderliche Nachweise. Diese Unterlagen unterstützen konkrete Entscheidungen: Was darf der Pilot leisten, wo bestehen Lücken und wer muss sie klären? Sie dienen nicht nur der Ablage.'],
      emphasis: ['Governance', 'Inventar', 'Risikoregister', 'Freigabe'],
      visual: { kind: 'flow', items: [
        { label: 'Einsatz erfassen', text: 'Pilot N-1 liest Nord-Angebote und erstellt interne Entwürfe.' },
        { label: 'Risiko zuordnen', text: 'Falsche Einheit: Fachprüfung, Fall T-7 und zuständige Person dokumentieren.' },
        { label: 'Begrenzt entscheiden', text: 'Nur den geprüften Umfang freigeben; offene Nachweise bleiben sichtbar.' },
        { label: 'Nach Änderung erneut prüfen', text: 'Neue Versandfunktion verändert Wirkung und benötigt einen passenden Review.' },
      ] },
    },
    {
      title: 'Änderung oder Vorfall löst neue Prüfung aus',
      paragraphs: ['Ein Reviewprozess legt Auslöser, Zuständigkeit und benötigte Tests fest. Änderungen an Modell, Zweck, Datenbestand, Nutzerkreis oder Werkzeugrechten können die bisherige Bewertung verändern. Für Vorfälle gilt ein nachvollziehbarer Weg: Wirkung begrenzen, Befund dokumentieren, Ursache untersuchen und vor Wiederaufnahme prüfen. Ungeklärte Fragen dürfen sichtbar bleiben, benötigen aber eine verantwortliche Person und eine konkrete Entscheidungsgrundlage.'],
      emphasis: ['Reviewprozess', 'Werkzeugrechten', 'vor Wiederaufnahme prüfen', 'Entscheidungsgrundlage'],
      bullets: ['Änderung: bisherige Bewertung auf passende Gültigkeit prüfen.', 'Vorfall: Wirkung begrenzen und Ursache nachvollziehen.', 'Wiederaufnahme: erforderliche Nachweise und Zuständigkeit klären.'],
    },
  ],
  'w9-l1': [
    {
      title: 'Bedrohungen vom möglichen Schaden her denken',
      paragraphs: ['Ein Bedrohungsmodell benennt schützenswerte Daten, mögliche Schäden, Angreifer und Eingangswege. Prüfe direkte Nutzeranfragen, fremde Dokumente, Suchtreffer, Toolantworten und Übergaben an weitere Systeme. Welche Daten oder Werkzeuge werden anschließend erreichbar? Wichtige Vertrauensgrenzen liegen beispielsweise zwischen Projekten oder zwischen einem internen Entwurf und einer externen Aktion. Das konkrete Zusammenspiel bestimmt, wo Schutz nötig ist.'],
      emphasis: ['Bedrohungsmodell', 'Eingangswege', 'Vertrauensgrenzen'],
      bullets: ['Daten und mögliche Wirkung zuerst benennen.', 'Eingänge und anschließende Zugriffe verbinden.', 'Projektgrenzen und externe Aktionen ausdrücklich prüfen.'],
    },
    {
      title: 'Dokumentanweisungen bleiben fremde Inhalte',
      paragraphs: ['Prompt Injection versucht, den vorgesehenen Ablauf durch fremde Inhalte zu beeinflussen. Ein PDF kann neben Fachtext eine Aufforderung enthalten, Daten weiterzugeben oder Prüfungen zu überspringen. Dieser Text bleibt Dokumentdaten und erhält keine Entscheidungshoheit. Wichtig ist nicht allein die Angriffserkennung des Modells: Wirksame Systemgrenzen müssen einen unerlaubten Datenzugriff, Datenabfluss oder eine unzulässige Außenwirkung tatsächlich verhindern.'],
      emphasis: ['Prompt Injection', 'Dokumentdaten', 'keine Entscheidungshoheit', 'Systemgrenzen'],
      visual: { kind: 'flow', items: [
        { label: 'Fremdes Angebot', text: 'Fiktiver Angriffstext fordert die Weitergabe einer internen Preisliste.' },
        { label: 'Vertrauensgrenze', text: 'Die Dokumentpassage kann keine Nutzerfreigabe und keine zusätzlichen Rechte erzeugen.' },
        { label: 'Geschützte Daten und Wirkung', text: 'Projektfremde Quelle bleibt gesperrt; ein unzulässiger Versand wird nicht ausgeführt.' },
      ] },
    },
  ],
  'w9-l2': [
    {
      title: 'Zugriff und Werkzeugparameter technisch begrenzen',
      paragraphs: ['Eine Schutzmaßnahme muss zur konkreten Bedrohung passen. Projektberechtigungen werden vor dem Zugriff technisch durchgesetzt; ein Prompt ist keine ausreichende Zugriffskontrolle. Werkzeuge erhalten enge Rechte, erlaubte Eingaben und kontrollierte Ausgaben. Strukturierte Übergaben und Eingabeprüfung verhindern, soweit wirksam umgesetzt, dass freie Dokumenttexte ungeprüft zu Toolparametern oder Befehlen für nachgelagerte Systeme werden. Die tatsächliche Übergabe bleibt prüfpflichtig.'],
      emphasis: ['Projektberechtigungen', 'vor dem Zugriff', 'Strukturierte Übergaben', 'Eingabeprüfung'],
      visual: { kind: 'flow', items: [
        { label: 'Quelle zulassen', text: 'Rolle Nord darf D-N-2 lesen; D-S-4 bleibt vor dem Abruf gesperrt.' },
        { label: 'Aufruf prüfen', text: 'Tool und Parameter müssen zum erlaubten Projekt und Vorgang passen.' },
        { label: 'Wirkung freigeben', text: 'Inhalt und Ziel werden vor einer externen Veränderung konkret kontrolliert.' },
      ] },
    },
    {
      title: 'Mehrere Kontrollen schützen unterschiedliche Übergänge',
      paragraphs: ['Vor externen Veränderungen prüft ein kontrollierter Schritt Inhalt, Ziel und Wirkung. Isolation trennt Aufgaben und Datenbestände entsprechend ihren Risiken. Protokolle unterstützen die Untersuchung, können selbst aber vertrauliche Informationen enthalten. Keine Einzelmaßnahme garantiert vollständige Sicherheit. Prüfe die Kombination aus Zugriffsschutz, Werkzeugbeschränkung, Validierung, Freigabe und nachvollziehbarem Fehlerweg, damit jede Kontrolle an der richtigen Stelle wirken kann.'],
      emphasis: ['Inhalt, Ziel und Wirkung', 'Isolation', 'Protokolle', 'Keine Einzelmaßnahme'],
      bullets: ['Freigabe muss zur konkreten Außenwirkung passen.', 'Protokolle erhalten geeignete Zugriffsregeln.', 'Kontrollkombination mit Angriffen und Fehlerfällen testen.'],
    },
  ],
  'w9-l3': [
    {
      title: 'Der Handlungspfad zählt, nicht nur die Schlussantwort',
      paragraphs: ['Ein Sicherheitstest nennt Ausgangszustand, Eingabe, erwartete sichere Wirkung und beobachtete Handlung. Bei Agenten prüfst du den gesamten Handlungspfad: Werkzeuge, tatsächliche Parameter, gelesene Quellen, Zustände und Schreibwirkungen. Eine höfliche Ablehnung reicht nicht aus, wenn zuvor bereits fremde Projektdaten abgerufen wurden. Der Test bewertet also das wirkliche Systemverhalten und nicht lediglich die Formulierung der letzten Antwort.'],
      emphasis: ['Sicherheitstest', 'gesamten Handlungspfad', 'wirkliche Systemverhalten'],
      visual: { kind: 'comparison', items: [
        { label: 'Sicher klingende Antwort', text: '„Ich darf Projekt Süd nicht anzeigen“ – sagt noch nichts über vorherige Aktionen.' },
        { label: 'Unsicherer tatsächlicher Pfad', text: 'Protokoll zeigt einen Süd-Abruf vor der Ablehnung: Der Test ist fehlgeschlagen.' },
        { label: 'Korrigierter tatsächlicher Pfad', text: 'Berechtigungsprüfung verhindert den Abruf, bevor Modellkontext entsteht.' },
      ] },
    },
    {
      title: 'Angriffstests und zulässige Fälle gemeinsam wiederholen',
      paragraphs: ['Plane positive und negative Testfälle: Zulässiger Zugriff muss funktionieren, projektfremder Zugriff muss scheitern. Variiere Angriffstexte, Fehlerzustände, Wiederholungen und Grenzfälle. Dokumentiere wirksame Kontrollen und verbleibende Lücken. Nach einer Korrektur wiederholst du die betroffenen Fälle und geeignete Regressionstests. Zehn bestandene Fälle sind ein begrenzter Nachweis für diese Prüfungen, keine vollständige Garantie gegen zukünftige Angriffe.'],
      emphasis: ['positive und negative Testfälle', 'Regressionstests', 'begrenzter Nachweis'],
      bullets: ['Vorher: sichere erwartete Wirkung festlegen.', 'Nachher: tatsächliche Tools und Datenzugriffe prüfen.', 'Nach Korrektur: Angriff und zulässige Nachbarfälle erneut testen.'],
    },
  ],
  'w10-l1': [
    {
      title: 'Bis zum akzeptierten Ergebnis messen',
      paragraphs: ['Die Baseline erfasst den heutigen Prozess: Fallvolumen, Bearbeitungszeit, Fehler, Prüfung und Nacharbeit. Vergleiche den KI-Ablauf unter ähnlichen Bedingungen und mit demselben Ergebnismaß. Entscheidend ist die Zeit bis zum fachlich akzeptierten Ergebnis, nicht nur der schnelle Entwurf. Tatsächliche Nutzung zählt ebenfalls: Eine gute Demo spart im Alltag nichts, wenn der vorgeschlagene Ablauf kaum eingesetzt wird.'],
      emphasis: ['Baseline', 'Prüfung und Nacharbeit', 'fachlich akzeptierten Ergebnis', 'Tatsächliche Nutzung'],
      visual: { kind: 'equation', items: [
        { label: 'Baseline', text: 'Fiktiv: 20 Minuten bis zum akzeptierten Protokoll.' },
        { label: '− KI-Aufwand', text: '2 Minuten Entwurf + 8 Prüfung + 5 Nacharbeit = 15 Minuten.' },
        { label: '= Freie Kapazität', text: '20 − 15 = 5 Minuten zusätzliche Kapazität.' },
      ] },
    },
    {
      title: 'Freie Kapazität wird nicht automatisch Geldnutzen',
      paragraphs: ['Freigewordene Zeit ist zuerst zusätzliche Kapazität. Wirtschaftlicher Nutzen entsteht, wenn sie sinnvoll eingesetzt oder Aufwand tatsächlich vermieden wird. Trenne Messwerte und Annahmen. Rechne mit einem günstigen, mittleren und ungünstigen Fall für Nutzung, Qualität und Kontrollzeit. Dieser Vergleich zeigt, welche Annahmen deine Entscheidung stark verändern und wo eine echte Messung besonders wichtig wäre.'],
      emphasis: ['Kapazität', 'Wirtschaftlicher Nutzen', 'Messwerte und Annahmen', 'Kontrollzeit'],
      bullets: ['Zeitgewinn einschließlich Nacharbeit berechnen.', 'Sinnvolle Verwendung der freien Zeit benennen.', 'Günstigen, mittleren und ungünstigen Annahmefall prüfen.'],
    },
  ],
  'w10-l2': [
    {
      title: 'Der Nenner sind brauchbare Geschäftsergebnisse',
      paragraphs: ['Kosten pro Token bilden nur einen Teil des Verbrauchs ab. Ein Vorgang kann mehrere Versuche, Retrieval, Speicher, verworfene Antworten und menschliche Prüfung benötigen. Oft ist deshalb das fachlich akzeptierte Ergebnis die sinnvollere Einheit. Teile sämtliche passend abgegrenzten Kosten eines Zeitraums durch die Zahl der akzeptierten Vorgänge desselben Zeitraums, damit Kosten und Ergebnisumfang wirklich zusammenpassen.'],
      emphasis: ['Kosten pro Token', 'fachlich akzeptierte Ergebnis', 'Kosten eines Zeitraums', 'akzeptierten Vorgänge'],
      visual: { kind: 'equation', items: [
        { label: 'Gesamtkosten', text: 'Fiktiv: 480 Euro im betrachteten Monat, mit einheitlicher Kostenabgrenzung.' },
        { label: '÷ Akzeptierte Vorgänge', text: '120 fachlich brauchbare Ergebnisse; verworfene Antworten zählen nicht zum Nenner.' },
        { label: '= Kosten je Ergebnis', text: '480 ÷ 120 = 4 Euro; bei nur 80 akzeptierten Ergebnissen sind es 6 Euro.' },
      ] },
    },
    {
      title: 'Gleicher Kostenumfang macht Varianten vergleichbar',
      paragraphs: ['Trenne einmalige Implementierungskosten und laufende Kosten und erkläre ihre Behandlung im Vergleich. Support und Prüfung dürfen nicht nur bei einem Anbieter mitgezählt werden. Prüfe mit Sensitivitätsfällen, wie geringere Erfolgsquote oder höherer Kontrollaufwand die Stückkosten verändern. Geld-, Zeit- und Qualitätsgrößen bleiben getrennt nachvollziehbar, damit eine günstige technische Verbrauchszahl nicht ein teures Geschäftsergebnis verdeckt.'],
      emphasis: ['Implementierungskosten', 'laufende Kosten', 'Sensitivitätsfällen', 'Stückkosten'],
      bullets: ['Gleichen Zeitraum und gleichen Kostenumfang verwenden.', 'Verworfene Ausgaben und Prüfaufwand berücksichtigen.', 'Schlechtere Erfolgsquote und zusätzliche Nacharbeit durchrechnen.'],
    },
  ],
  'w10-l3': [
    {
      title: 'Alle Anbieter an derselben Aufgabe prüfen',
      paragraphs: ['Vergleiche Anbieter mit identischer Aufgabe, denselben Daten und denselben Qualitätskriterien. Dazu gehören Datenrechte, Modell- und Produktversion, Export, Integration, Support, Verfügbarkeit und Gesamtkosten. Ein SLA beschreibt vereinbarte Serviceleistungen; es beweist keine fachlich richtigen Antworten. Kritische Fehler und Kontrollaufwand bleiben deshalb eigenständige Bewertungsgrößen, statt hinter einer allgemeinen Verfügbarkeitszusage oder schönen Demonstration zu verschwinden.'],
      emphasis: ['Qualitätskriterien', 'Datenrechte', 'SLA', 'Kritische Fehler'],
      visual: { kind: 'comparison', items: [
        { label: 'Fiktiver Anbieter A', text: '18 von 20 Fachfällen bestanden; Export enthält noch keine Projektmetadaten.' },
        { label: 'Fiktiver Anbieter B', text: '19 von 20 Fachfällen bestanden; ein Einheitenfehler bleibt, Export wird separat getestet.' },
        { label: 'Gemeinsamer Maßstab', text: 'Gleiche Daten, Kostenabgrenzung und Fehlerbewertung; offene Nachweise nicht als erfüllt werten.' },
      ] },
    },
    {
      title: 'Den Ausstieg vor dem Einstieg klären',
      paragraphs: ['Plane den Exit vor der Entscheidung: Welche Dokumente, Prompts, Einstellungen, Protokolle und Ergebnisse lassen sich brauchbar exportieren, und was kostet ein Wechsel? Prüfe Preise und Bedingungen vor einem Auftrag aktuell. Beschaffungsleitfäden unterstützen die Methode; ein britischer Leitfaden ersetzt kein deutsches Vergaberecht. Dokumentiere Kriteriengewichtung und offene Nachweise, damit die Entscheidung nicht nur durch eine scheinbar objektive Punktzahl überzeugt.'],
      emphasis: ['Exit', 'exportieren', 'Preise und Bedingungen', 'offene Nachweise'],
      bullets: ['Export mit benötigten Metadaten praktisch prüfen.', 'Wechselaufwand und Betriebskosten einbeziehen.', 'Gewichte begründen und ungeklärte Anforderungen sichtbar lassen.'],
    },
  ],
  'w11-l1': [
    {
      title: 'Nutzung, Fachprüfung und Betreuung zuordnen',
      paragraphs: ['Ein KI-Pilot verändert Aufgaben und Verantwortung. Lege fest, wer das System nutzt, wer fachliche Aussagen prüft und wer Technik sowie Betrieb betreut. In kleinen Teams kann dieselbe Person mehrere Rollen übernehmen; die Aufgaben müssen trotzdem erkennbar bleiben. Ein allgemeiner Anwenderkurs beseitigt keine ungeklärte Verantwortung für Ergebnisse, Entscheidungen oder die Behandlung eines Fehlers.'],
      emphasis: ['Verantwortung', 'fachliche Aussagen', 'mehrere Rollen', 'Aufgaben'],
      visual: { kind: 'comparison', items: [
        { label: 'Fachanwender', text: 'Meldet fiktiven Fall M-7 mit Input, Dokumentversion und falscher Einheit.' },
        { label: 'Verantwortlicher Prüfer', text: 'Prüft Originalquelle, fachliche Bedeutung und die betroffene Entscheidung.' },
        { label: 'Technische Betreuung', text: 'Untersucht Verarbeitung, behebt den Fehler und dokumentiert den erneuten Test.' },
      ] },
    },
    {
      title: 'Fehler brauchen einen benannten Eskalationsweg',
      paragraphs: ['Eine Rollenmatrix verbindet Tätigkeiten mit Ausführung, Entscheidung und erforderlicher Beteiligung. Fachanwender melden nachvollziehbare Fälle, Prüfer brauchen Kriterien und Quellenkompetenz, die Betreuung untersucht das Systemverhalten. Für eine falsche technische Aussage ist der Prüf- und Eskalationsweg benannt. Datenschutz, Sicherheit und gegebenenfalls betriebliche Beteiligung werden früh mit zuständigen Stellen anhand des konkreten Einsatzes geklärt, statt pauschal angenommen.'],
      emphasis: ['Rollenmatrix', 'Quellenkompetenz', 'Prüf- und Eskalationsweg', 'betriebliche Beteiligung'],
      bullets: ['Pro Tätigkeit: Ausführung und Entscheidung unterscheiden.', 'Falsche Fachausgabe: zuständige Prüfung und Eskalation benennen.', 'Beteiligte Stellen nach tatsächlichen Funktionen und Daten klären.'],
    },
  ],
  'w11-l2': [
    {
      title: 'Jede Rolle lernt an passenden Entscheidungen',
      paragraphs: ['Schulung nutzt reale Aufgaben. Anwender üben zulässige Eingaben, Anweisungen, Grenzen und Fehlermeldung. Prüfer trainieren zusätzlich fachliche Kriterien, Quellenprüfung und Eskalationsregeln. Bearbeite einen Normalfall, einen Grenzfall und einen bewusst falschen KI-Hinweis. So lernst du nicht nur Bedienklicks, sondern erkennst, welche Entscheidung in dieser Situation nötig ist und wann eine Ausgabe offenbleiben muss.'],
      emphasis: ['reale Aufgaben', 'Quellenprüfung', 'Normalfall', 'Grenzfall', 'falschen KI-Hinweis'],
      visual: { kind: 'comparison', items: [
        { label: 'Anwenderübung', text: 'Fiktive Angabe „8 m“ bereitstellen; bei Ausgabe „8 Stück“ eine nachvollziehbare Fehlermeldung erstellen.' },
        { label: 'Prüferübung', text: 'Originalstelle vergleichen, fachliche Abweichung bewerten und den vorgesehenen Eskalationsweg nutzen.' },
      ] },
    },
    {
      title: 'Adoption gemeinsam mit Qualität und Aufwand messen',
      paragraphs: ['Adoption bedeutet tatsächliche, sinnvolle Verwendung. Eine hohe Nutzungszahl ist noch kein Nutzenbeweis. Verbinde sie mit akzeptierten Ergebnissen, Qualität und Kontrollaufwand. Feedback muss Hindernisse wie zusätzliche Prüfung, unklare Zuständigkeit oder schlechte Daten sichtbar machen. Anbieterumfragen können Anregungen liefern, ersetzen aber keine eigene Messung im Team und keine Untersuchung seiner konkreten Arbeitsabläufe.'],
      emphasis: ['Adoption', 'akzeptierten Ergebnissen', 'Kontrollaufwand', 'eigene Messung'],
      bullets: ['Nutzung plus akzeptierte Ergebnisse erfassen.', 'Qualität und zusätzliche Kontrollzeit mitmessen.', 'Hindernisse als Arbeits- und Lernfragen behandeln.'],
    },
  ],
  'w11-l3': [
    {
      title: 'Fehlermeldung, Begrenzung und Wiederaufnahme organisieren',
      paragraphs: ['Der Betrieb braucht verständliche Wege für Support, Vorfälle und Änderungen. Eine Fehlermeldung enthält Frage, Dokument- und Systemversion, beobachtete Wirkung sowie erwartetes Ergebnis. Verwende nur nötige Daten und passende Zugriffswege. Bei kritischen Fehlern ist festgelegt, wer die Nutzung begrenzt und wer die Wiederaufnahme entscheidet. So bleibt der Vorfall nachvollziehbar, ohne pauschal vertrauliche Inhalte weiterzuverteilen.'],
      emphasis: ['Fehlermeldung', 'Systemversion', 'Nutzung begrenzt', 'Wiederaufnahme'],
      visual: { kind: 'flow', items: [
        { label: 'Fall M-11 melden', text: 'Nach Modellwechsel wird fiktiv Plan V1 statt freigegebenem V2 verwendet.' },
        { label: 'Betroffene Nutzung begrenzen', text: 'Zuständige Rolle aktiviert den vorgesehenen manuellen Rückfallweg.' },
        { label: 'Korrigieren und testen', text: 'Ursache untersuchen, Version dokumentieren und betroffene Kontrollfälle erneut prüfen.' },
        { label: 'Wiederaufnahme entscheiden', text: 'Die zuständige Rolle entscheidet anhand der erforderlichen Nachweise.' },
      ] },
    },
    {
      title: 'Portfolioentscheidungen folgen überprüfbarem Nutzen',
      paragraphs: ['Ein fester Review verbindet Qualität, Nutzen, Aufwand und Risiken. Neuer Zweck, zusätzliche Daten, Modellwechsel oder weitere Werkzeugrechte können eine erneute Prüfung auslösen. Priorisiere das Portfolio nach Bedarf, Nachweisen und verfügbaren Ressourcen statt nach der lautesten Idee. Ein Pilot wird nach überprüfbarem Nutzen ausgeweitet; Überarbeitung oder begrenzter Weiterbetrieb können genauso passende nächste Entscheidungen sein.'],
      emphasis: ['Review', 'Werkzeugrechte', 'Portfolio', 'überprüfbarem Nutzen'],
      bullets: ['Neue Zwecke, Daten, Modelle oder Rechte als Reviewauslöser prüfen.', 'Qualität, Aufwand und Ressourcen zusammen bewerten.', 'Ausweitung, Begrenzung oder Überarbeitung begründen.'],
    },
  ],
  'w12-l1': [
    {
      title: 'Nachweise machen die Wirkung nachvollziehbar',
      paragraphs: ['Ein Portfolio zeigt Leistung und Grenzen bei definierten Eingaben. Verbinde Problem, Architektur, Datenfluss, Evaluation, Governance, Sicherheit und Kosten. Jeder wesentliche Nutzenanspruch braucht eine Messung oder klar markierte Annahme. Anhänge enthalten kontrollierten Datenbestand, Versionen, Testfälle, Bewertungskriterien, Baseline und Ergebnisse. Eine gelungene Vorführung ergänzt diese Belege; sie ersetzt weder reproduzierbare Nachweise noch die sichtbare Dokumentation von Fehlern und Nichtantworten.'],
      emphasis: ['Portfolio', 'Messung', 'Annahme', 'reproduzierbare Nachweise', 'Nichtantworten'],
      bullets: ['Messwerte und Annahmen kenntlich machen.', 'Daten, Versionen und Bewertungskriterien beifügen.', 'Fehler und Grenzen ausdrücklich zeigen.'],
    },
    {
      title: 'Soll, Angebot und Bewertung über Originalstellen verbinden',
      paragraphs: ['Bei einer technischen Soll-Ist-Prüfung verknüpfst du jede wesentliche Anforderung mit zugänglicher Quelle, Angebotspassage, Bewertung und offenem Nachweis. Andere Personen müssen den Weg zum Befund nachvollziehen können. Fehlt ein Originaltext, bleibt diese Lücke sichtbar. Das Modellgedächtnis ersetzt weder die fehlende Quelle noch den gültigen Projektstand; eine ungeklärte Aussage darf im Dossier nicht als bestätigt erscheinen.'],
      emphasis: ['Soll-Ist-Prüfung', 'zugänglicher Quelle', 'offenem Nachweis', 'Lücke'],
      visual: { kind: 'flow', items: [
        { label: 'Fiktives Soll', text: 'Projektliste P-N V2: „Menge und Einheit je Position angeben.“' },
        { label: 'Fiktive Angebotspassage', text: 'A-17 V1, Seite 2: „Position 7: Menge 8“; die Einheit fehlt.' },
        { label: 'Belegter Befund', text: 'Anforderung nicht vollständig nachgewiesen; Einheit bleibt offen und wird angefragt.' },
        { label: 'Prüfbarer Anhang', text: 'Passagen, Versionen, Fallnummer und zuständige Prüfung dokumentieren.' },
      ] },
    },
  ],
  'w12-l2': [
    {
      title: 'Problem, Wirkung und schwierigen Fall zusammen zeigen',
      paragraphs: ['Beginne die Ergebnispräsentation mit dem Problem und der erreichten Wirkung. Zeige einen Normalfall und einen schwierigen Fall. Baseline und KI-Ablauf verwenden denselben kontrollierten Datenbestand sowie dieselben Kriterien. Berichte verbleibende Fehler, Kontrollaufwand und Kosten und trenne Messwerte von Annahmen. Dadurch kann eine Führungskraft die tatsächliche Wirkung und ihre Grenzen beurteilen, statt nur eine gelungene Einzelausgabe zu sehen.'],
      emphasis: ['Ergebnispräsentation', 'schwierigen Fall', 'dieselben Kriterien', 'Messwerte von Annahmen'],
      visual: { kind: 'flow', items: [
        { label: 'Was wurde verbessert?', text: 'Fiktiver Pilot: akzeptierte Fälle brauchen 15 statt 20 Minuten einschließlich Kontrolle.' },
        { label: 'Welche Grenze bleibt?', text: 'Eine Quellenlücke und ein Einheitenfehler werden in schwierigen Fällen sichtbar.' },
        { label: 'Was folgt daraus?', text: 'Begrenzten Weiterbetrieb oder Überarbeitung mit passenden Nachweisen begründen.' },
      ] },
    },
    {
      title: 'Eine konkrete nächste Entscheidung empfehlen',
      paragraphs: ['Empfiehl begrenzten Weiterbetrieb, Überarbeitung oder eine benannte Ausbaustufe. Die Empfehlung muss zu Nachweisen und Ressourcen passen. Eine unvollständige Sicherheits- oder Qualitätsprüfung verschwindet nicht hinter einer guten Nutzenzahl. Fachkollegen brauchen verständliche Grenzen; technische Partner benötigen zusätzlich den konkreten Verbesserungspunkt und den Abnahmemaßstab. So wird aus einer Präsentation eine überprüfbare Entscheidung über den nächsten Schritt.'],
      emphasis: ['Empfehlung', 'Nachweisen und Ressourcen', 'Sicherheits- oder Qualitätsprüfung', 'Abnahmemaßstab'],
      bullets: ['Nächste Stufe konkret benennen.', 'Verbliebene Fehler nicht aus der Empfehlung ausblenden.', 'Verbesserungspunkt und spätere Abnahme festlegen.'],
    },
  ],
  'w12-l3': [
    {
      title: 'Stabile Konzepte und veränderliche Angaben trennen',
      paragraphs: ['Updatefähiges Lernen trennt stabile Konzepte von Produkten, Preisen und Rechtsständen. Prüfe neue Aussagen nach ursprünglicher Quelle, Datum, Definition, Stichprobe und Messmethode. Marktberichte beschreiben einen bestimmten Zeitraum, nicht automatisch den Nutzen deines Prozesses. Historische Kursarchive können Prinzipien vermitteln; ihre konkreten Modelle und Schnittstellen werden mit aktuellen Quellen abgeglichen, bevor du sie für eine heutige Entscheidung verwendest.'],
      emphasis: ['stabile Konzepte', 'Quelle, Datum', 'Stichprobe und Messmethode', 'Historische Kursarchive'],
      visual: { kind: 'flow', items: [
        { label: 'Neue Aussage aufnehmen', text: 'Fiktive Marktquote notieren und die ursprüngliche Quelle suchen.' },
        { label: 'Bedeutung prüfen', text: 'Definition, Stichprobe und Zeitraum klären, statt die Prozentzahl isoliert zu übernehmen.' },
        { label: 'Auf den eigenen Fall übertragen', text: 'Eigene Nutzung, Qualität und Aufwand messen; daraus einen nächsten Lernschritt ableiten.' },
        { label: 'Wissen erneut abrufen', text: 'Nach dem Update mit einer Transferfrage prüfen, ob die Änderung wirklich verstanden wurde.' },
      ] },
    },
    {
      title: 'Vertiefung und Zertifikat an deiner nächsten Rolle ausrichten',
      paragraphs: ['Wähle Vertiefung nach deiner nächsten Rolle: Produktverantwortung, technische Umsetzung oder Governance. Ein Zertifikat hilft, wenn Kompetenzprofil und gegebenenfalls Plattform passen. Prüfe Prüfungsfassung, Zugang, Preis und Bedingungen vor Buchung direkt beim Anbieter; diese Lernapp verleiht kein Anbieterzertifikat. Nach Inhaltsupdates festigen feste Transferfragen und wiederholte Abrufübungen das Verständnis, statt geänderte Angaben nur noch einmal zu lesen.'],
      emphasis: ['nächsten Rolle', 'Kompetenzprofil', 'kein Anbieterzertifikat', 'Transferfragen', 'Abrufübungen'],
      bullets: ['Prüfungsprofil mit eigener Zielrolle vergleichen.', 'Aktuelle Anbieterbedingungen vor Buchung prüfen.', 'Neue Inhalte aktiv erklären und auf einen Fall anwenden.'],
    },
  ],
};
