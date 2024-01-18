import Container from "react-bootstrap/esm/Container";
import Axios from "axios";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import { useEffect, useRef, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Table from "react-bootstrap/Table";
import EditarSemestre from "./EditarSemestre";
import { Link } from "react-router-dom";

const CrearSemestre = () => {
  const [nombre, setNombre] = useState("");
  const [seccion, setSeccion] = useState([]);
  const [selectedSeccion, setSelectedSeccion] = useState("");
  const [materias, setMaterias] = useState([]);
  const [selectedMaterias, setSelectedMaterias] = useState("");
  const [profesores, setProfesores] = useState([]);
  const [selectedProfesor, setSelectedProfesor] = useState("");
  const [semestresLista, setSemestresLista] = useState([]);
  const [semestresUnicos, setSemestresUnicos] = useState([]);
  const [alumnos, setAlumnos] = useState([]);

  const [materiaLista, setMateriasLista] = useState([]);
  const [profeLista, setProfeLista] = useState([]);

  //secciones
  useEffect(() => {
    const fetchSecciones = async () => {
      try {
        const response = await Axios.get(
          "http://localhost:3000/server/secciones"
        );
        setSeccion(response.data);
        setSelectedSeccion(response.data[0].idSeccion);
      } catch (error) {
        console.error("Error al obtener las secciones:", error);
      }
    };

    fetchSecciones();
  }, []);

  //materias
  useEffect(() => {
    const fetchMaterias = async () => {
      try {
        const response = await Axios.get(
          "http://localhost:3000/server/materia"
        );
        setMaterias(response.data);
        setSelectedMaterias(response.data[0].Nombre);
      } catch (error) {
        console.error("Error al obtener las materias:", error);
      }
    };
    fetchMaterias();
  }, []);

  //profesor
  const listaProfesor = () => {
    Axios.get("http://localhost:3000/server/profesores")
      .then((response) => {
        setProfesores(response.data);
        setSelectedProfesor(`${response.data[0].Nombre}`);
      })
      .catch((error) => {
        console.error("Error al obtener profesores:", error);
      });
  };

  useEffect(() => {
    listaProfesor();
  }, []);

  //añadir a la listita los profesores y materias
  const handleAnadir = () => {
    //console.log(materiaLista, profeLista);
    setMateriasLista((prevValue) => {
      prevValue.push({ text: selectedMaterias });
      return [...prevValue];
    });
    setProfeLista((prevValue) => {
      prevValue.push({ text: selectedProfesor });
      return [...prevValue];
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(materiaLista);
    const datosEnviar = materiaLista.map((materia, index) => ({
      nombre: nombre,
      seccion: selectedSeccion,
      materia: materia.text,
      profesor: profeLista[index].text,
    }));
    try {
      const respuestas = await Promise.all(
        datosEnviar.map((e) =>
          Axios.post("http://localhost:3000/createSemestre", e)
        )
      );
    } catch (error) {
      console.error("Error al enviar datos:", error);
    }
    clean();
    listaSemestres();
    //window.location.reload(false)
  };

  //fetch semestres
  const listaSemestres = () => {
    Axios.get("http://localhost:3000/server/semestres")
      .then((response) => {
        //repetido
        setSemestresLista(response.data);
        const semestresUnicos = Array.from(
          new Set(response.data.map((semestre) => semestre.Nombre))
        ).map((nombre) => {
          return response.data.find((semestre) => semestre.Nombre === nombre);
        });
        //unico
        setSemestresUnicos(semestresUnicos);
      })
      .catch((error) => {
        console.error("Error al obtener semestres:", error);
      });
  };
  useEffect(() => {
    listaSemestres();
  }, []);

  const clean = () => {
    formRef.current.reset();
    setNombre("");
    setMateriasLista([]);
    setProfeLista([]);
  };
  //console.log(semestresLista)

  const handleBorrar = (idx) => () => {
    //console.log(idx);
    setMateriasLista((prevValue) => {
      const filterList = prevValue.filter((item, index) => index !== idx);
      return [...filterList];
    });
  };

  //alumnos
  const fetchAlumnos = () => {
    return Axios.get("http://localhost:3000/server/allAlumno")
      .then((response) => {
        setAlumnos(response.data);
        return response.data;
      })
      .catch((error) => {
        console.error("Error al obtener alumnos:", error);
        throw error;
      });
  };
  const handleDelete = (value) => {
    console.log("semestre", value);
    fetchAlumnos()
      .then((alumnos) => {
        console.log("alumnos: ", alumnos);
        const tieneCoincidencia = alumnos.some(
          (alumno) => alumno.SemestreNombre === value.Nombre
        );
        if (tieneCoincidencia) {
          alert(
            "No puede eliminar semestres mientras hayan alumnos asignados a la misma."
          );
        } else {
          Axios.delete("http://localhost:3000/deleteSemestre", {
            data: {Semestre: value},
          });
          location.reload();
        }
      })
      .catch((error) => {
        console.error("Error al obtener la lista de alumnos:", error);
      });
  };

  //console.log("alumnos: ", alumnos);

  const formRef = useRef(null);
  return (
    <>
      <Container className="d-flex justify-content-center align-items-center">
        <Card>
          <Card.Header className="text-center" as="h3">
            Asignar Semestres
          </Card.Header>
          <Card.Body>
            <Form ref={formRef} onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Form.Group as={Col} md="auto" controlId="nombre">
                  <Form.Label>Nombre*</Form.Label>
                  <Form.Control
                    required
                    pattern="^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ ]*$"
                    onChange={(e) => {
                      setNombre(e.target.value);
                    }}
                    type="text"
                    placeholder="Ingrese nombre"
                    value={nombre}
                    maxLength="45"
                  />
                </Form.Group>
                <Form.Group as={Col} md="auto" controlId="seccion">
                  <Form.Label>Sección*</Form.Label>
                  <Form.Select
                    required
                    value={selectedSeccion}
                    onChange={(e) => {
                      setSelectedSeccion(e.target.value);
                    }}
                  >
                    {seccion.map((item, idx) => (
                      <option key={item.idSeccion} value={item.idSeccion}>
                        {item.descripcion}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Row>
              <Row className=" mb-3">
                <Form.Group as={Col} md="auto" controlId="materia">
                  <Form.Label>Materias*</Form.Label>
                  <Form.Select
                    required
                    value={selectedMaterias}
                    onChange={(e) => {
                      setSelectedMaterias(e.target.value);
                    }}
                  >
                    {materias.map((item, idx) => (
                      <option key={item.idMaterias} value={item.Nombre}>
                        {item.Nombre}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group as={Col} md="auto" controlId="profe">
                  <Form.Label>Profesor*</Form.Label>
                  <Form.Select
                    required
                    value={selectedProfesor}
                    onChange={(e) => {
                      setSelectedProfesor(e.target.value);
                    }}
                  >
                    {profesores.map((item, idx) => (
                      <option key={item.idProfesores} value={item.Nombre}>
                        {item.Nombre} 
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Col md="auto" style={{ paddingTop: "32px" }}>
                  <Button variant="success" onClick={handleAnadir}>
                    Añadir
                  </Button>
                </Col>
              </Row>
              <ListGroup>
                {materiaLista.map((materia, idx) => (
                  <ListGroup.Item
                    key={idx}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    {materia.text}
                    {/* Mostrar el profesor correspondiente si existe */}
                    {profeLista[idx] && <span> {profeLista[idx].text}</span>}
                    <button type="button" onClick={handleBorrar(idx)}>
                      Borrar
                    </button>
                  </ListGroup.Item>
                ))}
              </ListGroup>

              <Card.Footer className=" d-flex justify-content-center align-items-center mb-3 text-muted">
                <Button type="submit">Guardar Semestre</Button>
              </Card.Footer>
            </Form>
          </Card.Body>
        </Card>
      </Container>
      <Container>
        <Table bordered hover>
          <thead>
            <tr>
              <th>Semestre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {semestresUnicos.map((item, idx) => {
              return (
                <tr key={idx}>
                  <td>{item.Nombre}</td>
                  <td>
                    <ButtonGroup aria-label="botones">
                      <Link to={`/semestreEdit/${item.Nombre}`}>
                        <Button variant="warning">Editar</Button>
                      </Link>
                      <Button
                        variant="danger"
                        onClick={() => {
                          handleDelete(item);
                        }}
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
      </Container>
    </>
  );
};

export default CrearSemestre;
