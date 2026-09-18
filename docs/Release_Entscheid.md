# Release-Entscheid TaskFlow 1.4.0-rc1

## Entscheidung

**NO-GO**

## Begründung

1. Mitarbeiter können fremde Tasks sehen. Alice erhält neben ihrem eigenen Task auch den Task von Bob. Dies verletzt die Vertraulichkeit und die Berechtigungsanforderungen.
2. Ungültiges JSON liefert HTTP 500 statt HTTP 400. Die Antwort enthält zusätzlich Stacktraces, Dateipfade und interne Implementierungsdetails.
3. Die Kontosperre erfolgt erst nach sechs statt nach fünf fehlgeschlagenen Loginversuchen.
4. Ein erfolgreicher Login setzt den Fehlversuchszähler nicht zurück. Dadurch kann ein Benutzer trotz erfolgreicher Anmeldung zu früh gesperrt werden.
5. Zusätzlich entsprechen die Standardpriorität und die Validierung kurzer Titel nicht den Anforderungen.

## Offene Defects

| Defect-ID | Severity | Risiko für Release | Begründung                                                                                                                     |
| --------- | -------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| DEF-01    | High     | Hoch               | Mitarbeiter können Tasks anderer Benutzer sehen. Dadurch wird die Vertraulichkeit verletzt.                                    |
| DEF-03    | Medium   | Mittel             | Neue Tasks erhalten die falsche Standardpriorität und entsprechen dadurch nicht den Anforderungen.                             |
| DEF-04    | Medium   | Mittel             | Titel mit weniger als drei Zeichen werden akzeptiert und führen zu ungültigen Daten.                                           |
| DEF-05    | High     | Hoch               | Die API liefert HTTP 500 und legt Stacktraces, Dateipfade und interne Informationen offen.                                     |
| DEF-06    | High     | Hoch               | Die Kontosperre erfolgt erst nach sechs statt nach fünf Fehlversuchen. Dadurch sind mehr Passwortversuche als erlaubt möglich. |
| DEF-07    | High     | Hoch               | Ein erfolgreicher Login setzt den Fehlversuchszähler nicht zurück. Benutzer können dadurch zu früh gesperrt werden.            |

## Testabdeckung

Die wesentlichen Risiken bezüglich Login, Kontosperrung, Authentifizierung, Autorisierung, Taskzugriff, Taskbearbeitung, Eingabevalidierung und Fehlerbehandlung wurden mit automatisierten Tests und Postman geprüft.

Nach der Korrektur von DEF-02 wurden 11 automatisierte Tests ausgeführt. Davon bestanden 7 Tests und 4 Tests schlugen aufgrund dokumentierter Defects fehl. Der Retest von DEF-02 und der zugehörige Regressionstest waren erfolgreich.

Zusätzlich wurden dreizehn API-Szenarien mit Postman durchgeführt. Dazu gehörten erfolgreiche und fehlerhafte Logins, die Kontosperrung, das Zurücksetzen von Fehlversuchen, Zugriffe ohne oder mit ungültigem Token, Mitarbeiter- und Administratorzugriffe, Grenzwertprüfungen sowie Tests mit ungültigen Eingaben und ungültigem JSON.

TC-04 und TC-05 schlugen fehl und führten zu den neuen Defects DEF-06 und DEF-07. TC-14 mit einem Titel von genau 100 Zeichen war erfolgreich.

Last- und Performancetests, produktive Infrastruktur, Cloud-Betrieb und langfristige Datenpersistenz wurden nicht geprüft. Diese Bereiche wurden in der Teststrategie als Out of Scope definiert.

## Empfohlene nächste Schritte

Vor einer Produktivsetzung müssen die sicherheitsrelevanten Defects DEF-01, DEF-05, DEF-06 und DEF-07 korrigiert werden.

Mitarbeiter dürfen nur ihre eigenen Tasks sehen. Ungültiges JSON muss mit HTTP 400 und ohne interne Fehlerdetails beantwortet werden. Die Kontosperre muss nach genau fünf Fehlversuchen erfolgen. Ein erfolgreicher Login muss den Fehlversuchszähler auf 0 zurücksetzen.

Zusätzlich müssen die Standardpriorität auf `MEDIUM` gesetzt und die Titellänge nach dem Trimmen auf 3 bis 100 Zeichen validiert werden.

Nach den Korrekturen müssen gezielte Retests sowie eine vollständige Regression mit den automatisierten Tests und den relevanten Postman-Szenarien durchgeführt werden. Erst danach darf erneut über ein GO entschieden werden.
