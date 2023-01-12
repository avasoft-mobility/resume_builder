import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import Store from "./Stores";
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./authConfig";
import { SnackbarProvider } from "notistack";
import { useMsal } from "@azure/msal-react";
import { InteractionRequiredAuthError } from "msal";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const msalInstance = new PublicClientApplication(msalConfig);

root.render(
    <Provider store={Store}>
      <MsalProvider instance={msalInstance}>
        <App />
      </MsalProvider>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
