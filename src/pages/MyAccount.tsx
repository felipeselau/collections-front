// src/pages/MinhaConta.jsx
import { useState } from "react";
import { User } from "../types";
import avatar from "../assets/avatar-placeholder.jpg";
import { Header } from "../components/Header";
import { toast } from "react-toastify";

export const AccountPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [imageFile, setImageFile] = useState<File>();
  const [user, setUser] = useState<User>(
    JSON.parse(localStorage.getItem("user") || "{}")
  );

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    setIsLoading(true);
    await updateUserInfo();
  };

  const updateUserInfo = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch(`http://localhost:3000/user/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        nome: user.nome,
        email: user.email,
      }),
    });

    if (!response.ok) {
      toast.error("Erro ao atualizar informações do usuário");
      return;
    }

    if (response.ok) {
      const json = await response.json();
      localStorage.setItem("user", JSON.stringify(json));
      toast.success("Informações atualizadas com sucesso");
    }

    setIsLoading(false);

    toggleEdit();
  };

  const handleImageUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const formData = new FormData();

    formData.append("image", imageFile!);

    const response = await fetch(`http://localhost:3000/user/upload-img/${user.id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      toast.error("Erro ao atualizar imagem do usuário");
      return;
    }

    const json = await response.json();
    localStorage.setItem("user", JSON.stringify(json));
    setUser(json);

    toast.success("Imagem atualizada com sucesso");
    setIsTouched(false);
  }

  return (
    <>
      <Header />
      <div className="flex flex-col items-center p-6">
        <div className="avatar mb-4">
          <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img
              src={user.imagem ? `http://localhost:3000/uploads/${user.imagem}` : avatar}
              alt="Avatar do Usuário"
            />
          </div>
        </div>

          {!isEditing ? (
            <div className="w-full max-w-md">
              <h2 className="text-2xl font-semibold mb-4">Minha Conta</h2>
              <div className="mb-2">
                <label className="block text-sm font-medium">Nome</label>
                <p className="text-lg">{user.nome}</p>
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium">Email</label>
                <p className="text-lg">{user.email}</p>
              </div>
              <button className="btn btn-primary mt-4" onClick={toggleEdit}>
                Editar Informações
              </button>
            </div>
          ) : (
            <div className="w-full max-w-md">
              <h2 className="text-2xl font-semibold mb-4">Editar Conta</h2>
              <div className="mb-2">
                <label className="block text-sm font-medium">Nome</label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={user.nome}
                  onChange={(e) => setUser({ ...user, nome: e.target.value })}
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  className="input input-bordered w-full"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
              </div>
              <button className="btn btn-primary mt-4" onClick={handleSave}>
                {isLoading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  "Salvar"
                )}
              </button>
              <button
                className="btn btn-secondary mt-4 ml-2"
                onClick={toggleEdit}
              >
                Cancelar
              </button>
            </div>
          )}
          <div className="mt-4 w-full max-w-md mb-2">
            <form encType="multipart/form-data" onSubmit={handleImageUpload}>
              <label className="block text-sm font-medium">
                Atualizar Imagem:
              </label>
              <input type="file" name="image" className="file-input" onChange={(e)=>{
                setIsTouched(true);
                setImageFile(e.target.files![0]);
              }} />
              <button type="submit" className="btn btn-accent mt-4" disabled={!isTouched}>{isTouched? 'Atualizar Imagem' : 'Selecione um arquivo'}</button>
            </form>
          </div>
        </div>
    </>
  );
};
