require("dotenv").config();
const { Sequelize,DataTypes } = require('sequelize');

const express = require("express");
const app = express();
// const handlebars = require("express-handlebars");
const bodyParser = require("body-parser")

// app.engine('handlebars',handlebars({ defaultLayout: 'index'}))
// app.set('view engine','handlebars');

const port = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json());
app.use(bodyParser.json())

// credenciais do banco de dados PostgreSQL
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
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

// Modelo de dados
const Obs = sequelize.define("obs",{
    idade:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    genero:{
        type:DataTypes.CHAR,
        allowNull:false
    },
    tem_tosse_seca:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    tem_tosse_com_pus:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    tem_tosse_com_sangue:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    tem_cansaco_excessivo:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    tem_febre_baixa:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    tem_sudorese_noturna:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    tem_falta_de_apetite:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    tem_palidez:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    tem_emagrecimento_acentuado:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    tem_rouquidao:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    tem_fraqueza:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
});

// Criar tabela usando sequelize
// Obs.sync({force: true});

// As observacoes sao as analiticas que o utente vai realizadas
app.post("/create-obs", async(req,res) => {
    // Inserir analiticas na tabela
      // Obs.create({
      //     idade:req.body.idade,
      //     genero:req.body.genero,
      //     tem_tosse_seca:req.body.tem_tosse_seca,
      //     tem_tosse_com_pus:req.body.tem_tosse_com_pus,
      //     tem_tosse_com_sangue:req.body.tem_tosse_com_sangue,
      //     tem_cansaco_excessivo:req.body.tem_cansaco_excessivo,
      //     tem_febre_baixa:req.body.tem_febre_baixa,
      //     tem_sudorese_noturna:req.body.tem_sudorese_noturna,
      //     tem_falta_de_apetite:req.body.tem_falta_de_apetite,
      //     tem_palidez:req.body.tem_palidez,
      //     tem_emagrecimento_acentuado:req.body.tem_emagrecimento_acentuado,
      //     tem_rouquidao:req.body.tem_rouquidao,
      //     tem_fraqueza:req.body.tem_fraqueza
      // }).then(function(){
      //   res.send("Analitica registada com sucesso!")
      // }).catch(function(err){
      //   res.send("Erro: Ocorreu um erro no ato do registo de uma analitica." + err)
      // });

      try{
          Obs.create({
            idade:req.body.idade,
            genero:req.body.genero,
            tem_tosse_seca:"0",
            tem_tosse_com_pus:"0",
            tem_tosse_com_sangue:"0",
            tem_cansaco_excessivo:"0",
            tem_febre_baixa:"0",
            tem_sudorese_noturna:"0",
            tem_falta_de_apetite:"0",
            tem_palidez:"0",
            tem_emagrecimento_acentuado:"0",
            tem_rouquidao:"0",
            tem_fraqueza:"0"
          }).then(function(){
            // res.send("Analitica registada com sucesso!")
            res.redirect("/get-analiticas")
          }).catch(function(err){
            res.send("Erro: Ocorreu um erro no ato do registo de uma analitica." + err)
          });
        }catch(err){
          console.log(err);
        }
  // Testar se o codigo retorna o valor
  // res.send("Idade : " + req.body.idade + "</br> Genero : " + req.body.genero + "</br> tem_tosse_seca: " + req.body.tem_tosse_seca)
});

// app.get("/get-analiticas", async(req,res) => {
//         try{

//           Obs.findAll().then(function(obs){
//             // res.render('analiticas',{obs: obs})
//             res.json(obs);
//           });
//             // const allPosts = await post.findAll();
//             // res.json(allPosts);
//         }catch(err){
//             console.log(err);
//         }
// });

app.get("/get-analiticas", async(req,res) => {
  try{
    //Retorna todas as analiticas feitas pelos utentes/doentes
    Obs.findAll().then(function(obs){
      res.json(obs);
    });
  }catch(err){
      console.log(err);
  }
});

// app.get("/", (req, res) => res.type('html').send(html));

app.get("/", function(req, res){
    res.sendFile(__dirname + '/src/index.html');
});

app.get("/form-atividade", function(req, res){
    res.sendFile(__dirname + '/src/form-atividade.html');
});

app.get("/deploy-atividade", function(req, res){
    res.sendFile(__dirname + '/src/deploy-atividade.html');
});

app.get("/analiticas", function(req, res){
    res.sendFile(__dirname + '/src/analiticas.html');
});

const server = app.listen(port, () => console.log(`Escutando apartir da port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;