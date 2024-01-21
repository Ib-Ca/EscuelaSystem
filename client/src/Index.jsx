// Index.jsx
import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import FormularioAñadir from "./App.jsx";
import NavbarDefault from "./components/navbar";
import { Materias } from "./Materias.jsx";
import { Inicio } from "./Inicio.jsx";
import ProfesoresForm from "./components/Profesores.jsx";
import CrearSemestre from "./components/SemestreCreacion.jsx";
import EditarSemestre from "./components/EditarSemestre.jsx";
import Login from "./components/Login.jsx";
import Axios from "axios";
import Horarios from "./components/Horarios.jsx";
import Allhorario from "./Allhorario.jsx";
import VerAlumnos from "./components/profesores/verAlumnos.jsx";
import VerObsProfe from "./components/profesores/verObsProfe.jsx";

function Index() {
  let navigate = useNavigate();
  const [data, setData] = useState({
    logIn: false,
    user: { idusuario: 0, username: "", rol: 0, Alumnos_idAlumnos: 0 },
  });
  const [roles, setRoles] = useState({});
  Axios.defaults.withCredentials = true;

  const fetchData = () => {
    Axios.get("http://localhost:3000/testeoLogin").then((response) => {
      if (response.data.logIn) {
        setData(response.data);
      } else {
        navigate("/");
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, []);
  //console.log(data);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/*"
        element={
          <>
            <NavbarDefault User={data} />
            <Routes>
              <Route path="/home" User={data} element={<Inicio />} />
              {data.user && data.user.rol === 1 && (
                <>
                  <Route path="/alumnoAdd" element={<FormularioAñadir />} />
                  <Route path="/materiaAdd" element={<Materias />} />
                  <Route path="/profesorAdd" element={<ProfesoresForm />} />
                  <Route path="/semestreCreate" element={<CrearSemestre />} />
                  <Route
                    path="/semestreEdit/:Nombre"
                    element={<EditarSemestre />}
                  />
                  <Route
                    path="/horario/:Nombre/:Seccion"
                    element={<Horarios />}
                  />
                  <Route path="/horario" element={<Allhorario />} />
                </>
              )}
              {data && (data.user.rol === 1 || data.user.rol === 2) && (
                <>
                <Route
                  path="/profesor/alumno/:username"
                  element={<VerAlumnos User={data}/>}
                  User={data}
                />
                 <Route
                  path="/profesor/observaciones/:username"
                  element={<VerObsProfe User={data}/>}
                  User={data}
                />
                </>
              )}
              <Route path="*" element={<Inicio />} />
            </Routes>
          </>
        }
      />
    </Routes>
  );
}

export default Index;
