import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { User } from "../types";
import { BookCard } from "../components/BookCard";
import { UserCard } from "../components/UserCard";

export const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers();;
  }, []);

  const fetchUsers = async () => {
    const response = await fetch("http://localhost:3000/user", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await response.json();
    setUsers(data);
  };
  return (
    <>
      <Header />
      <div className="p-6 max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Usuários</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {users.length > 0 ? (
            users.map((user) => (
              <UserCard key={user.id} user={user} />
            ))
          ) : (
            <p className="text-gray-500">Nenhum usuário encontrado.</p>
          )}
        </div>
      </div>
    </>
  );
}