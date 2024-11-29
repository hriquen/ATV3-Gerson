import React, { useState } from "react";
import BarraNavegacao from "./barraNavegacao";
import ListaCliente from "./listaCliente";
import FormularioCadastroCliente from "./formularioCadastroCliente";
import Cliente from "../modelos/Cliente";
import Produto from "../modelos/Produto";
import ListaProduto from "./listaProduto";
import FormularioCadastroProduto from "./formularioCadastroProduto";
import ListaPet from "./listaPet";
import FormularioCadastroPet from "./formularioCadastroPet";
import Pet from "../modelos/Pet";
import RegistroCompraCliente from "./registroCompra";
import FormularioAtualizacaoCliente from "./formularioAtualizarCliente"; 
import FormularioAtualizacaoPet from "./formularioAtualizarPet";
import FormularioAtualizacaoProduto from "./formularioAtualizarProduto";

const Roteador: React.FC = () => {
  const [tela, setTela] = useState("Clientes");
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [clienteSelecionado, setClienteSelecionado] = useState<Cliente | null>(null);
  const [petSelecionado, setPetSelecionado] = useState<Pet | null>(null);
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [pets, setPets] = useState<Pet[]>([]);

  const selecionarClienteParaAtualizacao = (cliente: Cliente) => {
    setClienteSelecionado(cliente);
    setTela("Atualizar Cliente");
  };
  const selecionarPetParaAtualização = (pet : Pet) => {
    setPetSelecionado(pet);
    setTela("Atualizar Pet")
  }
  const selecionarProdutoParaAtualização = (produto : Produto) => {
    setProdutoSelecionado(produto);
    setTela("Atualizar Produto")
  }


  const adicionarCliente = (cliente: Cliente) => {
    setClientes([...clientes, cliente]);
  };

  const adicionarProduto = (produto: Produto) => {
    setProdutos([...produtos, produto]);
  };
  const excluirCliente = (cpf: string) => {
    setClientes(clientes.filter((cliente) => cliente.getCpf.getValor !== cpf));
  };

  const excluirPet = (nome: string) => {
    setPets(pets.filter((pet) => pet.getNome !== nome));
  };

  const excluirProduto = (nomeProduto: string) => {
    setProdutos(produtos.filter((produto) => produto.getNomeProduto !== nomeProduto));
  };

  const adicionarPet = (pet: Pet, dono: Cliente) => {
    dono.adicionarPet(pet);
    setPets([...pets, pet]);
  };

  const registrarCompra = (cliente: Cliente, produto: Produto, quantidade: number) => {
    cliente.adicionarProdutoConsumido(produto, quantidade);
  };

  const atualizarCliente = (clienteAtualizado: Cliente) => {
    setClientes(
      clientes.map((cliente) =>
        cliente.getCpf.getValor === clienteAtualizado.getCpf.getValor ? clienteAtualizado : cliente
      )
    );
    setClienteSelecionado(null); 
  };
  const atualizarPet = (petAtualizado: Pet) => {
    setPets(
      pets.map((pet) =>
        pet.getNome === petAtualizado.getNome ? petAtualizado : pet
      )
    );
    setPetSelecionado(null);
  };
  const atualizarProduto = (produtoAtualizado: Produto) => {
    setProdutos(
      produtos.map((produto) =>
        produto.getNomeProduto === produtoAtualizado.getNomeProduto
          ? produtoAtualizado
          : produto
      )
    );
    setProdutoSelecionado(null);
  };
  

  const construirView = () => {
    switch (tela) {
      case "Clientes":
        return (
          <ListaCliente
            clientes={clientes}
            tema="#e3f2fd"
            setClienteSelecionado={selecionarClienteParaAtualizacao}
            aoExcluirCliente={excluirCliente}
          />
        );
      case "Cadastros Clientes":
        return <FormularioCadastroCliente adicionarCliente={adicionarCliente} tema="#e3f2fd" />;
      case "Pets":
        return <ListaPet pets={pets} clientes ={clientes} setPetSelecionado={selecionarPetParaAtualização} aoExcluirPet={excluirPet} tema="#e3f2fd" />;
      case "Cadastros Pets":
        return <FormularioCadastroPet clientes={clientes} aoCadastrarPet={adicionarPet} tema="#e3f2fd" />;
      case "Produtos":
        return <ListaProduto produtos={produtos} setProdutoSelecionado={selecionarProdutoParaAtualização} tema="#e3f2fd" aoExcluirProduto={excluirProduto} />;
      case "Cadastros Produtos":
        return <FormularioCadastroProduto adicionarProduto={adicionarProduto} tema="#e3f2fd" />;
      case "Registrar Compra":
        return <RegistroCompraCliente clientes={clientes} produtos={produtos} aoRegistrarCompra={registrarCompra} tema="#e3f2fd" />;
      case "Atualizar Cliente":
        return (
          <FormularioAtualizacaoCliente
            clienteSelecionado={clienteSelecionado}
            aoAtualizarCliente={atualizarCliente}
            tema="#e3f2fd"
          />
        );
        case "Atualizar Pet":
          return (
            <FormularioAtualizacaoPet
              petSelecionado={petSelecionado}
              aoAtualizarPet={atualizarPet}
              tema="#e3f2fd" clientes={[]}            />
          );
          case "Atualizar Produto":
        return (
          <FormularioAtualizacaoProduto
            produtoSelecionado={produtoSelecionado}
            aoAtualizarProduto={atualizarProduto}
            tema="#e3f2fd"
          />
        );
          
      default:
        return null;
    }
  };

  return (
    <>
      <BarraNavegacao
        seletorView={setTela}
        tema="#e3f2fd"
        botoes={[
          "Clientes",
          "Cadastros Clientes",
          "Pets",
          "Cadastros Pets",
          "Produtos",
          "Cadastros Produtos",
          "Registrar Compra",
        ]}
      />
      {construirView()}
    </>
  );
};

export default Roteador;
