import { Sequelize, DataTypes } from 'sequelize';
import db from "../db.js";


const Paceinte = db.define("sintomasutente", {
nome_paciente:{
        type:DataTypes.INTEGER,
        allowNull:false
},
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
tem_sudores_noturna:{
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
estado: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'NaoRastreado', // Estado inicial
  },
});

export default Paceinte;