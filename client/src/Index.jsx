// Index.jsx
import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, } from "react-router-dom";
import FormularioAñadir from "./App.jsx";
import NavbarDefault from "./components/navbar";
import { Materias } from "./Materias.jsx";
import { Inicio } from "./Inicio.jsx";
import ProfesoresForm from "./components/Profesores.jsx";
import CrearSemestre from "./components/SemestreCreacion.jsx";
import EditarSemestre from "./components/EditarSemestre.jsx";
import Login from "./components/Login.jsx";
import Axios from "axios";

function Index() {
  const [data, setData] = useState({});
  const [roles, setRoles] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rolesResponse = await Axios.get(
          "http://localhost:3000/server/roles"
        );
        setRoles(rolesResponse.data);
        const loginResponse = await Axios.get(
          "http://localhost:3000/testeoLogin"
        );
        if (loginResponse.data.logIn) {
          setData(loginResponse.data);
        } 
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    return () => {};
  }, []);

  console.log("let me data: ", data);
  console.log("rol", roles);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/*"
        element={
          <>
            <NavbarDefault User={data} />
            <Routes>
              <Route path="/home" element={<Inicio />} />
              <Route path="/alumnoAdd" element={<FormularioAñadir />} />
              <Route path="/materiaAdd" element={<Materias />} />
              <Route path="/profesorAdd" element={<ProfesoresForm />} />
              <Route path="/semestreCreate" element={<CrearSemestre />} />
              <Route path="*" element={<Inicio />} />
              <Route
                path="/semestreEdit/:Nombre"
                element={<EditarSemestre />}
              />
            </Routes>
          </>
        }
      />
    </Routes>
  );
}

export default Index;
