import { useNavigate } from "react-router-dom";
import { User } from "../types";

interface UserCardProps {
  user: User;
}

export const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className="card w-full bg-base-100 shadow-md p-4">
      <div className="card-body">
        {/* Nome do Usuário */}
        <h2 className="card-title">{user.nome}</h2>
        <p>Email: {user.email}</p>
        
        {/* Botão de Detalhes */}
        <div className="card-actions justify-end">
          <button
            className="btn btn-primary"
            onClick={() => navigate(`/user/${user.id}`)}
          >
            Detalhar
          </button>
        </div>
      </div>
    </div>
  );
};
