import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/Card";
import Axios from "axios";

function Allhorario() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get(
          "http://localhost:3000/server/fetchHorarios"
        );
        setData(response.data);
      } catch (error) {
        // console.error("Error al obtener datos:", error);
      }
    };

    fetchData();
  }, []);

  const filteredData = data.filter((item) =>
    item.NombreSemestre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Container>
        <Card>
          <Card.Header as="h2">Todos los Horarios</Card.Header>
          <Card.Body>
            <div>
              <input
                type="text"
                placeholder="Buscar por semestre..."
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Semestre</th>
                  <th>Sección</th>
                  <th>Materia</th>
                  <th>Día</th>
                  <th>Hora Inicio</th>
                  <th>Hora Fin</th>
                  <th>Profesor</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, idx) => (
                  <tr key={idx}>
                    <td>{idx}</td>
                    <td>{item.NombreSemestre}</td>
                    <td>{item.DescripcionSeccion}</td>
                    <td>{item.NombreMateria}</td>
                    <td>{item.dia}</td>
                    <td>{item.inicio}</td>
                    <td>{item.fin}</td>
                    <td>{item.Nombre} {item.Apellido}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default Allhorario;
