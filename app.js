require("dotenv").config();
const { Sequelize } = require('sequelize');

const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

// Replace these variables with your actual PostgreSQL database credentials
const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: 'postgres',
  ssl: true, // Enable SSL/TLS
  dialectOptions: {
    ssl: {
      require: true // Require SSL/TLS
    }
  }
});

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

app.get("/", (req, res) => res.type('html').send(html));

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

const html = `
<!DOCTYPE html>
<html>
  <head>
    <title>Hello from Render!</title>
  </head>
  <body>
    <section>
      Hello from Render!
    </section>
  </body>
</html>
`