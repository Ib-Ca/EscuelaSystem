import { useParams } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import { useEffect, useState } from "react";
import Axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";

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
    setModalId(1);
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
    setModalId(2);
  };

  const closeModal2 = () => {
    setShowModal2(false);
    setModalOpened(false);
    setModalId(null);
    setInfo([]);
  };
  const openModal3 = () => {
    setShowModal3(true);
    setModalOpened(true);
    setModalId(3);
  };
  const closeModal3 = () => {
    setShowModal3(false);
    setModalOpened(false);
    setModalId(null);
    setInfo([]);
  };
  /////////////////////////////////////////
  const [semestre, setSemestre] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [profesores, setProfesores] = useState([]);
  const [selectedProfesor, setSelectedProfesor] = useState([]);
  const [seccionUnica, setSeccionUnica] = useState([]);
  const [selectedMateriasArray, setSelectedMateriasArray] = useState([]);
  const [info, setInfo] = useState([]);
  const [alumnos, setAlumnos] = useState([]);
  const [alumnosAsignados, setAlumnosAsignados] = useState([]);
  const [options, setOptions] = useState([]);
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

  //materias
  const fetchMat = async () => {
    try {
      const response = await Axios.get("http://localhost:3000/server/materia");
      setMaterias(response.data);
    } catch (error) {
      console.error("Error al obtener las materias:", error);
    }
  };
  //profes
  const fetchProfe = async () => {
    try {
      const response = await Axios.get(
        "http://localhost:3000/server/profesores"
      );
      setProfesores(response.data);
    } catch (error) {
      console.error("Error al obtener los profesores:", error);
    }
  };
  //alumnos
  const fetchAlumnos = () => {
    Axios.get("http://localhost:3000/server/alumnos")
      .then((response) => {
        setAlumnos(response.data);
        // console.log("AL SACAR DE DB", response);
      })
      .catch((error) => {
        console.error("Error al obtener alumnos:", error);
      });
  };
  //mostrar fetchs
  useEffect(() => {
    fetchMat();
    fetchProfe();
    fetchAlumnos();
  }, []);

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
        Profesores_idProfesores: semestreEncontrado.Profesores_idProfesores,
      }));
      const materiasIDs = aux.map((item) => item.Materias_idMaterias);
      const profeIDs = aux.map((item) => item.Profesores_idProfesores);
      setSelectedMateriasArray([...materiasIDs]);
      setSelectedProfesor([...profeIDs]);
      setInfo([...aux]);
      openModal1();
    }
  };
//cambiar materia en edit
  const handleSelectChangeMateria = (e, index) => {
    const newValue = e.target.value;
    setSelectedMateriasArray((prevArray) =>
      prevArray.map((item, i) => (i === index ? newValue : item))
    );
    setInfo((prevInfo) =>
      prevInfo.map((item, i) =>
        i === index ? { ...item, Materias_idMaterias: newValue } : item
      )
    );
  };
//cambiar prof en edit
  const handleSelectProfesorChange = (e, index) => {
    const newValue = e.target.value;
    setSelectedProfesor((prevArray) =>
      prevArray.map((item, i) => (i === index ? newValue : item))
    );
    setInfo((prevInfo) =>
      prevInfo.map((item, i) =>
        i === index ? { ...item, Profesores_idProfesores: newValue } : item
      )
    );
  };
//guardar cambios en edit (modal1)
  const handleSaveChanges1 = () => {
    const updatedInfo = info.map((semestreData) => ({
      idSemestre: semestreData.idSemestre,
      Materias_idMaterias: semestreData.Materias_idMaterias,
      Profesores_idProfesores: semestreData.Profesores_idProfesores,
    }));
    Axios.put("http://localhost:3000/completeEditSemestre", {
      updatedInfo: updatedInfo,
    })
      .then(function (response) {
        console.log("entro en then: ", response);
        setInfo([...updatedInfo]);
      })
      .catch(function (error) {
        console.log("Error en axios: ", error);
      });
    console.log("Cambios a guardar:", updatedInfo);
    fetchMat();
    fetchProfe();
    closeModal1();
    window.location.reload(false);
  };
//asignar alumno (modal2)
  const handleAsignAlumn = (value) => {
    const semestreEncontrado = semestre.filter(
      (sem) => sem.SeccionDescripcion === value
    );
    if (semestreEncontrado.length > 0) {
      const aux = semestreEncontrado.map((semestreEncontrado) => ({
        idSemestre: semestreEncontrado.idSemestre,
        Nombre: semestreEncontrado.Nombre,
        SeccionDescripcion: semestreEncontrado.SeccionDescripcion,
      }));
      setInfo([...aux]);
      openModal2();
    }
  };
  //guardar cambios modal2
  const handleSaveChanges2 = () => {
    const alumnosSeleccionados = alumnos.filter(
      (alumno, idx) => options[idx] === 1
    );
    Axios.put("http://localhost:3000/inputSemestreAlumno", {
      alumnosSeleccionados: alumnosSeleccionados,
      semestreSeleccionado: info[0].Nombre,
      seccionSeleccionada: info[0].SeccionDescripcion,
    })
      .then(function (response) {
        //console.log("Éxito al seleccionar alumnos:", response);
        setAlumnosAsignados([...alumnosAsignados, ...alumnosSeleccionados]);
        localStorage.setItem(
          "alumnosAsignados",
          JSON.stringify([...alumnosAsignados, ...alumnosSeleccionados])
        );
        const nuevosAlumnos = alumnos.filter(
          (alumno, idx) => options[idx] !== 1
        );
        setAlumnos(nuevosAlumnos);
      })
      .catch(function (error) {
        console.error("Error al seleccionar alumnos:", error);
      });
    closeModal2();
  };
