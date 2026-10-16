const express = require("express");
const { engine } = require("express-handlebars");
const routes = require("./routes");

const app = express();

function diasRestantes(data) {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  const prazo = new Date(`${data}T00:00:00`);
  return Math.max(0, Math.ceil((prazo - hoje) / 86400000));
}

app.engine("hbs", engine({
  extname: ".hbs",
  helpers: {
    formatarData: (data) => new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit", month: "2-digit", year: "numeric"
    }).format(new Date(`${data}T00:00:00`)),
    diasRestantes
  }
}));
app.set("view engine", "hbs");
app.set("views", "./views");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
});
app.use(routes);
app.use((req, res) => res.status(404).render("404"));
app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).render("erro");
});

module.exports = app;
