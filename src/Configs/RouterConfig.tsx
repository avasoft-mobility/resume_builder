import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "../Pages/HomePage/HomePage";
import Header from "../Components/Wrapper_Components/Header.Wrapper.Componenets";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { useEffect } from "react";
import { loginRequest } from "../authConfig";

const RouterConfig = () => {
  const msal = useMsal();
  const isAuthenticated = useIsAuthenticated();
  
  
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<HomePage />} />
      </Routes>
    </>
  );
};

export default RouterConfig;
