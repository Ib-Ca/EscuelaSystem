import React from "react";
import ReactDOM from "react-dom/client";
import FormularioAñadir from "./App.jsx";
import NavbarDefault from "./components/navbar";
import { Materias } from "./Materias.jsx";
import { Inicio } from "./Inicio.jsx";
import ProfesoresForm from "./components/Profesores.jsx";
import CrearSemestre from "./components/SemestreCreacion.jsx";
import EditarSemestre from "./components/EditarSemestre.jsx";
import Login from "./components/Login.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
<Router>
  <Routes>
    <Route path="/" element={<Login />} />
    <Route
      path="/*"
      element={
        <>
          <NavbarDefault />
          <Routes>
            <Route path="/home" element={<Inicio/>} />
            <Route path="/alumnoAdd" element={<FormularioAñadir />} />
            <Route path="/materiaAdd" element={<Materias />} />
            <Route path="/profesorAdd" element={<ProfesoresForm />} />
            <Route path="/semestreCreate" element={<CrearSemestre />} />
            <Route
              path="/semestreEdit/:Nombre"
              element={<EditarSemestre />}
            />
          </Routes>
        </>
      }
    />
  </Routes>
</Router>

);
