const test = require("node:test");
const assert = require("node:assert/strict");
const http = require("node:http");

const { createStore } = require("../src/store");
const { createHandler } = require("../src/app");
const { createTask, canEditTask } = require("../src/taskService");
const { validateCreateTask } = require("../src/validation");

async function withServer(fn) {
  const store = createStore();
  const server = http.createServer(createHandler(store));

  await new Promise((resolve) => {
    server.listen(0, "127.0.0.1", resolve);
  });

  const address = server.address();
  const baseUrl = `http://127.0.0.1:${address.port}`;

  try {
    await fn({ baseUrl, store });
  } finally {
    await new Promise((resolve) => {
      server.close(resolve);
    });
  }
}

/*
 * Unit-/Service-Test 1
 * Negativtest und Grenzwerttest
 */
test("UNIT TC-13 DEF-04: Titel mit zwei Zeichen wird abgewiesen", () => {
  // Arrange
  const input = {
    title: "AB",
    priority: "MEDIUM",
  };

  // Act
  const errors = validateCreateTask(input);

  // Assert
  assert.ok(
    errors.some((error) => error.includes("title")),
    "Ein Titel mit weniger als drei Zeichen muss einen Validierungsfehler erzeugen",
  );
});

/*
 * Unit-/Service-Test 2
 * Positivtest für die Standardpriorität
 */
test("SERVICE TC-11 DEF-03: Fehlende Priorität wird als MEDIUM gespeichert", () => {
  // Arrange
  const store = createStore();
  const alice = store.users.find((user) => user.id === "u1");

  const input = {
    title: "Neue Aufgabe",
  };

  // Act
  const result = createTask(store, alice, input);

  // Assert
  assert.equal(result.ok, true);
  assert.equal(result.status, 201);
  assert.equal(result.task.priority, "MEDIUM");
  assert.equal(result.task.ownerId, "u1");
});

/*
 * Unit-/Service-Test 3
 * Negativtest für die Autorisierung
 */
test("UNIT TC-09 DEF-02: Bob darf den Task von Alice nicht bearbeiten", () => {
  // Arrange
  const store = createStore();
  const bob = store.users.find((user) => user.id === "u2");
  const aliceTask = store.tasks.find((task) => task.id === "t1");

  // Act
  const allowed = canEditTask(bob, aliceTask);

  // Assert
  assert.equal(
    allowed,
    false,
    "Ein Mitarbeiter darf einen fremden Task nicht bearbeiten",
  );
});

/*
 * API-/Integrationstest 1
 * Security-Test für sichtbare Taskdaten
 */
test("API TC-08 DEF-01: Alice sieht nur ihre eigenen Tasks", async () => {
  await withServer(async ({ baseUrl }) => {
    // Arrange
    const requestOptions = {
      headers: {
        authorization: "Bearer token-alice",
      },
    };

    // Act
    const response = await fetch(`${baseUrl}/api/tasks`, requestOptions);
    const body = await response.json();

    // Assert
    assert.equal(response.status, 200);
    assert.equal(body.items.length, 1);
    assert.equal(body.items[0].id, "t1");
    assert.equal(body.items[0].ownerId, "u1");
  });
});

/*
 * API-/Integrationstest 2
 * Negativtest für ungültige Authentifizierung
 */
test("API TC-07: Ungültiger Token liefert HTTP 401", async () => {
  await withServer(async ({ baseUrl }) => {
    // Arrange
    const requestOptions = {
      headers: {
        authorization: "Bearer token-ungueltig",
      },
    };

    // Act
    const response = await fetch(`${baseUrl}/api/tasks`, requestOptions);
    const body = await response.json();

    // Assert
    assert.equal(response.status, 401);
    assert.equal(body.error, "Nicht authentifiziert");
    assert.equal(body.items, undefined);
  });
});

/*
 * API-/Integrationstest 3
 * Negativ- und Security-Test für ungültiges JSON
 */
test("API TC-16 DEF-05: Ungültiges JSON liefert HTTP 400 ohne interne Details", async () => {
  await withServer(async ({ baseUrl }) => {
    // Arrange
    const requestOptions = {
      method: "POST",
      headers: {
        authorization: "Bearer token-alice",
        "content-type": "application/json",
      },
      body: '{"title": "Unvollstaendiger JSON-Body"',
    };

    // Act
    const response = await fetch(`${baseUrl}/api/tasks`, requestOptions);
    const body = await response.json();
    const responseText = JSON.stringify(body);

    // Assert
    assert.equal(response.status, 400);
    assert.equal(body.error, "Ungültiges JSON");
    assert.equal(responseText.includes("stack"), false);
    assert.equal(responseText.includes(".js:"), false);
  });
});

/*
 * Regressionstest
 * Stellt sicher, dass der Eigentümer seinen Task weiterhin bearbeiten darf
 */
test("REGRESSION TC-09: Alice darf ihren eigenen Task weiterhin bearbeiten", async () => {
  await withServer(async ({ baseUrl }) => {
    // Arrange
    const requestOptions = {
      method: "PATCH",
      headers: {
        authorization: "Bearer token-alice",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        status: "DONE",
      }),
    };

    // Act
    const response = await fetch(`${baseUrl}/api/tasks/t1`, requestOptions);
    const body = await response.json();

    // Assert
    assert.equal(response.status, 200);
    assert.equal(body.id, "t1");
    assert.equal(body.ownerId, "u1");
    assert.equal(body.status, "DONE");
  });
});
