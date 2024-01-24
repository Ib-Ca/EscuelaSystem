import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { useParams, useNavigate } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Axios from "axios";

function VerObservaciones({ User }) {
  const { username } = useParams();
  const navigate = useNavigate();
  const [info, setInfo] = useState([]);
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
            "http://localhost:3000/server/observacion"
          );
          const filteredResults = response.data.filter(
            (item) => item.Alumnos_idAlumnos === User.user.Alumnos_idAlumnos
          );
          setInfo(filteredResults);
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
          <Card.Header as="h3">Detalles de tus Observaciones</Card.Header>
          <Card.Body>
            <Accordion defaultActiveKey="0">
              {info.map((item, idx) => (
                <Accordion.Item key={idx} eventKey={idx.toString()}>
                  <Accordion.Header>Observación #{idx + 1}</Accordion.Header>
                  <Accordion.Body>
                    <p>Descripción: {item.descripcion}</p>
                    <p>Fecha: {item.fecha}</p>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </Card.Body>
        </Card>
      </Container>
    </>
  ) : null;
}

export default VerObservaciones;
