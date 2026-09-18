# Teambeitrag LB-02

## Team

Die LB-02 wurde als Einzelarbeit durchgeführt.

- Bearbeiter: Sladjan Vasic
- Teamnummer: Nicht vorhanden, da Einzelarbeit

## Aufgabenteilung

| Person        | Hauptbeiträge                                                                                                                                                               | Konkrete Dateien, Tests und Findings                                                                                                                                                                    | Zeitaufwand ca. |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------: |
| Sladjan Vasic | Teststrategie, Risikobewertung, Testfälle, automatisierte Tests, API- und Security-Tests, Code Review, Defectanalyse, Fehlerkorrektur, Retest, Regression und Dokumentation | `Teststrategie.md`, `Risikomatrix.csv`, `Testfaelle.csv`, `Testprotokoll.csv`, `Defectliste.csv`, `code_review.md`, `Korrektur_DEF-02.md`, `Release_Entscheid.md`, `lb02.test.js` und Postman-Evidenzen |      20 Stunden |

## Zeitaufwand

| Tag        |    Zeitaufwand | Arbeiten                                                                                                                                          |
| ---------- | -------------: | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Montag     |      4 Stunden | Anforderungen, API-Vertrag, Systemgrenze und Startertests analysiert. Teststrategie und Risikomatrix erstellt.                                    |
| Dienstag   |      4 Stunden | Testbenutzer, Ausgangszustände und 16 wiederholbare Testfälle definiert. Automatisierte Tests vorbereitet.                                        |
| Mittwoch   |      4 Stunden | Neue Unit-, Service-, API- und Regressionstests implementiert und ausgeführt. Code Review durchgeführt und Defects dokumentiert.                  |
| Donnerstag |      4 Stunden | DEF-02 analysiert und korrigiert. Retest und Regressionstest ausgeführt. API- und Security-Tests mit Postman durchgeführt und Evidenzen erstellt. |
| Freitag    |      4 Stunden | Testprotokoll, Defectliste, Code-Review-Zusammenfassung, Release-Entscheid und weitere Abgabedokumentation fertiggestellt und kontrolliert.       |
| **Total**  | **20 Stunden** |                                                                                                                                                   |

## Gemeinsame Arbeiten

Es gab keine gemeinsamen Arbeiten, da die LB-02 als Einzelarbeit durchgeführt wurde.

Die Teststrategie, Risikopriorisierung und Release-Entscheidung wurden selbstständig erarbeitet. Sicherheitsrisiken bezüglich Authentifizierung, Autorisierung und Offenlegung interner Informationen erhielten die höchste Priorität.

Aufgrund der offenen High-Severity-Defects DEF-01, DEF-05, DEF-06 und DEF-07 wurde die Entscheidung **NO-GO** getroffen.

## Eigener Beitrag

Ich habe den vollständigen Projektauftrag selbstständig bearbeitet. Dazu gehören:

- Analyse der Anforderungen und des vorhandenen Source Codes
- Erstellung der Teststrategie und Risikomatrix
- Erstellung von 16 manuellen Testfällen
- Implementierung von sieben neuen automatisierten Tests
- Durchführung und Dokumentation der automatisierten Tests
- Durchführung von dreizehn API-, Security- und Grenzwerttests mit Postman
- strukturiertes Code Review
- Reproduktion und Dokumentation von DEF-01 bis DEF-07
- Ursachenanalyse und Korrektur von DEF-02
- Durchführung von Retest und Regressionstest
- Sicherung der Testevidenzen
- Erstellung des Testprotokolls und der Release-Entscheidung
- Kontrolle und Vorbereitung der Abgabe

## Verwendete Hilfsmittel

- Visual Studio Code
- Node.js Test Runner
- Postman
- PowerShell
- Unterrichtsunterlagen
- Anforderungen und API-Vertrag des TaskFlow-Projekts
- ChatGPT zur Erklärung der Aufgaben, Strukturierung der Testfälle und Unterstützung bei Testcode und Dokumentation

Alle Testresultate und Codeänderungen wurden im Projekt selbst ausgeführt und kontrolliert.

## Bestätigung

Ich bestätige, dass ich den dokumentierten Projektstand kenne und die Teststrategie, Risikobewertung, Testfälle, Testergebnisse, Defects, Codeänderung sowie die NO-GO-Entscheidung in der mündlichen Prüfung fachlich erklären kann.
