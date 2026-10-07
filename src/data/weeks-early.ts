import type { Week } from '../types';

// M01–M06 der bereitgestellten Lernbibliothek. Ergänzungen sind didaktische Ausarbeitung.
export const earlyWeeks: Week[] = [
  {
    "id": 1,
    "phase": 1,
    "title": "KI und Sprachmodelle verstehen",
    "subtitle": "Du erklärst, welche Probleme KI bearbeiten kann und welche Grenzen eine Projektanwendung hat.",
    "outcomes": [
      "Du kannst KI, ML und GenAI mit eigenen Beispielen erklären.",
      "Du benennst für jeden Kandidaten die erforderlichen Quellen.",
      "Mindestens ein Kandidat wird wegen fehlendem Nutzen oder zu hohem Prüfaufwand zurückgestellt."
    ],
    "lessons": [
      {
        "title": "Begriffe und Aufgaben",
        "minutes": 8,
        "summary": "KI, maschinelles Lernen und generative KI entlang realer Tätigkeiten unterscheiden.",
        "concept": [
          "Künstliche Intelligenz ist der Oberbegriff für Systeme, die Aufgaben wie Erkennen, Planen oder Sprachverarbeitung lösen. Maschinelles Lernen ist ein Teilgebiet: Ein Verfahren lernt Muster aus Beispielen, statt jede Entscheidung als feste Regel zu erhalten. Generative KI beschreibt Systeme, die neue Inhalte erzeugen, etwa Text oder Bilder. Die Begriffe beschreiben nicht dieselbe Ebene: Ein generatives Sprachmodell kann zugleich auf maschinellem Lernen beruhen.",
          "Unterscheide die Arbeitsaufgaben: Klassifikation ordnet eine Nachricht einer Kategorie zu; Extraktion übernimmt Angaben aus einem Dokument; Formulierung erstellt einen neuen Entwurf. Eine regelbasierte Prüfung vergleicht eine Zahl mit einer festgelegten Grenze. Diese Verfahren lassen sich kombinieren. Im Projektalltag zählt, welche Aufgabe zuverlässig erfüllt werden muss und woran du den Erfolg prüfst. Das Etikett „KI“ ist kein Qualitätsnachweis."
        ],
        "keyPoints": [
          "KI ist der Oberbegriff; ML lernt Muster; GenAI erzeugt Inhalte.",
          "Klassifikation, Extraktion und Formulierung brauchen unterschiedliche Qualitätskriterien.",
          "Eindeutige Bedingungen können oft als feste Regeln geprüft werden."
        ],
        "example": {
          "title": "Vom Angebotseingang zum Entwurf",
          "text": "Eine KI klassifiziert eine Nachricht als Angebotsänderung und extrahiert Positionen. Eine Regel prüft die freigegebene Betragsgrenze. Anschließend entsteht ein Entwurf für eine Rückfrage. Dokumenttyp, Mengenrichtigkeit und Entwurfqualität sind drei getrennte Prüfpunkte."
        },
        "privateUse": "Bei deinen privaten Nachrichten kannst du unterscheiden: Ordnerzuordnung ist Klassifikation, das Übernehmen eines Termins ist Extraktion, eine Geburtstagsnachricht ist Generierung. Prüfe Daten und Termine gegen das Original.",
        "exercise": "Notiere sechs eigene Tätigkeiten aus Büro, technischer Planung oder Alltag. Ordne jeder Suche, Extraktion, Formulierung, Berechnung oder Entscheidung zu. Ergänze, ob eine klare Regel bereits genügt. Löse die Einordnung zuerst ohne Text nachzulesen.",
        "reflection": "Erkläre in 60 Sekunden KI, ML und GenAI mit drei eigenen Beispielen und nenne eine Aufgabe, für die du eine feste Regel vorziehen würdest.",
        "visual": "hierarchy",
        "id": "w1-l1"
      },
      {
        "title": "Wie ein LLM arbeitet",
        "minutes": 9,
        "summary": "Token, Kontext und Inferenz als nachvollziehbares Arbeitsmodell.",
        "concept": [
          "Ein Large Language Model verarbeitet Text als Token: kleine Einheiten, die Wörter, Wortteile oder Zeichen umfassen können. Es berechnet aus dem verfügbaren Kontext Wahrscheinlichkeiten für nächste Token und erzeugt so schrittweise eine Antwort. Im Training wurden dafür Modellparameter angepasst. Inferenz bezeichnet die aktuelle Nutzung des trainierten Modells. Ein Prompt beeinflusst diese Nutzung; er trainiert das Basismodell normalerweise nicht neu.",
          "Das Kontextfenster ist die begrenzte Informationsmenge, die das Modell in einem Lauf berücksichtigen kann. Darin stehen Anweisungen, Gespräch, Dokumentstellen und eventuell Tool-Ergebnisse. Die Anwendung kann ältere Inhalte kürzen oder zusammenfassen. Antworten können je nach Auswahlverfahren und Einstellungen variieren. Weder eine lange Antwort noch eine geringe Variation garantiert Richtigkeit: Ein plausibles Tokenmuster kann eine erfundene Artikelnummer ergeben.",
          "Trenne deshalb Modellwissen, bereitgestellte Projektdaten und aktuelle externe Quellen. Für allgemeine Formulierungen genügt Modellwissen häufig. Für den gültigen Preis oder den freigegebenen Stand einer technischen Planung muss die Anwendung passende Informationen bereitstellen. Mehr Text hilft nur, wenn er relevant, richtig zugeordnet und aktuell ist."
        ],
        "keyPoints": [
          "Token sind keine feste Entsprechung zu ganzen Wörtern.",
          "Inferenz verwendet gelernte Parameter mit aktuellem Kontext.",
          "Plausibilität und Wiederholbarkeit beweisen keine Faktenrichtigkeit."
        ],
        "example": {
          "title": "Die überzeugende Artikelnummer",
          "text": "Ein Modell nennt „AB-0042“, obwohl diese Kennung in deinem Artikelstamm nicht existiert. Die Nummer sieht passend aus, ist aber ohne exakten Abgleich wertlos. Eine lesende Stammdatenabfrage und ein sichtbarer Status „nicht gefunden“ sind verlässlicher als eine Schätzung."
        },
        "privateUse": "Für eine Packliste kann ein Entwurf genügen. Für die heutige Zugverspätung benötigst du aktuelle Daten des Verkehrsunternehmens. Das Sprachmodell kennt die reale Situation nicht automatisch.",
        "exercise": "Schreibe drei Fortsetzungen von „Ein gutes Angebot enthält …“. Beobachte, dass unterschiedliche plausible Fortsetzungen möglich sind. Erstelle danach drei Spalten: Modellwissen, Projektdaten, aktuelle Quellen. Ordne allgemeine Formulierung, freigegebene Zeichnung und Tagespreis zu.",
        "reflection": "Erkläre einem Freund, warum ein LLM nicht einfach einen fertigen Satz aus einer Datenbank kopiert und warum daraus Halluzinationen entstehen können.",
        "visual": "tokens",
        "id": "w1-l2"
      },
      {
        "title": "Grenzen und sinnvolle Arbeitsteilung",
        "minutes": 10,
        "summary": "Datenbank, Regel und Modell übernehmen jeweils passende Aufgaben.",
        "concept": [
          "Eine Datenbank ist für exakte Kennungen und freigegebene strukturierte Daten geeignet. Eine Regel kann zum Beispiel eindeutig prüfen, ob Menge mal Einzelpreis den ausgewiesenen Gesamtpreis ergibt. Ein Sprachmodell hilft bei unterschiedlichen Formulierungen, Zusammenfassungen und Entwürfen. Die verlässliche Lösung verteilt Aufgaben: Eine gültige Artikelnummer wird nachgeschlagen, eine Menge regelbasiert geprüft und die Abweichung verständlich formuliert.",
          "Jeder Kandidat braucht erforderliche Eingaben, einen definierten Output und eine Bewertung der Fehlerfolgen. Bei einem kreativen Entwurf sind Fehler oft leicht korrigierbar. Eine falsche Menge in einem technischen Angebot kann teuer sein und erfordert fachliche Prüfung. Rechne diese Prüfung in den Nutzen ein. Wenn Nacharbeit den Zeitgewinn aufbraucht oder die nötige Quelle fehlt, ist Zurückstellen eine gute Managemententscheidung."
        ],
        "keyPoints": [
          "Exakte Kennungen nachschlagen statt erzeugen.",
          "Berechnungen brauchen geklärte Daten und feste Prüfregeln.",
          "Nutzen zählt einschließlich Prüfung, Nacharbeit und Fehlerfolgen."
        ],
        "example": {
          "title": "Die Aufgabenlandkarte einer Projektleitung",
          "text": "Unterlagen suchen, Mengen übernehmen und Rückfragen formulieren sind unterschiedliche Tätigkeiten. Suche benötigt den gültigen Dokumentstand; Mengen brauchen Originalbeleg und Einheit; Rückfragen dürfen als Entwurf entstehen. Eine fachliche Freigabe bleibt bei der verantwortlichen Projektperson."
        },
        "privateUse": "Lass KI dein Haushaltsbudget verständlich erläutern, aber rechne Summen mit einer Tabelle oder einem Taschenrechner. Ein gut formulierter Kommentar ersetzt keinen korrekten Rechenweg.",
        "exercise": "Vergleiche drei Tätigkeiten anhand von heutigem Zeitbedarf, verfügbarer Quelle, möglichem KI-Output und Prüfzeit. Wähle einen Kandidaten und stelle einen anderen begründet zurück. Verwende geschätzte Zeiten ausdrücklich nur als erste Hypothese.",
        "reflection": "Erkläre einer Teamleitung, warum ein zurückgestellter KI-Kandidat eine gute Entscheidung sein kann und welche Information eine erneute Prüfung ermöglichen würde.",
        "visual": "matrix",
        "id": "w1-l3"
      }
    ],
    "questions": [
      {
        "prompt": "Ist eine gut formulierte Antwort bereits ein Qualitätsnachweis?",
        "options": [
          "Ja, wenn sie sehr sicher klingt.",
          "Nein, Qualität muss an Aufgabe, Quellen und fachlichen Kriterien geprüft werden.",
          "Ja, wenn sie keine Rechtschreibfehler enthält.",
          "Nur die Antwortlänge entscheidet."
        ],
        "correct": 1,
        "explanation": "Flüssige Sprache ist eine sprachliche Eigenschaft. Sachliche Qualität ergibt sich aus korrekten Angaben, geeigneten Quellen und den Kriterien der konkreten Aufgabe.",
        "id": "w1-q1"
      },
      {
        "prompt": "Wofür ist eine exakte Datenbankabfrage oft geeigneter?",
        "options": [
          "Für kreative Metaphern.",
          "Für eine frei erfundene Produktbeschreibung.",
          "Für einen möglichst abwechslungsreichen Stil.",
          "Für eindeutige Artikelnummern und freigegebene strukturierte Stammdaten."
        ],
        "correct": 3,
        "explanation": "Eine genaue Abfrage liefert nachvollziehbare Einträge zum gültigen Schlüssel. Ähnliche oder plausibel generierte Kennungen dürfen nicht als bestätigte Stammdaten gelten.",
        "id": "w1-q2"
      },
      {
        "prompt": "Welche Information fehlt einer reinen Modellantwort?",
        "options": [
          "Der Nachweis, dass sie den aktuellen und projektgültigen Dokumentstand verwendet.",
          "Grundsätzlich jede grammatische Struktur.",
          "Automatisch der Name des Chatprogramms.",
          "Eine Aussage darüber, ob der Text überhaupt lesbar ist."
        ],
        "correct": 0,
        "explanation": "Ohne bereitgestellte gültige Quellen und Quellenprüfung lässt sich der verwendete Projektstand nicht belegen. Modellwissen ist kein Dokumentenregister.",
        "id": "w1-q3"
      },
      {
        "prompt": "Eine Extraktion nennt 8 Stück, das Original enthält 8 Meter. Welche Prüfung ist entscheidend?",
        "options": [
          "Nur den Ton verbessern.",
          "Das Ergebnis nochmals länger schreiben lassen.",
          "Menge und Einheit gegen die Originalstelle prüfen und den Fehler sichtbar melden.",
          "Die Einheit ignorieren, weil die Zahl stimmt."
        ],
        "correct": 2,
        "explanation": "Menge und Einheit gehören zusammen. Ein identischer Zahlenwert kann bei anderer Einheit eine völlig andere technische und kaufmännische Bedeutung haben.",
        "id": "w1-q4"
      },
      {
        "prompt": "Ein Pilot spart fünf Minuten beim Entwurf, braucht aber zehn zusätzliche Minuten Prüfung. Was folgt?",
        "options": [
          "Er muss sofort ausgeweitet werden.",
          "Der Gesamtnutzen ist nicht belegt; Prozess und Kandidat müssen überprüft werden.",
          "Prüfung darf nicht in die Zeitmessung eingehen.",
          "Jede KI-Nutzung ist grundsätzlich ungeeignet."
        ],
        "correct": 1,
        "explanation": "Prüfung und Nacharbeit sind Teil des Prozesses. Ein Kandidat kann angepasst oder zurückgestellt werden; die Entscheidung folgt aus dem Gesamtergebnis.",
        "id": "w1-q5"
      }
    ],
    "flashcards": [
      {
        "front": "KI, ML und GenAI in je einem Satz?",
        "back": "KI ist der Oberbegriff für intelligente Aufgabenbearbeitung. ML lernt Muster aus Beispielen. GenAI erzeugt neue Inhalte. Klassifikation, Extraktion und Generierung sind unterschiedliche Arbeitsaufgaben mit eigenen Prüfkriterien.",
        "id": "w1-f1",
        "week": 1
      },
      {
        "front": "Training vs. Inferenz?",
        "back": "Training passt Modellparameter an. Inferenz verwendet das trainierte Modell für eine Eingabe und den verfügbaren Kontext. Ein aktueller Prompt bedeutet normalerweise kein neues Training des Basismodells.",
        "id": "w1-f2",
        "week": 1
      },
      {
        "front": "Wann Datenbank, Regel oder Sprachmodell?",
        "back": "Datenbank für genaue Kennungen und Stammdaten; Regel für explizite Bedingungen und Berechnungen; Sprachmodell für variable Sprache, Strukturierung und Entwürfe. Kombiniere sie mit Quellen und passenden Kontrollen.",
        "id": "w1-f3",
        "week": 1
      }
    ],
    "challenge": {
      "title": "Erstelle eine Aufgabenlandkarte für deinen Vertriebs- und Projektalltag.",
      "scenario": "Portfolioauftrag aus der Lernbibliothek. Nutze anonymisierte oder fiktive Daten und passe das Beispiel an deinen Unternehmens-, Projekt- oder Büroalltag an. Zielartefakt: Aufgabenlandkarte mit zehn Tätigkeiten und drei begründeten Kandidaten.",
      "task": "1. Sammle zehn wiederkehrende Tätigkeiten und ihren heutigen Zeitbedarf als erste Schätzung.\n2. Ordne jede Tätigkeit der Suche, Extraktion, Formulierung, Berechnung oder Entscheidung zu.\n3. Prüfe, ob eine feste Regel oder strukturierte Abfrage bereits genügt.\n4. Beschreibe für drei KI-Kandidaten den benötigten Input, Output und die mögliche Fehlerfolge.",
      "rubric": [
        "Du kannst KI, ML und GenAI mit eigenen Beispielen erklären.",
        "Du benennst für jeden Kandidaten die erforderlichen Quellen.",
        "Mindestens ein Kandidat wird wegen fehlendem Nutzen oder zu hohem Prüfaufwand zurückgestellt.",
        "Die beschriebenen Praxisschritte und das Portfolioartefakt sind nachvollziehbar dokumentiert."
      ],
      "sample": "Didaktische Musterlösung, keine Aussage über einen realen Betrieb: Die Aufgabenlandkarte enthält Eingang sortieren, Projektunterlagen suchen, Artikel nachschlagen, Mengen übernehmen, Summen prüfen, Änderungen vergleichen, Rückfragen formulieren, Besprechungen zusammenfassen, Termine erfassen und Angebote freigeben. Pro Tätigkeit werden heutige Zeit und Prüfaufwand zunächst geschätzt und später gemessen. Kandidat 1 extrahiert Mengen aus freigegebenen LV-Unterlagen mit Seite und Einheit; eine Fachperson prüft kritische Positionen. Kandidat 2 formuliert Rückfragen auf Basis bestätigter offener Punkte. Kandidat 3 fasst Besprechungen mit Originalbeleg zusammen. Artikelkennungen werden exakt abgefragt, Summen regelbasiert geprüft. Automatische Angebotsfreigabe wird wegen hoher Fehlerfolgen und unklarer Kontrolle zurückgestellt. Jeder Kandidat nennt Quelle, Output und Fehlerfolge."
    },
    "resources": [
      {
        "title": "Elements of AI",
        "url": "https://course.elementsofai.com/de/"
      },
      {
        "title": "AI For Everyone",
        "url": "https://www.coursera.org/learn/ai-for-everyone"
      },
      {
        "title": "Generative AI for Everyone",
        "url": "https://www.coursera.org/learn/generative-ai-for-everyone"
      },
      {
        "title": "Transformer-basierte Large Language Models verstehen",
        "url": "https://ki-campus.org/lernangebote/kurse/transformer-verstehen"
      },
      {
        "title": "Hugging Face LLM Course",
        "url": "https://huggingface.co/learn/llm-course/en/chapter1/1"
      },
      {
        "title": "Machine Learning Crash Course",
        "url": "https://developers.google.com/machine-learning/crash-course"
      },
      {
        "title": "Künstliche Intelligenz und maschinelles Lernen für Einsteiger",
        "url": "https://open.hpi.de/learn/kieinstieg2020"
      }
    ]
  },
  {
    "id": 2,
    "phase": 2,
    "title": "Prompts und Projektkontext gestalten",
    "subtitle": "Du formulierst reproduzierbare Arbeitsanweisungen und überprüfbare Ausgaben.",
    "outcomes": [
      "Eine fehlende Menge wird nicht ergänzt oder geraten.",
      "Felder bleiben zwischen den Testfällen konsistent.",
      "Eine widersprüchliche Quelle führt zu einem sichtbaren Prüfpunkt."
    ],
    "lessons": [
      {
        "title": "Aufgabenbeschreibung",
        "minutes": 8,
        "summary": "Einen Arbeitsauftrag mit klaren Inputs, Grenzen und überprüfbarem Ergebnis schreiben.",
        "concept": [
          "Ein belastbarer Prompt beschreibt Zweck, Aufgabe, relevante Eingaben, Ergebnisformat und den Umgang mit fehlenden oder widersprüchlichen Angaben. Eine Rolle wie „Projektassistent“ kann den Stil orientieren, ersetzt aber keine fachlichen Daten. Formuliere so konkret, dass eine andere Person das Ergebnis gegen die Originale prüfen kann. Für LV-Positionen bedeutet das: Welche Felder werden übernommen und welche Aussagen sollen ausdrücklich nicht ergänzt werden?",
          "Trenne Auftrag und Dokumentinhalt sichtbar. Dokumenttext ist zunächst zu analysierendes Material, keine neue Anweisung an die Anwendung. Erlaube unbekannte Angaben ausdrücklich. Bitte um einen sichtbaren Prüfstatus bei Widersprüchen statt um eine überzeugende Schätzung. Solche Promptregeln helfen, müssen aber mit Tests und Systemkontrollen ergänzt werden. Ein Sicherheitssatz allein verhindert keine falsche Interpretation oder unerlaubte Datenweitergabe."
        ],
        "keyPoints": [
          "Zweck, Aufgabe, Input und erwarteten Output konkret nennen.",
          "Fehlende Informationen und Widersprüche sichtbar behandeln.",
          "Dokumentinhalt als Daten abgrenzen und Ergebnis prüfen."
        ],
        "example": {
          "title": "Mengen aus einem LV übernehmen",
          "text": "Auftrag: „Übernimm Position, Menge, Einheit und Beschreibung ausschließlich aus dem bereitgestellten LV. Nenne Dokument und Seitenstelle. Ergänze keine fehlenden Mengen; markiere sie als unbekannt. Bei widersprüchlichen Angaben gib beide Werte samt Quellen aus.“"
        },
        "privateUse": "Für eine persönliche Lernsession nenne Zeitbudget, Vorkenntnisse und gewünschte Methode. Beispiel: „Erkläre mir das Konzept in drei Minuten und stelle danach eine Frage, bevor du die Lösung zeigst.“",
        "exercise": "Schreibe aus „Prüfe das Angebot“ einen präzisen Arbeitsauftrag: Ziel, Inputs, fünf Felder, Regel für fehlende Angaben und eine Einschränkung. Nutze eine fiktive Position, damit du offline arbeiten kannst.",
        "reflection": "Erkläre einem Kollegen, warum eine klare Aufgabenbeschreibung mehr hilft als der Satz „Du bist der weltbeste Experte“.",
        "visual": "workflow",
        "id": "w2-l1"
      },
      {
        "title": "Kontextauswahl",
        "minutes": 9,
        "summary": "Projekt, Dokumentversion und Quellenstatus bewusst bereitstellen.",
        "concept": [
          "Context Engineering bezeichnet die Gestaltung der Informationen, die eine Anwendung dem Modell tatsächlich zur Verfügung stellt. Dazu gehören Arbeitsauftrag, relevante Dokumentstellen, Projektkennung, Versionsstand, Freigabe und Berechtigung. Ein langes Dokument ist nicht automatisch guter Kontext. Irrelevante Passagen verbrauchen Platz; alte und neue Aussagen können sich widersprechen. Auswahl und Kennzeichnung sind deshalb Teil der fachlichen Architektur.",
          "Lege eine Quellenhierarchie nicht nach Bauchgefühl fest. Für deinen Prozess muss geklärt sein, welcher Stand verbindlich ist, wer ihn freigibt und wie Änderungen erkennbar werden. Eine neuere Datei kann noch ungeprüft sein. Bei widersprüchlichen Fassungen nennt die Ausgabe beide Fundstellen und fordert Klärung. Alte Entscheidungen dürfen nicht stillschweigend auf ein anderes Projekt übertragen werden. Der jeweilige Nutzer erhält nur Kontext, zu dem er berechtigt ist."
        ],
        "keyPoints": [
          "Kontext enthält Auswahl, Version, Projektbezug und Berechtigung.",
          "Neu ist nicht automatisch freigegeben oder verbindlich.",
          "Widersprüche sichtbar machen statt still eine Quelle auswählen."
        ],
        "example": {
          "title": "Zwei Planstände",
          "text": "Plan V2 ist freigegeben; V3 wurde gestern hochgeladen, aber noch nicht geprüft. Für eine verbindliche Mengenermittlung gilt zunächst die dokumentierte Freigaberegel. Das Modell darf V3 als Änderungsentwurf erläutern, muss Status und Differenzen aber deutlich trennen."
        },
        "privateUse": "Bei privaten Vertragsfragen gib den aktuellen Vertragsstand und relevante Bedingungen an. Allgemeine Webseiten oder ein altes Angebot sind nicht automatisch für deinen Vertrag maßgeblich.",
        "exercise": "Ordne vier fiktive Dokumente: Projekt A, freigegeben V2; Projekt A, Entwurf V3; Projekt B, V2; Projekt A, alte Notiz. Wähle Kontext für eine Frage zum gültigen Stand von A und begründe jedes Ein- und Ausschließen.",
        "reflection": "Erkläre, warum mehr Text einen KI-Assistenten sowohl verbessern als auch schlechter machen kann.",
        "visual": "rag",
        "id": "w2-l2"
      },
      {
        "title": "Strukturierte Ergebnisse",
        "minutes": 9,
        "summary": "Felder, Datentypen und Quellenbezug machen Ergebnisse überprüfbar.",
        "concept": [
          "Eine strukturierte Ausgabe nutzt feste Felder, zum Beispiel Position, Menge, Einheit, Artikel, Dokument und Seitenstelle. Definiere ihre Bedeutung und Datentypen. Eine Artikelkennung ist meist Text; eine Menge ist eine Zahl oder ausdrücklich unbekannt. Ergänze einen Status wie bestätigt, fehlend oder widersprüchlich. So bleibt sichtbar, ob ein Feld aus einer Quelle stammt oder erst geklärt werden muss.",
          "Gültiges JSON oder eine sauber formatierte Tabelle beweist nur die Einhaltung bestimmter Formregeln. Eine Menge kann im korrekten Feld stehen und trotzdem falsch sein. Prüfe deshalb Form, Feldbedeutung, Quelle und fachlichen Wert separat. Vergleiche Promptvarianten mit identischen Inputs, Kriterien und dokumentierten Einstellungen. Wähle nicht nur die schönste Antwort; erfasse auch Lücken, falsche Einheiten und widersprüchliche Quellen."
        ],
        "keyPoints": [
          "Feldnamen, Typen und unbekannte Werte vorab festlegen.",
          "Formal gültig und fachlich richtig sind getrennte Prüfungen.",
          "Promptvarianten an konstanten Testfällen vergleichen."
        ],
        "example": {
          "title": "Eine Position ohne Menge",
          "text": "Für Position 4.2 fehlt die Menge. Die Ausgabe enthält Menge: null, Status: fehlend, Dokument: LV V2, Seite: 7. Null als JSON-Leerwert bedeutet hier unbekannt; die Zahl 0 wäre eine konkrete Menge und darf nicht als Ersatz eingetragen werden."
        },
        "privateUse": "Eine Einkaufsliste kann feste Felder für Artikel, Menge, Einheit und offene Rückfrage nutzen. Lass fehlende Packungsgrößen als offen stehen, statt ausgerechnet wirkende Fantasiewerte zu übernehmen.",
        "exercise": "Erstelle drei fiktive Positionen: vollständig, ohne Menge, mit zwei widersprüchlichen Einheiten. Fülle ein Schema aus. Prüfe zuerst die Form, dann den Inhalt. Notiere, welche erwartete Ausgabe jede Position haben soll.",
        "reflection": "Erkläre am Mengenfeld, warum korrektes JSON trotzdem eine falsche Extraktion enthalten kann.",
        "visual": "compare",
        "id": "w2-l3"
      }
    ],
    "questions": [
      {
        "prompt": "Ist gültiges JSON automatisch eine richtige Extraktion?",
        "options": [
          "Ja, JSON prüft die Originalquelle.",
          "Ja, wenn alle Felder vorhanden sind.",
          "Nein, Form kann stimmen, obwohl Menge, Einheit oder Quelle falsch sind.",
          "Nur bei mehr als zehn Feldern."
        ],
        "correct": 2,
        "explanation": "Syntax und Schema können formal passen, während Werte sachlich falsch sind. Form und fachlicher Quellenabgleich sind unterschiedliche Prüfungen.",
        "id": "w2-q1"
      },
      {
        "prompt": "Wie vergleichst du zwei Prompts?",
        "options": [
          "Mit den gleichen Inputs, fachlichen Kriterien und dokumentierten Einstellungen.",
          "Mit unterschiedlichen Dokumenten und ohne Kriterien.",
          "Nur anhand des längeren Textes.",
          "Indem du nur das beste Einzelergebnis auswählst."
        ],
        "correct": 0,
        "explanation": "Konstante Bedingungen und mehrere repräsentative Fälle zeigen, ob eine Variante tatsächlich besser funktioniert und keine neuen Fehler einführt.",
        "id": "w2-q2"
      },
      {
        "prompt": "Was gehört zur Kontextverwaltung?",
        "options": [
          "Nur eine möglichst große Schriftart.",
          "Ausschließlich die Auswahl einer Modellmarke.",
          "Das ungeprüfte Zusammenführen aller Dokumente.",
          "Dokumentauswahl, Version, Projektbezug, Berechtigung und Umgang mit alten Entscheidungen."
        ],
        "correct": 3,
        "explanation": "Context Engineering gestaltet die tatsächlich verfügbaren Informationen. Gültigkeit und Zugriffsrechte müssen dabei berücksichtigt werden.",
        "id": "w2-q3"
      },
      {
        "prompt": "Eine neue Planversion ist ein ungeprüfter Entwurf. Wie sollte eine verbindliche Antwort damit umgehen?",
        "options": [
          "Die neue Datei ohne Status als gültige Vorgabe behandeln.",
          "Freigaberegel prüfen und Entwurf sowie geltenden Stand sichtbar trennen.",
          "Die ältere freigegebene Version löschen.",
          "Die Version im Ergebnis verschweigen."
        ],
        "correct": 1,
        "explanation": "Das Datum allein begründet keine Verbindlichkeit. Versions- und Freigabestatus bestimmen, welche Quelle für den jeweiligen Zweck verwendet werden darf.",
        "id": "w2-q4"
      },
      {
        "prompt": "Ein LV enthält keine Mengenangabe. Was ist eine passende strukturierte Ausgabe?",
        "options": [
          "Eine typische Menge ohne Kennzeichnung.",
          "Die Menge aus einem anderen Projekt.",
          "Ein ausdrücklich unbekannter Wert mit Status und Quellenstelle.",
          "Die Zahl 0, damit jede Zeile vollständig aussieht."
        ],
        "correct": 2,
        "explanation": "Fehlend ist nicht null als Menge. Ein sichtbarer Leerstatus und die Fundstelle verhindern, dass eine Schätzung als belegter Wert weiterverarbeitet wird.",
        "id": "w2-q5"
      }
    ],
    "flashcards": [
      {
        "front": "Was gehört in einen belastbaren Prompt?",
        "back": "Zweck, konkrete Aufgabe, relevante Eingaben, Grenzen, Ausgabeformat und Umgang mit fehlenden oder widersprüchlichen Angaben. Ein gutes Beispiel zeigt auch einen Grenzfall.",
        "id": "w2-f1",
        "week": 2
      },
      {
        "front": "Was umfasst Context Engineering?",
        "back": "Die Auswahl und Bereitstellung von Anweisungen, Dokumentstellen, Versionen, Projektbezug, Status und Berechtigungen. Mehr Kontext hilft nur, wenn er relevant und korrekt eingeordnet ist.",
        "id": "w2-f2",
        "week": 2
      },
      {
        "front": "Warum strukturiertes Ergebnis und Fachprüfung trennen?",
        "back": "Eine korrekte Form beweist nicht, dass Menge, Einheit, Artikel oder Quelle stimmen. Prüfe Syntax/Schema und fachliche Werte gegen das Original separat.",
        "id": "w2-f3",
        "week": 2
      }
    ],
    "challenge": {
      "title": "Entwirf einen Prompt für die Extraktion und Prüfung von LV-Positionen.",
      "scenario": "Portfolioauftrag aus der Lernbibliothek. Nutze anonymisierte oder fiktive Daten und passe das Beispiel an deinen Unternehmens-, Projekt- oder Büroalltag an. Zielartefakt: Promptvorlage und Ausgabeformat mit dokumentiertem Variantenvergleich.",
      "task": "1. Formuliere die Aufgabe ohne eine bestimmte Modellmarke vorauszusetzen.\n2. Lege Felder für Position, Menge, Einheit, Artikel, Dokument und Seitenstelle fest.\n3. Erlaube unbekannte Angaben ausdrücklich und definiere, wie Widersprüche auszugeben sind.\n4. Vergleiche drei Versionen an zehn gleichbleibenden Testpositionen.",
      "rubric": [
        "Eine fehlende Menge wird nicht ergänzt oder geraten.",
        "Felder bleiben zwischen den Testfällen konsistent.",
        "Eine widersprüchliche Quelle führt zu einem sichtbaren Prüfpunkt.",
        "Die beschriebenen Praxisschritte und das Portfolioartefakt sind nachvollziehbar dokumentiert."
      ],
      "sample": "Didaktische Musterlösung: Der Prompt beschreibt unabhängig von einer Modellmarke die Extraktion von LV-Positionen. Das Schema enthält Position als Text, Menge als Zahl oder null, Einheit als Text oder null, Artikelkennung als Text oder null, Dokument, Version, Seitenstelle und Prüfstatus. Null bedeutet fehlende Information; eine echte Menge 0 bleibt unterscheidbar. Widersprüchliche Stellen werden mit beiden Werten und Quellen ausgegeben. Drei Promptversionen werden an denselben zehn fiktiven Positionen verglichen, darunter fehlende Mengen und abweichende Einheiten. Der Auswertungsbogen zählt Feldfehler, erfundene Werte und nicht gemeldete Widersprüche. Die gewählte Vorlage hält Felder stabil und meldet die Grenzfälle, bevor eine Fachperson die Übernahme freigibt."
    },
    "resources": [
      {
        "title": "ChatGPT Prompt Engineering for Developers",
        "url": "https://www.deeplearning.ai/courses/chatgpt-prompt-eng"
      },
      {
        "title": "Getting Structured LLM Output",
        "url": "https://www.deeplearning.ai/courses/getting-structured-llm-output"
      },
      {
        "title": "Prompting best practices",
        "url": "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices"
      },
      {
        "title": "Effective context engineering for AI agents",
        "url": "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents"
      },
      {
        "title": "Structured model outputs",
        "url": "https://developers.openai.com/api/docs/guides/structured-outputs"
      }
    ]
  },
  {
    "id": 3,
    "phase": 3,
    "title": "Daten und Schnittstellen beherrschen",
    "subtitle": "Du liest strukturierte Daten, verstehst APIs und führst einfache Prüfregeln aus.",
    "outcomes": [
      "Kennungen bleiben unverändert erhalten.",
      "Leerwert und echte Null werden unterschieden.",
      "Doppelte Schlüssel und unbekannte Artikel führen zu klaren Meldungen."
    ],
    "lessons": [
      {
        "title": "Strukturierte Formate",
        "minutes": 8,
        "summary": "JSON, CSV und Datentypen so lesen, dass wichtige Kennungen erhalten bleiben.",
        "concept": [
          "JSON organisiert benannte Felder, Listen und verschachtelte Objekte. CSV speichert tabellarische Daten in Zeilen und Spalten; Trennzeichen, Anführungszeichen und Zahlenformate müssen beim Import geklärt sein. Ein Datenmodell legt fest, was jedes Feld bedeutet und welchen Typ es besitzt. Für Angebotspositionen brauchst du zum Beispiel Artikelkennung, Menge, Einheit und Quelle. Ein Schema kann Pflichtfelder und zulässige Typen prüfen, aber keine sachliche Wahrheit garantieren.",
          "Artikelnummern sind Kennungen, keine Rechenwerte. „0012-A“ darf nicht in eine Zahl umgewandelt und zu „12“ verkürzt werden. Fehlende Werte sind ebenfalls wichtig: In JSON bedeutet null einen fehlenden beziehungsweise ausdrücklich leeren Wert; die Zahl 0 ist ein konkreter Zahlenwert. Welche Bedeutung ein Leerfeld in CSV hat, musst du im Datenvertrag festlegen. Auch 1,5 und 1.5 brauchen eine klare Regel, damit regionale Schreibweisen nicht falsch importiert werden."
        ],
        "keyPoints": [
          "Feldbedeutung und Datentyp gehören zum Datenvertrag.",
          "Kennungen häufig als Text behandeln und unverändert erhalten.",
          "Fehlend, leer und echte Null unterscheiden."
        ],
        "example": {
          "title": "Ein Artikel mit führenden Nullen",
          "text": "JSON-Beispiel: {\"artikel\": \"0012-A\", \"menge\": null, \"einheit\": \"m\"}. Der Artikel bleibt Text, die Menge ist unbekannt. {\"menge\": 0} würde dagegen eine ausdrücklich angegebene Menge von 0 ausdrücken. Beide Fälle müssen unterschiedliche Prüfergebnisse erhalten."
        },
        "privateUse": "Beim Export deiner Kontakte sollten Telefonnummern Text bleiben. Eine Tabellenkalkulation kann führende Nullen oder Pluszeichen sonst unbeabsichtigt verändern. Prüfe einen Export mit wenigen Testzeilen.",
        "exercise": "Schreibe drei JSON-Objekte für fiktive Positionen: vollständig, fehlende Menge, Artikel mit führender Null. Markiere Feldtypen und definiere zwei Schema-Regeln. Notiere, welche Inhalte trotz gültigem Schema fachlich geprüft werden müssen.",
        "reflection": "Erkläre einer Sachbearbeitung, warum die Artikelkennung 0012-A als Text und eine Menge als Zahl gespeichert werden sollte.",
        "visual": "compare",
        "id": "w3-l1"
      },
      {
        "title": "Abfragen und Zuordnung",
        "minutes": 9,
        "summary": "Schlüssel, Leerwerte und Duplikate prüfen, bevor Daten zusammengeführt werden.",
        "concept": [
          "SQL fragt relationale Tabellen ab, zum Beispiel alle Positionen eines Projekts oder den Stammdateneintrag einer Artikelkennung. Ein JOIN verknüpft Tabellen über passende Schlüssel. Ein Schlüssel muss in der vorgesehenen Beziehung eindeutig und stabil sein. „Ventil groß“ ist oft keine sichere Zuordnung: Bezeichnungen können abweichen, ähnlich sein oder mehrfach vorkommen. Exakte Artikelkennungen und bei Bedarf Projekt- oder Versionsschlüssel sind besser geeignet.",
          "Prüfe vor einer Verknüpfung fehlende Schlüssel, Duplikate und unbekannte Kennungen. Ein mehrfach vorhandener Stammdaten-Schlüssel kann eine Position plötzlich in mehrere Ergebniszeilen verwandeln und Summen verfälschen. Eine unbekannte Artikelnummer darf nicht still dem ähnlichsten Text zugeordnet werden. Bewahre die ursprüngliche Position und gib eine verständliche Meldung aus. Python oder ein No-Code-Prüfschritt kann solche festen Regeln ausführen; das Modell muss diese Entscheidung nicht schätzen."
        ],
        "keyPoints": [
          "Joins benötigen eindeutig definierte Schlüssel und Beziehungen.",
          "Duplikate können Zeilen und Summen vervielfachen.",
          "Unbekannte Artikel sichtbar melden statt ähnlich zuordnen."
        ],
        "example": {
          "title": "Die doppelte Kennung im Stammdatensatz",
          "text": "Eine Angebotsposition hat Artikel 0012-A und Menge 5. Der Stammdatensatz enthält 0012-A zweimal mit unterschiedlichen Einheiten. Ein ungeprüfter Join erzeugt zwei Treffer. Der Prüfer meldet „Stammdatenschlüssel nicht eindeutig“ und hält die Preisberechnung zurück."
        },
        "privateUse": "Wenn du Ausgaben aus zwei Dateien zusammenführst, prüfe eindeutige Buchungskennungen. Zwei gleiche Händlernamen bedeuten nicht, dass es dieselbe Buchung ist; eine ungeprüfte Zuordnung kann doppelt zählen.",
        "exercise": "Zeichne zwei Tabellen: drei Angebotspositionen und drei Stammdatensätze. Baue einen doppelten Schlüssel und eine unbekannte Kennung ein. Führe den Join von Hand aus und markiere die zusätzlichen beziehungsweise fehlenden Treffer. Formuliere passende Fehlermeldungen.",
        "reflection": "Erkläre mit deiner Tabelle, warum ein Join über ähnliche Artikelbezeichnungen falsche Treffer und doppelte Summen erzeugen kann.",
        "visual": "matrix",
        "id": "w3-l2"
      },
      {
        "title": "HTTP und Fehlerbehandlung",
        "minutes": 10,
        "summary": "Anfragen, Antworten und sichtbare Fehler als Integrationsvertrag verstehen.",
        "concept": [
          "Eine API ist eine definierte Schnittstelle zwischen Systemen. Bei einer HTTP-Anfrage sendet eine Anwendung zum Beispiel Methode, Zieladresse, Authentifizierung und Daten; die Antwort enthält Status und gegebenenfalls Daten. Eine GET-Anfrage wird typischerweise für lesende Abfragen verwendet. POST kann Daten übertragen oder Aktionen auslösen. Welche Operation konkret erfolgt, steht im Schnittstellenvertrag. JSON ist ein häufiges Datenformat, aber nicht gleichbedeutend mit API.",
          "Statuscodes helfen beim Einordnen: 2xx steht grundsätzlich für erfolgreiche Bearbeitung, 400 oft für eine ungültige Anfrage, 401 für fehlende oder ungültige Authentifizierung, 403 für verweigerten Zugriff, 404 für eine nicht gefundene Ressource, 429 für eine Nutzungsgrenze und 5xx für Serverprobleme. Ein erfolgreicher Transport beweist nicht die fachliche Richtigkeit des Inhalts. Prüfe auch Antwortschema, Kennung und Werte.",
          "Fehler müssen sichtbar und nachvollziehbar bleiben. Ein Timeout ist kein Beweis, dass eine Schreibaktion nicht ausgeführt wurde; blindes Wiederholen kann Duplikate erzeugen. Nutze für passende Operationen eindeutige Vorgangskennungen und die unterstützten Wiederholungsregeln. Zugangsdaten werden sicher verwaltet und nicht in Notizen oder Logs kopiert. Plane außerdem begrenzte Wiederholungen, Eskalation und einen manuellen Rückfallweg."
        ],
        "keyPoints": [
          "Request, Response und Datenformat sind getrennte Konzepte.",
          "Transporterfolg ersetzt keine fachliche Datenprüfung.",
          "Timeouts und Wiederholungen dürfen keine doppelten Aktionen verursachen."
        ],
        "example": {
          "title": "Die Angebotsposition über eine API",
          "text": "Eine freigegebene Position wird mit Vorgangskennung übertragen. Antwort 400 wegen fehlender Einheit: Fehler anzeigen und korrigieren. Antwort 429: gemäß Dienstvorgaben später begrenzt erneut versuchen. Timeout nach einer Schreiboperation: Status über die Kennung prüfen, bevor erneut gesendet wird."
        },
        "privateUse": "Wenn eine Buchungs-App nach dem Bezahlen hängt, buche nicht sofort ein zweites Mal. Prüfe Bestätigung und Vorgangsstatus. Dasselbe Grundproblem tritt bei automatisierten Schreibaktionen auf.",
        "exercise": "Zeichne Anwendung → API → Stammdaten → Antwort. Beschreibe für Erfolg, fehlende Berechtigung, unbekannte Kennung und Timeout jeweils Anzeige, nächsten Schritt und zuständige Person. Trage keine echten Zugangsdaten ein.",
        "reflection": "Erkläre einem Projektleiter, warum „HTTP 200 erhalten“ noch nicht bedeutet, dass Menge, Einheit und Projektzuordnung richtig sind.",
        "visual": "workflow",
        "id": "w3-l3"
      }
    ],
    "questions": [
      {
        "prompt": "Warum sollte eine Artikelnummer häufig Text sein?",
        "options": [
          "Damit alle Artikel automatisch gleich heißen.",
          "Weil sie keine eindeutige Kennung sein kann.",
          "Weil Text immer weniger Speicher braucht.",
          "Weil sie eine Kennung ist und führende Nullen oder Sonderzeichen enthalten kann."
        ],
        "correct": 3,
        "explanation": "Eine Artikelnummer ist kein Rechenwert. Eine Umwandlung kann 0012-A zerstören oder führende Nullen entfernen und dadurch Zuordnungen verfälschen.",
        "id": "w3-q1"
      },
      {
        "prompt": "Was kann bei einem Join über eine Bezeichnung schiefgehen?",
        "options": [
          "Mehrdeutige oder abweichende Texte können falsche Zuordnungen und doppelte Ergebnisse erzeugen.",
          "Jeder Join prüft automatisch die fachliche Identität.",
          "Alle unbekannten Artikel werden garantiert korrekt ergänzt.",
          "Ein Join verändert grundsätzlich nie die Zeilenanzahl."
        ],
        "correct": 0,
        "explanation": "Bezeichnungen sind oft nicht eindeutig. Auch doppelte Schlüssel können Treffer vervielfachen; deshalb sind Schlüssel- und Kardinalitätsprüfungen erforderlich.",
        "id": "w3-q2"
      },
      {
        "prompt": "Ist eine fehlende Menge gleich der Zahl 0?",
        "options": [
          "Ja, jede unbekannte Menge beträgt 0.",
          "Ja, wenn die Einheit vorhanden ist.",
          "Nein, fehlend bedeutet unbekannte Information; die Zahl 0 ist eine konkrete Mengenangabe.",
          "Nur bei technischen Projekten."
        ],
        "correct": 2,
        "explanation": "Im fachlichen Sinn ist eine fehlende Menge nicht die Zahl null. JSON null kann einen Leerwert darstellen; die numerische 0 muss davon unterscheidbar bleiben.",
        "id": "w3-q3"
      },
      {
        "prompt": "Eine schreibende API-Anfrage endet mit Timeout. Was ist der sichere nächste Schritt?",
        "options": [
          "Die Anfrage beliebig oft sofort wiederholen.",
          "Mit Vorgangskennung und API-Regeln prüfen, ob die Aktion bereits erfolgte, bevor wiederholt wird.",
          "Die Vorgangskennung löschen.",
          "Den Timeout als garantierten Beweis für Nichtausführung behandeln."
        ],
        "correct": 1,
        "explanation": "Die Aktion kann trotz ausgebliebener Antwort erfolgt sein. Statusprüfung und unterstützte Idempotenz verhindern doppelte Vorgänge.",
        "id": "w3-q4"
      },
      {
        "prompt": "Die API antwortet erfolgreich, enthält aber eine falsche Projektekennung. Was folgt?",
        "options": [
          "Die Daten sind gültig, weil 2xx vorliegt.",
          "Nur der Antworttext muss verkürzt werden.",
          "Die Projektekennung kann ignoriert werden.",
          "Die fachliche Validierung muss den Fehler melden und die Weiterverarbeitung stoppen."
        ],
        "correct": 3,
        "explanation": "Ein Erfolgsstatus bestätigt zunächst die Bearbeitung im Protokoll. Schema, Kennung, Berechtigung und fachliche Werte bleiben separate Prüfungen.",
        "id": "w3-q5"
      }
    ],
    "flashcards": [
      {
        "front": "Leerwert vs. numerische 0?",
        "back": "Ein Leerwert beschreibt fehlende Information; 0 ist eine konkrete Zahl. In JSON kann null den Leerwert darstellen. Die fachliche Bedeutung und die zulässige Darstellung werden im Datenvertrag festgelegt.",
        "id": "w3-f1",
        "week": 3
      },
      {
        "front": "Was prüfst du vor einem Join?",
        "back": "Passende eindeutige Schlüssel, fehlende Kennungen, Duplikate und die erwartete Beziehung zwischen Tabellen. Mehrfachtreffer können Ergebnisse und Summen vervielfachen.",
        "id": "w3-f2",
        "week": 3
      },
      {
        "front": "Warum ist ein Timeout nach Schreiben kritisch?",
        "back": "Die Aktion kann bereits ausgeführt worden sein, obwohl keine Antwort ankam. Prüfe den Status über eine eindeutige Vorgangskennung und nutze unterstützte Wiederholungsregeln statt blind erneut zu schreiben.",
        "id": "w3-f3",
        "week": 3
      }
    ],
    "challenge": {
      "title": "Erstelle einen kleinen Prüfer für anonymisierte Artikel- und Angebotsdaten.",
      "scenario": "Portfolioauftrag aus der Lernbibliothek. Nutze anonymisierte oder fiktive Daten und passe das Beispiel an deinen Unternehmens-, Projekt- oder Büroalltag an. Zielartefakt: Datenmodell, Beispiel-JSON und nachvollziehbare Regelprüfung.",
      "task": "1. Lege zehn fiktive Positionen mit Menge, Einheit und Artikelkennung an.\n2. Baue je einen Fall mit Leerwert, doppelter Kennung und unbekannter Artikelnummer ein.\n3. Prüfe diese Fälle mit festen Regeln und speichere das Ergebnis als JSON.\n4. Beschreibe, wie die Daten über eine API übertragen würden und welche Fehler sichtbar bleiben müssen.",
      "rubric": [
        "Kennungen bleiben unverändert erhalten.",
        "Leerwert und echte Null werden unterschieden.",
        "Doppelte Schlüssel und unbekannte Artikel führen zu klaren Meldungen.",
        "Die beschriebenen Praxisschritte und das Portfolioartefakt sind nachvollziehbar dokumentiert."
      ],
      "sample": "Didaktische Musterlösung: Zehn fiktive Positionen besitzen Positionskennung, Artikelkennung als Text, Menge als Zahl oder null, Einheit und Quelle. Darunter stehen ein fehlender Mengenwert, ein doppelter Artikel im Stammdatensatz und eine unbekannte Artikelkennung. Regeln melden MENGE_FEHLT, SCHLUESSEL_DOPPELT und ARTIKEL_UNBEKANNT. Eine echte Menge 0 bleibt als eigener Wert erhalten. Das Prüfergebnis wird als JSON mit Positionskennung, Status und Meldungen gespeichert; Kennungen werden unverändert ausgegeben. Eine API würde Eingabe und Ergebnis nach einem definierten Schema übertragen. Fehlende Berechtigung und fachlich ungültige Daten erhalten sichtbare Fehlerwege. Für Schreibaktionen werden Vorgangskennung, Statusprüfung und begrenzte Wiederholungen festgelegt. Ein erfolgreicher HTTP-Status umgeht keine Regelprüfung."
    },
    "resources": [
      {
        "title": "CS50 Introduction to Programming with Python",
        "url": "https://cs50.harvard.edu/python/"
      },
      {
        "title": "Python",
        "url": "https://www.kaggle.com/learn/python"
      },
      {
        "title": "Intro to SQL",
        "url": "https://www.kaggle.com/learn/intro-to-sql"
      },
      {
        "title": "PostgreSQL Tutorial",
        "url": "https://www.postgresql.org/docs/current/tutorial.html"
      },
      {
        "title": "Overview of HTTP",
        "url": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Overview"
      },
      {
        "title": "Creating your first schema",
        "url": "https://json-schema.org/learn/getting-started-step-by-step"
      }
    ]
  },
  {
    "id": 4,
    "phase": 4,
    "title": "Eine verlässliche Dokumentenwissensbasis bauen",
    "subtitle": "Du planst RAG mit Dokumentqualität, Quellenstellen und Projektberechtigung.",
    "outcomes": [
      "Jede belegte Antwort nennt Dokument, Version und Stelle.",
      "Eine ältere Quelle wird nicht stillschweigend als aktuelle Vorgabe ausgegeben.",
      "Projektfremde oder gesperrte Dokumente stehen dem jeweiligen Nutzer nicht als Kontext zur Verfügung."
    ],
    "lessons": [
      {
        "title": "Dokumentaufbereitung",
        "minutes": 8,
        "summary": "Text, Tabellen und Seitenbezug vor der Suche gegen das Original prüfen.",
        "concept": [
          "Eine Dokumentenwissensbasis beginnt vor dem Sprachmodell. PDFs können echten Text, gescannte Seiten, Tabellen, Fußnoten und Zeichnungen enthalten. OCR erkennt Text in Bildern, kann aber Zeichen, Spalten oder Einheiten verwechseln. Wenn „10 m“ zu „100 m“ wird oder ein Tabellenwert der falschen Zeile zugeordnet wird, liegt der Fehler schon in der Aufbereitung. Ein späteres Modell kann die fehlende Originalinformation nicht zuverlässig rekonstruieren.",
          "Bewahre Dokumentkennung, Version und Seitenbezug über die Verarbeitung hinweg. Prüfe eine Auswahl schwieriger Stellen gegen das Original, insbesondere Artikelnummern, Maße, Mengen, Einheiten und Fußnoten. Lege fest, wie schlecht lesbare Stellen und fehlende Seiten markiert werden. Eine extrahierte Textdatei ist ein Arbeitsartefakt; die gültige Originalfassung bleibt die Grundlage für Belege. Dokumentqualität und Prüfstatus gehören ins Register."
        ],
        "keyPoints": [
          "Aufbereitungsfehler entstehen vor Suche und Antwort.",
          "Tabellen, Einheiten und Kennungen gezielt gegenprüfen.",
          "Dokument, Version und Seitenstelle erhalten."
        ],
        "example": {
          "title": "Die Fußnote im Angebot",
          "text": "Eine Tabelle nennt 12 Stück, darunter beschränkt eine Fußnote die Lieferung auf einen bestimmten Ausstattungsstand. Wenn beim Extrahieren die Fußnote verloren geht, ist der spätere Vergleich unvollständig. Der Aufbereitungstest prüft deshalb Tabelle und zugehörige Fußnote gemeinsam."
        },
        "privateUse": "Bei eingescannten privaten Verträgen prüfst du Zahlen, Namen und Fristen im Original. Besonders kleine Schrift und handschriftliche Ergänzungen können bei OCR verloren gehen.",
        "exercise": "Zeichne eine kleine Tabelle mit drei Positionen und einer Fußnote. Übertrage sie in Fließtext. Markiere, welcher Zusammenhang verloren gehen könnte und wie Dokumentkennung, Seite und Fußnote erhalten bleiben sollen.",
        "reflection": "Erkläre mit einem OCR-Fehler, warum ein gutes Sprachmodell schlechte Dokumentaufbereitung nicht zuverlässig ausgleichen kann.",
        "visual": "workflow",
        "id": "w4-l1"
      },
      {
        "title": "Suche und Chunking",
        "minutes": 10,
        "summary": "Relevante Informationen finden, bevor eine Antwort formuliert wird.",
        "concept": [
          "RAG steht für Retrieval-Augmented Generation: Dokumente werden ausgewählt und aufbereitet, in einem Index suchbar gemacht, passende Stellen zur Frage gesucht und als Kontext an ein Modell gegeben. Chunking zerlegt Inhalte in suchbare Abschnitte. Ein Abschnitt sollte genug Zusammenhang enthalten, etwa eine Tabellenzeile samt Überschrift und Einschränkung. Zu kleine Stücke verlieren Bedeutung; zu große bringen unnötigen Kontext. Es gibt keine universell beste Chunkgröße für alle Dokumente.",
          "Semantische Suche nutzt Embeddings, numerische Repräsentationen von Inhalt, um Bedeutungsähnlichkeit zu finden. Für exakte Artikelnummern ist sie allein oft ungeeignet: ähnliche Kennungen sind nicht derselbe Artikel. Kombiniere je nach Aufgabe genaue Suche, semantische Suche und Metadatenfilter. Filter zu Projekt, Dokumenttyp oder gültigem Stand schränken Treffer sinnvoll ein. Prüfe zuerst, ob die richtige Stelle gefunden wird, bevor du die Antwort bewertest."
        ],
        "keyPoints": [
          "RAG liefert gefundene Dokumentstellen in den Modellkontext.",
          "Chunks müssen fachliche Zusammenhänge erhalten.",
          "Exakte Kennungen und semantische Fragen brauchen passende Suchverfahren."
        ],
        "example": {
          "title": "Artikelnummer vs. Bedeutungsfrage",
          "text": "„Was ist für die Inbetriebnahme nötig?“ kann semantische Suche unterstützen. „Welche Daten gelten für Artikel 0012-A?“ verlangt eine genaue Kennungsprüfung. Ein Treffer für 0012-B darf trotz ähnlicher Schreibweise nicht als gültiger Beleg dienen."
        },
        "privateUse": "In deiner Wissenssammlung kann „Wie kündige ich?“ semantisch auf „Vertragsbeendigung“ führen. Eine konkrete Vertragsnummer sollte dagegen exakt gesucht und geprüft werden.",
        "exercise": "Teile einen fiktiven Dokumentabschnitt mit Überschrift, Tabelle und Ausnahme in Suchstücke. Begründe die Grenzen. Formuliere zwei Bedeutungsfragen und zwei exakte Kennungsfragen; ordne jeweils Suche und Filter zu.",
        "reflection": "Erkläre den RAG-Ablauf als Open-Book-Prüfung und ergänze, was geschieht, wenn die falsche Seite auf den Tisch kommt.",
        "visual": "rag",
        "id": "w4-l2"
      },
      {
        "title": "Projektkontext und Belege",
        "minutes": 9,
        "summary": "Gültige Quellen und Zugriffsrechte vor der Antwort sichern.",
        "concept": [
          "Ein Quellenbeleg muss auf die tatsächlich passende Stelle im gültigen Dokumentstand zeigen. Dazu braucht der Index Metadaten wie Projekt, Dokumenttyp, Datum, Version, Freigabe und Zugriffsgruppe. Ein neuer Upload ist nicht automatisch freigegeben. Bei konkurrierenden Fassungen gelten dokumentierte Zuständigkeiten und Quellenregeln. Falls diese Regeln keine eindeutige Antwort ermöglichen, muss der Assistent den Konflikt melden statt einen Stand stillschweigend auswählen.",
          "Berechtigungen werden in der Anwendung und Suche durchgesetzt. Projektfremde oder gesperrte Dokumente dürfen dem jeweiligen Nutzer nicht schon als Modellkontext bereitgestellt werden. Der Satz „Ignoriere geheime Daten“ im Prompt reicht dafür nicht. Prüfe auch abgeleitete Inhalte, Zwischenspeicher und Logs. Teste Retrieval und Antwort getrennt: Wurde eine erlaubte gültige Stelle gefunden, und wurde deren Aussage einschließlich Einschränkungen korrekt verwendet?"
        ],
        "keyPoints": [
          "Belege brauchen Dokument, Version und konkrete Stelle.",
          "Berechtigung wird vor Kontextbereitstellung durchgesetzt.",
          "Retrieval und Antwortverwendung separat prüfen."
        ],
        "example": {
          "title": "Zwei Projekte mit ähnlichen Namen",
          "text": "Projekt Nord und Projekt Nord-Erweiterung besitzen unterschiedliche Vorgaben. Ein Nutzer darf nur Nord lesen. Die Suche filtert anhand seiner Berechtigung und Projektkennung; Unterlagen der Erweiterung gelangen nicht in den Kontext. Die Antwort nennt freigegebenes Dokument und Seite aus Nord."
        },
        "privateUse": "Wenn du private Unterlagen mit einer anderen Person teilst, trenne Sammlungen und Zugriffe bewusst. Eine Zusammenfassung kann vertrauliche Details enthalten, selbst wenn das Original nicht direkt angezeigt wird.",
        "exercise": "Erstelle ein Register mit vier Dokumenten aus zwei Projekten, zwei Versionen und zwei Zugriffsgruppen. Entscheide für einen Nutzer, welche Dokumente in den Kontext gelangen dürfen. Ergänze eine Frage, die wegen fehlender gültiger Quelle unbeantwortbar bleiben muss.",
        "reflection": "Erkläre einer Projektleitung, warum ein Dokument, das ein Nutzer nicht sehen darf, auch nicht als unsichtbarer Kontext für dessen Antwort verwendet werden sollte.",
        "visual": "shield",
        "id": "w4-l3"
      }
    ],
    "questions": [
      {
        "prompt": "Verhindert RAG jede erfundene Antwort?",
        "options": [
          "Ja, sobald eine Datei hochgeladen wurde.",
          "Nein, Retrieval, Kontextbildung und Antworterzeugung können weiterhin Fehler erzeugen.",
          "Ja, wenn die Antwort einen Link enthält.",
          "RAG hat mit Dokumenten nichts zu tun."
        ],
        "correct": 1,
        "explanation": "RAG schafft eine Datenbasis, aber Suche, Quellenwahl, Kontext und Interpretation können fehlerhaft sein. Kontrolle bleibt notwendig.",
        "id": "w4-q1"
      },
      {
        "prompt": "Welche zwei Schritte prüfst du getrennt?",
        "options": [
          "Nur Schriftart und Antwortlänge.",
          "Nur Preis und Markenname des Modells.",
          "Ob die richtigen Informationen gefunden wurden und ob die Antwort sie korrekt und vollständig verwendet.",
          "Ob das Modell freundlich und schnell ist."
        ],
        "correct": 2,
        "explanation": "Ein Retrievalfehler unterscheidet sich von falscher Verwendung einer richtigen Quelle. Diese Trennung hilft bei Diagnose und Verbesserung.",
        "id": "w4-q2"
      },
      {
        "prompt": "Warum braucht der Index Metadaten?",
        "options": [
          "Damit Projekt, Version, Dokumenttyp und Berechtigung Suche und Verwendung steuern können.",
          "Damit alle Dokumente automatisch öffentlich werden.",
          "Damit Quellenstellen unnötig sind.",
          "Damit jede ältere Version immer Vorrang hat."
        ],
        "correct": 0,
        "explanation": "Metadaten erlauben gezielte Filter und die Prüfung des richtigen Projekt- und Quellenstands. Sie müssen gepflegt und technisch wirksam verwendet werden.",
        "id": "w4-q3"
      },
      {
        "prompt": "OCR hat die Fußnote einer technischen Tabelle ausgelassen. Wo setzt die Korrektur zuerst an?",
        "options": [
          "Nur bei der höflichen Schlussformulierung.",
          "Bei einem höheren Kreativitätswert.",
          "Beim ungeprüften Wechsel zu einem größeren Modell.",
          "Bei Aufbereitung und Originalabgleich einschließlich Tabellenzusammenhang."
        ],
        "correct": 3,
        "explanation": "Die notwendige Information fehlt bereits im verarbeiteten Dokument. Der Fehler muss an dieser Stelle behoben und die Suche anschließend erneut geprüft werden.",
        "id": "w4-q4"
      },
      {
        "prompt": "Ein Nutzer ist nicht für Projekt B berechtigt. Wie schützt ein RAG-System den Kontext?",
        "options": [
          "Es stellt alle B-Dokumente bereit und bittet das Modell, nichts zu verraten.",
          "Es erzwingt die Berechtigung in Zugriff und Retrieval, bevor Dokumentstellen zum Modell gelangen.",
          "Es versteckt nur den Dokumenttitel.",
          "Es entfernt ausschließlich die sichtbaren Quellenlinks."
        ],
        "correct": 1,
        "explanation": "Unzulässige Daten sollen den Kontext gar nicht erreichen. Promptanweisungen und ausgeblendete Links sind kein Ersatz für technische Berechtigungsprüfung.",
        "id": "w4-q5"
      }
    ],
    "flashcards": [
      {
        "front": "Was ist die RAG-Kette?",
        "back": "Dokumentauswahl → Aufbereitung → Indexierung → Suche → Kontextbildung → Antwort. Qualität wird entlang der Kette geprüft; eine gute Formulierung heilt keinen fehlenden oder falschen Suchtreffer.",
        "id": "w4-f1",
        "week": 4
      },
      {
        "front": "Was muss ein Chunk erhalten?",
        "back": "Genügend fachlichen Zusammenhang: Überschrift, relevante Werte, Einheiten, Einschränkungen und Quellenbezug. Die geeignete Größe hängt von Dokumenttyp und Testfragen ab.",
        "id": "w4-f2",
        "week": 4
      },
      {
        "front": "Was gehört zu einem verlässlichen Quellenbeleg?",
        "back": "Passendes Dokument, gültige Version und konkrete Stelle einschließlich Einschränkungen. Projekt- und Zugriffsrechte müssen vor der Kontextbereitstellung geprüft sein.",
        "id": "w4-f3",
        "week": 4
      }
    ],
    "challenge": {
      "title": "Entwirf eine kleine Wissensbasis aus zwölf fiktiven Projektdokumenten.",
      "scenario": "Portfolioauftrag aus der Lernbibliothek. Nutze anonymisierte oder fiktive Daten und passe das Beispiel an deinen Unternehmens-, Projekt- oder Büroalltag an. Zielartefakt: Dokumentenregister, Architekturübersicht und erster RAG-Testbericht.",
      "task": "1. Verteile die Unterlagen auf zwei Projekte und mehrere Dokumentversionen.\n2. Definiere Metadaten für Projekt, Dokumenttyp, Datum, Version, Freigabe und Zugriffsgruppe.\n3. Formuliere zwanzig Fragen mit bekannten Quellenstellen und bewusst unbeantwortbaren Fällen.\n4. Prüfe separat, ob die richtige Stelle gefunden und ob sie korrekt in der Antwort verwendet wird.",
      "rubric": [
        "Jede belegte Antwort nennt Dokument, Version und Stelle.",
        "Eine ältere Quelle wird nicht stillschweigend als aktuelle Vorgabe ausgegeben.",
        "Projektfremde oder gesperrte Dokumente stehen dem jeweiligen Nutzer nicht als Kontext zur Verfügung.",
        "Die beschriebenen Praxisschritte und das Portfolioartefakt sind nachvollziehbar dokumentiert."
      ],
      "sample": "Didaktische Musterlösung: Das Register umfasst zwölf fiktive Dokumente aus Projekt A und B, darunter freigegebene und ältere Fassungen sowie Entwürfe. Metadaten sind Projektkennung, Typ, Datum, Version, Freigabestatus, Zugriffsgruppe und Seitenbezug. Tabellen und Fußnoten werden beim Aufbereiten gegen das Original geprüft. Suche kombiniert exakte Artikelkennungen, semantische Fragen und Filter zu Projekt, Gültigkeit und Berechtigung. Zwanzig Testfragen haben erwartete Fundstellen; mehrere besitzen absichtlich keine zulässige Antwort. Im Testbericht stehen Retrievalerfolg und Antwortkorrektheit getrennt. Jede bestätigte Aussage nennt Dokument, Version und Seite. Eine alte oder widersprüchliche Quelle führt zu einem sichtbaren Prüfpunkt. Gesperrte beziehungsweise projektfremde Inhalte werden nicht als Kontext an das Modell gegeben."
    },
    "resources": [
      {
        "title": "Preprocessing Unstructured Data for LLM Applications",
        "url": "https://www.deeplearning.ai/courses/preprocessing-unstructured-data-for-llm-applications"
      },
      {
        "title": "Document AI From OCR to Agentic Doc Extraction",
        "url": "https://www.deeplearning.ai/courses/document-ai-from-ocr-to-agentic-doc-extraction"
      },
      {
        "title": "Building and Evaluating Advanced RAG",
        "url": "https://www.deeplearning.ai/courses/building-evaluating-advanced-rag"
      },
      {
        "title": "Advanced Retrieval for AI with Chroma",
        "url": "https://www.deeplearning.ai/courses/advanced-retrieval-for-ai"
      },
      {
        "title": "Retrieval Augmented Generation RAG",
        "url": "https://www.deeplearning.ai/courses/retrieval-augmented-generation"
      },
      {
        "title": "Retrieval augmented generation in Azure AI Search",
        "url": "https://learn.microsoft.com/en-us/azure/search/retrieval-augmented-generation-overview"
      },
      {
        "title": "Retrieval Augmented Generation for Knowledge Intensive NLP Tasks",
        "url": "https://arxiv.org/abs/2005.11401"
      }
    ]
  },
  {
    "id": 5,
    "phase": 5,
    "title": "Qualität messen und Fehler erklären",
    "subtitle": "Du baust ein Testset, differenzierte Metriken und einen nachvollziehbaren Reviewprozess.",
    "outcomes": [
      "Die erwarteten Antworten sind durch Quellen oder feste Regeln belegt.",
      "Kritische Mengen-, Einheiten- und Projektverwechslungen bleiben separat sichtbar.",
      "Ein Promptwechsel wird am gleichen Kontrollset verglichen."
    ],
    "lessons": [
      {
        "title": "Testdaten und Erwartungen",
        "minutes": 9,
        "summary": "Ein Golden Set aus geprüften Erwartungen und realistischen Grenzfällen bauen.",
        "concept": [
          "Evaluation beginnt mit der fachlichen Aufgabe. Bei einer Extraktion prüfst du Felder und Werte; bei einem Angebotsvergleich erkannte Abweichungen; bei einer Wissensfrage passende Quellen und vollständige Aussagen. Ein Golden Set enthält Testfälle mit fachlich geprüften erwarteten Ergebnissen, Originalquellen und klaren Bewertungskriterien. Ohne diese Erwartungen kannst du überzeugende Texte bewerten, aber nicht belastbar messen, ob die Anwendung ihre Aufgabe erfüllt.",
          "Wähle Normalfälle, Grenzfälle, widersprüchliche Unterlagen, fehlende Informationen und Berechtigungsfälle. Ein Test soll auch zeigen, ob das System angemessen nicht antwortet. Trenne Entwicklungsfälle von zurückgehaltenen Kontrollfällen. Wenn du einen Prompt immer wieder an denselben Fällen optimierst, kann die Verbesserung nur für diese Beispiele gelten. Kontrollfälle dienen der unabhängigen Prüfung und dürfen nicht laufend als direkte Optimierungsvorlage verwendet werden.",
          "Dokumentiere pro Fall Aufgabe, Input, erwartete Aussagen oder Werte, Quellenstelle und Fehlerfolgen. Bei mehreren zulässigen Formulierungen bewertest du die Aussage, nicht wortwörtliche Gleichheit. Erwartungen werden fachlich geprüft und bei geänderten gültigen Quellen versioniert. Ein Testfall mit veralteter Soll-Antwort wäre selbst ein Qualitätsproblem."
        ],
        "keyPoints": [
          "Golden Sets brauchen geprüfte Erwartungen und Quellen.",
          "Auch fehlende Informationen, Konflikte und Berechtigungen testen.",
          "Entwicklungsfälle und Kontrollfälle bewusst trennen."
        ],
        "example": {
          "title": "Drei Testfälle statt drei schöne Demos",
          "text": "Fall A enthält eine vollständig belegte Menge. Fall B enthält keine Menge und erwartet einen sichtbaren Leerstatus. Fall C enthält zwei widersprüchliche Fassungen und erwartet beide Quellen sowie einen Prüfpunkt. Ein Assistent, der überall eine Zahl ausgibt, besteht B und C nicht."
        },
        "privateUse": "Wenn du eine persönliche Lern-KI vergleichst, nutze bekannte Fakten, eine unbeantwortbare Frage und einen Transferfall. Prüfe erst deine Erwartung, dann die Ausgabe; schöne Sprache allein ist kein Testmaßstab.",
        "exercise": "Schreibe fünf Testkarten: zwei Normalfälle, einen fehlenden Wert, einen Widerspruch und einen unzulässigen Projektzugriff. Ergänze erwartetes Ergebnis, Quelle oder Regel und Schweregrad. Lege eine Karte als vorerst zurückgehaltene Kontrolle beiseite.",
        "reflection": "Erkläre einer Kollegin den Zweck eines Golden Sets und warum ein unbeantwortbarer Testfall darin wichtig ist.",
        "visual": "matrix",
        "id": "w5-l1"
      },
      {
        "title": "Metriken und Schweregrad",
        "minutes": 10,
        "summary": "Precision, Recall und kritische Fehler getrennt messen.",
        "concept": [
          "Beim Abweichungscheck beschreibt Precision, welcher Anteil der gemeldeten Abweichungen tatsächlich zutrifft. Recall beschreibt, welcher Anteil aller tatsächlich vorhandenen Abweichungen gefunden wurde. Beispiel: Im Dokument existieren sechs Abweichungen; das System meldet fünf, von denen drei stimmen. Precision ist 3/5 = 60 %, Recall ist 3/6 = 50 %. Eine hohe Precision kann trotzdem mit vielen übersehenen Punkten einhergehen. Für Fälle ohne passende Nenner brauchst du eine festgelegte Auswertungsregel.",
          "Erfasse außerdem Quellenkorrektheit, Vollständigkeit, Feldfehler und Schweregrade. Eine Antwort kann gut belegt sein und trotzdem eine entscheidende Ausnahme auslassen. Eine falsche Menge, Einheit oder Projektzuordnung kann erheblich schwerer wiegen als ein Stilproblem. Verstecke solche Fehler nicht in einer Gesamtnote. Lege fachlich begründete Mindestwerte und Regeln für kritische Fehler vor dem Test fest; es gibt dafür keine universelle Zahl, die für jedes Projekt gilt.",
          "Automatische Bewertungsverfahren können große Mengen von Antworten vorsortieren. Ihre Urteile sind aber ebenfalls prüfbedürftig. Vergleiche sie an einer repräsentativen Auswahl mit fachkundigen menschlichen Bewertungen und untersuche Abweichungen. Ein Modell als Bewerter ist kein unabhängiger Wahrheitsbeweis. Dokumentiere, welche Kriterien automatisch messbar sind und wo ein Fachreview nötig bleibt."
        ],
        "keyPoints": [
          "Precision misst die Richtigkeit der Meldungen; Recall deren Abdeckung.",
          "Quellenbezug und Vollständigkeit getrennt erfassen.",
          "Kritische Fehler sichtbar halten und Bewertung fachlich kalibrieren."
        ],
        "example": {
          "title": "Ein korrekter Hinweis, fünf übersehene",
          "text": "Ein Angebotsvergleich nennt eine echte Abweichung und übersieht fünf weitere. Die Precision kann 100 % sein, der Recall ist nur 1/6. Die schöne erste Kennzahl darf den unvollständigen Vergleich nicht als vollständig erscheinen lassen."
        },
        "privateUse": "Bei einer KI-generierten Checkliste kontrollierst du nicht nur, ob genannte Punkte stimmen, sondern auch, ob wichtige Punkte fehlen. Eine richtige kurze Liste kann für deine Aufgabe unvollständig sein.",
        "exercise": "Rechne ohne App: Acht Abweichungen sind vorhanden. Das System meldet sechs, vier sind richtig. Bestimme Precision und Recall. Ergänze einen kritischen Einheitenfehler und einen harmlosen Formatfehler; erkläre, warum sie getrennt erfasst werden.",
        "reflection": "Erkläre Precision und Recall mit deinem eigenen Beispiel so, dass eine Projektleitung erkennt, was eine hohe Precision noch offenlässt.",
        "visual": "compare",
        "id": "w5-l2"
      },
      {
        "title": "Regression und Review",
        "minutes": 9,
        "summary": "Änderungen kontrollieren und Fehler an ihrer Ursache beheben.",
        "concept": [
          "Ein Regressionstest prüft nach einer Änderung, ob bisher funktionierende Fälle weiterhin funktionieren. Änderungen können Prompt, Modellversion, Suchindex, Chunking, Aufbereitung oder Freigaberegel betreffen. Vergleiche vor und nach der Änderung dieselben Kontrollfälle unter dokumentierten Bedingungen. Eine bessere Durchschnittsleistung reicht nicht, wenn dadurch ein kritischer Fall neu scheitert. Die Entscheidung zur Freigabe folgt aus den vorher festgelegten Qualitätsregeln.",
          "Ordne Fehler einer Ursache zu: Datenfehler, Suchfehler, Kontextfehler, Modellfehler oder Prozessfehler. Fehlt eine Fußnote schon im extrahierten Text, korrigierst du die Aufbereitung. Wurde die gültige Passage nicht gefunden, prüfst du Retrieval. Lag sie vor, aber die Antwort ignorierte sie, untersuchst du Kontext und Generierung. Eine richtige Antwort ohne zuständige Freigabe kann trotzdem ein Prozessproblem sein.",
          "Der Reviewprozess benennt prüfende Person, Kriterien, dokumentierte Befunde und nächsten Schritt. Korrigierte Fehler fließen in neue Entwicklungsfälle und bei Bedarf in getrennte Kontrollen ein. Achte darauf, das Kontrollset nicht schrittweise zum einzigen Trainingsziel zu machen. Bei unklarer Ursache wird die Ausweitung gestoppt und eine gezielte Diagnose geplant statt derselbe Lauf unverändert wiederholt."
        ],
        "keyPoints": [
          "Änderungen gegen feste dokumentierte Kontrollen vergleichen.",
          "Fehlerursachen entlang der Verarbeitungskette unterscheiden.",
          "Freigabe, Korrektur und erneute Prüfung verantwortlichen Personen zuordnen."
        ],
        "example": {
          "title": "Ein neuer Prompt verbessert den Stil",
          "text": "Nach dem Wechsel werden Antworten kürzer, aber ein Test zu widersprüchlichen Mengen meldet den Konflikt nicht mehr. Der Regressionstest hält diesen neuen kritischen Fehler sichtbar. Die Vorlage wird korrigiert und erneut geprüft, bevor sie im Projekt genutzt wird."
        },
        "privateUse": "Nach einem Wechsel deiner persönlichen KI-Lernvorlage prüfst du dieselben Verständnisfragen erneut. Ein angenehmerer Stil sollte nicht dazu führen, dass falsche Antworten unkritisch bestätigt werden.",
        "exercise": "Erstelle ein Fehlerlog mit drei Fällen: fehlender Originaltext, richtige Quelle nicht gefunden, richtige Quelle falsch verwendet. Ordne Ursache, Korrektur und erneuten Test zu. Ergänze eine klare Entscheidung: freigeben, weiter prüfen oder zurückstellen.",
        "reflection": "Erkläre einem Dienstleister, warum du bei einem Modellwechsel denselben Kontrollsatz verlangst und nicht nur eine neue beeindruckende Demo.",
        "visual": "loop",
        "id": "w5-l3"
      }
    ],
    "questions": [
      {
        "prompt": "Was unterscheidet Precision und Recall beim Abweichungscheck?",
        "options": [
          "Beide messen ausschließlich die Antwortlänge.",
          "Precision misst alle übersehenen Fehler; Recall die Schriftgröße.",
          "Precision betrachtet richtige Meldungen unter allen Meldungen; Recall gefundene Abweichungen unter allen vorhandenen.",
          "Precision und Recall sind immer identische Werte."
        ],
        "correct": 2,
        "explanation": "Precision beantwortet „Wie viele Meldungen stimmen?“, Recall „Wie viel des tatsächlich Vorhandenen wurde gefunden?“. Beide Perspektiven sind für einen Vergleich wichtig.",
        "id": "w5-q1"
      },
      {
        "prompt": "Kann eine belegte Antwort unvollständig sein?",
        "options": [
          "Ja, sie kann richtige Informationen verwenden und trotzdem einen entscheidenden Punkt auslassen.",
          "Nein, ein Quellenlink beweist Vollständigkeit.",
          "Nur wenn sie aus einem Satz besteht.",
          "Nein, RAG erzeugt automatisch alle relevanten Aussagen."
        ],
        "correct": 0,
        "explanation": "Quellenkorrektheit und Vollständigkeit sind getrennte Kriterien. Eine ausgelassene Ausnahme kann trotz richtiger übriger Aussagen kritisch sein.",
        "id": "w5-q2"
      },
      {
        "prompt": "Wozu dienen zurückgehaltene Kontrollfälle?",
        "options": [
          "Um Fehler im Bericht zu verstecken.",
          "Um die Entwicklung ausschließlich an ihnen zu optimieren.",
          "Um jede menschliche Prüfung abzuschaffen.",
          "Um zu prüfen, ob eine Verbesserung außerhalb der direkt verwendeten Entwicklungsfälle funktioniert."
        ],
        "correct": 3,
        "explanation": "Ein getrenntes Kontrollset reduziert das Risiko, nur die bekannten Beispiele zu optimieren. Bedingungen und Nutzung des Sets müssen dokumentiert bleiben.",
        "id": "w5-q3"
      },
      {
        "prompt": "Sechs Abweichungen existieren. Die KI meldet fünf, davon drei richtig. Welche Werte stimmen?",
        "options": [
          "Precision 50 %, Recall 60 %.",
          "Precision 60 %, Recall 50 %.",
          "Precision 100 %, Recall 100 %.",
          "Precision 30 %, Recall 20 %."
        ],
        "correct": 1,
        "explanation": "Precision = 3 richtige / 5 Meldungen = 60 %. Recall = 3 gefundene / 6 vorhandene Abweichungen = 50 %.",
        "id": "w5-q4"
      },
      {
        "prompt": "Die richtige Fußnote wurde wegen OCR-Fehler nicht indexiert. Welche Ursache wird zuerst bearbeitet?",
        "options": [
          "Nur die Formulierung der Antwort.",
          "Die Anzahl der Bewertungssterne.",
          "Dokumentaufbereitung und Datenqualität, danach Retrieval erneut testen.",
          "Der Fehler wird als bloßes Stilproblem eingestuft."
        ],
        "correct": 2,
        "explanation": "Fehlende Information ist ein vorgelagerter Datenfehler. Eine Änderung des Antwortstils kann den verlorenen Inhalt nicht zuverlässig wiederherstellen.",
        "id": "w5-q5"
      }
    ],
    "flashcards": [
      {
        "front": "Precision vs. Recall beim Abweichungscheck?",
        "back": "Precision = zutreffende Meldungen / alle Meldungen. Recall = gefundene echte Abweichungen / alle echten Abweichungen. Hohe Precision kann viele übersehene Abweichungen verdecken.",
        "id": "w5-f1",
        "week": 5
      },
      {
        "front": "Was enthält ein Golden Set?",
        "back": "Fachlich geprüfte Testaufgaben mit erwarteten Werten oder Aussagen, gültigen Quellen und Schweregrad. Dazu gehören Normalfälle, Grenzfälle, Widersprüche, fehlende Informationen und Berechtigungsfälle.",
        "id": "w5-f2",
        "week": 5
      },
      {
        "front": "Welche Fehlerursachen prüfst du?",
        "back": "Daten, Suche, Kontext, Modell und Prozess. Finde zuerst, an welcher Stelle die nötige Information verloren ging oder falsch verwendet wurde, und teste die gezielte Korrektur erneut.",
        "id": "w5-f3",
        "week": 5
      }
    ],
    "challenge": {
      "title": "Erstelle ein Testset mit mindestens dreißig Fällen für den Projektassistenten.",
      "scenario": "Portfolioauftrag aus der Lernbibliothek. Nutze anonymisierte oder fiktive Daten und passe das Beispiel an deinen Unternehmens-, Projekt- oder Büroalltag an. Zielartefakt: Golden Set mit Auswertungsbogen und zwei dokumentierten Testläufen.",
      "task": "1. Lege je Fall Aufgabe, erwartete Aussagen, Quellenstelle und Schweregrad fest.\n2. Verteile Fälle auf Extraktion, Wissensfragen, Soll-Ist-Vergleich und Berechtigungen.\n3. Trenne Entwicklungsfälle von zurückgehaltenen Kontrollfällen.\n4. Bewerte Antworten und protokolliere Fehler als Daten-, Such-, Kontext-, Modell- oder Prozessfehler.",
      "rubric": [
        "Die erwarteten Antworten sind durch Quellen oder feste Regeln belegt.",
        "Kritische Mengen-, Einheiten- und Projektverwechslungen bleiben separat sichtbar.",
        "Ein Promptwechsel wird am gleichen Kontrollset verglichen.",
        "Die beschriebenen Praxisschritte und das Portfolioartefakt sind nachvollziehbar dokumentiert."
      ],
      "sample": "Didaktische Musterlösung: Das Golden Set enthält mindestens dreißig fiktive Fälle aus Extraktion, Wissensfragen, Soll-Ist-Vergleich und Berechtigungen. Jeder Fall nennt Input, erwartete Werte oder Aussagen, gültige Fundstelle, Kategorie und Schweregrad. Entwicklungs- und Kontrollfälle sind getrennt. Zwei dokumentierte Läufe mit gleichem Kontrollset vergleichen die bisherige und geänderte Promptvorlage. Der Bogen erfasst Feldgenauigkeit, Precision/Recall der Abweichungen, Quellenkorrektheit, Vollständigkeit und kritische Fehler getrennt. Ein Mengen- oder Einheitenfehler wird nicht durch gute Stilwerte ausgeglichen. Ein Fehlerlog ordnet Befunde Daten, Retrieval, Kontext, Modell oder Prozess zu und nennt Verantwortliche sowie erneuten Test. Freigabe erfolgt nur nach den vorher festgelegten fachlichen Kriterien."
    },
    "resources": [
      {
        "title": "Evaluation best practices",
        "url": "https://developers.openai.com/api/docs/guides/evaluation-best-practices"
      },
      {
        "title": "Evaluating and Debugging Generative AI",
        "url": "https://www.deeplearning.ai/courses/evaluating-debugging-generative-ai"
      },
      {
        "title": "RAG evaluators for generative AI",
        "url": "https://learn.microsoft.com/en-us/azure/foundry/concepts/evaluation-evaluators/rag-evaluators"
      },
      {
        "title": "Ragas metrics overview",
        "url": "https://docs.ragas.io/en/stable/concepts/metrics/overview/"
      },
      {
        "title": "Evaluating AI Agents",
        "url": "https://www.deeplearning.ai/courses/evaluating-ai-agents"
      }
    ]
  },
  {
    "id": 6,
    "phase": 6,
    "title": "KI Produkte und Prozesse planen",
    "subtitle": "Du formulierst ein Problem, priorisierst den Anwendungsfall und planst einen messbaren Pilot.",
    "outcomes": [
      "Ein Nutzerproblem und ein messbarer Zielwert sind benannt.",
      "Fachliche Prüfung und technische Betreuung sind zugeordnet.",
      "Der Pilot kann auch zu einer begründeten Entscheidung gegen die nächste Ausbaustufe führen."
    ],
    "lessons": [
      {
        "title": "Problem und Baseline",
        "minutes": 9,
        "summary": "Nutzerproblem und heutigen Prozess messen, bevor du eine KI-Lösung auswählst.",
        "concept": [
          "Ein KI-Produkt beginnt mit einem wiederkehrenden Problem eines konkreten Nutzers. Beschreibe den Auslöser, heutige Schritte, Fallvolumen und Fehlerfolgen. „Wir brauchen einen Chatbot“ nennt nur eine mögliche Oberfläche. „Die Projektleitung braucht bei einem neuen Angebotsstand eine nachvollziehbare Übersicht geänderter Positionen“ nennt Aufgabe und Nutzen. Damit kannst du Alternativen wie Suche, Regeln, Prozessverbesserung oder KI-Unterstützung fair vergleichen.",
          "Die Baseline erfasst den heutigen Gesamtaufwand: Suche, Übernahme, Rückfragen, Prüfung und Nacharbeit. Zeiten werden zunächst als Hypothese geschätzt und danach an repräsentativen Fällen gemessen. Notiere Streuung und besondere Fälle statt nur einen schönen Durchschnitt. Wenn ein Modell schneller entwirft, die Fachperson aber länger prüft, kann der Gesamtprozess langsamer werden. Qualität und Fehlerfolgen gehören deshalb neben der Zeit in die Ausgangsmessung."
        ],
        "keyPoints": [
          "Beschreibe Nutzer, Auslöser und Problem vor einer Toolwahl.",
          "Die Baseline enthält den gesamten Ablauf einschließlich Prüfung.",
          "Messwerte und Schätzungen deutlich trennen."
        ],
        "example": {
          "title": "Ein neuer Angebotsstand trifft ein",
          "text": "Heute braucht die Bearbeitung 12 Minuten Suche, 20 Minuten Vergleich, 10 Minuten Rückfragen und 8 Minuten Prüfung. Eine KI spart beim Vergleich 10 Minuten, erhöht aber Prüfung um 12 Minuten. Der Gesamtnutzen ist mit diesen Beispielwerten noch nicht positiv."
        },
        "privateUse": "Wenn du KI für Wochenplanung nutzen willst, messe nicht nur die Entwurfszeit. Prüfe, ob Planen, Korrigieren und tatsächliches Nutzen zusammen einfacher werden und der Plan realistisch bleibt.",
        "exercise": "Beschreibe einen kleinen wiederkehrenden Ablauf in fünf Schritten. Notiere Fallvolumen, Zeit je Schritt, typische Fehler und fehlende Messwerte. Markiere jedes geschätzte Feld mit „Hypothese“ und plane eine einfache Beobachtung.",
        "reflection": "Erkläre einer Führungskraft, warum Entwurfszeit allein den Nutzen eines KI-Assistenten nicht belegt.",
        "visual": "workflow",
        "id": "w6-l1"
      },
      {
        "title": "Priorisierung",
        "minutes": 9,
        "summary": "Nutzen, Daten, Machbarkeit, Risiko und Prüfaufwand gemeinsam abwägen.",
        "concept": [
          "Priorisierung vergleicht mehrere Anwendungsfälle unter denselben Kriterien. Bewerte Nutzen, Datenlage, technische Machbarkeit, Fehlerfolgen und notwendigen Prüfaufwand. Definiere außerdem Muss-Kriterien: Ohne passende Berechtigung oder gültige Quelle ist ein Kandidat für den vorgesehenen Betrieb nicht bereit. Eine hohe Punktzahl bei Geschwindigkeit darf solche Voraussetzungen nicht verdecken. Gewichte sind eine begründete Planungshilfe und kein allgemeingültiges Ranking.",
          "Ein guter erster Pilot ist begrenzt und messbar, hat verfügbare Daten und lässt Ergebnisse fachlich prüfen. Große strategische Wirkung allein reicht nicht, wenn die Aufgabe unklar und die Daten unzugänglich sind. Prüfe immer eine einfache Alternative, etwa strukturierte Suche oder feste Vergleichsregeln. Zurückstellen kann sinnvoll sein, wenn der Prüfaufwand hoch oder der erwartete Zusatznutzen gering ist. Dokumentiere, welche Voraussetzung eine spätere Neubewertung ermöglichen würde."
        ],
        "keyPoints": [
          "Mehrere Kandidaten nach gleichen Kriterien vergleichen.",
          "Muss-Kriterien vor einer gewichteten Punktzahl prüfen.",
          "Prüfaufwand und einfache Alternativen in den Nutzen einbeziehen."
        ],
        "example": {
          "title": "Drei Kandidaten für ein Büro",
          "text": "Besprechungsaufgaben extrahieren: klare Quelle, begrenzte Prüfung. Technische Angebote vergleichen: hoher Nutzen, aber kritische Einheiten und fachlicher Review. Automatische Vertragsfreigabe: hohe Fehlerfolgen und unklare Verantwortung. Der dritte Kandidat wird zunächst zurückgestellt."
        },
        "privateUse": "Priorisiere private KI-Ideen nach Zeitersparnis, Datenempfindlichkeit und Fehlerrisiko. Ein Kochideen-Entwurf kann früher sinnvoll sein als eine autonome Verwaltung deiner Zahlungen.",
        "exercise": "Erstelle eine Matrix für drei Kandidaten aus Organisation, technischer Planung und privatem Alltag. Nutze fünf Kriterien und zwei Muss-Voraussetzungen. Wähle einen Pilot und einen zurückgestellten Kandidaten; begründe beide Entscheidungen.",
        "reflection": "Erkläre, warum ein kleiner überprüfbarer Pilot trotz geringerer Demo-Wirkung der bessere Start sein kann.",
        "visual": "matrix",
        "id": "w6-l2"
      },
      {
        "title": "Produkt und Pilot",
        "minutes": 10,
        "summary": "AI-PRD, Abnahme, Zuständigkeiten und Rückfallweg konkret planen.",
        "concept": [
          "Eine AI-PRD ist eine Produktanforderung für eine KI-Anwendung. Sie verbindet Nutzerproblem, Daten, Funktionen, Ausgabe, Qualitätskriterien und Kontrollen. Beschreibe auch ausgeschlossene Funktionen, unbekannte Angaben und Ausnahmen. Für einen Projektassistenten kann der Umfang lauten: „Änderungsübersicht als Entwurf mit Fundstellen“. Automatische Freigabe oder Versand gehören dann ausdrücklich nicht dazu. Die Abnahme prüft das definierte Ergebnis statt eine allgemeine Behauptung, die KI sei gut.",
          "Plane einen kleinen aussagekräftigen Pilot: begrenzte Nutzer, repräsentative Fälle, zuständige Fachprüfer und technische Betreuung. Lege Erfolgskriterien, Mindestqualität und Stop-Bedingungen vor dem Start fest. Ein Rückfallverfahren beschreibt, wie der Prozess bei Ausfall oder unzuverlässiger Ausgabe manuell weiterläuft. Rückmeldungen werden dokumentiert und ausgewertet. Eine begründete Entscheidung gegen die nächste Ausbaustufe ist ein gültiges Pilotergebnis.",
          "Die Auswertung vergleicht mit der Baseline und nennt praktische Grenzen. Zeitersparnis zählt einschließlich Review und Nacharbeit. Kritische Fehler bleiben separat sichtbar. Ändern sich Modell, Daten oder Prozess, planst du passende Regressionstests. Ein Produkt ist dadurch updatefähig: Änderungen werden versioniert, geprüft und bewusst übernommen, statt automatisch als Verbesserung angenommen."
        ],
        "keyPoints": [
          "Die AI-PRD verbindet Nutzerproblem, Daten, Funktionen und Abnahme.",
          "Erfolgskriterien, Zuständigkeiten und Stop-Regeln vorab festlegen.",
          "Rückfallverfahren und kontrollierte Updates gehören zum Betrieb."
        ],
        "example": {
          "title": "Pilot für die Projektleitung",
          "text": "Ein Pilot mit zwei Prüfpersonen vergleicht freigegebene Angebotsstände und erzeugt nur eine Änderungsübersicht. Qualität, Gesamtzeit und kritische Fehler werden vorab definiert. Bei unklarer Quelle wird nicht geraten, sondern der manuelle Vergleich genutzt. Die Auswertung kann Einführung, Nachbesserung oder Stopp ergeben."
        },
        "privateUse": "Bei einem persönlichen KI-Lernplan kannst du einen zweiwöchigen Test mit Lernzeit und Abrufleistung planen. Lege vorher fest, woran du erkennst, ob die Methode hilft, und behalte eine einfache Lernalternative.",
        "exercise": "Schreibe einen One-Pager: Nutzerproblem, Trigger, Input, Output, Nicht-Ziele, Qualitätsprüfung, Verantwortliche, Rückfallweg und Erfolgskriterien. Ergänze zwei Stop-Bedingungen und einen Plan für einen kleinen Pilot.",
        "reflection": "Erkläre einer Geschäftsführung, warum die Entscheidung „noch nicht einführen“ ein erfolgreicher Erkenntnisgewinn aus einem Pilot sein kann.",
        "visual": "loop",
        "id": "w6-l3"
      }
    ],
    "questions": [
      {
        "prompt": "Was gehört in eine Baseline?",
        "options": [
          "Nur die Modellantwortzeit.",
          "Heutiger Ablauf, Fallvolumen, Gesamtzeit einschließlich Prüfung/Nacharbeit und relevante Fehler.",
          "Nur die Abonnementkosten.",
          "Nur die Zahl der beteiligten Personen."
        ],
        "correct": 1,
        "explanation": "Die Baseline bildet den bestehenden Gesamtprozess ab. Nur so lässt sich erkennen, ob eine Verbesserung Aufwand reduziert oder bloß verschiebt.",
        "id": "w6-q1"
      },
      {
        "prompt": "Welche Aufgabe erfüllt eine AI-PRD?",
        "options": [
          "Sie ersetzt jede Fachprüfung.",
          "Sie garantiert die Richtigkeit aller Modellantworten.",
          "Sie enthält ausschließlich den Modellnamen.",
          "Sie verbindet Nutzerproblem mit Funktionen, Daten, Qualität, Kontrollen und messbarer Abnahme."
        ],
        "correct": 3,
        "explanation": "Die AI-PRD beschreibt prüfbare Anforderungen und Zuständigkeiten. Sie ist Grundlage für Entwicklung, Pilot und Abnahme, keine automatische Qualitätsgarantie.",
        "id": "w6-q2"
      },
      {
        "prompt": "Wann legst du Erfolgskriterien fest?",
        "options": [
          "Vor dem Pilot und vor der Bewertung seiner Ergebnisse.",
          "Erst nachdem die schönste Demo ausgewählt wurde.",
          "Nur wenn das Ergebnis schlecht ist.",
          "Nach der Einführung bei allen Nutzern."
        ],
        "correct": 0,
        "explanation": "Vorab definierte Kriterien verhindern, dass das Urteil im Nachhinein passend zur Demo verändert wird. Ziele können bewusst angepasst werden, müssen dann dokumentiert sein.",
        "id": "w6-q3"
      },
      {
        "prompt": "Ein Pilot spart 10 Minuten Erstellung, verursacht aber 12 Minuten zusätzliche Prüfung. Welche Aussage ist korrekt?",
        "options": [
          "Die Erstellung ist schneller, daher ist der Gesamtnutzen sicher positiv.",
          "Prüfzeit darf nicht mitgerechnet werden.",
          "Mit diesen Zeiten ist der Gesamtprozess zwei Minuten langsamer; Nutzen und Qualität müssen gemeinsam bewertet werden.",
          "Jede Prüfung sollte abgeschafft werden."
        ],
        "correct": 2,
        "explanation": "Entwurf, Review und Nacharbeit sind Teil desselben Prozesses. Der isolierte Zeitgewinn zeigt keine positive Gesamtwirkung.",
        "id": "w6-q4"
      },
      {
        "prompt": "Welche Pilotentscheidung ist fachlich vertretbar?",
        "options": [
          "Trotz kritischer Fehler sofort für alle freigeben.",
          "Bei nicht erfüllten vorab definierten Kriterien die nächste Stufe zurückstellen und den Befund dokumentieren.",
          "Fehler im Abschlussbericht auslassen.",
          "Erfolgskriterien nachträglich entfernen."
        ],
        "correct": 1,
        "explanation": "Ein Pilot dient einer belastbaren Entscheidung. Stopp oder Nachbesserung bei unzureichender Qualität sind sinnvolle Ergebnisse, keine Verpflichtung zur Einführung.",
        "id": "w6-q5"
      }
    ],
    "flashcards": [
      {
        "front": "Was misst eine Baseline?",
        "back": "Den heutigen Ablauf, Fallvolumen, Zeit einschließlich Suche, Rückfragen, Prüfung und Nacharbeit sowie relevante Qualitätsfehler. Schätzungen und tatsächliche Messungen werden getrennt.",
        "id": "w6-f1",
        "week": 6
      },
      {
        "front": "Welche Inhalte braucht eine AI-PRD?",
        "back": "Nutzerproblem, Inputs, Outputs, Funktionsumfang und Nicht-Ziele, Daten und Berechtigungen, Qualitätskriterien, Reviewverantwortung, Abnahme und Rückfallverfahren.",
        "id": "w6-f2",
        "week": 6
      },
      {
        "front": "Wann ist ein Pilot aussagekräftig?",
        "back": "Wenn Umfang, Nutzer, repräsentative Fälle, Erfolgskriterien, Fachreview und Stop-Regeln vorab definiert sind. Seine Auswertung darf auch eine begründete Entscheidung gegen die nächste Stufe ergeben.",
        "id": "w6-f3",
        "week": 6
      }
    ],
    "challenge": {
      "title": "Verfasse einen Use-Case-One-Pager und eine kurze AI-PRD.",
      "scenario": "Portfolioauftrag aus der Lernbibliothek. Nutze anonymisierte oder fiktive Daten und passe das Beispiel an deinen Unternehmens-, Projekt- oder Büroalltag an. Zielartefakt: Use-Case-One-Pager, AI-PRD und Pilotplan.",
      "task": "1. Beschreibe einen konkreten Trigger wie den Eingang eines neuen Angebotsstands.\n2. Dokumentiere die heute nötigen Arbeitsschritte und offene Messwerte.\n3. Definiere Eingaben, Ausgabe, ausgeschlossene Funktionen und Rückfallverfahren.\n4. Plane einen Pilot mit Prüfern, Testfällen und einer vorher festgelegten Auswertung.",
      "rubric": [
        "Ein Nutzerproblem und ein messbarer Zielwert sind benannt.",
        "Fachliche Prüfung und technische Betreuung sind zugeordnet.",
        "Der Pilot kann auch zu einer begründeten Entscheidung gegen die nächste Ausbaustufe führen.",
        "Die beschriebenen Praxisschritte und das Portfolioartefakt sind nachvollziehbar dokumentiert."
      ],
      "sample": "Didaktische Musterlösung: Nutzerproblem ist der aufwendige Vergleich neuer Angebotsstände durch die Projektleitung. Trigger ist der Eingang einer freigegebenen neuen Fassung. Der One-Pager erfasst heutigen Ablauf, Volumen, Gesamtzeit und offene Messwerte. Die AI-PRD verlangt eine Änderungsübersicht mit Position, alter/neuer Angabe, Quelle, Version und Prüfstatus; Freigabe und Versand sind ausgeschlossen. Im begrenzten Pilot prüfen benannte Fachpersonen repräsentative Fälle, während eine technische Betreuung Fehler und Versionen dokumentiert. Erfolg bedeutet nachgewiesenen Zeitgewinn einschließlich Review bei vorab definierter fachlicher Qualität. Kritische Mengen-, Einheiten- oder Projektfehler und fehlende Berechtigung lösen Stop oder Klärung aus. Bei Ausfall gilt der manuelle Vergleich. Die Auswertung entscheidet Einführung, Nachbesserung oder begründetes Zurückstellen."
    },
    "resources": [
      {
        "title": "Explore the business value of generative AI solutions",
        "url": "https://learn.microsoft.com/en-us/training/paths/explore-business-value-generative-ai-solutions/"
      },
      {
        "title": "AI Product Management Specialization",
        "url": "https://www.coursera.org/specializations/ai-product-management-duke"
      },
      {
        "title": "People and AI Guidebook",
        "url": "https://pair.withgoogle.com/guidebook-v2/chapters"
      },
      {
        "title": "How to Develop Your Own AI Playbook",
        "url": "https://www.deeplearning.ai/blog/how-to-develop-your-own-ai-playbook-andrew-ng-and-will-knight-at-mit-tech-reviews-2019-emtech-digital"
      }
    ]
  }
];
