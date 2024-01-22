import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/esm/Container";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Accordion from "react-bootstrap/Accordion";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

function VerObsProfe({ User }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => {
    setEditar({ idObservacion: "", descObs: "" });
    setShow2(false);
    handleShow();
  };
  const handleShow2 = () => setShow2(true);
  //////////////////////////////////////////////////
  const { username } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [alumnosData, setAlumnosData] = useState([]);
  const [mostrar, setMostrar] = useState([]);
  const [editar, setEditar] = useState({ idObservacion: "", descObs: "" });
  const [texto, setTexto] = useState("");
  const [busqueda, setBusqueda] = useState("");

  //check url y user log
  useEffect(() => {
    if (!(User && User.user.username === username)) {
      navigate("/home");
    }
  }, [User, username, navigate]);

  //sacar datos de profe, observacion y alumno
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (User && User.user.idusuario) {
          //profe
          const responseProfesor = await Axios.get(
            `http://localhost:3000/server/getProfesor/${User.user.idusuario}`
          );
          const profesorData = responseProfesor.data;
          //todas las observaciones y filtrado
          const responseObservaciones = await Axios.get(
            "http://localhost:3000/server/observacion"
          );
          const observacionesData = responseObservaciones.data;
          const observacionesProfesor = observacionesData.filter(
            (observacion) =>
              observacion.Profesores_idProfesores === profesorData.idProfesores
          );
          setData(observacionesProfesor);
          //  console.log("Observaciones del profesor:", observacionesProfesor);
          //info de alumnos de las observaciones
          const alumnosIds = observacionesProfesor.map(
            (observacion) => observacion.Alumnos_idAlumnos
          );
          const responseAlumnos = await Axios.post(
            "http://localhost:3000/server/getAlumnosInfo",
            { alumnosIds }
          );
          setAlumnosData(responseAlumnos.data);
        } else {
          navigate("/home");
        }
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };
    fetchData();
  }, [User]); //lo que se va a mostrar al hacer click en info
  const handleInfo = (idAlumnos) => {
    const alumnosSeleccionados = data.filter(
      (observacion) => observacion.Alumnos_idAlumnos === idAlumnos
    );
    setMostrar(alumnosSeleccionados);
    // console.log(alumnosSeleccionados);
    handleShow();
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  //separar texto
  function truncateText(text, limit) {
    if (text.length > limit) {
      // Divide el texto en líneas de aproximadamente 'limit' caracteres
      const truncatedText = text.replace(
        new RegExp(`(.{${limit}})`, "g"),
        "$1\n"
      );
      return truncatedText.trim(); // Elimina el espacio al final, si lo hay
    }
    return text;
  }

  //editar observacion arbrir modal y datos
  const handleModify = (idObservacion, descripObs) => {
    setEditar({ idObservacion, descObs: descripObs });
    handleShow2();
    handleClose();
  };

  const handleDelete = async () => {
    try {
      const response = await Axios.delete("http://localhost:3000/deleteObs", {
        data: { idObservacion: editar.idObservacion },
      });
      if (response.data.success) {
        handleClose2();
        window.location.reload();
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      alert("Hubo un error");
    }
  };

  //guardar cambios
  const handleEdit = async () => {
    try {
      const response = await Axios.put(
        "http://localhost:3000/updateObs",
        editar
      );
      if (response.data.success) {
        handleClose2();
        window.location.reload(); // Recarga la página
      }
    } catch (error) {
      //console.error("Error al enviar los datos:", error);
      alert("Hubo un error");
    }
  };

  //console.log(mostrar);
  //console.log(data);
  //console.log(alumnosData);

  return User && User.user.username === username ? (
    <>
      <Container>
        <Card>
          <Card.Header as="h5">
            <input
              type="text"
              placeholder="Buscar por nombre..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </Card.Header>
          <Card.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Semestre</th>
                  <th>Seccion</th>
                  <th>Nro. Docu</th>
                  <th>Teléfono</th>
                  <th>Alumno</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {alumnosData
                  .filter(
                    (item) =>
                      item.Nombre.toLowerCase().includes(
                        busqueda.toLowerCase()
                      ) ||
                      item.Apellido.toLowerCase().includes(
                        busqueda.toLowerCase()
                      )
                  )
                  .map((item, idx) => (
                    <tr key={idx}>
                      <td>{idx}</td>
                      <td>{item.NombreSemestre}</td>
                      <td>{item.Seccion}</td>
                      <td>{item.Numero_docu}</td>
                      <td>{item.Numero_telefono}</td>
                      <td>
                        {item.Nombre} {item.Apellido}
                      </td>
                      <td>
                        <Button
                          variant="info"
                          onClick={() => handleInfo(item.idAlumnos)}
                        >
                          Ver
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
      <Modal show={show} size="lg" onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Detalles de Observaciones</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Accordion
            style={{ whiteSpace: "pre-wrap", textAlign: "justify" }}
            defaultActiveKey="0"
            flush
          >
            {mostrar.map((observacion) => (
              <Accordion.Item
                key={observacion.idObservacion}
                eventKey={observacion.idObservacion.toString()}
              >
                <Accordion.Header>
                  {formatDate(observacion.fecha)}
                </Accordion.Header>
                <Accordion.Body>
                  {truncateText(observacion.descripcion, 70)}
                  <br />
                  <Button
                    style={{ margin: "30px 0" }}
                    onClick={() =>
                      handleModify(
                        observacion.idObservacion,
                        observacion.descripcion
                      )
                    }
                    variant="warning"
                  >
                    Modificar Observación
                  </Button>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
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
          <Modal.Title>Observación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel controlId="floatingTextarea2" label="descripcion">
            <Form.Control
              as="textarea"
              placeholder="Descripción"
              required
              style={{ height: "100px" }}
              value={editar.descObs}
              maxLength={255}
              onChange={(e) =>
                setEditar((prevEditar) => ({
                  ...prevEditar,
                  descObs: e.target.value,
                }))
              }
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDelete}>
            Eliminar
          </Button>
          <Button variant="secondary" onClick={handleClose2}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleEdit}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  ) : null;
}

export default VerObsProfe;
