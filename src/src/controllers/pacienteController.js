import PacienteRepository from "../models/pacienteModel.js";
import { RastreoPaciente } from "../models/PacientePrototype.js"; // Importar o protótipo exportado
import { RastreamentoFacade } from "../services/PacienteFachadaService.js"; // Importar o protótipo exportado
import { EstadoTuberculose } from "../models/EstadoTuberculose.js"

async function findAll(req, res) {
  PacienteRepository.findAll().then((result) => res.json(result));
}

async function findPaciente(req, res) {
  PacienteRepository.findByPk(req.params.id).then((result) => res.json(result));
}

async function addPaciente(req, res) {
  const date = new Date();
  try {

    // Testar se o codigo retorna o valor
    // res.send("Idade : " + req.body.idade + "</br> Genero : " + req.body.genero + "</br> tem_tosse_seca: " + req.body.tem_tosse_seca);

    // Criar um novo paciente usando o protótipo/clone
    const novoPaciente = RastreoPaciente.clone();
    
    novoPaciente.configure(
      req.body.idade,
      req.body.genero,
      req.body.tem_tosse_seca,
      req.body.tem_tosse_com_pus,
      req.body.tem_tosse_com_sangue,
      req.body.tem_cansaco_excessivo,
      req.body.tem_febre_baixa,
      req.body.tem_sudores_noturna,
      req.body.tem_falta_de_apetite,
      req.body.tem_palidez,
      req.body.tem_emagrecimento_acentuado,
      req.body.tem_rouquidao,
      req.body.tem_fraqueza
    );

    // Adicionar o novo paciente/clone na base de dados
    const pacienteData = {
      idade: novoPaciente.idade,
      genero: novoPaciente.genero,
      tem_tosse_seca: novoPaciente.tem_tosse_seca,
      tem_tosse_com_pus: novoPaciente.tem_tosse_com_pus,
      tem_tosse_com_sangue: novoPaciente.tem_tosse_com_sangue,
      tem_cansaco_excessivo: novoPaciente.tem_cansaco_excessivo,
      tem_febre_baixa: novoPaciente.tem_febre_baixa,
      tem_sudores_noturna: novoPaciente.tem_sudores_noturna || 0,
      tem_falta_de_apetite: novoPaciente.tem_falta_de_apetite,
      tem_palidez: novoPaciente.tem_palidez,
      tem_emagrecimento_acentuado: novoPaciente.tem_emagrecimento_acentuado,
      tem_rouquidao: novoPaciente.tem_rouquidao,
      tem_fraqueza: novoPaciente.tem_fraqueza,
    };

    // Chamar o método do PacienteRepository para adicionar o paciente ao banco de dados
    const result = await PacienteRepository.create(pacienteData);

     // Fazer a chamada da fachada para realizar o rastreamento completo do paciente
    const facade = new RastreamentoFacade();
     facade.realizarRastreamentoCompleto(
       result.id,
       date,
       'Resultados dos exames...'
     );

     //Usar o padrao de comportamento State
    const estadoTuberculose = new EstadoTuberculose(Utente);
    estadoTuberculose.realizarRastreamentoCompleto(123, new Date(), 'positivo');
    
    res.json(result);

  } catch (error) {
    console.error('Erro:', error);
    res.status(500).json({ error: 'Erro ao criar um novo paciente' });
  }
}

async function updatePaciente(req, res) {
  await PacienteRepository.update(
    {
      idade: req.body.idade,
      genero: req.body.genero,
      tem_tosse_seca: req.body.tem_tosse_seca,
      tem_tosse_com_pus: req.body.tem_tosse_com_pus,
      tem_tosse_com_sangue: req.body.tem_tosse_com_sangue,
      tem_cansaco_excessivo: req.body.tem_cansaco_excessivo,
      tem_febre_baixa: req.body.tem_febre_baixa,
      tem_sudores_noturna: req.body.tem_sudores_noturna,
      tem_falta_de_apetite: req.body.tem_falta_de_apetite,
      tem_palidez: req.body.tem_palidez,
      tem_emagrecimento_acentuado: req.body.tem_emagrecimento_acentuado,
      tem_rouquidao: req.body.tem_rouquidao,
      tem_fraqueza: req.body.tem_fraqueza,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  );

  PacienteRepository.findByPk(req.params.id).then((result) => res.json(result));
}

async function deletePaciente(req, res) {
  await PacienteRepository.destroy({
    where: {
      id: req.params.id,
    },
  });

  PacienteRepository.findAll().then((result) => res.json(result));
}

export default { findAll, addPaciente, findPaciente, updatePaciente, deletePaciente };
