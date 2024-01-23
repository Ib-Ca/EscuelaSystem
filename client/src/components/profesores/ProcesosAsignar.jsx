import Axios from "axios";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/esm/Table";
import ButtonGroup from "react-bootstrap/esm/ButtonGroup";

function ProcesosAsignar({ User }) {
  const { idSemestre, username } = useParams();
  const navigate = useNavigate();
  const [procesosLista, setProcesosLista] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const procesos = await Axios.get(
          `http://localhost:3000/server/getProc?idSemestre=${idSemestre}`
        );
        /*     const tipoProcesoResponse = await Axios.get(
          "http://localhost:3000/getTipoProceso"
        );*/
        setProcesosLista(procesos.data);
        /*  if (tipoProcesoData.length > 0) {
          setSelectTipoProc(tipoProcesoData[0].descripcion);
        }
        if (indicadoresData.length > 0) {
          setSelectIndi(indicadoresData[0].Descripcion);
        }*/
      } catch (error) {
        console.error("Error al obtener datos:", error);
        // Manejar errores según tu necesidad
      }
    };
    fetchData();
  }, []);
  console.log(procesosLista);
  useEffect(() => {
    if (!(User && User.user.username === username)) {
      navigate("/home");
    }
  }, [User, username, navigate]);

  return User && User.user.username === username ? (
    <>
      <Container>
        <Card>
          <Card.Header as="h4">Procesos----Correciones</Card.Header>
          <Card.Body>
            <Card.Title>Special title treatment</Card.Title>
            <Card.Text>
              With supporting text below as a natural lead-in to additional
              content.
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
        <Table bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Proceso</th>
              <th>Materia</th>
              <th>Sección</th>
              <th>Semestre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {procesosLista.map((item, idx) => {
              return (
                <tr key={idx}>
                  <td>{idx}</td>
                  <td>{item.nombre}</td>
                  <td>{item.nombreMateria}</td>
                  <td>{item.nombreSeccion}</td>
                  <td>{item.nombreSemestre}</td>
                  <td>
                    <ButtonGroup aria-label="Basic example">
                      <Button variant="secondary">Left</Button>
                      <Button variant="secondary">Middle</Button>
                    </ButtonGroup>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </>
  ) : null;
}
export default ProcesosAsignar;
