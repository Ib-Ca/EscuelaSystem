import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Axios from "axios";
import Container from "react-bootstrap/esm/Container";
import Table from "react-bootstrap/esm/Table";
import ButtonGroup from "react-bootstrap/esm/ButtonGroup";
import Button from "react-bootstrap/Button";

function VerMaterias({ User }) {
  const { username } = useParams();
  const navigate = useNavigate();
  const [lista, setLista] = useState([]);

  //check url y user log
  useEffect(() => {
    if (!(User && User.user.username === username)) {
      navigate("/home");
    }
  }, [User, username, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (User) {
          const response = await Axios.get(
            ` http://localhost:3000/getSemestreAl/${User.user.Alumnos_idAlumnos}`
          )
            .then((response) => {
              const Nombre = response.data.nombreSemestre;
              return Axios.get(
                `http://localhost:3000/porFavorSemestre/${Nombre}`
              );
            })
            .then((response2) => {
              setLista(response2.data);
            });
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
          <Card.Header as="h3">Listado de Materias</Card.Header>
          <Card.Body>
            <Table bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Semestre</th>
                  <th>Sección</th>
                  <th>Materia</th>
                </tr>
              </thead>
              <tbody>
                {lista.map((item, idx) => {
                  return (
                    <tr key={idx}>
                      <td>{item.Nombre}</td>
                      <td>{item.DescripcionSeccion}</td>
                      <td>{item.NombreMateria}</td>
                      <td>
                        <ButtonGroup>
                          <Link
                            to={`/alumno/procesos/${username}/${item.idSemestre}`}
                          >
                            <Button variant="success">Ver Procesos</Button>
                          </Link>
                          <Link
                            to={`/alumno/asistencia/${username}`}
                          >
                            <Button variant="info">Ver Asistencias</Button>
                          </Link>
                        </ButtonGroup>
                      </td>
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

export default VerMaterias;
