import express from "express";
import routes from "./routes.js";
import db from "./src/db.js";
// import handlebar from "express-handlebars"
// import bodyParser from 'body-parser';
// import { urlencoded, json as _json } from "body-parser";
import bodyParser from "body-parser";
const { urlencoded, json: _json } = bodyParser;

const app = express();
// app.engine('handlebars',handlebar);

app.use(express.json());
app.use(routes);
// app.set('view engine','handlebars')
// app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.urlencoded({ extended: false }))

db.sync(() => console.log(`Banco de dados conectado: ${process.env.DB_NAME}`));

const port = process.env.PORT || 3001;
app.listen(port, () => console.log("Servidor iniciado na porta " + port + "|3001"));