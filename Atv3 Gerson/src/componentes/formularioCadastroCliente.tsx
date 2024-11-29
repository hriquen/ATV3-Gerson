import React, { useState } from "react";
import Cliente from "../modelos/Cliente";
import CPF from "../modelos/CPF";
import Telefone from "../modelos/Telefone";

type FormularioCadastroClienteProps = {
  adicionarCliente: (cliente: Cliente) => void;
  tema: string;
};

const FormularioCadastroCliente: React.FC<FormularioCadastroClienteProps> = ({ adicionarCliente, tema }) => {
  const [nome, setNome] = useState("");
  const [nomeSocial, setNomeSocial] = useState("");
  const [cpf, setCpf] = useState("");
  const [ddd, setDdd] = useState("");
  const [numero, setNumero] = useState("");

  const cadastrarCliente = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome || !cpf || !ddd || !numero) {
      alert("Nome, CPF e Telefone são obrigatórios!");
      return;
    }
    const novoCliente = new Cliente(nome, nomeSocial, new CPF(cpf, new Date()));
    const novoTelefone = new Telefone(ddd, numero);
    novoCliente.adicionarTelefone(novoTelefone);
    adicionarCliente(novoCliente);
    setNome("");
    setNomeSocial("");
    setCpf("");
    setDdd("");
    setNumero("");
  };

  return (
    <div className="container-fluid">
      <form onSubmit={cadastrarCliente}>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Nome Social"
            value={nomeSocial}
            onChange={(e) => setNomeSocial(e.target.value)}
          />
        </div>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="CPF"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />
        </div>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="DDD"
            value={ddd}
            onChange={(e) => setDdd(e.target.value)}
          />
        </div>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Número"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-outline-secondary" style={{ background: tema }}>
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default FormularioCadastroCliente;

  