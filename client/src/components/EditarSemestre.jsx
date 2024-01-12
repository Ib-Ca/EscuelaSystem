import { useParams } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import { useEffect, useState } from "react";
import Axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Modal from "react-bootstrap/Modal";

const EditarSemestre = () => {
  const { Nombre } = useParams();
  //modals
  const [showModal1, setShowModal1] = useState(false); //edit
  const [showModal2, setShowModal2] = useState(false); //asign
  const [showModal3, setShowModal3] = useState(false); //ver asign
  const [modalOpened, setModalOpened] = useState(false);
  const [modalId, setModalId] = useState(null);
  const openModal1 = () => {
    setShowModal1(true);
    setModalOpened(true);
    setModalId(1); // Asigna un ID único para el modal Edit
  };

  const closeModal1 = () => {
    setShowModal1(false);
    setModalOpened(false);
    setModalId(null);
    setInfo([]);
  };

  const openModal2 = () => {
    setShowModal2(true);
    setModalOpened(true);
    setModalId(2); // Asigna un ID único para el modal Assign
  };

  const closeModal2 = () => {
    setShowModal2(false);
    setModalOpened(false);
    setModalId(null);
    setInfo({});
  };
  const openModal3 = () => {
    setShowModal3(true);
    setModalOpened(true);
    setModalId(3); // Asigna un ID único para el modal View Assign
  };
  const closeModal3 = () => {
    setShowModal3(false);
    setModalOpened(false);
    setModalId(null);
    setInfo({});
  };
  //modals
  const [semestre, setSemestre] = useState([]);
  const [seccion, setSeccion] = useState([]);
  const [selectedSeccion, setSelectedSeccion] = useState("");
  const [materias, setMaterias] = useState([]);
  const [selectedMaterias, setSelectedMaterias] = useState("");
  const [profesores, setProfesores] = useState([]);
  const [selectedProfesor, setSelectedProfesor] = useState("");
  const [seccionUnica, setSeccionUnica] = useState([]);
  const [seccionSeleccionada, setSeccionSeleccionada] = useState(null);
  const [info, setInfo] = useState([]);

  //fetch semestre a editar y filtrado de secciones para visaul
  useEffect(() => {
    const fetchSemestre = async () => {
      try {
        const response = await Axios.get(
          `http://localhost:3000/editSemestre/${Nombre}`
        );
        setSemestre(response.data);
        //seccion unica
        const seccionesUnicas = Array.from(
          new Set(response.data.map((item) => item.SeccionDescripcion))
        ).sort();
        setSeccionUnica(seccionesUnicas);
      } catch (error) {
        console.error("Error al obtener las secciones:", error);
      }
    };
    fetchSemestre();
  }, [Nombre]);

  //abrir edit
  const handleSeccionEdit = (value) => {
    const semestreEncontrado = semestre.filter(
      (sem) => sem.SeccionDescripcion === value
    );
    if (semestreEncontrado.length > 0) {
      const aux = semestreEncontrado.map((semestreEncontrado) => ({
        idSemestre: semestreEncontrado.idSemestre,
        Nombre: semestreEncontrado.Nombre,
        Seccion_idSeccion: semestreEncontrado.Seccion_idSeccion,
        SeccionDescripcion: semestreEncontrado.SeccionDescripcion,
        Materias_idMaterias: semestreEncontrado.Materias_idMaterias,
        MateriaNombre: semestreEncontrado.MateriaNombre,
        ProfesorNombre: semestreEncontrado.ProfesorNombre,
        ProfesorApellido: semestreEncontrado.ProfesorApellido,
        CargaHoraria: semestreEncontrado.CargaHoraria,
      }));
      setInfo((prevInfo) => [...prevInfo, ...aux]);
      openModal1();
    }
  };

  const handleAsignAlumn = () => {
    openModal2();
  };

  const handleVerAlumn = () => {
    openModal3();
  };

  const handleDelete = () => {
    alert("BOO");
  };



  //LOGS
  //console.log("Semestres ", semestre);
  //console.log("Seccion unica ", seccionUnica);
  console.log("info: ", info);
  return (
    <>
      <Container>
        <h1>Asignaciones y Ediciones {Nombre}</h1>
        <Table bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Sección</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {seccionUnica.map((item, idx) => {
              return (
                <tr key={idx}>
                  <td>{idx}</td>
                  <td>{item}</td>
                  <td>
                    <ButtonGroup aria-label="Basic example">
                      <Button
                        variant="warning"
                        onClick={() => {
                          handleSeccionEdit(item);
                        }}
                      >
                        Editar Mats. y Profs.
                      </Button>
                      <Button variant="success" onClick={handleAsignAlumn}>
                        Asignar Alumnos
                      </Button>
                      <Button variant="info" onClick={handleVerAlumn}>
                        Ver Alumnos
                      </Button>
                      <Button variant="danger" onClick={handleDelete}>
                        Eliminar Sección
                      </Button>
                    </ButtonGroup>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>

      <Modal show={showModal1} onHide={closeModal1}>
        <Modal.Header closeButton>
          <Modal.Title>{info.length > 0 && `${info[0].Nombre}, Sección: ${info[0].SeccionDescripcion}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table bordered hover>
            <thead>
              <tr>
                <th>Materia</th>
                <th>Carga Horaria</th>
                <th>Profesor</th>
              </tr>
            </thead>
            <tbody>
              {info.map((semestreData, idx) => {
                return (
                  <tr key={idx}>
                    <td>{semestreData.MateriaNombre}</td>
                    <td>{semestreData.CargaHoraria}</td>
                    <td>{`${semestreData.ProfesorNombre} ${semestreData.ProfesorApellido}`}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>

      <Modal show={showModal2} onHide={closeModal2}>
        <Modal.Header closeButton>
          <Modal.Title>Modal 2</Modal.Title>
        </Modal.Header>
        <Modal.Body>Modal 2 body content</Modal.Body>
      </Modal>

      <Modal show={showModal3} onHide={closeModal3}>
        <Modal.Header closeButton>
          <Modal.Title>Modal 3</Modal.Title>
        </Modal.Header>
        <Modal.Body>Modal 3 body content</Modal.Body>
      </Modal>
    </>
  );
};

export default EditarSemestre;
