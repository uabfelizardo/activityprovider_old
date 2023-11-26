require("dotenv").config();
const { Sequelize } = require('sequelize');

const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

// Replace these variables with your actual PostgreSQL database credentials
const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: 'postgres',
  ssl: true, // Abilitar o  SSL/TLS
  dialectOptions: {
    ssl: {
      require: true // Abilitar SSL/TLS
    }
  }
});

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Conexao estabelicida com sucesso.');
  })
  .catch((err) => {
    console.error('Nao foi possivel fazer a ligacao a base de dados:', err);
  });

app.get("/", (req, res) => res.type('html').send(html));

const server = app.listen(port, () => console.log(`Aplicacao escutando na port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

const html = `
<!DOCTYPE html>
<html>
  <head>
    <title>Online LAB</title>
  </head>
  <body>
    <section>
      Implementar um “Activity Provider” para auxiliar médico no rastreo e 
      acompanhamento de utentes com o risco de contaminação com doenças respiratórias 
      transmissíveis num laboratório remoto utilizando a Arquitetura Inven!RA.
    </section>
  </body>
</html>
`
