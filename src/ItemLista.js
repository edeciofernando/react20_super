import React, { useContext } from "react";
import { ClienteContext } from "./ClienteContext";

import "./ItemLista.css";

const ItemLista = (props) => {
  const cliente = useContext(ClienteContext);

  let likeButtons;
  if (cliente.dados.id) {
    likeButtons = (
      <>
        <span className="float-left" onClick={props.likeClick}>
          <i className="far fa-thumbs-up mr-2"></i>
          {props.likes}
        </span>

        <span className="float-right" onClick={props.dislikeClick}>
          <i className="far fa-thumbs-down mr-2"></i>
          {props.dislikes}
        </span>
      </>
    );
  }

  return (
    <div className="card col-sm-3 col-6 mt-2">
      <img className="card-img-top" src={props.foto} alt="Oferta do dia" />
      <div className="card-body">
        <h4 className="card-title">
          {props.nome} {props.marca}
        </h4>
        <p className="card-text">
          Preço R$: &nbsp;
          {Number(props.preco).toLocaleString("pt-br", {
            minimumFractionDigits: 2,
          })}
        </p>
        {likeButtons}
      </div>
    </div>
  );
};

export default ItemLista;
