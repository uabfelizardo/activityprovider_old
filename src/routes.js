import express from "express";
import paciente from "./src/controllers/pacienteController.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as http from 'http';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const routes = express.Router();


routes.get("/paciente", paciente.findAll);
routes.post("/paciente", paciente.addPaciente);
routes.get("/paciente/:id", paciente.findPaciente);
routes.put("/paciente/:id", paciente.updatePaciente);
routes.delete("/paciente/:id", paciente.deletePaciente);

routes.get("/", function(req, res){
    res.sendFile(__dirname + '/src/pages/index.html');
});

routes.get("/form-atividade", function(req, res){
    res.sendFile(__dirname + '/src/pages/form-atividade.html');
});

routes.get("/deploy-atividade", function(req, res){
    res.sendFile(__dirname + '/src/pages/deploy-atividade.html');
});

routes.get("/analiticas", function(req, res){
    res.sendFile(__dirname + '/src/pages/analiticas.html');
});

// Para ajustar aos pedido do Inven!RA
routes.get("/analiticas", paciente.findAll);

const json_params_url = JSON.stringify([
    {
    "activityID": "Identificador da instância da atividade na Inven!RA",
    "Inven!UtenteID": "Este texto é o identificador de estudante/formando na Inven!RA",
        "json_params": {
        "idade" : "Parâmetro de pergunta a idade do utente",
        "genero" : "Parâmetro de pergunta o genero do utente",
        "tem_tosse_seca" : "Parâmetro de pergunta se o utente tem tosse seca",
        "tem_tosse_com_pus" : "Parâmetro de pergunta se o utente tem tosse com pus",
        "tem_tosse_com_sangue" : "Parâmetro de pergunta se o utente tem tosse com sangue",
        "tem_cansaco_excessivo" : "Parâmetro de pergunta se o utente tem cansaco excessivo",
        "tem_febre_baixa" : "Parâmetro de pergunta se o utente tem febre baixa",
        "tem_sudorese_noturna" : "Parâmetro de pergunta se o utente tem noturna",
        "tem_falta_de_apetite" : "Parâmetro de pergunta se o utente tem falta de apetite",
        "tem_palidez" : "Parâmetro de pergunta se o utente tem palidez",
        "tem_emagrecimento_acentuado" : "Parâmetro de pergunta se o utente tem emagrecimento acentuado",
        "tem_rouquidao" : "Parâmetro de pergunta se o utente tem rouquidao",
        "tem_fraqueza" : "Parâmetro de pergunta se o utente tem fraqueza"
        }
    }
]);

routes.get("/parametros_da_atividade", function(req, res){
    res.send(json_params_url)
});

const analytics_list_url = JSON.stringify([
    {
    "inveniraUtenteID": "1xxx",
        "utenteAnalytics": [
            {"name": "idade","type": "integer"},
            {"name": "genero","type": "char"},
            {"name": "tem_tosse_seca","type": "boolean", "value": true},
            {"name": "tem_tosse_com_pus","type": "boolean", "value": true},
            {"name": "tem_tosse_com_sangue","type": "boolean", "value": true},
            {"name": "tem_cansaco_excessivo","type": "boolean", "value": true},
            {"name": "tem_febre_baixa","type": "boolean", "value": true},
            {"name": "tem_sudorese_noturna","type": "boolean", "value": true},
            {"name": "tem_falta_de_apetite","type": "boolean", "value": true},
            {"name": "tem_palidez","type": "boolean", "value": true},
            {"name": "tem_emagrecimento_acentuado","type": "boolean", "value": true},
            {"name": "tem_rouquidao","type": "boolean", "value": true},
            {"name": "tem_fraqueza","type": "boolean", "value": true}
        ]
    }
]);
routes.get("/paramentros_da_analiticas", function(req, res){
    res.send(analytics_list_url)
});

export { routes as default };
