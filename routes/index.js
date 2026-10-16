const express = require("express");
const { Oportunidade } = require("../models");

const router = express.Router();

async function renderInicio(req, res, next) {
  try {
    const destaques = await Oportunidade.findAll({
      order: [["prazo", "ASC"]],
      limit: 3,
      raw: true
    });
    res.render("index", { destaques });
  } catch (error) {
    next(error);
  }
}

async function renderLista(req, res, next) {
  try {
    const oportunidades = await Oportunidade.findAll({ order: [["prazo", "ASC"]], raw: true });
    res.render("oportunidades/listar", { oportunidades });
  } catch (error) {
    next(error);
  }
}

async function renderDetalhamento(req, res, next) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) return res.status(404).render("404");

  try {
    const oportunidade = await Oportunidade.findByPk(id);
    if (!oportunidade) return res.status(404).render("404");
    res.render("oportunidades/detalhar", { oportunidade: oportunidade.get({ plain: true }) });
  } catch (error) {
    next(error);
  }
}

router.get(["/", "/inicio"], renderInicio);

router.get("/saude", (req, res) => res.json({ status: "ok" }));

router.get(["/oportunidades", "/lista"], renderLista);
router.get("/sobre", (req, res) => res.render("sobre"));

router.get(["/oportunidades/:id", "/detalhes/:id"], renderDetalhamento);

module.exports = router;
