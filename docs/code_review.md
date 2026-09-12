# Code Review TaskFlow 1.4.0-rc1

## Ziel

Der Source Code wurde mit Blick auf Funktionalität, Security, Testbarkeit, Verantwortlichkeiten, Namensgebung, Lesbarkeit und Fehlerbehandlung geprüft. Reproduzierbare Abweichungen wurden zusätzlich als Defects dokumentiert.

## Review Findings

### RF-01 Fehlende Filterung in listTasks

Die Funktion `listTasks` gibt für Administratoren und Mitarbeiter immer `store.tasks` zurück. Dadurch wird die fachliche Berechtigungsregel nicht umgesetzt.

Klassifikation: Funktionalität und Security  
Release-Relevanz: direkt release-blockierend  
Zugehöriger Defect: DEF-01

### RF-02 Unzureichende Autorisierungsprüfung

Die Funktion `canEditTask` verwendet `user.role === 'admin' || Boolean(user)`. Da jeder authentifizierte Benutzer als wahr ausgewertet wird, darf jeder Mitarbeiter jeden Task bearbeiten.

Klassifikation: Security und Funktionalität  
Release-Relevanz: direkt release-blockierend  
Zugehöriger Defect: DEF-02

### RF-03 Unsichere zentrale Fehlerbehandlung

Der globale Catch-Block gibt `error.stack` an den Client zurück. Dadurch können Dateipfade, Funktionsnamen und interne Implementierungsdetails offengelegt werden. Ausserdem wird ungültiges JSON fälschlicherweise als HTTP 500 behandelt.

Klassifikation: Security und Fehlerbehandlung  
Release-Relevanz: direkt release-blockierend  
Zugehöriger Defect: DEF-05

### RF-04 Unvollständige und doppelte Validierungslogik

`validateCreateTask` und `validatePatchTask` enthalten ähnliche Prüfungen, setzen die Anforderungen aber nur teilweise um. Die Titellänge, das Trimmen und vergangene Fälligkeitsdaten fehlen. Gemeinsame Prüfungen könnten in Hilfsfunktionen ausgelagert werden.

Klassifikation: Testbarkeit, DRY und Funktionalität  
Release-Relevanz: teilweise release-blockierend  
Zugehöriger Defect: DEF-04

### RF-05 Unklare Verantwortlichkeiten in login

Die Funktion `login` sucht den Benutzer, prüft das Passwort, verändert den Sperrstatus und erstellt gleichzeitig das Token. Dadurch besitzt die Funktion mehrere Verantwortlichkeiten. Der Zähler der Fehlversuche wird bei erfolgreichem Login zudem nicht zurückgesetzt.

Klassifikation: SRP, Testbarkeit und Funktionalität  
Release-Relevanz: Kontosperrung und Reset sind release-relevant  
Empfehlung: Authentifizierungsprüfung, Sperrlogik und Tokenerstellung klar trennen oder mindestens separat testen

### RF-06 Fest codierte Token- und Passwortdaten

Passwörter und Tokens stehen als Klartext im Store. Für das lokale Prüfungsprojekt erleichtert dies reproduzierbare Tests. Für einen produktiven Einsatz wären Klartextpasswörter und vorhersehbare Tokens jedoch nicht akzeptabel.

Klassifikation: Security und Wartbarkeit  
Release-Relevanz: für das Prüfungsprojekt eingeschränkt, für einen echten Produktivbetrieb kritisch  
Empfehlung: Passwörter hashen und zufällige zeitlich begrenzte Tokens verwenden

## Zusammenfassung

DEF-01, DEF-02 und DEF-05 beeinflussen den Release direkt, da sie Vertraulichkeit, Integrität und sichere Fehlerbehandlung betreffen. DEF-03 und DEF-04 verletzen ebenfalls verbindliche Anforderungen, besitzen aber eine geringere Auswirkung.

Die strukturellen Findings zu Verantwortlichkeiten, Wiederholungen und fest codierten Testdaten betreffen zusätzlich die Wartbarkeit und Testbarkeit. Sie sollten dokumentiert werden, müssen im Rahmen dieses Release Candidates aber nicht vollständig umgebaut werden.
