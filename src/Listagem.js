import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import Conecta from "./Conecta";
import ItemLista from "./ItemLista";
import { ClienteContext } from "./ClienteContext";

const Listagem = () => {
  const [ofertas, setOfertas] = useState([]);
  const cliente = useContext(ClienteContext);

  const getOfertas = async () => {
    const lista = await Conecta.get("ofertas");
    //console.log(lista.data.ofertas);
    setOfertas(lista.data.ofertas);
  };

  // define o método que será executado após renderizar o componente
  useEffect(() => {
    getOfertas();
  }, []);

  const jaVotou = async (ofertaId) => {

    const like = await Conecta.get(
      `likes?filter[clienteId]=${cliente.dados.id}&filter[ofertaId]=${ofertaId}`
    );

    return like.data.likes.length;
  }

  const clienteLike = async (id, index) => {

    if (await jaVotou(id)) {
      alert('Ops... você já avaliou essa oferta');
      return;
    }

    let voto = {
      "like": {
        "ofertaId": id,
        "clienteId": cliente.dados.id,
        "like": 1,
      },
    };

    await Conecta.post("likes", voto);

    // Obtém o registro (para saber a quantidade de likes da tabela ofertas)
    const reg = await Conecta.get("ofertas/" + id);

    let likes = Number(reg.data.oferta.likes) + 1;

    let ofertaLike = {
      "oferta": {
        "likes": likes,
      },
    };

    // altera a quantidade de likes no WebServices
    await Conecta.put("ofertas/" + id, ofertaLike);

    // atualiza o array
    let newOfertas = [...ofertas];
    newOfertas[index].likes = likes;
    setOfertas(newOfertas);

    alert("Ok! Obrigado pela sua participação");
  };

  const clienteDislike = async (id) => {

    if (await jaVotou(id)) {
     alert('Ops... você já avaliou essa oferta');
     return;
    }

    let voto = {
      "like": {
        "ofertaId": id,
        "clienteId": cliente.dados.id,
        "like": 0,
      },
    };

    await Conecta.post("likes", voto);

    // Obtém o registro (para saber a quantidade de dislikes da tabela ofertas)
    const reg = await Conecta.get("ofertas/" + id);

    let dislikes = Number(reg.data.oferta.dislikes) + 1;

    let ofertaDislike = {
      "oferta": {
        "dislikes": dislikes,
      },
    };

    // altera a quantidade de dislikes no WebServices
    await Conecta.put("ofertas/" + id, ofertaDislike);

    // atualiza dados
    await getOfertas();

    alert("Ok! Obrigado pela sua participação");
  };

  return (
    <div className="container">
      <div className="row">
        {ofertas.map((oferta, index) => (
          <ItemLista
            foto={oferta.foto}
            nome={oferta.nome}
            marca={oferta.marca}
            preco={oferta.preco}
            likes={oferta.likes}
            dislikes={oferta.dislikes}
            // exemplos atualizando o index e recuperando os dados da API
            likeClick={()=>clienteLike(oferta.id, index)}
            dislikeClick={()=>clienteDislike(oferta.id)}
            key={oferta.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Listagem;
