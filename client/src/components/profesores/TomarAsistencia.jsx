import React, { useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import { useParams, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/esm/Table";

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
  useEffect(() => {
    //si intentas acceder cuando no es tu dia te redireciona
    if (dia !== day) {
      navigate("/home");
    }
  }, [dia, day, navigate]);

  //obtener alumnos
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (idSemestre) {
          const response = await Axios.get(
            `http://localhost:3000/server/dateAlumno/${idSemestre}`
          );
          setHorarioGet(response.data);
          //console.log(response.data);
        } else {
          console.error("Error");
        }
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };
    fetchData();
  }, []);
  return User && User.user.username === username ? (
    <>
      <Container>
        <p>ID de Horario: {idHorario}</p>
        <p>ID de Semestre: {idSemestre}</p>
        <p>Día: {dia}</p>
        <p>Nombre de Materia: {NombreMateria}</p>
        <p>Nombre de Semestre: {NombreSemestre}</p>
        <p>Descripción de Sección: {DescripcionSeccion}</p>
        {/* Agrega la lógica de tu componente aquí */}
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
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Username</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
    </>
  ) : null;
}

export default TomarAsistencia;
