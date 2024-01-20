import { Link, useParams } from "react-router-dom";
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
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const EditarSemestre = () => {
  const { Nombre } = useParams();
  //modals
  const [showModal1, setShowModal1] = useState(false); //edit
  const [showModal2, setShowModal2] = useState(false); //asign
  const [showModal3, setShowModal3] = useState(false); //ver asign
  const [modalOpened, setModalOpened] = useState(false);
  const [modalId, setModalId] = useState(null);
  const [modalTitle, setModalTitle] = useState("");
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
    setModalTitle("");
    setAlumnosSubmit([]);
  };
  const openModal3 = (value) => {
    setShowModal3(true);
    setModalOpened(true);
    setModalId(3);
  };
  const closeModal3 = () => {
    setShowModal3(false);
    setModalOpened(false);
    setModalId(null);
    setInfo([]);
    setModalTitle("");
    location.reload();
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
  const [alumnosSubmit, setAlumnosSubmit] = useState([]);

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
    setModalTitle(value);
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
  // guardar cambios en edit (modal1)
  const handleSaveChanges1 = () => {
    const updatedInfo = info.map((semestreData) => ({
      idSemestre: semestreData.idSemestre,
      Materias_idMaterias: semestreData.Materias_idMaterias,
      Profesores_idProfesores: semestreData.Profesores_idProfesores,
      SeccionDescripcion: semestreData.SeccionDescripcion,
      Nombre: Nombre,
    }));
    const seccionDescripcion =
      info.length > 0 ? info[0].SeccionDescripcion : "";
    Axios.put("http://localhost:3000/completeEditSemestre", {
      updatedInfo: updatedInfo,
      SeccionDescripcion: seccionDescripcion,
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

  //añadir nueva materia y profesor a la seccion
  const handleAnadirMateria = () => {
    const primeraMateria = materias.length > 0 ? materias[0].idMaterias : null;
    const primerProfesor =
      profesores.length > 0 ? profesores[0].idProfesores : null;
    setInfo([
      ...info,
      {
        Materias_idMaterias: primeraMateria,
        Profesores_idProfesores: primerProfesor,
        SeccionDescripcion: modalTitle,
      },
    ]);
    setSelectedMateriasArray([...selectedMateriasArray, primeraMateria]);
    setSelectedProfesor([...selectedProfesor, primerProfesor]);
  };

  //quitar materia y prof de fila
  const handleEliminarFila = (index) => {
    setInfo((prevInfo) => prevInfo.filter((item, i) => i !== index));
    setSelectedMateriasArray((prevArray) =>
      prevArray.filter((item, i) => i !== index)
    );
    setSelectedProfesor((prevArray) =>
      prevArray.filter((item, i) => i !== index)
    );
  };

  //asignar alumno (modal2)
  const handleAsignAlumn = (value) => {
    setModalTitle(value);
    const alumnosSinSeccion = alumnos.filter(
      (alumno) => alumno.Seccion === null
    );
    if (alumnosSinSeccion.length > 0) {
      const alumnosSinSeccionComoObjetos = alumnosSinSeccion.map((alumno) => {
        const alumnoObjeto = {};
        Object.keys(alumno).forEach((propiedad) => {
          alumnoObjeto[propiedad] = alumno[propiedad];
        });
        return alumnoObjeto;
      });
      setInfo(alumnosSinSeccionComoObjetos);
    }
    openModal2();
  };
  //añadir a los alumnos para ser asignados
  const handleAnadir = (index) => {
    const alumnoSeleccionado = info[index];
    setAlumnosSubmit((prevAlumnosSubmit) => [
      ...prevAlumnosSubmit,
      alumnoSeleccionado,
    ]);
    setInfo((prevInfo) => prevInfo.filter((_, i) => i !== index));
  };
  //elimnar alumno de la lista de aprobacion para ser asignado
  const handleDeleteListita = (index) => {
    const alumnoEliminado = alumnosSubmit[index];
    setAlumnosSubmit((prevAlumnosSubmit) =>
      prevAlumnosSubmit.filter((_, i) => i !== index)
    );
    setInfo((prevInfo) => [...prevInfo, alumnoEliminado]);
  };

  // Guardar cambios modal2
  const handleSaveChanges2 = () => {
    const idsAlumnosSubmit = alumnosSubmit.map((alumno) => alumno.idAlumnos);
    Axios.put("http://localhost:3000/inputSemestreAlumno", {
      idsAlumnos: idsAlumnosSubmit,
      seccion: modalTitle,
      semestre: Nombre,
    })
      .then(function (response) {
        console.log("Solicitud PUT exitosa");
        closeModal2();
        location.reload();
      })
      .catch(function (error) {
        console.error("Error al enviar la solicitud PUT:", error);
      });
  };

  //ver alumnos correspondientes de la seccion
  const handleVerAlumn = (value) => {
    const alumnosFiltrados = alumnos.filter(
      (alumno) => alumno.Seccion === value
    );
    if (alumnosFiltrados.length > 0) {
      const alumnosComoObjetos = alumnosFiltrados.map((alumno) => {
        const alumnoObjeto = {};
        Object.keys(alumno).forEach((propiedad) => {
          alumnoObjeto[propiedad] = alumno[propiedad];
        });
        return alumnoObjeto;
      });
      setInfo(alumnosComoObjetos);
    }
    openModal3();
    setModalTitle(value);
  };

  //eliminar asignacion de alumno
  const handleDeleteAlumnoAsign = (idAlumno) => {
    Axios.put("http://localhost:3000/unassignAlumno", {
      idAlumno: idAlumno,
    })
      .then(function (response) {
        console.log(
          "Se ha quitado la asignacion del alumno con id: ",
          idAlumno
        );
        setInfo((prevInfo) =>
          prevInfo.filter((alumno) => alumno.idAlumnos !== idAlumno)
        );
      })
      .catch(function (error) {
        console.error("Error al desasignar alumno:", error);
      });
  };
  //eliminar seccion
  const handleDelete = (value) => {
    // si hay alumnos asignados a la sección
    const seccionAsignada = alumnos.some((alumno) => alumno.Seccion === value);
    if (seccionAsignada) {
      alert("No puede eliminar secciones mientras hayan alumnos asignados a la misma.");
    } else {
      console.log("No hay alumnos con la sección asignada.");
      console.log("Sección: ", value);
      Axios.delete("http://localhost:3000/deleteSeccionSemestre", {
        data: { seccionNombre: value },
      })
        .then(function (response) {
          location.reload();
        })
        .catch(function (error) {
          //console.error("Error al eliminar seccion:", error);
          alert("Si quiere eliminar la sección, no puede tener nada asignado a la misma");
        });
    }
  };
  

  //LOGS
  //console.log(Nombre);
  //console.log("Semestres ", semestre);
  //console.log("Seccion unica ", seccionUnica);
  //console.log("materias: ", materias);
  //console.log("profesores: ", profesores);
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
                      <Button
                        variant="info"
                        onClick={() => {
                          handleVerAlumn(item);
                        }}
                      >
                        Ver Alumnos
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => {
                          handleDelete(item);
                        }}
                      >
                        Eliminar Sección
                      </Button>
                      <Link to={`/horario/${Nombre}/${item}`}>
                        <Button variant="warning">Horarios</Button>
                      </Link>
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
          <Button variant="success" onClick={handleAnadirMateria}>
            Añadir Materia
          </Button>
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
                        <Button
                          variant="danger"
                          onClick={() => handleEliminarFila(idx)}
                        >
                          Eliminar
                        </Button>
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

      <Modal size="xl" show={showModal2} onHide={closeModal2}>
        <Modal.Header closeButton>
          <Modal.Title className="text-center">
            Asignar a Sección {modalTitle}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <h2>Seleccione para asignar</h2>
              <Table bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Documento</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {info.map((item, idx) => {
                    return (
                      <tr key={idx}>
                        <td>{idx}</td>
                        <td>{item.Nombre}</td>
                        <td>{item.Apellido}</td>
                        <td>{item.Numero_docu}</td>
                        <td>
                          <Button
                            variant="success"
                            onClick={() => {
                              handleAnadir(idx);
                            }}
                          >
                            Asign.
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Col>
            <Col md={6}>
              <h2>Confirme Asignación</h2>
              <Table bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Documento</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {alumnosSubmit.map((item, idx) => (
                    <tr key={idx}>
                      <td>{idx}</td>
                      <td>{item.Nombre}</td>
                      <td>{item.Apellido}</td>
                      <td>{item.Numero_docu}</td>
                      <td>
                        <Button
                          variant="danger"
                          onClick={() => {
                            handleDeleteListita(idx);
                          }}
                        >
                          Eliminar
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
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

      <Modal size="lg" show={showModal3} onHide={closeModal3}>
        <Modal.Header closeButton>
          <Modal.Title>Sección: {modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Correo</th>
                <th>Cédula</th>
                <th>Telefono</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {info.map((item, idx) => {
                return (
                  <tr key={idx}>
                    <td>{idx}</td>
                    <td>{item.Nombre}</td>
                    <td>{item.Apellido}</td>
                    <td>{item.Correo}</td>
                    <td>{item.Numero_docu}</td>
                    <td>{item.Numero_telefono}</td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => {
                          handleDeleteAlumnoAsign(item.idAlumnos);
                        }}
                      >
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal3}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditarSemestre;
