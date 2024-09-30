import { toast } from "react-toastify";
import { Header } from "../components/Header";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Book } from "../types";

export const BookDetailsPage = () => {
  const { id } = useParams(); // Pegando o id do livro pela URL
  const [book, setBook] = useState<Book | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [imageFile, setImageFile] = useState<File>();
  const [isTouched, setIsTouched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // Função para buscar o livro pela ID
  useEffect(() => {
    const fetchBook = async () => {
      const response = await fetch(`http://localhost:3000/livro/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setBook(data);
      } else {
        toast.error("Erro ao carregar o livro");
        navigate("/home");
      }
    };
    fetchBook();
  }, [id]);

  // Função para atualizar o livro
  const handleUpdate = async (e: React.FormEvent) => {
    alert('chamou')
    e.preventDefault();
    setIsLoading(true);

    const response = await fetch(`http://localhost:3000/livro/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(book),
    });

    if (!response.ok) {
      toast.error("Erro ao salvar alterações");
      return;
    }

    toast.success("Livro atualizado com sucesso");
    setIsEditing(false); // Desabilita o modo de edição após o salvamento
    setIsLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, valueAsNumber } = e.target;
    if (type === "number") {
      setBook({
        ...book!,
        [name]: valueAsNumber,
      });
      return;
    }
    setBook({
      ...book!,
      [name]: value,
    });
  };

  if (!book) {
    return <div>Carregando...</div>;
  }

  const handleImageUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", imageFile!);

    const response = await fetch(
      `http://localhost:3000/livro/upload-img/${id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      }
    );

    if (!response.ok) {
      toast.error("Erro ao atualizar imagem do livro");
      return;
    }

    toast.success("Imagem atualizada com sucesso");
    setIsTouched(false);
    setIsLoading(false);
  };

  const handleDelete = async () => {
    const response = await fetch(`http://localhost:3000/livro/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      toast.error("Erro ao excluir livro");
      return;
    }

    setShowModal(false);
    await toast.success("Livro excluído com sucesso");
    navigate("/home");
  };

  return (
    <>
      <Header />
      <div className="p-6 max-w-md mx-auto">
        <div className="flex justify-between mb-4">
          {/* Botão Voltar */}
          <button className="btn btn-outline" onClick={() => navigate(-1)}>
            Voltar
          </button>

          {/* Botão Excluir com Modal */}
          {book.userId === JSON.parse(localStorage.getItem("user")!).id && (
            <button
              className="btn btn-error"
              onClick={() => setShowModal(true)}
            >
              Excluir Livro
            </button>
          )}
        </div>

        <h2 className="text-2xl font-semibold mb-6">Detalhes do Livro</h2>
        <form onSubmit={handleUpdate}>
          {/* Campo Título */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Título</label>
            <input
              type="text"
              name="titulo"
              className="input input-bordered w-full"
              value={book?.titulo}
              onChange={handleInputChange}
              disabled={!isEditing} // Habilita/desabilita edição
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
              disabled={!isEditing}
            />
          </div>

          {/* Campo Gênero */}
          <div className="mb-4">
            <label className="block text-sm font-medium">Gênero</label>
            <input
              type="text"
              name="genero"
              className="input input-bordered w-full"
              value={book?.genero}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
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
              disabled={!isEditing}
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
              disabled={!isEditing}
            />
          </div>

          {/* Botões */}
          {!isEditing ? (
            <>
              {book.userId === JSON.parse(localStorage.getItem("user")!).id && (
                <button
                  type="button"
                  className="btn btn-primary w-full"
                  onClick={(event) => {
                    event.preventDefault();
                    setIsEditing(true)
                  }}
                >
                  {isLoading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    "Editar Livro"
                  )}
                </button>
              )}
            </>
          ) : (
            <>
              <button type="submit" className="btn btn-success w-full">
                {isLoading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  "Salvar Alterações"
                )}
              </button>
              <button
                type="button"
                className="mt-4 btn btn-error w-full"
                onClick={() => setIsEditing(false)}
              >
                Cancelar
              </button>
            </>
          )}
        </form>
        {book.userId === JSON.parse(localStorage.getItem("user")!).id && (
          <>
            <h2 className="mt-4 text-2xl font-semibold mb-6">
              Atualizar Capa do Livro
            </h2>
            <form method="POST" encType="multipart/form-data" onSubmit={handleImageUpload}>
              <label className="block text-sm font-medium">
                Atualizar Capa:
              </label>
              <input
                type="file"
                name="image"
                onChange={(e) => {
                  setImageFile(e.target.files![0]);
                  setIsTouched(true);
                }}
                className="file-input file-input-bordered w-full"
              />
              <button
                type="submit"
                className="btn btn-primary w-full mt-4"
                disabled={!isTouched}
              >
                {isLoading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  "Atualizar Capa"
                )}
              </button>
            </form>
          </>
        )}
      </div>

      {/* Modal de Confirmação */}
      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Você tem certeza?</h3>
            <p className="py-4">Essa ação não pode ser desfeita.</p>
            <div className="modal-action">
              <button className="btn btn-error" onClick={handleDelete}>
                Excluir
              </button>
              <button className="btn" onClick={() => setShowModal(false)}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
