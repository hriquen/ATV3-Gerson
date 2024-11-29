import React, { useState } from "react";
import Cliente from "../modelos/Cliente";
import Produto from "../modelos/Produto";

type RegistrarCompraProps = {
  clientes: Cliente[];
  produtos: Produto[];
  aoRegistrarCompra: (cliente: Cliente, produto: Produto, quantidade: number) => void;
  tema: string;
};

const RegistrarCompra: React.FC<RegistrarCompraProps> = ({ clientes, produtos, aoRegistrarCompra, tema }) => {
  const [clienteSelecionado, setClienteSelecionado] = useState<Cliente | null>(null);
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null);
  const [quantidade, setQuantidade] = useState(1);

  const registrarCompra = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clienteSelecionado || !produtoSelecionado || quantidade <= 0) {
      alert("Por favor, selecione um cliente, um produto e insira uma quantidade válida.");
      return;
    }

    aoRegistrarCompra(clienteSelecionado, produtoSelecionado, quantidade);
    alert(`Compra registrada: ${clienteSelecionado.getNome} comprou ${quantidade}x ${produtoSelecionado.getNomeProduto}.`);
    setQuantidade(1);
  };

  return (
    <div className="container-fluid">
      <form onSubmit={registrarCompra}>
        <div className="input-group mb-3">
          <select
            className="form-control"
            onChange={(e) => setClienteSelecionado(clientes[parseInt(e.target.value)])}
            defaultValue=""
          >
            <option value="" disabled>
              Selecione um Cliente
            </option>
            {clientes.map((cliente, index) => (
              <option key={index} value={index}>
                {cliente.getNome}
              </option>
            ))}
          </select>
        </div>
        <div className="input-group mb-3">
          <select
            className="form-control"
            onChange={(e) => setProdutoSelecionado(produtos[parseInt(e.target.value)])}
            defaultValue=""
          >
            <option value="" disabled>
              Selecione um Produto
            </option>
            {produtos.map((produto, index) => (
              <option key={index} value={index}>
                {produto.getNomeProduto}
              </option>
            ))}
          </select>
        </div>
        <div className="input-group mb-3">
          <input
            type="number"
            className="form-control"
            placeholder="Quantidade"
            value={quantidade}
            onChange={(e) => setQuantidade(Number(e.target.value))}
          />
        </div>
        <button type="submit" className="btn btn-outline-secondary" style={{ background: tema }}>
          Registrar Compra
        </button>
      </form>
    </div>
  );
};

export default RegistrarCompra;
