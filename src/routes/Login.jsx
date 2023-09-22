import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./stylesheets/Login.css";
import axios from "../servers/Api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/login", {
        email: email,
        password: password,
      });
      setToken(response.data.token);
      console.log("Login feito! Aqui está o token: " + token);
    } catch (error) {
      console.log("Algo deu errado na requisição ao server!");
    }
  };

  return (
    <div className="login-page">
      <div className="content-box">
        <div className="app-title">
          <p>MESTRE SALA</p>
        </div>
        <div className="form-panel">
          <form onSubmit={handleLogin}>
            <h1 className="title">Login</h1>
            <label htmlFor="user-input" className="user-label">
              Usuário
            </label>
            <input
              type="text"
              name="user-input"
              className="user-input"
              placeholder="Ex: exemplo@email.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="passwd-input" className="passwd-label">
              Senha
            </label>
            <input
              type="password"
              name="passwd-input"
              className="passwd-input"
              placeholder="Insira sua senha aqui"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="login-btn">
              Entrar
            </button>
            <Link to="/signup" className="sign-up-link">
              Não possui acesso? Cadastre-se
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
