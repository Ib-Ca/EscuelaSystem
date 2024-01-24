import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/esm/Container";
import  Axios  from "axios";

function InfoAlumnos({ User }) {
  const { username, idProfesores } = useParams();
  const [alumnosLista, setAlumnosLista] = useState([]);
  const navigate = useNavigate();
  console.log(idProfesores);
  //check url y user log
  useEffect(() => {
    if (!(User && User.user.username === username)) {
      navigate("/home");
    }
  }, [User, username, navigate]);

  useEffect(() => {
    const fetchAlumnos = async () => {
      try {
        const response = await Axios.get(
          `http://localhost:3000/todosProfes/${idProfesores}`
        );
        setAlumnosLista(response.data);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchAlumnos();
  }, []);

  return User && User.user.username === username ? (
    <Container>
      <Card>
        <Card.Header as="h3">Detalles Alumno: </Card.Header>
      <Card.Body>
 
      </Card.Body>
    </Card>
    </Container>
  ) : null;
}

export default InfoAlumnos;
