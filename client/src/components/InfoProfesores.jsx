import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/esm/Container";
import  Axios  from "axios";

function InfoAlumnos({ User }) {
  const { username, idProfesores } = useParams();
  const [profesorLista, setProfesorLista] = useState([]);
  const navigate = useNavigate();
  //check url y user log
  useEffect(() => {
    if (!(User && User.user.username === username)) {
      navigate("/home");
    }
  }, [User, username, navigate]);

  useEffect(() => {
    const fetchProfe = async () => {
      try {
        const response = await Axios.get(
          `http://localhost:3000/todosProfes/${idProfesores}`
        );
        setProfesorLista(response.data);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchProfe();
  }, []);

  return User && User.user.username === username ? (
    <Container>
      <Card>  
        <Card.Header as="h3">Detalles Profesor: </Card.Header>
        <Card.Body>
          <p><strong>Nombre:</strong> {profesorLista.Nombre}</p>
          <p><strong>Apellido:</strong> {profesorLista.Apellido}</p>
          <p><strong>Correo:</strong> {profesorLista.Correo}</p>
          <p><strong>Documento:</strong> {profesorLista.TipoDocumento} - {profesorLista.Numero_docu}</p>
          <p><strong>Estado Civil:</strong> {profesorLista.EstadoCivilDescripcion}</p>
          <p><strong>Nacionalidad:</strong> {profesorLista.NacionalidadDescripcion}</p>
          <p><strong>Número de Teléfono:</strong> {profesorLista.Numero_telefono}</p>
      </Card.Body>
    </Card>
    </Container>
  ) : null;
}

export default InfoAlumnos;
