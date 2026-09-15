# Release-Entscheid TaskFlow 1.4.0-rc1

## Entscheidung

**NO-GO**

## Begründung

1. Mitarbeiter können fremde Tasks sehen. Alice erhält neben ihrem eigenen Task auch den Task von Bob. Dies verletzt die Vertraulichkeit und die Berechtigungsanforderungen.
2. Ungültiges JSON liefert HTTP 500 statt HTTP 400. Die Antwort enthält zusätzlich Stacktraces, Dateipfade und interne Implementierungsdetails.
3. Neue Tasks erhalten ohne angegebene Priorität `LOW` statt des vorgeschriebenen Standardwerts `MEDIUM`.
4. Die Titellänge wird nicht korrekt validiert. Ein Titel mit weniger als drei Zeichen wird akzeptiert.
5. Nach der Korrektur von DEF-02 schlagen weiterhin vier automatisierte Tests aufgrund bestätigter Defects fehl.

## Offene Defects

| Defect-ID | Severity | Risiko für Release | Begründung                                                                                         |
| --------- | -------- | ------------------ | -------------------------------------------------------------------------------------------------- |
| DEF-01    | High     | Hoch               | Mitarbeiter können Tasks anderer Benutzer sehen. Dadurch wird die Vertraulichkeit verletzt.        |
| DEF-03    | Medium   | Mittel             | Neue Tasks erhalten die falsche Standardpriorität und entsprechen dadurch nicht den Anforderungen. |
| DEF-04    | Medium   | Mittel             | Ungültige Titel können gespeichert werden und führen zu fehlerhaften Daten.                        |
| DEF-05    | High     | Hoch               | Die API liefert HTTP 500 und legt Stacktraces, Dateipfade und interne Informationen offen.         |

## Testabdeckung

Die wesentlichen Risiken bezüglich Login, Authentifizierung, Autorisierung, Taskzugriff, Taskbearbeitung, Eingabevalidierung und Fehlerbehandlung wurden mit automatisierten Tests und Postman geprüft.

Nach der Korrektur von DEF-02 wurden 11 automatisierte Tests ausgeführt. Davon bestanden 7 Tests und 4 Tests schlugen aufgrund dokumentierter Defects fehl. Der Retest von DEF-02 und der zugehörige Regressionstest waren erfolgreich.

Zusätzlich wurden zehn API-Szenarien mit Postman durchgeführt. Dazu gehörten ein erfolgreicher und ein fehlerhafter Login, der Zugriff ohne Token, der Zugriff mit ungültigem Token, Mitarbeiterzugriffe auf eigene und fremde Tasks, der Administratorzugriff, ungültige Eingaben und ungültiges JSON.

Last- und Performancetests, produktive Infrastruktur, Cloud-Betrieb und langfristige Datenpersistenz wurden nicht geprüft. Diese Bereiche wurden in der Teststrategie als Out of Scope definiert.

## Empfohlene nächste Schritte

Vor einer Produktivsetzung müssen mindestens die sicherheitsrelevanten Defects DEF-01 und DEF-05 korrigiert werden. Mitarbeiter dürfen nur ihre eigenen Tasks sehen. Ungültiges JSON muss mit HTTP 400 und ohne interne Fehlerdetails beantwortet werden.

Zusätzlich müssen die Standardpriorität auf `MEDIUM` gesetzt und die Titellänge nach dem Trimmen auf 3 bis 100 Zeichen validiert werden.

Nach den Korrekturen müssen gezielte Retests sowie eine vollständige Regression mit den automatisierten Tests und den relevanten Postman-Szenarien durchgeführt werden. Erst danach darf erneut über ein GO entschieden werden.
