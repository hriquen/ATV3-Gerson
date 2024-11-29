import React, { useState } from "react";
import Pet from "../modelos/Pet";
import Cliente from "../modelos/Cliente";

type FormularioCadastroPetProps = {
  clientes: Cliente[];
  aoCadastrarPet: (pet: Pet, dono: Cliente) => void;
  tema: string;
};

const FormularioCadastroPet: React.FC<FormularioCadastroPetProps> = ({ clientes, aoCadastrarPet, tema }) => {
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("");
  const [raca, setRaca] = useState("");
  const [genero, setGenero] = useState("");
  const [dono, setDono] = useState<Cliente | null>(null);

  const cadastrarPet = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome || !tipo || !raca || !genero || !dono) {
      alert("Todos os campos são obrigatórios!");
      return;
    }

    const novoPet = new Pet(nome, tipo, raca, genero, dono);
    aoCadastrarPet(novoPet, dono);

    setNome("");
    setTipo("");
    setRaca("");
    setGenero("");
    setDono(null);
  };

  return (
    <div className="container-fluid">
      <form onSubmit={cadastrarPet}>
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
          Cadastrar Pet
        </button>
      </form>
    </div>
  );
};

export default FormularioCadastroPet;
