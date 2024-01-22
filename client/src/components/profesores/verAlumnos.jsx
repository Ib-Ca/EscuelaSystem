import Axios from "axios";
import { React, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/esm/Container";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Col from "react-bootstrap/Col";
function VerAlumnos({ User }) {
  ///////MODALS////////////////
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  //2
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => {
    setShow2(false);
    handleShow1();
    setFecha();
  };
  const handleShow2 = () => setShow2(true);


  ///////////////////////////////////////////
  const { username } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [alumnData, setAlumnData] = useState([]);
  const [titulos, setTitulos] = useState({
    semestre: "",
    seccion: "",
    materia: "",
    nombre: "",
    Apellido: "",
  });
  const [gravedad, setGravedad] = useState([]);
  const [selectedGravedad, setSelectedGravedad] = useState(1);
  const [obs, setObs] = useState("");
  const [fecha, setFecha] = useState(undefined);
  const [profesor, setProfesor] = useState({ Nombre: "", Apellido: "" });
  const [alumnoObs, setAlumnoObs] = useState({
    idAlumno: "",
    idProfesor: "",
    NombreAlumno: "",
    ApellidoAlumno: "",
  });

  //obtener datos y seguridad
  const fetchData = async () => {
    try {
      if (User && User.user.username === username) {
        const response = await Axios.get(
          `http://localhost:3000/server/getProfeSemestre/${username}`
        );
        setData(response.data);
        if (response.data.length > 0) {
          const primerProfesor = response.data[0];
          setProfesor({
            Nombre: primerProfesor.Nombre,
            Apellido: primerProfesor.Apellido,
          });
        }
      } else {
        navigate("/home");
      }
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };
  useEffect(() => {
    if (username) {
      fetchData();
    }
  }, [User, username]);

  //ver alumnos
  const handleVer = (semestre, seccion, idSeccion, materia) => {
    setTitulos({ semestre, seccion, materia });
    Axios.get(`http://localhost:3000/server/fetchProfeAlumno`, {
      params: {
        semestre: semestre,
        seccion: seccion,
        idSeccion: idSeccion,
      },
    })
      .then((response) => {
        setAlumnData(response.data);
      })
      .catch((error) => {
        alert("Hubo un error, por favor intentelo de nuevo");
      });
    if (data) {
      handleShow1();
    }
  };

  //gravedades
  useEffect(() => {
    Axios.get("http://localhost:3000/server/gravedades").then((response) => {
      setGravedad(response.data);
      const paisPredeterminado = response.data.find(
        (option) => option.idNacionalidad === 14
      );
      if (paisPredeterminado) {
        setSelectedpais(paisPredeterminado.idNacionalidad.toString());
      }
    });
  }, []);
  //cambiar gravedad en select
  const handle_gravedad = (e) => {
    setSelectedGravedad(e.target.value);
  };

  //crear observaciones
  const handleObsOpen = (idAlumno, NombreAlumno, ApellidoAlumno) => {
    const idProfesor = data.length > 0 ? data[0].idProfesores : null;
    setTitulos((prevTitulos) => ({
      ...prevTitulos,
      nombre: NombreAlumno,
      Apellido: ApellidoAlumno,
    }));
    setAlumnoObs({ idAlumno, idProfesor, NombreAlumno, ApellidoAlumno });
    if (alumnoObs) {
      handleShow2();
      handleClose1();
    } else {
      alert("Hubo un error");
    }
  };

  //guardar observación
  const handleGuardar = () => {
    const dataToSend = {
      alumnoObs,
      fecha,
      obs,
      idGravedad: selectedGravedad,
    };
    Axios.post("http://localhost:3000/createObservacion", dataToSend)
      .then((response) => {
        //console.log("Observación guardada con éxito:", response.data);
        handleClose2();
      })
      .catch((error) => {
        alert("Error al guardar la observación");
      });
  };

  //console.log(profesor);
  //console.log("todo: ", data);
  //console.log("data: ", User);
  //console.log("alumnos:", alumnData);
  //console.log("dadas: ", alumnoObs);
  //console.log(titulos);

  return User && User.user.username === username ? (
    <>
      <Container>
        <Card>
          <Card.Header as="h1">
            {profesor.Nombre} {profesor.Apellido}
          </Card.Header>
          <Card.Body>
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
                {data.map((item, idx) => {
                  return (
                    <tr key={idx}>
                      <td>{idx}</td>
                      <td>{item.NombreSemestre}</td>
                      <td>{item.DescripcionSeccion}</td>
                      <td>{item.NombreMateria}</td>
                      <td>
                        <Button
                          variant="info"
                          onClick={() =>
                            handleVer(
                              item.NombreSemestre,
                              item.DescripcionSeccion,
                              item.Seccion_idSeccion,
                              item.NombreMateria
                            )
                          }
                        >
                          Ver Alumnos
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
      <Modal size="xl" show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>
            {titulos.semestre}, Sección: {titulos.seccion}, {titulos.materia}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Nro. Docu</th>
                <th>Nro. Telefono</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {alumnData.map((item, idx) => {
                return (
                  <tr key={idx}>
                    <td>{idx}</td>
                    <td>{item.Nombre}</td>
                    <td>{item.Apellido}</td>
                    <td>{item.Numero_docu}</td>
                    <td>{item.Numero_telefono}</td>
                    <td>
                      <Button
                        onClick={() =>
                          handleObsOpen(
                            item.idAlumnos,
                            item.Nombre,
                            item.Apellido
                          )
                        }
                      >
                        Crear Observación
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={show2}
        onHide={handleClose2}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {titulos.nombre} {titulos.Apellido}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col} md="auto" controlId="nombres">
                <Form.Label>Nombres*</Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={alumnoObs.NombreAlumno}
                  maxLength="45"
                  disabled
                />
              </Form.Group>
              <Form.Group as={Col} md="auto" controlId="apellidos">
                <Form.Label>Apellidos*</Form.Label>
                <Form.Control
                  required
                  type="text"
                  value={alumnoObs.ApellidoAlumno}
                  maxLength="45"
                  disabled
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="auto" controlId="pais">
                <Form.Label>Gravedad</Form.Label>
                <Form.Select
                  required
                  value={selectedGravedad}
                  onChange={handle_gravedad}
                >
                  {gravedad.map((item, idx) => (
                    <option key={idx} value={item.idGravedad_observacion}>
                      {item.descripcion}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="fecha">
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
            </Row>
            <FloatingLabel controlId="floatingTextarea2" label="Observación">
              <Form.Control
                as="textarea"
                required
                placeholder="Observación"
                maxLength={255}
                style={{ height: "100px" }}
                onChange={(e) => {
                  setObs(e.target.value);
                }}
              />
            </FloatingLabel>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose2}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleGuardar}>
            Crear Observación
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  ) : null;
}

export default VerAlumnos;
