# TaskFlow Release Candidate 1.4.0-rc1

## Projektziel

TaskFlow ist eine REST-API zur Verwaltung von Aufgaben. Im Rahmen der LB-02 wurde der Release Candidate risikobasiert auf Funktionalität, Validierung, Authentifizierung, Autorisierung und sichere Fehlerbehandlung geprüft.

Auf Basis der Testergebnisse wurde ein **NO-GO** beschlossen.

## Bearbeiter

- Sladjan Vasic
- Einzelarbeit, keine Teamnummer vorhanden

## Voraussetzungen

- Node.js 20 oder neuer
- Visual Studio Code
- Terminal oder PowerShell
- Postman oder curl

Es werden keine externen npm-Pakete benötigt.

## Anwendung starten

Projektordner in Visual Studio Code öffnen und im Terminal ausführen:

```powershell
npm start
```

Die API ist danach standardmässig unter folgender Adresse erreichbar:

```text
http://localhost:3000
```

Health Check:

```text
GET http://localhost:3000/health
```

## Automatisierte Tests ausführen

Die vollständige Testsuite wird mit folgendem Befehl gestartet:

```powershell
npm test
```

Aktuelles Ergebnis nach der Korrektur von DEF-02:

```text
Tests: 11
PASS: 7
FAIL: 4
```

Die fünf fehlschlagenden Tests dokumentieren die weiterhin offenen Defects:

- DEF-01: Mitarbeiter sehen fremde Tasks
- DEF-03: Fehlende Priorität ergibt LOW statt MEDIUM
- DEF-04: Titel mit weniger als drei Zeichen wird akzeptiert
- DEF-05: Ungültiges JSON liefert HTTP 500 und interne Fehlerdetails

Der Retest von DEF-02 und der zugehörige Regressionstest sind erfolgreich.

Die zusätzlichen manuellen Postman-Tests haben zwei weitere offene Defects ergeben:

- DEF-06: Das Konto wird erst nach sechs statt nach fünf Fehlversuchen gesperrt
- DEF-07: Ein erfolgreicher Login setzt den Fehlversuchszähler nicht zurück

## Postman-Tests

Es wurden insgesamt dreizehn API-Szenarien mit Postman ausgeführt und mit Screenshots dokumentiert.

Folgende Dateien können in Postman importiert werden:

```text
postman/TaskFlow_LB02.postman_collection.json
postman/TaskFlow_LB02.postman_environment.json
```

Nach dem Import muss die Umgebung `TaskFlow LB02 Local` ausgewählt werden.

Die Variable `baseUrl` verwendet:

```text
http://localhost:3000
```

Vor der Ausführung der API-Tests muss die Anwendung mit `npm start` gestartet werden.

## Projektstruktur

```text
TaskFlow_ReleaseCandidate
├── docs
│   ├── Anforderungen.md
│   ├── API_Vertrag.md
│   ├── Teststrategie.md
│   ├── Risikomatrix.csv
│   ├── Testfaelle.csv
│   ├── Testprotokoll.csv
│   ├── Defectliste.csv
│   ├── code_review.md
│   ├── Korrektur_DEF-02.md
│   └── Release_Entscheid.md
├── Evidenz
│   ├── API-01 bis API-13
│   ├── npm_test_vor_fix.txt
│   └── npm_test_nach_DEF02_fix.txt
├── postman
│   ├── TaskFlow_LB02.postman_collection.json
│   └── TaskFlow_LB02.postman_environment.json
├── src
├── test
│   ├── starter.test.js
│   └── lb02.test.js
├── Praesentation.pptx
├── TEAMBEITRAG.md
├── package.json
└── README.md
```

## Testumfang

In Scope:

- Login und Tokenprüfung
- Rollen und Berechtigungen
- Anzeigen, Erstellen und Bearbeiten von Tasks
- Eingabevalidierung
- HTTP-Statuscodes
- sichere Fehlerbehandlung
- Unit-, Service-, API- und Regressionstests

Out of Scope:

- Last- und Performancetests
- produktive Infrastruktur
- Cloud-Betrieb
- langfristige Datenpersistenz
- Benutzeroberfläche

## Release-Entscheidung

Die aktuelle Entscheidung lautet **NO-GO**.

Release-blockierend sind insbesondere:

- DEF-01 verletzt die Vertraulichkeit, weil Mitarbeiter fremde Tasks sehen können.
- DEF-05 legt bei ungültigem JSON Stacktraces, Dateipfade und interne Informationen offen.
- DEF-06 erlaubt sechs Fehlversuche, obwohl das Konto nach fünf Fehlversuchen gesperrt werden muss.
- DEF-07 setzt den Fehlversuchszähler nach einem erfolgreichen Login nicht zurück.

Vor einer Freigabe müssen die offenen Defects korrigiert, gezielt retestet und mit einer vollständigen Regression abgesichert werden.

## Verwendete Hilfsmittel

- Visual Studio Code
- Node.js Test Runner
- Postman
- PowerShell
- Git und GitHub
- Unterrichtsunterlagen
- Anforderungen und API-Vertrag des TaskFlow-Projekts
- ChatGPT zur Erklärung der Aufgaben, Strukturierung der Testfälle sowie Unterstützung bei Testcode, Dokumentation und Präsentation

Alle Testresultate und Codeänderungen wurden im Projekt selbst ausgeführt und kontrolliert.
