import Axios from "axios";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Table from "react-bootstrap/esm/Table";
import Card from "react-bootstrap/Card";
import { useParams, useNavigate } from "react-router-dom";

function ProcesoVer({ User }) {
  const { idProceso, username, IdSemestre, materia } = useParams();
  const navigate = useNavigate();
  const [alumnosLista, setAlumnosLista] = useState([]);
  const [titulo, setTitulo] = useState([]);


  useEffect(() => {
    const fetchAlumnos = async () => {
      try {
        if (IdSemestre) {
          const response = await Axios.get(
            `http://localhost:3000/server/procesoxalumno/${idProceso}`
          );
          setAlumnosLista(response.data);
          setTitulo(response.data[0].procesoNombre)
        } else {
          console.error("IdSemestre no tiene un valor válido");
        }
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchAlumnos();
  }, [IdSemestre]);

  //check url y user log
  useEffect(() => {
    if (!(User && User.user.username === username)) {
      navigate("/home");
    }
  }, [User, username, navigate]);
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return User && User.user.username === username ? (
    <>
      <Container>
        <Card>
          <Card.Header as="h4">{titulo}</Card.Header>
          <Card.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Documento</th>
                  <th>Obtenido</th>
                  <th>Total</th>
                  <th>Entregada</th>
                  <th>Fecha Límite</th>
                </tr>
              </thead>
              <tbody>
                {alumnosLista.map((item, idx) => (
                  <tr key={idx}>
                    <td>{idx}</td>
                    <td>{item.alumnoNombre}</td>
                    <td>{item.alumnoApellido}</td>
                    <td>{item.alumnoNumeroDocumento}</td>
                    <td>{item.logrado_puntos}</td>
                    <td>{item.procesoTotalPuntos}</td>
                    <td>{formatDate(item.fecha_entregado)}</td>
                    <td>{formatDate(item.procesoFechaEntrega)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
    </>
  ) : null;
}

export default ProcesoVer;
