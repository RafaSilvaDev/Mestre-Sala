import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./stylesheets/Login.css";
import axios from "../servers/Api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitError, setSubmitError] = useState(false)
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setSubmitError(false)
      const response = await axios.post("/auth/login", {
        email: email,
        password: password,
      });
      if(response.status == 403) {
        throw new Error("Access denied.")
      }
      localStorage.setItem("token", response.data.token);
      axios
        .get("/auth/user/" + email)
        .then((response) => {
          localStorage.setItem("userId", response.data);
        })
        .catch((error) => {
          console.log(
            "Algo deu errado na requisição ao server! Erro: " + error
          );
        });
      navigate("/home");
    } catch (error) {
      setSubmitError(true);
      console.log("Algo deu errado na requisição ao server! Erro: " + error);
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
            {submitError ? (
                <p className="error-on-submit">
                  Usuário ou senha incorretos!
                </p>
              ) : (
                <></>
              )}
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
            <Link to="/signup" className="link-style">
              Não possui acesso? Cadastre-se
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
