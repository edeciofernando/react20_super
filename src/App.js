import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./Header";
import Listagem from "./Listagem";
import UserLogin from "./UserLogin";
import { ClienteContext } from "./ClienteContext";
import { useState } from "react";

const App = () => {

  // const [nome, setNome] = useState(null);
  const [dados, setDados] = useState({});

  return (
    <ClienteContext.Provider value={{dados, setDados}}>
      <Router>
        <Header />
        <Switch>
          <Route path="/user">
            <UserLogin />
          </Route>
          <Route path="/">
            <Listagem />
          </Route>
        </Switch>
      </Router>
    </ClienteContext.Provider>
  );
};

export default App;
