import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/esm/Container";
import  Axios  from "axios";

function InfoAlumnos({ User }) {
  const { username, idAlumno } = useParams();
  const [alumnosLista, setAlumnosLista] = useState([]);
  const navigate = useNavigate();
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
          `http://localhost:3000/alumnos/${idAlumno}`
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
          <p><strong>Nombre:</strong> {alumnosLista.Nombre}</p>
          <p><strong>Apellido:</strong> {alumnosLista.Apellido}</p>
          <p><strong>Correo:</strong> {alumnosLista.Correo}</p>
          <p><strong>Documento:</strong> {alumnosLista.TipoDocumento} - {alumnosLista.Numero_docu}</p>
          <p><strong>Estado Alumno:</strong> {alumnosLista.EstadoAlumnoDescripcion}</p>
          <p><strong>Estado Civil:</strong> {alumnosLista.EstadoCivilDescripcion}</p>
          <p><strong>Fecha de Nacimiento:</strong> {new Date(alumnosLista.Fecha_nacimiento).toLocaleDateString()}</p>
          <p><strong>Lugar de Nacimiento:</strong> {alumnosLista.Lugar_nacimiento}</p>
          <p><strong>Movilidad:</strong> {alumnosLista.MovilidadDescripcion}</p>
          <p><strong>Nacionalidad:</strong> {alumnosLista.NacionalidadDescripcion}</p>
          <p><strong>Número de Teléfono:</strong> {alumnosLista.Numero_telefono}</p>
          <p><strong>Sección:</strong> {alumnosLista.Seccion}</p>
          <p><strong>Semestre:</strong> {alumnosLista.SemestreNombre}</p>
          <p><strong>Distancia:</strong> {alumnosLista.distancia}</p>
          <p><strong>Tiempo:</strong> {alumnosLista.tiempo}</p>
      </Card.Body>
    </Card>
    </Container>
  ) : null;
}

export default InfoAlumnos;
