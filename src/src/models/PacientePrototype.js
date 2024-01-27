// Objeto protótipo para rastreo do paciente
export const RastreoPaciente = {
    idade:0,
    genero:'',
    tem_tosse_seca:0,
    tem_tosse_com_pus:0,
    tem_tosse_com_sangue:0,
    tem_cansaco_excessivo:0,
    tem_febre_baixa:0,
    tem_sudorese_noturna:0,
    tem_falta_de_apetite:0,
    tem_palidez:0,
    tem_emagrecimento_acentuado:0,
    tem_rouquidao:0,
    tem_fraqueza:0,
  
    clone: function () {
      // Cria um novo objeto com os mesmos atributos do protótipo
      const pacienteClonado = Object.create(this);
      return pacienteClonado;
    },
  
    // Método para configurar os dados do paciente
    configure: function (idade, genero,tem_tosse_seca,tem_tosse_com_pus,tem_tosse_com_sangue,
      tem_cansaco_excessivo,tem_febre_baixa,tem_sudorese_noturna,tem_falta_de_apetite,
      tem_palidez,tem_emagrecimento_acentuado,tem_rouquidao,tem_fraqueza) {
      this.idade=idade;
      this.genero=genero;
      this.tem_tosse_seca=tem_tosse_seca;
      this.tem_tosse_com_pus=tem_tosse_com_pus;
      this.tem_tosse_com_sangue=tem_tosse_com_sangue;
      this.tem_cansaco_excessivo=tem_cansaco_excessivo;
      this.tem_febre_baixa=tem_febre_baixa;
      this.tem_sudorese_noturna=tem_sudorese_noturna;
      this.tem_falta_de_apetite=tem_falta_de_apetite;
      this.tem_palidez=tem_palidez;
      this.tem_emagrecimento_acentuado=tem_emagrecimento_acentuado;
      this.tem_rouquidao=tem_rouquidao;
      this.tem_fraqueza=tem_fraqueza;
    }
  };
  
  // Exportar a classe PacientePrototype para uso em outras classes
  export default { RastreoPaciente };