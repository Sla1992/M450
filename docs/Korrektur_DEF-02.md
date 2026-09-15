# Korrektur und Retest DEF-02

## Beschreibung

Ein authentifizierter Mitarbeiter konnte Tasks anderer Mitarbeiter bearbeiten. Bob konnte dadurch den Task `t1` von Alice verändern.

## Ursache

Die Funktion `canEditTask` prüfte neben der Administratorrolle nur `Boolean(user)`. Dieser Ausdruck ist für jeden authentifizierten Benutzer wahr. Die Eigentümerschaft des Tasks wurde nicht berücksichtigt.

## Korrektur

Die Berechtigungsprüfung wurde angepasst. Ein Benutzer darf einen Task nur bearbeiten, wenn er Administrator oder Eigentümer des Tasks ist.

```javascript
function canEditTask(user, task) {
  return user.role === "admin" || task.ownerId === user.id;
}
```

## Retest

Der automatisierte Test `UNIT TC-09 DEF-02` wurde nach der Korrektur erneut ausgeführt. Bob darf den Task `t1` von Alice nicht mehr bearbeiten. Die Berechtigungsprüfung liefert `false`.

Resultat: PASS

Evidenz: `evidenz/npm_test_nach_def02_fix.txt`

## Regressionstest

Der Regressionstest prüft, ob Alice ihren eigenen Task weiterhin bearbeiten kann. Nach der Korrektur liefert die API weiterhin HTTP 200 und der Status des eigenen Tasks kann geändert werden.

Resultat: PASS

Evidenz: `evidenz/npm_test_nach_def02_fix.txt`

## Risiken und Nebenwirkungen

Durch eine fehlerhafte Korrektur hätte auch der Eigentümer den Zugriff auf seinen eigenen Task verlieren können. Der Regressionstest deckt dieses Risiko ab.

Zusätzlich wurde mit Postman geprüft, dass Bob beim Zugriff auf Alices Task HTTP 403 erhält und der Administrator Alices Task weiterhin bearbeiten darf.

## Ergebnis

DEF-02 wurde behoben, retestet und durch einen Regressionstest abgesichert. Es wurden keine neuen Nebenwirkungen festgestellt.
