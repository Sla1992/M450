# Korrektur und Retest def02

## Beschreibung

Ein authentifizierter Mitarbeiter konnte Tasks anderer Mitarbeiter bearbeiten. Bob konnte dadurch den Task `t1` von Alice verÃ¤ndern.

## Ursache

Die Funktion `canEditTask` prÃ¼fte neben der Administratorrolle nur `Boolean(user)`. Dieser Ausdruck ist fÃ¼r jeden authentifizierten Benutzer wahr. Die EigentÃ¼merschaft des Tasks wurde nicht berÃ¼cksichtigt.

## Korrektur

Die BerechtigungsprÃ¼fung wurde angepasst. Ein Benutzer darf einen Task nur bearbeiten, wenn er Administrator oder EigentÃ¼mer des Tasks ist.

```javascript
function canEditTask(user, task) {
  return user.role === "admin" || task.ownerId === user.id;
}
```

## Retest

Der automatisierte Test `UNIT TC-09 DEF-02` wurde nach der Korrektur erneut ausgefÃ¼hrt. Bob darf den Task `t1` von Alice nicht mehr bearbeiten. Die BerechtigungsprÃ¼fung liefert `false`.

Resultat: PASS

Evidenz: `Evidenz/npm_test_nach_DEF02_fix.txt`

## Regressionstest

Der Regressionstest prÃ¼ft, ob Alice ihren eigenen Task weiterhin bearbeiten kann. Nach der Korrektur liefert die API weiterhin HTTP 200 und der Status des eigenen Tasks kann geÃ¤ndert werden.

Resultat: PASS

Evidenz: `Evidenz/npm_test_nach_DEF02_fix.txt`

## Risiken und Nebenwirkungen

Durch eine fehlerhafte Korrektur hÃ¤tte auch der EigentÃ¼mer den Zugriff auf seinen eigenen Task verlieren kÃ¶nnen. Der Regressionstest deckt dieses Risiko ab.

ZusÃ¤tzlich wurde mit Postman geprÃ¼ft, dass Bob beim Zugriff auf Alices Task HTTP 403 erhÃ¤lt und der Administrator Alices Task weiterhin bearbeiten darf.

## Ergebnis

Def02 wurde behoben, retestet und durch einen Regressionstest abgesichert. Es wurden keine neuen Nebenwirkungen festgestellt.

