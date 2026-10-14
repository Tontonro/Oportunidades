const app = require("./app");
const { sequelize, Oportunidade } = require("./models");

const dadosIniciais = [
  ["Bolsa de extensão", "Universidade Federal", "Bolsa", "2026-10-15", "Apoio a projetos de extensão universitária com acompanhamento de docentes."],
  ["Estágio em TI", "Núcleo Tech", "Estágio", "2026-10-22", "Vaga para estudantes interessados em desenvolvimento e suporte de sistemas."],
  ["Curso de férias", "Instituto de Formação", "Curso", "2026-11-05", "Curso intensivo de ferramentas digitais e preparação profissional."],
  ["Programa de monitoria", "Universidade Federal", "Monitoria", "2026-11-18", "Seleção de estudantes para apoiar atividades acadêmicas."],
  ["Seleção para projeto", "Laboratório Inova", "Processo seletivo", "2026-12-02", "Oportunidade para participar de um projeto de inovação aplicada."],
  ["Oficina externa", "Centro Cultural", "Oficina", "2026-12-15", "Oficina prática aberta à comunidade sobre comunicação e criatividade."]
];

async function iniciar() {
  await sequelize.sync();
  if (await Oportunidade.count() === 0) {
    await Oportunidade.bulkCreate(dadosIniciais.map(([titulo, instituicao, modalidade, prazo, descricao]) => ({
      titulo, instituicao, modalidade, prazo, descricao
    })));
  }
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Aplicação disponível em http://localhost:${port}`));
}

if (require.main === module) iniciar().catch((error) => {
  console.error("Não foi possível iniciar a aplicação.", error);
  process.exitCode = 1;
});

module.exports = { iniciar };
