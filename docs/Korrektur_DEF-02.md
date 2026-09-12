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
