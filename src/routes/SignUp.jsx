import { Link } from "react-router-dom";
import './stylesheets/SignUp.css'

const SignUp = () => {
  return (
    <div className="signup-page">
      <div className="content-box">
        <div className="app-title">
          <p>MESTRE SALA</p>
        </div>
        <div className="form-panel">
          <form action="">
          <h1 className="title">Cadastro</h1>
            <label htmlFor="fullname-input" className="fullname-label">
              Usuário
            </label>
            <input
              type="text"
              name="fullname-input"
              className="fullname-input"
              placeholder="ex: João Victor da Silva"
            />
            <label htmlFor="user-input" className="user-label">
              Usuário
            </label>
            <input
              type="text"
              name="user-input"
              className="user-input"
              placeholder="email@domínio.com"
            />
            <label htmlFor="passwd-input" className="passwd-label">
              Crie sua senha
            </label>
            <input
              type="password"
              name="passwd-input"
              className="passwd-input"
              placeholder="crie sua senha de acesso"
            />
            <label htmlFor="confirm-passwd-input" className="confirm-passwd-label">
              Confirme sua senha
            </label>
            <input
              type="password"
              name="confirm-passwd-input"
              className="confirm-passwd-input"
              placeholder="repita sua senha escolhida"
            />
            <button type="submit" className="signup-btn">
              Cadastre-se
            </button>
            <Link to="/login" className="sign-up-link">Já possui acesso? Entre</Link>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp