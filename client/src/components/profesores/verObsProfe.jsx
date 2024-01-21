import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function VerObsProfe({ User }) {
  const { username } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [alumnosData, setAlumnosData] = useState([]);
  const { idusuario } = User.user;

  //check url y user log
  useEffect(() => {
    if (!(User && User.user.username === username)) {
      navigate("/home");
    }
  }, [User, username, navigate]);

  //sacar datos de profe, observacion y alumno
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (User && User.user.idusuario) {
          //profe
          const responseProfesor = await Axios.get(
            `http://localhost:3000/server/getProfesor/${User.user.idusuario}`
          );
          const profesorData = responseProfesor.data;
          //todas las observaciones y filtrado
          const responseObservaciones = await Axios.get(
            "http://localhost:3000/server/observacion"
          );
          const observacionesData = responseObservaciones.data;
          const observacionesProfesor = observacionesData.filter(
            (observacion) =>
              observacion.Profesores_idProfesores === profesorData.idProfesores
          );
          setData(observacionesProfesor);
          console.log("Observaciones del profesor:", observacionesProfesor);
          //info de alumnos de las observaciones
          const alumnosIds = observacionesProfesor.map(
            (observacion) => observacion.Alumnos_idAlumnos
          );
          const responseAlumnos = await Axios.post(
            "http://localhost:3000/server/getAlumnosInfo",
            { alumnosIds }
          );
          setAlumnosData(responseAlumnos.data);
        } else {
          navigate("/home");
        }
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };
    fetchData();
  }, [User]);

  // console.log(data);

  return User && User.user.username === username ? (
    <>
      <div>hola</div>
    </>
  ) : null;
}

export default VerObsProfe;
