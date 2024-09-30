import { useEffect, useRef, useState } from "react";
import { Header } from "../components/Header";
import { Book, User } from "../types";
import { json, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const NewBookPage = () => {
  const [image, setImage] = useState<File>();
  const user = useRef<User>(JSON.parse(localStorage.getItem("user") || "{}"));

  const [book, setBook] = useState<Book>({
    titulo: "",
    autor: "",
    genero: "",
    paginas: 0,
    anoLancamento: 0,
    imagem: "",
  });

  const navigate = useNavigate();

  const handleImageUpload = async (event: React.FormEvent, Book: Book) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("image", image!);

    const response = await fetch(
      `http://localhost:3000/livro/upload-img/${Book.id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      }
    );

    if (!response.ok) {
      toast.error("Erro ao fazer upload da imagem");
      return;
    }

    toast.success("Livro cadastrado com sucesso");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(book);

    const response = await fetch(
      `http://localhost:3000/livro/${user.current.id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          titulo: book.titulo,
          autor: book.autor,
          genero: book.genero,
          paginas: book.paginas,
          anoLancamento: book.anoLancamento,
        }),
      }
    );

    if (!response.ok) {
      toast.error("Erro ao cadastrar livro");
      return;
    }

    const data: Book = await response.json();

    handleImageUpload(e, data);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, valueAsNumber } = e.target;
    if(type === "number") {
      setBook({
        ...book,
        [name]: valueAsNumber,
      });
      return;
    }
    setBook({
      ...book,
      [name]: value,
    });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBook({
      ...book,
      genero: e.target.value,
    });
  }

  return (
    <>
      <Header />
      <div className="p-6 max-w-md mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Cadastrar Novo Livro</h2>
        <form
          method="POST"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          {/* Campo Título */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Título</label>
            <input
              type="text"
              name="titulo"
              className="input input-bordered w-full"
              value={book?.titulo}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Campo Autor */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Autor</label>
            <input
              type="text"
              name="autor"
              className="input input-bordered w-full"
              value={book?.autor}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Campo Gênero */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Gênero</label>

            <select className="select select-bordered w-full max-w-xs" onChange={handleSelectChange}>
              <option disabled selected>
                Gênero
              </option>
              <option value="ACAO">Ação</option>
              <option value="AVENTURA">Aventura</option>
              <option value="COMEDIA">Comédia</option>
              <option value="DRAMA">Drama</option>
              <option value="FANTASIA">Fantasia</option>
              <option value="FICCAO">Ficção</option>
              <option value="ROMANCE">Romance</option>
              <option value="SUSPENSE">Suspense</option>
              <option value="TERROR">Terror</option>
            </select>
          </div>

          {/* Campo Páginas */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Páginas</label>
            <input
              type="number"
              name="paginas"
              className="input input-bordered w-full"
              value={book?.paginas}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Campo Ano de Lançamento */}
          <div className="mb-4">
            <label className="block text-sm font-medium">
              Ano de Lançamento
            </label>
            <input
              type="number"
              name="anoLancamento"
              className="input input-bordered w-full"
              value={book?.anoLancamento}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Campo Imagem */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Imagem do Livro</label>
            <input
              type="file"
              name="image"
              className="file-input file-input-bordered w-full"
              onChange={(e) => {
                const file = e.target.files?.[0];
                setImage(file);
              }}
              accept="image/*"
            />
          </div>

          {/* Botão de Envio */}
          <button type="submit" className="btn btn-primary w-full">
            Cadastrar Livro
          </button>
          <button
            className="mt-4 btn btn-error w-full"
            onClick={() => {
              navigate(-1);
            }}
          >
            Cancelar
          </button>
        </form>
      </div>
      )
    </>
  );
};
