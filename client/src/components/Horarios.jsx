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
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Modal from "react-bootstrap/Modal";

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
  const [selectDatos, setSelectDatos] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [show, setShow] = useState(false); //modal
  const handleClose = () => {
    setSelectDatos([]);
    setShow(false);
  }; //modal
  const handleShow = () => setShow(true); //modal
  const [editar, setEditar] = useState(false);

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
  //add en la listita de lform dia y horas
  const handleAdd = () => {
    const add = {
      day: dia,
      horaInicial: horaInicio,
      horaFinal: horaFin,
    };
    setTimes((prevTimes) => [...prevTimes, add]);
    clean1();
  };
  //borrar de la lista en el form
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
  //guardra horarios
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

  const [editId, setEditId] = useState("");
  // obtener todos los horarios creados y filtrar para edit
  const handleEdicion = (idProfe, idMateria, materia, profesor) => {
    setEditar(true);
    setEditId(idMateria);
    Axios.get("http://localhost:3000/server/fetchHorarios")
      .then((response) => {
        const horariosFiltrados = response.data.filter((horario) => {
          return (
            horario.idProfesores === idProfe &&
            horario.idMaterias === idMateria &&
            horario.NombreSemestre === Nombre &&
            horario.DescripcionSeccion === Seccion
          );
        });
        setYear(horariosFiltrados[0].año);
        const horariosEstructurados = horariosFiltrados.map((horario) => ({
          day: horario.dia,
          horaInicial: horario.inicio,
          horaFinal: horario.fin,
        }));
        setTimes((prevTimes) => [...prevTimes, ...horariosEstructurados]);
        setProfesor(profesor);
        setMateria(materia);
      })
      .catch((error) => {
        console.error("Error al hacer la petición:", error);
        alert("No se encontraron horarios asignados a esta materia");
        setEditar(false);
      });
  };

  //todas ediciones
  const [index, setIndex] = useState("");
  const handleEditarHorario = (day, horaInicial, horaFinal, idx) => {
    setDia(day);
    setHoraInicio(horaInicial);
    setHoraFin(horaFinal);
    setIndex(idx);
  };

  const handleEditarDiaYHora = () => {
    if (index !== null) {
      const newTimes = [...times];
      newTimes[index] = {
        day: dia,
        horaInicial: horaInicio,
        horaFinal: horaFin,
      };
      setTimes(newTimes);
    }
    clean1();
  };

  //guardar cambios edicion
  const handleEdit = async () => {
    const aux = {
      Nombre,
      Seccion,
      materia,
      profesor,
      year,
      times,
      idMateria: editId,
    };
    try {
      const response = await Axios.put(
        "http://localhost:3000/updateHorario",
        aux
      );
      console.log("dentro: ", times);
      clean2();
      setEditar(false);
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  //ver horarios
  const handleVer = (idProfe, idMateria, materia) => {
    setTitulo(materia);
    console.log("idProfe:", idProfe, "idMateria:", idMateria);
    Axios.get(`http://localhost:3000/server/fetchHorarios`)
      .then((response) => {
        const horariosFiltrados = response.data.filter((horario) => {
          return (
            horario.idProfesores === idProfe &&
            horario.idMaterias === idMateria &&
            horario.NombreSemestre === Nombre &&
            horario.DescripcionSeccion === Seccion
          );
        });
        console.log(horariosFiltrados);
        console.log("Horarios filtrados:", horariosFiltrados); // Agregado para depuración
        if (horariosFiltrados.length === 0) {
          alert("No se encontraron horarios asignados a esta materia");
        } else {
          setSelectDatos(horariosFiltrados);
          handleShow();
        }
      })
      .catch((error) => {
        console.error("Error al hacer la petición:", error);
        alert("Hubo un error, por favor inténtelo de nuevo");
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get(
          "http://localhost:3000/server/fetchHorarios"
        );
        console.log(response.data); // Muestra los datos en la consola
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    fetchData();
  }, []);

  console.log(selectDatos);
  //console.log("tablita: ", times);
  //console.log(dia);
  //console.log(horaInicio);
  //console.log(horaFin);
  //console.log(profesor);
  //console.log(materia);
  //console.log(year);
  //console.log(data);
  //console.log(materiasInfo);
  //console.log(editar);
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
                  {!editar ? (
                    <Button variant="success" onClick={handleAdd}>
                      Añadir día y hora
                    </Button>
                  ) : (
                    <Button variant="success" onClick={handleEditarDiaYHora}>
                      Editar día y hora
                    </Button>
                  )}
                </Col>
              </Row>
              {!editar && <Button type="submit">Crear horario</Button>}
              {editar && (
                <>
                  <Button variant="primary" onClick={handleEdit}>
                    Guardar cambios
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      clean2();
                      setEditar(false);
                    }}
                  >
                    Cancelar
                  </Button>
                </>
              )}
              <div style={{ paddingTop: "16px" }}>
                <Table bordered hover>
                  <thead>
                    <tr>
                      <th>Día</th>
                      <th>Hora Inicial</th>
                      <th>Hora Final</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {times.map((item, idx) => (
                      <tr key={idx}>
                        <td>{item.day}</td>
                        <td>{item.horaInicial}</td>
                        <td>{item.horaFinal}</td>
                        <td>
                          {editar && (
                            <Button
                              variant="info"
                              onClick={() =>
                                handleEditarHorario(
                                  item.day,
                                  item.horaInicial,
                                  item.horaFinal,
                                  idx
                                )
                              }
                            >
                              Editar
                            </Button>
                          )}
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
                    {!editar && (
                      <ButtonGroup aria-label="Basic example">
                        <Button
                          variant="success"
                          onClick={() => handleAddHorario(item)}
                        >
                          Añadir
                        </Button>
                        <Button
                          variant="warning"
                          onClick={() =>
                            handleEdicion(
                              item.idProfesor,
                              item.idMateria,
                              item.nombreMateria,
                              item.nombreProfesor
                            )
                          }
                        >
                          Editar horario
                        </Button>
                        <Button
                          variant="info"
                          onClick={() =>
                            handleVer(
                              item.idProfesor,
                              item.idMateria,
                              item.nombreMateria
                            )
                          }
                        >
                          Ver horarios
                        </Button>
                      </ButtonGroup>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{titulo}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table bordered hover>
            <thead>
              <tr>
                <th>Día</th>
                <th>Hora Inicio</th>
                <th>Hora Fin</th>
                <th>Profesor</th>
              </tr>
            </thead>
            <tbody>
              {selectDatos.map((item, idx) => {
                return (
                  <tr key={idx}>
                    <td>{item.dia}</td>
                    <td>{item.inicio}</td>
                    <td>{item.fin}</td>
                    <td>
                      {item.Nombre} {item.Apellido}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Horarios;
