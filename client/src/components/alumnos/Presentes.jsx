import Axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/esm/Container";
import Table from "react-bootstrap/esm/Table";
import ButtonGroup from "react-bootstrap/esm/ButtonGroup";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
function Presentes({ User }) {
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
            `http://localhost:3000/asistenciasnomas/${User.user.Alumnos_idAlumnos}`
          );
          setLista(response.data);
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
          <Card.Header as="h3">Tareas Entregadas</Card.Header>
          <Card.Body>
            <Table bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Fecha</th>
                  <th>Hora Inicio</th>
                  <th>Hora Fin</th>
                  <th>Asistencia</th>
                </tr>
              </thead>
              <tbody>
                {lista.map((item, idx) => {
                  const fecha = new Date(item.fecha).toLocaleDateString();
                  return (
                    <tr key={idx}>
                      <td>{idx}</td>
                      <td>{fecha}</td>
                      <td>{item.inicio}</td>
                      <td>{item.fin}</td>
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

export default Presentes;
