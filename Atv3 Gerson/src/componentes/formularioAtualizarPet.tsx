import React, { useState, useEffect } from "react";
import Pet from "../modelos/Pet";
import Cliente from "../modelos/Cliente";

type FormularioAtualizacaoPetProps = {
  petSelecionado: Pet | null;
  clientes: Cliente[];
  aoAtualizarPet: (pet: Pet) => void;
  tema: string;
};

const FormularioAtualizacaoPet: React.FC<FormularioAtualizacaoPetProps> = ({
  petSelecionado,
  clientes,
  aoAtualizarPet,
  tema,
}) => {
  const [nome, setNome] = useState<string>("");
  const [tipo, setTipo] = useState<string>("");
  const [raca, setRaca] = useState<string>("");
  const [genero, setGenero] = useState<string>("");
  const [dono, setDono] = useState<Cliente | null>(null);

  useEffect(() => {
    if (petSelecionado) {
      setNome(petSelecionado.getNome);
      setTipo(petSelecionado.getTipo);
      setRaca(petSelecionado.getRaca);
      setGenero(petSelecionado.getGenero);
      setDono(petSelecionado.getDono);
    }
  }, [petSelecionado]);

  const atualizarPet = (e: React.FormEvent) => {
    e.preventDefault();
    if (petSelecionado) {
      petSelecionado.setNome = nome;
      petSelecionado.setTipo = tipo;
      petSelecionado.setRaca = raca;
      petSelecionado.setGenero = genero;
      petSelecionado.setDono = dono;

      aoAtualizarPet(petSelecionado);
      alert(`Pet atualizado: ${nome}`);
    }
  };

  if (!petSelecionado) {
    return <p>Selecione um pet para atualizar.</p>;
  }

  return (
    <div className="container-fluid">
      <h5 style={{ color: tema }}>Atualizar Pet</h5>
      <form onSubmit={atualizarPet}>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Nome do Pet"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Tipo"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          />
        </div>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Raça"
            value={raca}
            onChange={(e) => setRaca(e.target.value)}
          />
        </div>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Gênero"
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
          />
        </div>
        <div className="input-group mb-3">
          <select
            className="form-control"
            value={dono ? dono.getNome : ""}
            onChange={(e) => setDono(clientes.find(c => c.getNome === e.target.value) || null)}
          >
            <option value="">Selecione um dono</option>
            {clientes.map((cliente) => (
              <option key={cliente.getCpf.getValor} value={cliente.getNome}>
                {cliente.getNome}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-outline-secondary" style={{ background: tema }}>
          Atualizar Pet
        </button>
      </form>
    </div>
  );
};

export default FormularioAtualizacaoPet;
