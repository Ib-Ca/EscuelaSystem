import Axios from "axios";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/esm/Table";
import ButtonGroup from "react-bootstrap/esm/ButtonGroup";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";

function ProcesosAsignar({ User }) {
  const { idSemestre, username, materia } = useParams();
  const navigate = useNavigate();
  const [procesosLista, setProcesosLista] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  //////////////////////////////////////////////////////////

  const [editar, setEditar] = useState(false);
  const [indicadores, setIndicadores] = useState([]);
  const [nombreIndi, setNombreIndi] = useState("");
  const [nombreProc, setNombreProc] = useState("");
  const [semestre, setSemestre] = useState("");
  const [seccion, setSeccion] = useState("");
  const [materias, setMaterias] = useState("");
  const [totpuntos, setTotpuntos] = useState(0);
  const [puntos, setPuntos] = useState("");
  const [selectIndic, setSelectIndi] = useState("");
  const [tipoProceso, setTipoProceso] = useState([]);
  const [selectTipoProc, setSelectTipoProc] = useState("");
  const [tablita, setTablita] = useState([]);
  const [fecha, setFecha] = useState(undefined);
  const [fechaEntr, setFechaEntr] = useState(undefined);
  const [IdAux, setIdAux] = useState("");
  const [IdAux2, setIdAux2] = useState("");
  const [IdAux3, setIdAux3] = useState("");
  const [alumnosLista, setAlumnosLista] = useState([]);
  const [nombreAl, setNombreAl] = useState("");
  const [apellidoAl, setApellidoAl] = useState("");
  const [puntosCons, setPuntosCons] = useState(0);
  const [indicadorLista, setIndicadorLista] = useState([]);
  const [logica, setLogica] = useState(false);
  const [auxi, setAuxi] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const procesos = await Axios.get(
          `http://localhost:3000/server/getProc?idSemestre=${idSemestre}`
        );
        setProcesosLista(procesos.data);
        //console.log("entro");
        setAuxi(procesos.data[0].nombreSemestre);
        setIdAux2(idSemestre);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };
    fetchData();
  }, []);
  //check url
  useEffect(() => {
    if (!(User && User.user.username === username)) {
      navigate("/home");
    }
  }, [User, username, navigate]);

  useEffect(() => {
    const fetchDatas = async () => {
      try {
        const indicadoresResponse = await Axios.get(
          "http://localhost:3000/geTipoIndicadores"
        );
        const tipoProcesoResponse = await Axios.get(
          "http://localhost:3000/getTipoProceso"
        );
        const indicadoresData = indicadoresResponse.data;
        const tipoProcesoData = tipoProcesoResponse.data;
        setIndicadores(indicadoresResponse.data);
        setTipoProceso(tipoProcesoResponse.data);
      } catch (error) {
        console.error("Error al obtener datos:", error);
        // Manejar errores según tu necesidad
      }
    };
    fetchDatas();
  }, []);

  const clean1 = () => {
    setNombreIndi("");
    setPuntos("");
    setSelectIndi("General");
  };

  const clean2 = () => {
    setTablita([]);
    setEditar(false);
    setLogica(false);
    setFecha(undefined);
    setNombreProc("");
    setMaterias("");
    setSemestre("");
    setSeccion("");
    setTotpuntos(0);
    setPuntosCons(0);
    setSelectTipoProc("");
    setFechaEntr(undefined);
    clean1();
  };

  const [index, setIndex] = useState("");
  const handleRellenar = (descripcion, puntos, tipo, idx) => {
    setNombreIndi(descripcion);
    setPuntos(puntos);
    setSelectIndi(tipo);
    setIndex(idx);
  };
  //cargar datos de proceso a ser corregido
  const corregir = (item) => {
    setIdAux(item.idProcesos);
    setIdAux2(item.Semestre_idSemestre);
    setFecha(item.fecha_entrega);
    setNombreProc(item.nombre);
    setMaterias(item.nombreMateria);
    setSemestre(item.nombreSemestre);
    setSeccion(item.nombreSeccion);
    setTotpuntos(item.total_puntos);
    setSelectTipoProc(item.tipoProcesoDescripcion);
    setFechaEntr(item.fecha_entrega);
    setPuntosCons(item.total_puntos);
    fetchAlumnos();
    handleShow();
  };

  //obtener datos de alumno para ser corregido
  const fetchAlumnos = async () => {
    try {
      if (auxi) {
        const alumnos = await Axios.get(
          `http://localhost:3000/server/obtenerAlumno?semestre=${auxi}`
        );
        setAlumnosLista(alumnos.data);
      } else {
        //console.error("IdAux2 o auxi no tienen valores válidos");
      }
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  // useEffect para obtener datos de procesos al montar el componente
  useEffect(() => {
    fetchAlumnos();
  }, [materia]);

  //obtener datos de indicadores para ser corregido
  const fetchIndicadores = async () => {
    try {
      const indicadors = await Axios.get(
        `http://localhost:3000/server/getIndicador?idProcesos=${IdAux}`
      );
      setIndicadorLista(indicadors.data);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  // useEffect para obtener datos de procesos al montar el componente
  useEffect(() => {
    fetchIndicadores();
  }, [IdAux]);

  //rellenar el form con la info de alumnos
  const fillAlumno = (Nombre, Apellido, idAlumnos, estado) => {
    if (estado === "Entregado") {
      setLogica(true);
    }
    setNombreAl(Nombre);
    setApellidoAl(Apellido);
    setIdAux3(idAlumnos);
    const newTablita = indicadorLista.map((indicador) => ({
      indicador: indicador.descripcion,
      puntos: indicador.puntos,
      tipo: indicador.TipoIndicadorDescripcion,
      id: indicador.idIndicadores,
    }));
    setTablita((prevTablita) => [...prevTablita, ...newTablita]);
    handleClose();
    setEditar(true);
  };
  //editar el puntaje obtenido en los indicadores
  const handleEditIndicador = () => {
    if (index !== null) {
      const nuevo = [...tablita];
      const puntoAnterior = nuevo[index].puntos;
      nuevo[index] = {
        indicador: nombreIndi,
        puntos: puntos,
        tipo: selectIndic,
        id: nuevo[index].id,
      };
      const numero = puntos - puntoAnterior;
      const nuevoTotal = puntosCons + numero;
      if (nuevoTotal <= totpuntos) {
        setPuntosCons(nuevoTotal);
        setTablita(nuevo);
      } else {
        alert("El puntaje obtenido no puede ser mayor al total");
      }
    }
    clean1();
  };

  //guardar correciones
  const handleCambios = () => {
    const data = {
      idProceso: IdAux,
      idAlumno: IdAux3,
      logrado: puntosCons,
      entregado: fechaEntr,
      estado: "Entregado",
    };
    if (logica) {
      // edición
      Axios.put(`http://localhost:3000/procesoXalumno/${IdAux}/${IdAux3}`, data)
        .then((response) => {
          console.log("Respuesta exitosa en la edición:", response.data);
        })
        .catch((error) => {
          console.error("Error en la solicitud de edición:", error);
        });
    } else {
      //guardar
      Axios.post("http://localhost:3000/procesoXalumno", data)
        .then((response) => {
          console.log("Respuesta exitosa en el guardado:", response.data);
        })
        .catch((error) => {
          console.error("Error en la solicitud de guardado:", error);
        });
    }
    clean2();
  };

  const [alumnosProcesados, setAlumnosProcesados] = useState(new Set());

  //console.log(procesosLista);
  //console.log(alumnosLista);
  //console.log("id: ", IdAux2);
  //console.log(indicadorLista);
  return User && User.user.username === username ? (
    <>
      <Container>
        <Card>
          <Card.Header as="h4">Procesos---Correcciones</Card.Header>
          <Card.Body>
            <Form>
              <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="semestre">
                  <Form.Label>Semestre</Form.Label>
                  <Form.Control disabled type="text" value={semestre} />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="seccion">
                  <Form.Label>Sección</Form.Label>
                  <Form.Control type="text" disabled value={seccion} />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="materias">
                  <Form.Label>Materia</Form.Label>
                  <Form.Control
                    type="text"
                    disabled
                    required
                    value={materias}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="nombre">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control disabled type="text" value={nombreAl} />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="apellido">
                  <Form.Label>Apellido</Form.Label>
                  <Form.Control type="text" disabled value={apellidoAl} />
                </Form.Group>
                <Form.Group as={Col} md="2" controlId="fecha">
                  <Form.Label>Fecha final</Form.Label>
                  <Form.Control
                    disabled
                    required
                    onChange={(e) => {
                      setFecha(e.target.value);
                    }}
                    type="date"
                    value={fecha || ""}
                  />
                </Form.Group>
                <Form.Group as={Col} md="2" controlId="fecha">
                  <Form.Label>Fecha Entregada</Form.Label>
                  <Form.Control
                    required
                    onChange={(e) => {
                      setFechaEntr(e.target.value);
                    }}
                    type="date"
                    value={fechaEntr || ""}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="nombre">
                  <Form.Label>Tarea</Form.Label>
                  <Form.Control
                    type="text"
                    disabled
                    required
                    maxLength={50}
                    value={nombreProc}
                    onChange={(e) => setNombreProc(e.target.value)}
                  />
                </Form.Group>
                <Form.Group as={Col} md="2" controlId="tipo">
                  <Form.Label>Tipo</Form.Label>
                  <Form.Select
                    value={selectTipoProc}
                    disabled
                    onChange={(e) => setSelectTipoProc(e.target.value)}
                  >
                    {tipoProceso.map((item, idx) => (
                      <option key={idx} value={item.descripcion}>
                        {item.descripcion}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group as={Col} md="2" controlId="total">
                  <Form.Label as="h5">Pts Obtenidos</Form.Label>
                  <Form.Control
                    type="number"
                    required
                    disabled
                    value={puntosCons}
                  />
                </Form.Group>
                <Form.Group as={Col} md="2" controlId="total">
                  <Form.Label as="h5">Total Pts</Form.Label>
                  <Form.Control
                    type="number"
                    required
                    disabled
                    value={totpuntos}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="indicador">
                  <Form.Label>Indicador</Form.Label>
                  <Form.Control
                    disabled
                    type="text"
                    placeholder="Descripción"
                    maxLength={100}
                    value={nombreIndi}
                    onChange={(e) => setNombreIndi(e.target.value)}
                  />
                </Form.Group>
                <Form.Group as={Col} md="1" controlId="puntos">
                  <Form.Label>Puntaje</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Pts."
                    value={puntos}
                    onChange={(e) => setPuntos(e.target.value)}
                  />
                </Form.Group>
                <Form.Group as={Col} md="2" controlId="tipoindi">
                  <Form.Label>Tipo</Form.Label>
                  <Form.Select
                    value={selectIndic}
                    onChange={(e) => setSelectIndi(e.target.value)}
                    disabled
                  >
                    {indicadores.map((item, idx) => (
                      <option key={idx} value={item.Descripcion}>
                        {item.Descripcion}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Col md="3" style={{ paddingTop: "32px" }}>
                  {editar ? (
                    <Button variant="success" onClick={handleEditIndicador}>
                      Guardar Puntaje
                    </Button>
                  ) : null}
                </Col>
              </Row>
              {editar && (
                <>
                  <Button variant="success" onClick={handleCambios}>
                    Guardar
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
                      <th>Descripción</th>
                      <th>Puntos Obtenidos</th>
                      <th>Tipo</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tablita.map((item, idx) => (
                      <tr key={idx}>
                        <td>{item.indicador}</td>
                        <td>{item.puntos}</td>
                        <td>{item.tipo}</td>
                        <td>
                          {editar && (
                            <Button
                              variant="info"
                              onClick={(e) => {
                                handleRellenar(
                                  item.indicador,
                                  item.puntos,
                                  item.tipo,
                                  idx
                                );
                              }}
                            >
                              Editar
                            </Button>
                          )}
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
                    {!editar ? (
                      <ButtonGroup>
                        <Button onClick={(e) => corregir(item)}>
                          Corregir
                        </Button>
                        <Link
                          to={`/proceso/${item.idProcesos}/${username}/${item.Semestre_idSemestre}/${item.nombreMateria}`}
                        >
                          <Button variant="info"> Ver Entregados</Button>
                        </Link>
                      </ButtonGroup>
                    ) : null}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
      <Modal show={show} size="lg" onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Documento</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {alumnosLista
                .filter(
                  (alumno, index, self) =>
                    index ===
                    self.findIndex((a) => a.idAlumnos === alumno.idAlumnos)
                )
                .map((item, idx) => (
                  <tr key={idx}>
                    <td>{idx}</td>
                    <td>{item.Nombre}</td>
                    <td>{item.Apellido}</td>
                    <td>{item.Numero_docu}</td>
                    <td>
                      <Button
                        onClick={() =>
                          fillAlumno(item.Nombre, item.Apellido, item.idAlumnos)
                        }
                      >
                        Corregir
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  ) : null;
}
export default ProcesosAsignar;
