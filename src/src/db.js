import { Sequelize, DataTypes } from 'sequelize'; // importar o sequelize
import dotenv from "dotenv/config.js"; // importar o dotenv para localizar as variáveis de ambiente

const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: 'postgres',
  ssl: true, // Abilitar o  SSL/TLS
  dialectOptions: {
    ssl: {
      require: true // Abilitar o  SSL/TLS
    }
  }
});

// Testar a conexao
sequelize
  .authenticate()
  .then(() => {
    console.log('A conexao foi estabelecida com successo.');
  })
  .catch((err) => {
    console.error('Nao foi possivel fazer a conexo com a base de dados:', err);
  });

export default sequelize; //exportar
