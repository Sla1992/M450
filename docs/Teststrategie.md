# Teststrategie TaskFlow 1.4.0-rc1

## 1. Testobjekt

Getestet wird der Release Candidate 1.4.0-rc1 der REST-API TaskFlow. Die Anwendung ermöglicht Benutzern die Anmeldung sowie das Anzeigen, Erstellen und Bearbeiten von Tasks.

Ziel der Tests ist es, fachliche Fehler, Sicherheitsprobleme und Abweichungen vom API-Vertrag vor einer möglichen Produktivsetzung zu erkennen. Auf Basis der Testergebnisse wird eine GO- oder NO-GO-Entscheidung getroffen.

## 2. Testumfang

### In Scope

Folgende Funktionen werden getestet:

- Health Check der API
- Anmeldung mit gültigen und ungültigen Zugangsdaten
- Sperrung eines Benutzerkontos nach fünf Fehlversuchen
- Zurücksetzen der Fehlversuche nach erfolgreicher Anmeldung
- Authentifizierung mit gültigem, ungültigem und fehlendem Token
- Anzeige eigener und fremder Tasks
- Berechtigungen von Mitarbeitern und Administratoren
- Erstellen neuer Tasks
- Bearbeiten bestehender Tasks
- Validierung von Titel, Priorität, Status und Fälligkeitsdatum
- Behandlung von ungültigem JSON
- HTTP-Statuscodes und Response-Bodys
- Schutz vor internen Informationen in Fehlerantworten

### Out of Scope

Folgende Bereiche werden nicht getestet:

- Grafische Benutzeroberfläche, da nur eine REST-API vorhanden ist
- Datenbankintegration, da die Daten nur im Arbeitsspeicher gespeichert werden
- E-Mail-Versand und Benachrichtigungen
- Last- und Performancetests mit vielen gleichzeitigen Benutzern
- Betrieb in einer produktiven Cloud-Umgebung
- Langfristige Speicherung der Daten nach einem Neustart
- Sicherheit der Netzwerk- und Serverinfrastruktur

## 3. Testvorgehen

Die Tests werden risikobasiert priorisiert. Sicherheits- und Berechtigungsfehler besitzen die höchste Priorität, da Benutzer dadurch auf fremde Daten zugreifen oder diese verändern könnten.

Verwendete Teststufen und Testarten:

- Unit- und Service-Tests für Validierung, Authentifizierung und Berechtigungslogik
- API- und Integrationstests für Endpoints, Statuscodes, Response-Bodys und Datenänderungen
- Negative Tests für ungültige Eingaben und fehlende Berechtigungen
- Grenzwerttests für Titellänge und Loginversuche
- Security-Tests für Authentifizierung und Autorisierung
- Regressionstests zur Absicherung korrigierter Defects
- Manuelle API-Tests mit Postman oder curl

## 4. Testumgebung

- Betriebssystem: Windows
- Entwicklungsumgebung: Visual Studio Code
- Laufzeitumgebung: Node.js 20 oder neuer
- Testframework: Node.js Test Runner
- API-Testmittel: Postman oder curl
- Lokale Basis-URL: http://localhost:3000
- Testbefehl: npm test
- Startbefehl: npm start

## 5. Testdaten

Folgende Testbenutzer stehen zur Verfügung:

| Benutzer    | Rolle    | E-Mail             | Passwort  | Token       |
| ----------- | -------- | ------------------ | --------- | ----------- |
| Alice Meier | employee | alice@example.test | Start123! | token-alice |
| Bob Keller  | employee | bob@example.test   | Start123! | token-bob   |
| Admin User  | admin    | admin@example.test | Admin123! | token-admin |

Ausgangszustand:

- Task `t1` gehört Alice.
- Task `t2` gehört Bob.
- Der Administrator darf beide Tasks sehen und bearbeiten.
- Vor jedem automatisierten Test wird ein neuer Store erzeugt.
- Dadurch beeinflussen sich die automatisierten Tests nicht gegenseitig.

## 6. Priorisierung

Die Priorisierung erfolgt anhand von Wahrscheinlichkeit und Auswirkung auf einer Skala von 1 bis 3.

Risikowert:

`Wahrscheinlichkeit x Auswirkung`

- 1 bis 2: niedrig
- 3 bis 4: mittel
- 6 bis 9: hoch

Risiken mit Auswirkungen auf Authentifizierung, Autorisierung oder fremde Benutzerdaten werden zuerst getestet.

## 7. GO-Kriterien

Ein GO ist nur gerechtfertigt, wenn:

- keine offenen Defects mit Severity Critical oder High vorhanden sind,
- Mitarbeiter nur ihre eigenen Tasks sehen und bearbeiten können,
- nicht authentifizierte Zugriffe verhindert werden,
- die Kontosperrung nach fünf Fehlversuchen funktioniert,
- Pflichtfelder und Grenzwerte korrekt validiert werden,
- Fehlerantworten keine internen Informationen enthalten,
- alle sicherheitskritischen Tests bestanden sind,
- alle automatisierten Tests reproduzierbar bestanden sind,
- die verbleibenden Risiken dokumentiert und akzeptierbar sind.

## 8. NO-GO-Kriterien

Ein NO-GO ist gerechtfertigt, wenn mindestens einer der folgenden Punkte zutrifft:

- Benutzer können fremde Tasks sehen oder bearbeiten.
- Ein Zugriff ohne gültige Authentifizierung ist möglich.
- Sicherheitskritische Tests schlagen fehl.
- Fehlerantworten enthalten Stacktraces, Dateipfade oder andere interne Informationen.
- Zentrale Anforderungen wie Login, Kontosperrung oder Taskvalidierung funktionieren nicht.
- Ein Defect mit Severity Critical oder High bleibt offen.
- Die Testergebnisse sind nicht reproduzierbar.
- Die vorhandene Testevidenz reicht für eine sichere Freigabe nicht aus.
