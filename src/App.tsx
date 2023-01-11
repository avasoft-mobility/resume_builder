import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import RouterConfig from "./Configs/RouterConfig";
import { useMsal } from "@azure/msal-react";

function App() {
  const { accounts, instance } = useMsal();

  if (accounts.length > 0) {
    localStorage.setItem("UserName", accounts[0].username);
  }

  return (
    <SnackbarProvider maxSnack={10} preventDuplicate autoHideDuration={1000}>
      <BrowserRouter>
        <RouterConfig />
      </BrowserRouter>
    </SnackbarProvider>
  );
}

export default App;
