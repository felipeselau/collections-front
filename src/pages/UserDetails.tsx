import { useNavigate, useParams } from "react-router-dom";
import { Header } from "../components/Header"
import { useEffect, useState } from "react";
import { Book, User } from "../types";
import { BookCard } from "../components/BookCard";

export const UserDetailsPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
  }, [id]);

  const fetchUserData = async () => {
    const response = await fetch(`http://localhost:3000/user/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await response.json();
    setUser(data);
    console.log(user)
  }

  
  return(
    <>
    <Header />
    <div className="p-6 max-w-5xl mx-auto">
        {user ? (
          <>
            {/* Botão Voltar */}
            <button
              className="btn btn-secondary mb-4"
              onClick={() => navigate(-1)}
            >
              Voltar
            </button>

            {/* Informações do Usuário */}
            <h2 className="text-2xl font-semibold mb-6">{user.nome}</h2>
            <p>Email: {user.email}</p>

            {/* Livros do Usuário */}
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-4">Livros de {user.nome}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {user.livros.length > 0 ? (
                  user.livros.map((book: Book) => (
                    <BookCard key={book.id} book={book} />
                  ))
                ) : (
                  <p className="text-gray-500">Este usuário ainda não cadastrou nenhum livro.</p>
                )}
              </div>
            </div>
          </>
        ) : (
          <p>Carregando...</p>
        )}
      </div>
    </>
  )
}