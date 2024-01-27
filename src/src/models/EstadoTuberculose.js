class EstadoTuberculose {
  constructor(utenteModel) {
    this.utenteModel = utenteModel;
  }

  async realizarRastreamentoCompleto(id, date, resultadosExames) {
    const utente = await this.utenteModel.findByPk(id);

    if (resultadosExames === 'positivo') {
      console.log(`Rastreamento positivo. O Utente agora é um Paciente.`);
      // Atualiza o estado para "Paciente"
      await utente.update({ estado: 'Paciente' });
    } else {
      console.log('Rastreamento negativo. O Utente continua no estado Utente.');
      await utente.update({ estado: 'Utente' });
    }
  }
}

export { EstadoTuberculose }
