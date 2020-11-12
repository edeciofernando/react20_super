import React from "react";

const ItemLike = props => {
  return (
    <span className="float-right" onClick={props.onClick}>
      <i className="far fa-thumbs-up mr-2"></i>
      {props.likes}
    </span>
  );
};

export default ItemLike;
