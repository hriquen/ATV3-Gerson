import Pet from "../modelos/Pet";
import Cliente from "../modelos/Cliente";

type ListaPetProps = {
  pets: Pet[];
  clientes: Cliente[];
  tema: string;
  setPetSelecionado: (pet: Pet) => void;
  aoExcluirPet: (nome: string) => void;
};

const ListaPet: React.FC<ListaPetProps> = ({ pets, clientes, tema, setPetSelecionado, aoExcluirPet }) => {
  return (
    <div className="container-fluid">
      <div className="list-group">
        {pets.map((pet, index) => (
          <div key={index} className="list-group-item" style={{ backgroundColor: tema }}>
            <p>Nome: {pet.getNome}</p>
            <p>Tipo: {pet.getTipo}</p>
            <p>Raça: {pet.getRaca}</p>
            <p>Gênero: {pet.getGenero}</p>
            <p>Dono: {pet.getDono ? pet.getDono.getNome : "Sem dono"}</p>
            <button className="btn btn-primary" onClick={() => setPetSelecionado(pet)}>
              Editar
            </button>
            <button className="btn btn-danger" onClick={() => aoExcluirPet(pet.getNome)}>
              Excluir
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListaPet;