import { useNavigate } from "react-router-dom";
import { Book } from "../types";

export const BookCard = ({ book }: { book: Book }) => {
  const navigate = useNavigate();
  return (
    <div className="card bg-base-100 w-96 shadow-xl">
              <figure>
                <img
                  src={
                    book.imagem
                      ? `http://localhost:3000/uploads/${book.imagem}`
                      : "https://source.unsplash.com/500x500/?shoes"
                  }
                  alt="Capa do livro"
                />
              </figure>
              <div className="card-body">
                <span className="badge badge-accent font-semibold py-4">{book.genero}</span>
                <h2 className="card-title">{book.titulo}</h2>
                <p>{book.autor}</p>
                <div className="flex flex-col">
                  <p>Páginas: <b>{book.paginas}</b></p>  
                  <p>Lançado em: <b>{book.anoLancamento}</b></p>
                </div>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary" onClick={()=>{
                    navigate(`/book/${book.id}`)
                  }}>Detalhar</button>
                </div>
              </div>
            </div>
  )
}