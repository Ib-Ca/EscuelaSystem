import React from "react";
import ReactDOM from "react-dom/client";
import FormularioAñadir from "./App.jsx";
import NavbarDefault from './components/navbar'
import { Materias } from "../Materias.jsx";
import { Inicio } from "./Inicio.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
    <NavbarDefault/>
      <Routes>
        <Route exact path="/" element={<Inicio/>}/>
        <Route path="/alumnoAdd" element={<FormularioAñadir/>}/>
        <Route path="/materiaAdd" element={<Materias/>}/>
      </Routes>
    </Router>
  </React.StrictMode>
);
