import { useEffect, useState } from "react";
import { Book, User } from "../types";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { BookCard } from "./BookCard";

export const SeusLivros = () => {
  const [books, setBooks] = useState<Book[] | []>([]);

  useEffect(() => {
    fetchUserBooks();
  }, []);

  const navigate = useNavigate();

  const fetchUserBooks = async () => {
    const token = localStorage.getItem("token");
    const user: User = JSON.parse(localStorage.getItem("user") || "{}");
    const response = await fetch(`http://localhost:3000/user/${user.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      toast.error(
        "Erro ao buscar livros do usuário, tente fazer o login novamente"
      );
      return;
    }

    const data = await response.json();
    setBooks(data.livros);
  };
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Seus Livros</h2>
        <Link to="/new-book" className="btn btn-primary">
          Cadastrar Novo Livro
        </Link>
      </div>

      {books.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <div className="text-center">
          <p className="text-lg">
            Você ainda não cadastrou nenhum livro, comece agora!
          </p>
        </div>
      )}
    </div>
  );
};
