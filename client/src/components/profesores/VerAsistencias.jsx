import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { useParams, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/esm/Table";
import Axios from "axios";

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
  const [asist, setAsist] = useState([]);

  //obtener asists
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (idHorario) {
          const response = await Axios.get(
            `http://localhost:3000/server/Assists/${idHorario}`
          );
          setAsist(response.data.asistencias);
          //console.log(response.data.asistencias);
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
          <Card.Header as="h3">Asistencias de {NombreMateria}</Card.Header>
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
                  <th>Fecha</th>
                  <th>Asistió</th>
                </tr>
              </thead>
              <tbody>
                {asist.map((item, idx) => {
                  const formattedDate = new Date(item.fecha).toLocaleDateString(
                    "es-ES"
                  );
                  return (
                    <tr key={idx}>
                      <td>{idx}</td>
                      <td>{item.Nombre}</td>
                      <td>{item.Apellido}</td>
                      <td>{formattedDate}</td>
                      <td>{item.Asistio}</td>
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

export default VerAsistencias;
