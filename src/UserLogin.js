import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { ClienteContext } from "./ClienteContext";
import { useHistory } from "react-router-dom";
import md5 from "md5";

import Conecta from "./Conecta";
import "./UserLogin.css";

const UserLogin = () => {
  const { register, handleSubmit } = useForm();
  let history = useHistory();
  const cliente = useContext(ClienteContext);

  const logaCliente = async (data) => {
    const email = data.email;
    const senha = md5(data.senha);

    const filtro = await Conecta.get(
      `clientes?filter[email]=${email}&filter[senha]=${senha}`
    );

    if (filtro.data.clientes.length) {
      cliente.setDados({id: filtro.data.clientes[0].id, nome: filtro.data.clientes[0].nome});
      history.push("/");
    } else {
      console.log("não cadastrado");
    }
  };

  return (
    <div className="row mt-5">
      <div className="col-md-5 col-sm-8 col-11 mx-auto">
        <form onSubmit={handleSubmit(logaCliente)}>
          <h1 className="h3 mb-3 font-weight-normal">Identifique-se</h1>
          <p>
            <i>Identifique-se e avalie as nossas oferta</i>
          </p>

          <div className="form-label-group">
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              placeholder="E-mail do cliente"
              required
              autoFocus
              ref={register}
            />
            <label htmlFor="email">E-mail Cadastrado</label>
          </div>

          <div className="form-label-group">
            <input
              type="password"
              id="senha"
              name="senha"
              className="form-control"
              placeholder="Senha de Acesso"
              required
              ref={register}
            />
            <label htmlFor="senha">Senha de Acesso</label>
          </div>

          <button className="btn btn-lg btn-primary btn-block" type="submit">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;
