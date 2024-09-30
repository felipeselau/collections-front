import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Header } from "../components/Header";

export const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nome, setNome] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    await register(email, password, nome);
    setIsLoading(false);
    setEmail("");
    setPassword("");
    setNome("");
  };

  const register = async (email: string, password: string, nome: string) => {
    const response = await fetch("http://localhost:3000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        senha: password,
        nome: nome,
      }),
    });

    if (!response.ok) {
      toast.error("Erro ao registrar usuário");
      return;
    }

    const json = await response.json();
    localStorage.setItem("token", json.data.token);
    localStorage.setItem("user", JSON.stringify(json.data.user));
    await toast.success("Usuário registrado com sucesso");
    navigate("/login");
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else {
      setNome(value);
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen bg-base-200">
        <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Registre-se</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Nome</span>
              </label>
              <input
                type="text"
                name="nome"
                placeholder="Digite seu nome"
                className="input input-bordered"
                value={nome}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Digite seu email"
                className="input input-bordered"
                value={email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-control mb-6">
              <label className="label">
                <span className="label-text">Senha</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Digite sua senha"
                className="input input-bordered"
                value={password}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-full">
              {isLoading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Registrar"
              )}
            </button>
          </form>
          <p className="mt-4 text-center">
            Já possui uma conta?{" "}
            <Link to="/login" className="text-blue-500 underline">
              Faça login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};
