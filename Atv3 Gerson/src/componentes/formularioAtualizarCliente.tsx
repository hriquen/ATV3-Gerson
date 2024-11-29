import React, { useState, useEffect } from "react";
import Cliente from "../modelos/Cliente";

type FormularioAtualizacaoClienteProps = {
  clienteSelecionado: Cliente | null;
  aoAtualizarCliente: (cliente: Cliente) => void;
  tema: string;
};

const FormularioAtualizacaoCliente: React.FC<FormularioAtualizacaoClienteProps> = ({
  clienteSelecionado,
  aoAtualizarCliente,
  tema,
}) => {
  const [nome, setNome] = useState<string>("");
  const [nomeSocial, setNomeSocial] = useState<string>("");
  const [cpf, setCpf] = useState<string>("");


  useEffect(() => {
    if (clienteSelecionado) {
      setNome(clienteSelecionado.getNome);
      setNomeSocial(clienteSelecionado.nomeSocial);
      setCpf(clienteSelecionado.getCpf.getValor); 
    }
  }, [clienteSelecionado]);

  const atualizarCliente = (e: React.FormEvent) => {
    e.preventDefault();
    if (clienteSelecionado) {
      clienteSelecionado.nome = nome;
      clienteSelecionado.nomeSocial = nomeSocial;
      // eslint-disable-next-line no-self-assign
      clienteSelecionado.cpf = clienteSelecionado.cpf; 
      aoAtualizarCliente(clienteSelecionado); 
      alert(`Cliente atualizado: ${nome}`);
    }
  };

  if (!clienteSelecionado) {
    return <p>Selecione um cliente para atualizar.</p>;
  }

  return (
    <div className="container-fluid">
      <h5 style={{ color: tema }}>Atualizar Cliente</h5>
      <form onSubmit={atualizarCliente}>
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
            disabled
          />
        </div>
        <button type="submit" className="btn btn-outline-secondary" style={{ background: tema }}>
          Atualizar Cliente
        </button>
      </form>
    </div>
  );
};

export default FormularioAtualizacaoCliente;
