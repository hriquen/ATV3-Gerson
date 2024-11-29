import React, { useState, useEffect } from "react";
import Produto from "../modelos/Produto";

type FormularioAtualizacaoProdutoProps = {
  produtoSelecionado: Produto | null;
  aoAtualizarProduto: (produto: Produto) => void;
  tema: string;
};

const FormularioAtualizacaoProduto: React.FC<FormularioAtualizacaoProdutoProps> = ({
  produtoSelecionado,
  aoAtualizarProduto,
  tema,
}) => {
  const [nome, setNome] = useState<string>("");
  const [valor, setValor] = useState<string>("");

  useEffect(() => {
    if (produtoSelecionado) {
      setNome(produtoSelecionado.getNomeProduto);
      setValor(produtoSelecionado.getValor);
    }
  }, [produtoSelecionado]);

  const atualizarProduto = (e: React.FormEvent) => {
    e.preventDefault();
    if (produtoSelecionado) {
      produtoSelecionado.setNomeProduto = nome;
      produtoSelecionado.setValor = valor;

      aoAtualizarProduto(produtoSelecionado);
      alert(`Produto atualizado: ${nome}`);
    }
  };

  if (!produtoSelecionado) {
    return <p>Selecione um produto para atualizar.</p>;
  }

  return (
    <div className="container-fluid">
      <h5 style={{ color: tema }}>Atualizar Produto</h5>
      <form onSubmit={atualizarProduto}>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Nome do Produto"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>
        <div className="input-group mb-3">
          <input
            type="number"
            className="form-control"
            placeholder="Valor"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-outline-secondary" style={{ background: tema }}>
          Atualizar Produto
        </button>
      </form>
    </div>
  );
};

export default FormularioAtualizacaoProduto;
