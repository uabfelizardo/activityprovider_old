require("dotenv").config();
const { Sequelize,DataTypes } = require('sequelize');

const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
app.use(express.json());

// Substitua essas variáveis pelas suas 
// credenciais reais do banco de dados PostgreSQL
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
const post = sequelize.define("obs",{
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

// As observacoes sao as analiticas que o utente vai realizadas
app.post("/create-obs", async(req,res) => {
    const {idade,genero,tem_tosse_seca,tem_tosse_com_pus,
           tem_tosse_com_sangue,tem_cansaco_excessivo,
           tem_febre_baixa,tem_sudorese_noturna,tem_falta_de_apetite,
           tem_palidez,tem_emagrecimento_acentuado,tem_rouquidao,
           tem_fraqueza
         }=req.body;

         try{
            const newPost = await post.create({idade,genero,tem_tosse_seca,tem_tosse_com_pus,
                tem_tosse_com_sangue,tem_cansaco_excessivo,
                tem_febre_baixa,tem_sudorese_noturna,tem_falta_de_apetite,
                tem_palidez,tem_emagrecimento_acentuado,tem_rouquidao,
                tem_fraqueza})
            
                res.json(newPost);
         
            }catch(err){
            console.log(err);
         }
});

app.get("/get-obs-all", async(req,res) => {
         try{

            const allPosts = await post.findAll();
            res.json(allPosts);
         
        }catch(err){
            console.log(err);
         }
});

app.get("/", (req, res) => res.type('html').send(html));

const server = app.listen(port, () => console.log(`Escutando apartir da port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

const html = `
<!DOCTYPE html> 
<html> 
<head> 
    <title> 
        Online LAB 
    </title> 
    <style>
    * {
      box-sizing: border-box;
    }

    input[type=text], select, textarea {
      width: 100%;
      padding: 12px;
      border: 1px solid #ccc;
      border-radius: 4px;
      resize: vertical;
    }

    label {
      padding: 12px 12px 12px 0;
      display: inline-block;
    }

    input[type=checkbox] {
      background-color: #3CBC8D;
      color: #3CBC8D;
      padding: 12px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      float: right;
      text-align: left;
    }

    input[type=submit] {
      background-color: #04AA6D;
      color: white;
      padding: 12px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      float: right;
    }

    input[type=submit]:hover {
      background-color: #45a049;
    }

    .container {
      border-radius: 5px;
      background-color: #f2f2f2;
      padding: 20px;
    }

    .col-25 {
      float: left;
      width: 25%;
      margin-top: 6px;
    }

    .col-75 {
      float: left;
      width: 75%;
      margin-top: 6px;
    }

    /* Limpe os carros alegóricos após as colunas */
    .row:after {
      content: "";
      display: table;
      clear: both;
    }

    /* 
      Layout responsivo - quando a tela tiver menos de 600 px 
      de largura, empilhe as duas colunas uma sobre a outra, 
      em vez de uma ao lado da outra 
    */
    @media screen and (max-width: 600px) {
      .col-25, .col-75, input[type=submit] {
        width: 100%;
        margin-top: 0;
      }
    }
    </style>
</head> 

<body style="text-align: left;"> 
    <section>
        Implementar um “Activity Provider” para auxiliar médico no rastreo e 
        acompanhamento de utentes com o risco de contaminação com doenças respiratórias 
        transmissíveis num laboratório remoto utilizando a Arquitetura Inven!RA.
    </section>
    
    <h3>
      Quais os sintomas tem?
    </h3>

    <div class="p-2">
      <form onsubmit="return handleData()" method="post" action="#">
      
      <label for="fname">Idade:</label>
      <input type="text" id="idade" name="idade" value="38"><br>
   
      <label for="genero">Genero:</label>
      <select id="genero" name="genero">
        <option value="feminino">Feminino</option>
        <option value="masculino">Masculino</option>
      </select>

      <div>
        <input type="checkbox" name="utente" id="utente_tem_tosse_seca" value="tem_tosse_seca" checked> <label for="utente_tem_tosse_seca">Tosse seca</label>
      </div>

      <div>
        <input type="checkbox" name="utente" id="utente_tem_tosse_com_pus" value="tem_tosse_com_pus"> <label for="utente_tem_tosse_com_pus">Tosse com pus</label>
      </div>

      <div>
        <input type="checkbox" name="utente" id="utente_tem_tosse_com_sangue" value="tem_tosse_com_sangue"> <label for="utente_tem_tosse_com_sangue">Tosse com sangue</label>
      </div>

      <div>
        <input type="checkbox" name="utente" id="utente_tem_cansaco_excessivo" value="tem_cansaco_excessivo"> <label for="utente_tem_cansaco_excessivo">Cansaco excessivo</label>
      </div>

      <div>
        <input type="checkbox" name="utente" id="utente_tem_febre_baixa" value="tem_febre_baixa"> <label for="utente_tem_febre_baixa">Febre baixa</label>
      </div>

      <div>
        <input type="checkbox" name="utente" id="utente_tem_sudorese_noturna" value="tem_sudorese_noturna"> <label for="utente_tem_sudorese_noturna">Sudores noturna</label>
      </div>

      <div>
      <input type="checkbox" name="utente" id="utente_tem_falta_de_apetite" value="tem_falta_de_apetite" > <label for="utente_tem_falta_de_apetite">Falta de apetite</label>
      </div>

      <div>
        <input type="checkbox" name="utente" id="utente_tem_palidez" value="tem_palidez"> <label for="utente_tem_palidez">Palidez</label>
      </div>

      <div>
        <input type="checkbox" name="utente" id="utente_tem_emagrecimento_acentuado" value="tem_emagrecimento_acentuado"> <label for="utente_tem_emagrecimento_acentuado">Emagrecimento acentuado</label>
      </div>

      <div>
        <input type="checkbox" name="utente" id="utente_tem_rouquidao" value="tem_rouquidao"> <label for="utente_tem_rouquidao">Rouquidao</label>
      </div>

      <div>
        <input type="checkbox" name="utente" id="utente_tem_fraqueza" value="tem_fraqueza"> <label for="utente_tem_fraqueza">Fraqueza</label>
      </div>

      <div>
        <input type="submit" name="submit" value="Submit"/>
      </div>

    <div>
</body> 
</html>
`