//filtro para no mostrar alumnos
  const alumnosNoAsignados = alumnos.filter(
    (alumno) =>
      !alumnosAsignados.find(
        (asignado) =>
          asignado.idAlumnos === alumno.idAlumnos &&
          asignado.Semestre_idSemestre &&
          asignado.Seccion
      )
  );
  //no mostrar alumnos ya asignados
  useEffect(() => {
    const storedAlumnosAsignados = localStorage.getItem("alumnosAsignados");
    if (storedAlumnosAsignados) {
      setAlumnosAsignados(JSON.parse(storedAlumnosAsignados));
    }
  }, []);
//radios de modal2
  const handleOptions = (val, idx) => {
    const newOptions = [...options];
    newOptions[idx] = val;
    setOptions(newOptions);
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
  //console.log(materias);
  //console.log("info: ", info);
  //console.log("mat array: ", selectedMateriasArray);
  //console.log("lista alumnos: ", alumnos);
  //console.log("NO ASIGNADOS: ", alumnosNoAsignados);
  //console.log("ASIGNADOS: ", alumnosAsignados);
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
                      <Button
                        variant="success"
                        onClick={() => {
                          handleAsignAlumn(item);
                        }}
                      >
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
          <Modal.Title>
            {info.length > 0 &&
              `${info[0].Nombre}, Sección: ${info[0].SeccionDescripcion}`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table bordered hover>
            <thead>
              <tr>
                <th>Materia</th>
                <th>Profesor</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {info.map((semestreData, idx) => {
                return (
                  <tr key={idx}>
                    <td>
                      <select
                        value={selectedMateriasArray[idx]}
                        onChange={(e) => handleSelectChangeMateria(e, idx)}
                      >
                        {materias.map((materia) => (
                          <option
                            key={materia.idMaterias}
                            value={materia.idMaterias}
                          >
                            {materia.Nombre}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <select
                        value={selectedProfesor[idx]}
                        onChange={(e) => handleSelectProfesorChange(e, idx)}
                      >
                        {profesores.map((profesor) => (
                          <option
                            key={profesor.idProfesores}
                            value={profesor.idProfesores}
                          >
                            {profesor.Nombre}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <ButtonGroup aria-label="botones">
                        <Button variant="danger">Eliminar</Button>
                      </ButtonGroup>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal1}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleSaveChanges1}>
            Guardar cambios
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal size="lg" show={showModal2} onHide={closeModal2}>
        <Modal.Header closeButton>
          <Modal.Title className="text-center">
            {info.length > 0 &&
              `Asignación de Alumnos: Sección: ${info[0].SeccionDescripcion}`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table bordered hover>
            <thead>
              <tr>
                <th>Asignar</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Nro. Documento</th>
                <th>Correo</th>
                <th>Sección</th>
              </tr>
            </thead>
            <tbody>
              {alumnosNoAsignados.map((item, idx) => {
                const groupName = `options_${idx}`; //nombre pa cada fila (pa los botones)
                return (
                  <tr key={idx}>
                    <td>
                      <ToggleButtonGroup
                        type="radio"
                        name={groupName}
                        value={options[idx]}
                        defaultValue={2}
                        onChange={(val) => handleOptions(val, idx)}
                      >
                        <ToggleButton
                          variant="outline-success"
                          id={`asignado_${idx}`}
                          value={1}
                        >
                          Sí
                        </ToggleButton>
                        <ToggleButton
                          id={`noAsign_${idx}`}
                          variant="outline-dark"
                          value={2}
                        >
                          No
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </td>
                    <td>{item.Nombre}</td>
                    <td>{item.Apellido}</td>
                    <td>{item.Numero_docu}</td>
                    <td>{item.Correo}</td>
                    <td>{item.Seccion}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal2}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleSaveChanges2}>
            Guardar cambios
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModal3} onHide={closeModal3}>
        <Modal.Header closeButton>
          <Modal.Title>{info.length > 0 &&
              `Asignación de Alumnos: Sección: ${info[0].SeccionDescripcion}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Modal 3 body content</Modal.Body>
      </Modal>
    </>
  );
};

export default EditarSemestre;
