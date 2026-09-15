const test = require("node:test");
const assert = require("node:assert/strict");
const http = require("node:http");
const { createStore } = require("../src/store");
const { createHandler } = require("../src/app");

// Hilfsfunktion, um einen temporären Server für Integrationstests zu starten
async function withServer(fn) {
  // Erstellt einen neuen Store und einen HTTP-Server
  const store = createStore();
  const server = http.createServer(createHandler(store));
  // Startet den Server auf einem zufälligen Port
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  const baseUrl = `http://127.0.0.1:${address.port}`;
  // Führt die Testfunktion aus und schließt den Server danach
  try {
    await fn({ baseUrl, store });
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
}
// Integrationstest: Health-Check-Endpunkt
test("health endpoint liefert Status ok", async () => {
  await withServer(async ({ baseUrl }) => {
    const response = await fetch(`${baseUrl}/api/health`);
    assert.equal(response.status, 200);
    const body = await response.json();
    assert.equal(body.status, "ok");
  });
});

// Testet einen gültigen Login
test("gueltiger Login liefert Token", async () => {
  await withServer(async ({ baseUrl }) => {
    const response = await fetch(`${baseUrl}/api/login`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        email: "alice@example.test",
        password: "Start123!",
      }),
    });
    assert.equal(response.status, 200);
    const body = await response.json();
    assert.equal(body.token, "token-alice");
    assert.equal(body.user.role, "employee");
  });
});

test("admin sieht die vorhandenen Tasks", async () => {
  await withServer(async ({ baseUrl }) => {
    const response = await fetch(`${baseUrl}/api/tasks`, {
      headers: { authorization: "Bearer token-admin" },
    });
    assert.equal(response.status, 200);
    const body = await response.json();
    assert.equal(body.items.length, 2);
  });
});

test("gueltiger Task kann erstellt werden", async () => {
  await withServer(async ({ baseUrl }) => {
    const response = await fetch(`${baseUrl}/api/tasks`, {
      method: "POST",
      headers: {
        authorization: "Bearer token-alice",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        title: "Regression vorbereiten",
        priority: "HIGH",
        dueDate: "2026-09-30",
      }),
    });
    assert.equal(response.status, 201);
    const body = await response.json();
    assert.equal(body.ownerId, "u1");
    assert.equal(body.priority, "HIGH");
  });
});
