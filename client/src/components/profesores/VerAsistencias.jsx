import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { useParams, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/esm/Table";
import Axios from "axios";
import Form from "react-bootstrap/Form";
import CardFooter from "react-bootstrap/esm/CardFooter";

function VerAsistencias({ User }) {
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
  return User && User.user.username === username ? (
    <>
      <Container>
        <Card>
          <Card.Header as="h3">
            Asistencias de {NombreMateria}
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
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
    </>
  ) : null;
}



export default VerAsistencias