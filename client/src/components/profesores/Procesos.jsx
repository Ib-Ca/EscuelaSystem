import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Modal from "react-bootstrap/Modal";
import Axios from "axios";

function Procesos({ User }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  ///////////////////////////////
  const { username } = useParams();
  const navigate = useNavigate();
  const [editar, setEditar] = useState(false);
  const [indicadores, setIndicadores] = useState([]);
  const [nombreIndi, setNombreIndi] = useState("");
  const [nombreProc, setNombreProc] = useState("");
  const [semestre, setSemestre] = useState("");
  const [seccion, setSeccion] = useState("");
  const [materia, setMateria] = useState("");
  const [totpuntos, setTotpuntos] = useState(0);
  const [puntos, setPuntos] = useState("");
  const [selectIndic, setSelectIndi] = useState("");
  const [tipoProceso, setTipoProceso] = useState([]);
  const [selectTipoProc, setSelectTipoProc] = useState("");
  const [tablita, setTablita] = useState([]);
  const [fecha, setFecha] = useState(undefined);
  const [semestreInfo, setSemestreInfo] = useState([]);
  const [infoProc, setInfoProc] = useState([]);
  const [infoIndicador, setInfoIndicador] = useState([]);
  const [aux, setAux] = useState([]);
  const [idAux, setIdAux] = useState("");
  const [idAux2, setIdAux2] = useState("");
  //check url y user log
  useEffect(() => {
    if (!(User && User.user.username === username)) {
      navigate("/home");
    }
  }, [User, username, navigate]);

  useEffect(() => {
    const fetchData = async () => {
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
        if (tipoProcesoData.length > 0) {
          setSelectTipoProc(tipoProcesoData[0].descripcion);
        }
        if (indicadoresData.length > 0) {
          setSelectIndi(indicadoresData[0].Descripcion);
        }
      } catch (error) {
        console.error("Error al obtener datos:", error);
        // Manejar errores según tu necesidad
      }
    };
    fetchData();
  }, []);

  const clean1 = () => {
    setNombreIndi("");
    setPuntos("");
    setSelectIndi("General");
  };

  const clean2 = () => {
    setTablita([]);
    setTotpuntos(0);
    setNombreProc("");
    setMateria("");
    setSeccion("");
    setSemestre("");
    setSelectTipoProc("");
    clean1();
  };
  //tablita
  const handleAdd = () => {
    const puntosNum = parseInt(puntos, 10);
    console.log(puntosNum);
    if (isNaN(puntosNum)) {
      alert("Debe ingresar un puntaje válido");
    } else {
      setTotpuntos((prevTotal) => prevTotal + puntosNum);
    }
    const add = {
      indicador: nombreIndi,
      puntos: puntosNum,
      tipo: selectIndic,
      id: "",
    };
    setTablita((prevTimes) => [...prevTimes, add]);
    clean1();
  };
  //borar de tablita
  const handleBorrar = (idx) => {
    const indicadorBorrado = tablita[idx];
    if (indicadorBorrado.punts) {
      setTotpuntos((prevTotal) => prevTotal - indicadorBorrado.puntos);
    }
    setTablita((prevTimes) => prevTimes.filter((item, index) => index !== idx));
  };

  const fetchDataSemestre = async () => {
    try {
      if (User && User.user.username === username) {
        const response = await Axios.get(
          `http://localhost:3000/server/getProfeSemestre/${username}`
        );
        setSemestreInfo(response.data);
      } else {
        navigate("/home");
      }
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };
  useEffect(() => {
    if (username) {
      fetchDataSemestre();
    }
  }, [User, username]);
  //añadir info en campos disabled
  const handleAddInfo = (item) => {
    setSemestre(item.NombreSemestre);
    setSeccion(item.DescripcionSeccion);
    setMateria(item.NombreMateria);
  };

  //crear proceso
  const handleSubmit = async (e) => {
    e.preventDefault();
    const datos = {
      datos1: {
        semestre,
        seccion,
        materia,
        nombreProc,
        selectTipoProc,
        fecha,
        totpuntos,
      },
      datos2: {
        tablita,
      },
    };
    try {
      const response = await Axios.post(
        "http://localhost:3000/crearProceso",
        datos
      );
      clean2();
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  //ver lista de procesos para editar o no puede ser borrar
  const handleEdicion = (NombreSemestre, DescripcionSeccion, NombreMateria) => {
    const datos = {
      NombreSemestre: NombreSemestre,
      DescripcionSeccion: DescripcionSeccion,
      NombreMateria: NombreMateria,
    };
    Axios.post("http://localhost:3000/server/getProceso", datos)
      .then((response) => {
        const respuestaServidor = response.data;
        setInfoProc(respuestaServidor.procesos);
        setInfoIndicador(respuestaServidor.indicadores);
        setAux(datos);
        //console.log("server: ", respuestaServidor);
        handleShow();
      })
      .catch((error) => {
        // console.error("Error: ", error);
        alert("No existen procesos");
      });
  };
  //comenzar proceso de edicion
  const editarProceso = (idx) => {
    const idProcesos = infoProc[idx].idProcesos;
    setIdAux(idProcesos);
    setIdAux2(infoProc[idx].Semestre_idSemestre);
    setTotpuntos(infoProc[idx].total_puntos);
    setNombreProc(infoProc[idx].nombre);
    setFecha(infoProc[idx].fecha_entrega);
    setMateria(aux.NombreMateria);
    setSeccion(aux.DescripcionSeccion);
    setSemestre(aux.NombreSemestre);
    setEditar(true);

    const tipoProcesoId = infoProc[idx].Tipo_proceso_idTipo_proceso;
    const tipoProcesoSeleccionado = tipoProceso.find(
      (item) => item.idTipo_proceso === tipoProcesoId
    );
    setSelectTipoProc(tipoProcesoSeleccionado.descripcion);

    const indicadoresProcesoActual = infoIndicador.filter(
      (indicador) => indicador.idProcesos === idProcesos
    );
    setTablita((prev) => [
      ...prev,
      ...indicadoresProcesoActual.map((indicador) => ({
        indicador: indicador.descripcion,
        puntos: indicador.puntos,
        tipo: indicador.tipo_indicador_descripcion,
        id: indicador.idIndicadores,
      })),
    ]);
    handleClose();
  };
  //rellenar para editar indicador
  const [index, setIndex] = useState("");
  const handleRellenar = (descripcion, puntos, tipo, idx) => {
    setNombreIndi(descripcion);
    setPuntos(puntos);
    setSelectIndi(tipo);
    setIndex(idx);
  };

  //editar indicador
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
      setTablita(nuevo);
      const numero = puntos - puntoAnterior;
      setTotpuntos((prevTotal) => prevTotal + numero);
    }
    clean1();
  };
  //actualizar
  const handleGuardarCambios = async () => {
    const datos = {
      datos1: {
        semestre,
        seccion,
        materia,
        nombreProc,
        selectTipoProc,
        fecha,
        totpuntos,
        idSemestre: idAux2,
        idProcesos: idAux,
      },
      datos2: {
        tablita,
      },
    };
    try {
      const response = await Axios.put("http://localhost:3000/updateProceso", {
        datos,
      });
      clean2();
      setEditar(false);
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  //borrar proceso
  const Borrar = () => {
    Axios.delete(`http://localhost:3000/deleteProc/${idAux}`)
      .then((response) => {
        location.reload();
      })
      .catch((error) => {
        console.error("Error al intentar borrar el elemento:", error);
        alert("Hubo un error");
      });
  };

  return User && User.user.username === username ? (
    <>
      <Container>
        <Card>
          <Card.Header as="h2">Crear Proceso</Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="semestre">
                  <Form.Label>Semestre</Form.Label>
                  <Form.Control disabled type="text" value={semestre} />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="seccion">
                  <Form.Label>Sección</Form.Label>
                  <Form.Control type="text" disabled value={seccion} />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="materia">
                  <Form.Label>Materia</Form.Label>
                  <Form.Control type="text" disabled required value={materia} />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="nombre">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nombre"
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
                    onChange={(e) => setSelectTipoProc(e.target.value)}
                  >
                    {tipoProceso.map((item, idx) => (
                      <option key={idx} value={item.descripcion}>
                        {item.descripcion}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group as={Col} md="2" controlId="fecha">
                  <Form.Label>Fecha</Form.Label>
                  <Form.Control
                    required
                    onChange={(e) => {
                      setFecha(e.target.value);
                    }}
                    type="date"
                    value={fecha || ""}
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
                    type="text"
                    placeholder="Descripción"
                    maxLength={100}
                    value={nombreIndi}
                    onChange={(e) => setNombreIndi(e.target.value)}
                  />
                </Form.Group>
                <Form.Group as={Col} md="1" controlId="puntos">
                  <Form.Label>Puntos</Form.Label>
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
                  >
                    {indicadores.map((item, idx) => (
                      <option key={idx} value={item.Descripcion}>
                        {item.Descripcion}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Col md="3" style={{ paddingTop: "32px" }}>
                  {!editar ? (
                    <Button variant="success" onClick={handleAdd}>
                      Añadir indicador
                    </Button>
                  ) : (
                    <Button variant="success" onClick={handleEditIndicador}>
                      Editar Indicador
                    </Button>
                  )}
                </Col>
              </Row>
              {!editar && <Button type="submit">Crear</Button>}
              {editar && (
                <>
                  <Button variant="primary" onClick={handleGuardarCambios}>
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
                  <Button variant="danger" onClick={Borrar}>
                    Eliminar
                  </Button>
                </>
              )}
              <div style={{ paddingTop: "16px" }}>
                <Table bordered hover>
                  <thead>
                    <tr>
                      <th>Descripción</th>
                      <th>Puntos</th>
                      <th>Tipos</th>
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
              <th>Semestre</th>
              <th>Sección</th>
              <th>Materia</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {semestreInfo.map((item, idx) => {
              return (
                <tr key={idx}>
                  <td>{idx}</td>
                  <td>{item.NombreSemestre}</td>
                  <td>{item.DescripcionSeccion}</td>
                  <td>{item.NombreMateria}</td>
                  <td>
                    {!editar && (
                      <ButtonGroup aria-label="Basic example">
                        <Button
                          variant="success"
                          onClick={() => handleAddInfo(item)}
                        >
                          Añadir
                        </Button>
                        <Button
                          variant="warning"
                          onClick={() =>
                            handleEdicion(
                              item.NombreSemestre,
                              item.DescripcionSeccion,
                              item.NombreMateria
                            )
                          }
                        >
                          Ver Procesos
                        </Button>
                        <Link to={`/proceso/${item.idSemestre}/${username}`}>
                          <Button variant="info"> Corregir Procesos</Button>
                        </Link>
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
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Table bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {infoProc.map((item, idx) => {
                return (
                  <tr key={idx}>
                    <td>{idx}</td>
                    <td>{item.nombre}</td>
                    <td>
                      <Button onClick={(e) => editarProceso(idx)}>
                        Editar
                      </Button>
                    </td>
                  </tr>
                );
              })}
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

export default Procesos;
