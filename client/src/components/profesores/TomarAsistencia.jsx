import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { useParams, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/esm/Table";
import Axios from "axios";
import Form from "react-bootstrap/Form";
import CardFooter from "react-bootstrap/esm/CardFooter";

function TomarAsistencia({ User }) {
  const {
    idHorario,
    idSemestre,
    dia,
    NombreMateria,
    NombreSemestre,
    DescripcionSeccion,
    username,
  } = useParams();
  const navigate = useNavigate();
  //check url y user log
  useEffect(() => {
    if (!(User && User.user.username === username)) {
      navigate("/home");
    }
  }, [User, username, navigate]);
  ////////////////////////////////////////////
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  const currentDayOfWeek = today
    .toLocaleDateString("es-ES", { weekday: "long" })
    .toLowerCase();
  const normalizeString = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };
  useEffect(() => {
    //si intentas acceder cuando no es tu dia te redireciona
    const normalizedDia = normalizeString(dia);
    const normalizedCurrentDay = normalizeString(currentDayOfWeek);
    if (normalizedDia.toLowerCase() !== normalizedCurrentDay.toLowerCase()) {
      console.log(dia);
      console.log(currentDayOfWeek);
      console.log("entro");
      navigate("/home");
    }
  }, []);
  const [alumno, setAlumno] = useState([]);

  //obtener alumnos
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (idSemestre) {
          const response = await Axios.get(
            `http://localhost:3000/server/dateAlumno/${idSemestre}`
          );
          setAlumno(response.data);
        } else {
          console.error("Error");
        }
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };
    fetchData();
  }, []);
  //RADIOS BUTTONS
  const [seleccionados, setSeleccionados] = useState({});
  const handleRadioChange = (idAlumno, valor) => {
    setSeleccionados((prevSeleccionados) => ({
      ...prevSeleccionados,
      [idAlumno]: valor,
    }));
  };

  const handleSave = async () => {
    const algunRadioNoSeleccionado = alumno.some(
      (item) => !seleccionados[item.idAlumnos]
    );
    if (algunRadioNoSeleccionado) {
      alert("Debes marcar a todos los alumnos");
      return;
    }
    const data = {
      formattedDate,
      idHorario,
      seleccionados,
    };
    try {
      const response = await Axios.post(
        "http://localhost:3000/saveAssist",
        data
      );
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  return User && User.user.username === username ? (
    <>
      <Container>
        <Card>
          <Card.Header as="h3">
            Asistencia de {NombreMateria}---Fecha: {formattedDate}
          </Card.Header>
          <Card.Body>
            <Card.Title as="h4">
              {NombreSemestre}---{DescripcionSeccion}
            </Card.Title>
            <Table bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>P</th>
                  <th>A</th>
                </tr>
              </thead>
              <tbody>
                {alumno.map((item, idx) => {
                  return (
                    <tr key={idx}>
                      <td>{idx}</td>
                      <td>{item.Apellido}</td>
                      <td>{item.Nombre}</td>
                      <td>
                        <Form.Check
                          type="radio"
                          name={`group${idx}`}
                          aria-label={`radio ${idx}`}
                          checked={seleccionados[item.idAlumnos] === "Ausente"}
                          onChange={() =>
                            handleRadioChange(item.idAlumnos, "Ausente")
                          }
                        />
                      </td>
                      <td>
                        <Form.Check
                          type="radio"
                          name={`group${idx}`}
                          aria-label={`radio ${idx}`}
                          checked={seleccionados[item.idAlumnos] === "Presente"}
                          onChange={() =>
                            handleRadioChange(item.idAlumnos, "Presente")
                          }
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Card.Body>
          <CardFooter>
            <Button variant="success" onClick={handleSave}>
              Guardar Asistencias
            </Button>
          </CardFooter>
        </Card>
      </Container>
    </>
  ) : null;
}

export default TomarAsistencia;
