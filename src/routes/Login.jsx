import { Link } from "react-router-dom";
import "./stylesheets/Login.css";

const Login = () => {
  return (
    <div className="login-page">
      <div className="content-box">
        <div className="app-title">
          <p>MESTRE SALA</p>
        </div>
        <div className="form-panel">
          <form action="">
          <h1 className="title">Login</h1>
            <label htmlFor="user-input" className="user-label">
              Usuário
            </label>
            <input
              type="text"
              name="user-input"
              className="user-input"
              placeholder="Ex: exemplo@email.com"
            />
            <label htmlFor="passwd-input" className="passwd-label">
              Senha
            </label>
            <input
              type="password"
              name="passwd-input"
              className="passwd-input"
              placeholder="Insira sua senha aqui"
            />
            <button type="submit" className="login-btn">
              Entrar
            </button>
            <Link to="/signup" className="sign-up-link">Não possui acesso? Cadastre-se</Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
