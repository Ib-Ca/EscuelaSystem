import Axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/esm/Container";
import Table from "react-bootstrap/esm/Table";
import ButtonGroup from "react-bootstrap/esm/ButtonGroup";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";

function CheckProcesos({ User }) {
  const { username, idSemestre } = useParams();
  const navigate = useNavigate();
  const [lista, setLista] = useState([]);
  console.log(User.user.Alumnos_idAlumnos);
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
            `http://localhost:3000/alumno/proceso/${idSemestre}`
          );
          const filteredResults = response.data.filter(
            (item) => item.Alumnos_idAlumnos === User.user.Alumnos_idAlumnos
          );
          console.log(filteredResults);
          setLista(filteredResults);
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
                  <th>Tarea</th>
                  <th>Estado</th>
                  <th>Entragar</th>
                  <th>Entregado</th>
                  <th>Tot. Puntos</th>
                  <th>Log. Puntos</th>
                </tr>
              </thead>
              <tbody>
                {lista.map((item, idx) => {
                  const fechaEntregaFormateada = new Date(
                    item.fecha_entrega
                  ).toLocaleDateString();
                  const fechaEntregadoFormateada = new Date(
                    item.fecha_entregado
                  ).toLocaleDateString();
                  return (
                    <tr key={idx}>
                      <td>{idx}</td>
                      <td>{item.nombre}</td>
                      <td>{item.estado}</td>
                      <td>{fechaEntregaFormateada}</td>
                      <td>{fechaEntregadoFormateada}</td>
                      <td>{item.logrado_puntos}</td>
                      <td>{item.total_puntos}</td>
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

export default CheckProcesos;
