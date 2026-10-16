const test = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");
const app = require("../app");
const { sequelize, Oportunidade } = require("../models");

test.before(async () => {
  await sequelize.sync({ force: true });
  await Oportunidade.create({ titulo: "Bolsa de extensão", instituicao: "Universidade Federal", modalidade: "Bolsa", prazo: "2026-10-15", descricao: "Projeto de extensão." });
});
test.after(async () => sequelize.close());

test("renderiza a página inicial", async () => {
  const response = await request(app).get("/");
  assert.equal(response.status, 200);
  assert.match(response.text, /Oportunidades/);
});
test("mantém os caminhos do wireframe e o link Sobre funcionais", async () => {
  assert.equal((await request(app).get("/inicio")).status, 200);
  assert.equal((await request(app).get("/lista")).status, 200);
  assert.equal((await request(app).get("/detalhes/1")).status, 200);
  assert.equal((await request(app).get("/sobre")).status, 200);
});
test("responde saúde em JSON", async () => {
  const response = await request(app).get("/saude");
  assert.deepEqual(response.body, { status: "ok" });
});
test("lista oportunidades", async () => {
  const response = await request(app).get("/oportunidades");
  assert.equal(response.status, 200);
  assert.match(response.text, /Bolsa de extensão/);
});
test("detalha registro existente", async () => {
  const response = await request(app).get("/oportunidades/1");
  assert.equal(response.status, 200);
  assert.match(response.text, /Projeto de extensão/);
});
test("trata ids inválidos e inexistentes", async () => {
  assert.equal((await request(app).get("/oportunidades/abc")).status, 404);
  assert.equal((await request(app).get("/oportunidades/99999")).status, 404);
});
test("trata rota desconhecida", async () => {
  const response = await request(app).get("/rota-inexistente");
  assert.equal(response.status, 404);
  assert.match(response.text, /Oportunidade indisponível/);
});
