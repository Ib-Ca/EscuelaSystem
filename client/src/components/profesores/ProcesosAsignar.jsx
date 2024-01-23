import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ProcesosAsignar({ User }) {
  const { idSemestre, username } = useParams();
  const navigate = useNavigate();
  const [procesosLista, setProcesosLista] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const procesos = await Axios.get(
          `http://localhost:3000/server/getProc?idSemestre=${idSemestre}`
        );
        /*     const tipoProcesoResponse = await Axios.get(
          "http://localhost:3000/getTipoProceso"
        );*/
        setProcesosLista(procesos.data);
        /*  if (tipoProcesoData.length > 0) {
          setSelectTipoProc(tipoProcesoData[0].descripcion);
        }
        if (indicadoresData.length > 0) {
          setSelectIndi(indicadoresData[0].Descripcion);
        }*/
      } catch (error) {
        console.error("Error al obtener datos:", error);
        // Manejar errores según tu necesidad
      }
    };
    fetchData();
  }, []);
console.log(procesosLista);
  useEffect(() => {
    if (!(User && User.user.username === username)) {
      navigate("/home");
    }
  }, [User, username, navigate]);

  return User && User.user.username === username ? (
    <>
      <div>hola</div>
    </>
  ) : null;
}
export default ProcesosAsignar;
