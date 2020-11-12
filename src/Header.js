import React, { useContext } from "react";
import { ClienteContext } from "./ClienteContext";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import "./Header.css";

const Header = () => {
  const cliente = useContext(ClienteContext);
  let history = useHistory();

  const loginLogout = () => {
    cliente.setDados({ id: null, nome: "" });
    history.push("/user");
  };

  return (
    <nav className="navbar navbar-expand-sm bg-primary navbar-dark">
      <Link className="navbar-brand" to="/">
        <img
          src="super.png"
          alt="Logo Supper"
          width="60"
          className="float-left mr-2"
        />
        <h3>Super Avenida</h3>
        <h5>Ofertas do Dia</h5>
      </Link>

      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          {/* <Link className="nav-link" to="/user">
            <i className="fas fa-user-friends mr-2"></i>
            { cliente.nome ? cliente.nome + ' (sair)' : ' (identifique-se)'}
          </Link> */}

          <span className="nav-link" onClick={loginLogout}>
            <i className="fas fa-user-friends mr-2"></i>
            {cliente.dados.nome
              ? cliente.dados.nome + " (sair)"
              : " (identifique-se)"}
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
