# Oportunidades

Aplicação web para divulgação de bolsas, estágios, cursos e processos seletivos para estudantes.

## Tecnologias

Node.js, Express, Handlebars, Sequelize e SQLite.

## Instalação e execução

```bash
npm install
npm start
```

As variáveis de ambiente disponíveis estão documentadas em
[`.env.example`](./.env.example). Configure-as no ambiente antes de iniciar a
aplicação. A porta padrão é `3000` e pode ser alterada com `PORT`; o caminho do
banco SQLite pode ser alterado com `DATABASE_PATH`.

No Windows PowerShell:

```powershell
$env:PORT = "3000"
$env:DATABASE_PATH = ".\oportunidades.sqlite"
npm start
```

No Linux/macOS:

```bash
PORT=3000 DATABASE_PATH=./oportunidades.sqlite npm start
```

Para executar os testes:

```bash
npm test
```

## Rotas

- `GET /` - página inicial com três destaques;
- `GET /saude` - diagnóstico JSON;
- `GET /oportunidades` - listagem ordenada por prazo crescente;
- `GET /oportunidades/:id` - detalhamento;
- qualquer rota desconhecida - página 404 contextualizada.

## Organização

`models/` contém a entidade `Oportunidade` e a conexão SQLite; `routes/` concentra o controle; `views/` contém layout, partial, páginas e erros; `public/` contém os arquivos estáticos; `test/` contém os testes automatizados.

Os seis registros iniciais são criados apenas quando o banco está vazio. O layout segue os quatro wireframes do Grupo 05, com identidade verde, listagem horizontal, prazo destacado e painel lateral no detalhamento.
