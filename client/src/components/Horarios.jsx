import Axios from "axios";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useParams } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";

function Horarios() {
  const { Nombre, Seccion } = useParams();
  const [data, setData] = useState([]);
  const [times, setTimes] = useState([]);
  const [dia, setDia] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFin, setHoraFin] = useState("");
  const [materia, setMateria] = useState("");
  const [profesor, setProfesor] = useState("");
  const [materiasInfo, setMateriasInfo] = useState([]);
  const [year, setYear] = useState("");

  useEffect(() => {
    const fetchSemestre = async () => {
      try {
        const response = await Axios.get(
          `http://localhost:3000/editSemestre/${Nombre}`
        );
        const filteredData = response.data.filter(
          (item) => item.SeccionDescripcion === Seccion
        );
        setData(filteredData);
        const materiasInfoArray = filteredData.map((materia) => ({
          idMateria: materia.Materias_idMaterias,
          nombreMateria: materia.MateriaNombre,
          idProfesor: materia.Profesores_idProfesores,
          nombreProfesor: materia.ProfesorNombre,
          apellidoProfesor: materia.ProfesorApellido,
        }));
        setMateriasInfo(materiasInfoArray);
      } catch (error) {
        console.error("Error al obtener las secciones:", error);
      }
    };
    fetchSemestre();
  }, [Nombre, Seccion]);

  const handleAdd = () => {
    const add = {
      day: dia,
      horaInicial: horaInicio,
      horaFinal: horaFin,
    };
    setTimes((prevTimes) => [...prevTimes, add]);
    clean1();
  };

  const handleBorrar = (idx) => {
    setTimes((prevTimes) => prevTimes.filter((item, index) => index !== idx));
  };

  const handleHourChange = (e, setHour) => {
    const inputValue = e.target.value;
    // Permitir solo dígitos, dos puntos y longitud máxima de 5 caracteres
    if (/^[0-9:]{0,5}$/.test(inputValue)) {
      setHour(inputValue);
    }
  };

  const handleAddHorario = (item) => {
    setMateria(item.nombreMateria);
    setProfesor(item.nombreProfesor);
  };

  const clean1 = () => {
    setHoraInicio("");
    setDia("");
    setHoraFin("");
  };

  const clean2 = () => {
    setProfesor("");
    setMateria("");
    setYear("");
    setTimes([]);
    clean1();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const aux = {
      Nombre,
      Seccion,
      materia,
      profesor,
      year,
      times,
    };
    try {
      const response = await Axios.post(
        "http://localhost:3000/createHorario",
        aux
      );
      //console.log("Respuesta del servidor:", response.data);
      clean2();
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };


  //ejemplo para obtener todos los horarios creados
  const [datos,setDatos]=useState(null)
  const getcosita = () => {
    Axios.get(`http://localhost:3000/server/fetchHorarios`)
      .then((response) => {
        // Aquí actualizas el estado con los datos recibidos
        setDatos(response.data);
      })
      .catch((error) => {
        console.error("Error al hacer la petición:", error);
        // Aquí podrías manejar el error si es necesario
      });
  };
//console.log(datos);
  //console.log(times);
  //console.log(dia);
  //console.log(horaInicio);
  //console.log(horaFin);
  //console.log(profesor);
  //console.log(materia);
  //console.log(year);
  //console.log(data);
  //console.log(materiasInfo);
  return (
    <>
      <Container>
        <Card>
          <Card.Header as="h2">
            Horarios de {Nombre}--Sección: {Seccion}
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="materia">
                  <Form.Label>Materia</Form.Label>
                  <Form.Control
                    disabled
                    type="text"
                    placeholder="Materia"
                    value={materia}
                  />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="profesor">
                  <Form.Label>Profesor</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Profesor"
                    disabled
                    value={profesor}
                  />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="year">
                  <Form.Label>Año</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Año"
                    required
                    value={year}
                    onChange={(e) => {
                      setYear(e.target.value);
                    }}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="3" controlId="dia">
                  <Form.Label>Día</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Dia"
                    value={dia}
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      if (/^[A-Za-z]+$/.test(inputValue) || inputValue === "") {
                        setDia(inputValue);
                      }
                    }}
                  />
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="inicio">
                  <Form.Label>Hora de Inicio</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="HH:mm"
                    value={horaInicio}
                    onChange={(e) => handleHourChange(e, setHoraInicio)}
                  />
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="fin">
                  <Form.Label>Hora fin</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="HH:mm"
                    value={horaFin}
                    onChange={(e) => handleHourChange(e, setHoraFin)}
                  />
                </Form.Group>
                <Col md="3" style={{ paddingTop: "32px" }}>
                  <Button variant="success" onClick={handleAdd}>
                    Añadir día y hora
                  </Button>
                </Col>
              </Row>
              <Button type="submit">Crear horario</Button>
              <div style={{ paddingTop: "16px" }}>
                <Table bordered hover>
                  <thead>
                    <tr>
                      <th>Día</th>
                      <th>Hora Inicial</th>
                      <th>Hora Final</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {times.map((item, idx) => (
                      <tr key={idx}>
                        <td>{item.day}</td>
                        <td>{item.horaInicial}</td>
                        <td>{item.horaFinal}</td>
                        <td>
                          <Button
                            variant="danger"
                            onClick={() => handleBorrar(idx)}
                          >
                            Borrar
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Form>
          </Card.Body>
        </Card>
        <Table bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Materia</th>
              <th>Nombre Profesor</th>
              <th>Apellido Profesor</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {materiasInfo.map((item, idx) => {
              return (
                <tr key={idx}>
                  <td>{idx}</td>
                  <td>{item.nombreMateria}</td>
                  <td>{item.nombreProfesor}</td>
                  <td>{item.apellidoProfesor}</td>
                  <td>
                    <Button
                      variant="success"
                      onClick={() => handleAddHorario(item)}
                    >
                      Añadir Horarios
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default Horarios;
