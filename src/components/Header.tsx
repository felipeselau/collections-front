import { Link } from "react-router-dom"
import { User } from "../types";

import avatar from "../assets/avatar-placeholder.jpg";
import { useEffect, useState } from "react";

export const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User>();
  
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (isLoggedIn) {
      return;
    }

    if (token) {
      setIsLoggedIn(true);
      setUser(JSON.parse(localStorage.getItem("user") || "{}"));
    }
  }, []);

  return (
    <header className="navbar bg-base-100 shadow-md">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          Next-Livros
        </Link>
      </div>
      
      {isLoggedIn && (
        <div className="flex-1">
          <ul className="menu menu-horizontal px-1">
            <li><Link to="/my-books">Meus Livros</Link></li>
            <li><Link to="/users">Usuários</Link></li>
          </ul>
        </div>
      )}
      
      <div className="flex-none">
        {!isLoggedIn ? (
          <ul className="menu menu-horizontal px-1">
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Registro</Link></li>
          </ul>
        ) : (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={user?.imagem? `http://localhost:3000/uploads/${user.imagem}` : avatar} alt="avatar" />
              </div>
            </label>
            <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
              <li><Link to="/account">Minha Conta</Link></li>
              <li><a href="/logout">Logout</a></li>
            </ul>
          </div>
        )}
      </div>
    </header>
  )
}