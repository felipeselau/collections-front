import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Header } from "../components/Header";
import { Logout } from "../Auth";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    await login(email, password);
    setIsLoading(false);
    setEmail("");
    setPassword("");
  };

  const login = async (email: string, senha: string) => {
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: senha,
      }),
    });

    if (!response.ok) {
      toast.error("Email ou senha inválidos");
      return;
    }

    const json = await response.json();
    localStorage.setItem("token", json.data.token);
    localStorage.setItem("user", JSON.stringify(json.data.user));
    navigate("/home");
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };

  return (
    <>
    <Logout/>
    <Header />
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Faça seu login</h2>
        <form onSubmit={handleSubmit}>
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
              "Entrar"
            )}
          </button>
        </form>
        <p className="mt-4 text-center">
          Ainda não possui conta?{" "}
          <Link to="/register" className="text-blue-500 underline">
            Registre-se agora
          </Link>
        </p>
      </div>
    </div>
    </>
  );
};
