import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./stylesheets/SignUp.css";
import axios from "../servers/Api";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("As senhas não coincidem.");
      return;
    }

    try {
      const response = await axios.post("/auth/register", {
        fullName: fullName,
        email: email,
        password: password,
        role: "USER"
      });
      console.log("Usuário cadastrado com sucesso!");
      navigate("/");
    } catch (error) {
      console.log("Algo deu errado na requisição ao servidor!");
    }
  };

  return (
    <div className="signup-page">
      <div className="content-box">
        <div className="app-title">
          <p>MESTRE SALA</p>
        </div>
        <div className="form-panel">
          <form onSubmit={handleSignUp}>
            <h1 className="title">Cadastro</h1>
            <label htmlFor="fullname-input" className="fullname-label">
              Nome Completo
            </label>
            <input
              type="text"
              name="fullname-input"
              className="fullname-input"
              placeholder="ex: João Victor da Silva"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <label htmlFor="user-input" className="user-label">
              E-mail
            </label>
            <input
              type="email"
              name="user-input"
              className="user-input"
              placeholder="email@domínio.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="passwd-input" className="passwd-label">
              Crie sua senha
            </label>
            <input
              type="password"
              name="passwd-input"
              className="passwd-input"
              placeholder="crie sua senha de acesso"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="confirm-passwd-input" className="confirm-passwd-label">
              Confirme sua senha
            </label>
            <input
              type="password"
              name="confirm-passwd-input"
              className="confirm-passwd-input"
              placeholder="repita sua senha escolhida"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button type="submit" className="signup-btn">
              Cadastre-se
            </button>
            <Link to="/" className="link-style">
              Já possui acesso? Entre
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
