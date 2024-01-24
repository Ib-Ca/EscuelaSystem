import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/esm/Container";
import Table from "react-bootstrap/esm/Table";
import Axios from "axios";
import Pagination from "react-bootstrap/Pagination";
import Modal from "react-bootstrap/Modal";
import Accordion from "react-bootstrap/Accordion";

function Historial({ User }) {
  const { username } = useParams();
  const navigate = useNavigate();
  const [lista, setLista] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [buscador, setBuscador] = useState("");
  const itemsPerPage = 8;
  const [infoPrevia, setInfoPrevia] = useState([]);
  const [infoPrevia2, setInfoPrevia2] = useState([]);
  const [infoPrevia3, setInfoPrevia3] = useState([]);
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false), setInfoPrevia([]);
  };
  const handleShow = () => setShow(true);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const handleClose2 = () => {
    setShow2(false), setInfoPrevia([]);
  };
  const handleShow2 = () => setShow2(true);
  const handleClose3 = () => {
    setShow3(false), setInfoPrevia([]);
  };
  const handleShow3 = () => setShow3(true);
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //check url y user log
  useEffect(() => {
    if (!(User && User.user.username === username)) {
      navigate("/home");
    }
  }, [User, username, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (User) {
          const response = await Axios.get(
            "  http://localhost:3000/server/historial"
          );
          setLista(response.data);
        } else {
          console.error("Error");
        }
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };
    fetchData();
  }, []);

  const handleVer = (datosAnteriores, cambio, tabla) => {
    setInfoPrevia(datosAnteriores);
    if (cambio === "Creación") {
      alert("No hay datos anteriores");
    } else {
      if (tabla === "Alumnos") {
        console.log(tabla);
        handleShow();
        console.log(datosAnteriores);
      }
      if (tabla === "Profesor") {
        console.log(tabla);
        handleShow2();
        console.log(datosAnteriores);
      }
      if (tabla === "Materias") {
        console.log(tabla);
        handleShow3();
        console.log(datosAnteriores);
      }
    }
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  //const currentItems = lista.slice(indexOfFirstItem, indexOfLastItem);

  //filtro buscador
  const filteredItems = lista.filter((item) =>
    item.donde.toLowerCase().includes(buscador.toLowerCase())
  );
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const fechaNacimiento = new Date(infoPrevia.Fecha_nacimiento);
  const fechaAlumno = fechaNacimiento.toLocaleDateString();

  return User && User.user.username === username ? (
    <>
      <Container>
        <Card>
          <Card.Header as="h3">Historial </Card.Header>
          <Card.Body>
            <div className="mb-3">
              <input
                type="text"
                placeholder="Buscar por tabla..."
                value={buscador}
                onChange={(e) => setBuscador(e.target.value)}
              />
            </div>
            <Table bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Actor</th>
                  <th>Tipo de Cambio</th>
                  <th>Tabla</th>
                  <th>Fecha</th>
                  <th>Datos Anteriores</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item, idx) => {
                  let datosAnteriores = {};
                  try {
                    if (
                      item.datos_anteriores &&
                      item.datos_anteriores.trim() !== ""
                    ) {
                      datosAnteriores = JSON.parse(item.datos_anteriores);
                    }
                  } catch (error) {
                    console.error("Error al analizar datos anteriores:", error);
                  }
                  const fechaFormateada = new Date(
                    item.fecha
                  ).toLocaleDateString();
                  return (
                    <tr key={idx}>
                      <td>{idx}</td>
                      <td>{item.username}</td>
                      <td>{item.tipo_cambio}</td>
                      <td>{item.donde}</td>
                      <td>{fechaFormateada}</td>
                      <td>
                        <Button
                          onClick={(e) =>
                            handleVer(
                              datosAnteriores,
                              item.tipo_cambio,
                              item.donde
                            )
                          }
                          variant="info"
                        >
                          Ver Datos
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Card.Body>
          <Card.Footer>
            <Pagination>
              {Array.from({
                length: Math.ceil(lista.length / itemsPerPage),
              }).map((page, idx) => (
                <Pagination.Item
                  key={idx + 1}
                  active={idx + 1 === currentPage}
                  onClick={() => setCurrentPage(idx + 1)}
                >
                  {idx + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          </Card.Footer>
        </Card>
      </Container>

      <Modal show={show} size="lg" onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Datos Anteriores a la Modificación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                Detalles del Estudiante Modificado: {infoPrevia.Nombre}{" "}
                {infoPrevia.Apellido}
              </Accordion.Header>
              <Accordion.Body>
                <p>ID: {infoPrevia.idAlumnos}</p>
                <p>Nombre: {infoPrevia.Nombre}</p>
                <p>Apellido: {infoPrevia.Apellido}</p>
                <p>Correo: {infoPrevia.Correo}</p>
                <p>ID Documento: {infoPrevia.Documento_idDocumento}</p>
                <p>
                  ID Estado Alumno: {infoPrevia.Estado_alumno_idEstado_alumno}
                </p>
                <p>ID Estado Civil: {infoPrevia.Estado_civil_idEstado_civil}</p>
                <p>Fecha de Nacimiento: {infoPrevia.fechaFormateada}</p>
                <p>Lugar de Nacimiento: {fechaAlumno}</p>
                <p>ID Movilidad: {infoPrevia.Movilidad_idMovilidad}</p>
                <p>
                  Distancia que recorre para llegar: {infoPrevia.distancia} km
                </p>
                <p>Tiempo que toma: {infoPrevia.tiempo} minutos</p>
                <p>Número Documento: {infoPrevia.Numero_docu}</p>
                <p>Número Teléfono: {infoPrevia.Numero_telefono}</p>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show2} size="lg" onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Datos Anteriores a la Modificación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                Detalles del Profesor Modificado: {infoPrevia.Nombre}{" "}
                {infoPrevia.Apellido}
              </Accordion.Header>
              <Accordion.Body>
                <p>ID: {infoPrevia.idProfesores}</p>
                <p>Nombre: {infoPrevia.Nombre}</p>
                <p>Apellido: {infoPrevia.Apellido}</p>
                <p>Correo: {infoPrevia.Correo}</p>
                <p>ID Documento: {infoPrevia.Documento_idDocumento}</p>
                <p>ID Estado Civil: {infoPrevia.Estado_civil_idEstado_civil}</p>
                <p>Número Documento: {infoPrevia.Numero_docu}</p>
                <p>Número Teléfono: {infoPrevia.Numero_telefono}</p>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose2}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show3} onHide={handleClose3}>
        <Modal.Header closeButton>
          <Modal.Title>Datos Anteriores a la Modificación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                Detalles de la Materia Modificado: {infoPrevia.Nombre}{" "}
              </Accordion.Header>
              <Accordion.Body>
                <p>Nombre: {infoPrevia.Nombre}</p>
                <p>Carga Horaria: {infoPrevia.Carga_horaria}</p>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose3}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  ) : null;
}

export default Historial;
