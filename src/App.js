import React, { useState } from "react";
import Dashboard from "./Dashboard";
import { ApiClient } from "./apiClient";
import Login from "./Login";

function App() {
  const [token, changeToken] = useState(window.localStorage.getItem("token"));
  const client = new ApiClient(
    () => token,
    () => logout()
  );

  const logout = () => {
    window.localStorage.removeItem("token");
    changeToken(undefined);
  };

  const login = (authToken) => {
    window.localStorage.setItem("token", authToken);
    changeToken(authToken);
  };

  return (
    <>
      {token ? (
        <Dashboard client={client} />
      ) : (
        <Login loggedIn={(token) => login(token)} client={client} />
      )}
    </>
  );
}

export default App;
