import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/Login";
import { RegisterPage } from "./pages/Register";
import { Auth, Logout } from "./Auth";
import { AccountPage } from "./pages/MyAccount";
import { UsersPage } from "./pages/Users";
import { UserBooksPage } from "./pages/UserBoooks";
import { NewBookPage } from "./pages/NewBook";
import { BookDetailsPage } from "./pages/BookDetailsPage";
import { UserDetailsPage } from "./pages/UserDetails";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/logout" element={<Logout />} />
        <Route element={<Auth />}>
          {/* Rotas protegidas */}
          <Route path="/home" element={<UserBooksPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/my-books" element={<UserBooksPage />} />
          <Route path="/new-book" element={<NewBookPage />} />
          <Route path="/book/:id" element={<BookDetailsPage />} />
          <Route path="/user/:id" element={<UserDetailsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
