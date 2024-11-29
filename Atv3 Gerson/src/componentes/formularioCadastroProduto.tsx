import React, { useState } from "react";
import Produto from "../modelos/Produto";

type FormularioCadastroProdutoProps = {
  adicionarProduto: (produto: Produto) => void;
  tema: string;
};

const FormularioCadastroProduto: React.FC<FormularioCadastroProdutoProps> = ({ adicionarProduto, tema }) => {
  const [nomeProduto, setNomeProduto] = useState("");
  const [valor, setValor] = useState("");

  const cadastrarProduto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nomeProduto || !valor) {
      alert("Nome do produto e valor são obrigatórios!");
      return;
    }
    const novoProduto = new Produto(nomeProduto, valor);
    adicionarProduto(novoProduto);
    setNomeProduto("");
    setValor("");
  };

  return (
    <div className="container-fluid">
      <form onSubmit={cadastrarProduto}>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Nome do Produto"
            value={nomeProduto}
            onChange={(e) => setNomeProduto(e.target.value)}
          />
        </div>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Valor"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-outline-secondary" style={{ background: tema }}>
          Cadastrar Produto
        </button>
      </form>
    </div>
  );
};

export default FormularioCadastroProduto;
