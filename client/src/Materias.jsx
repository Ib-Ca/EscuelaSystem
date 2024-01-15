import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Axios from "axios";
import ButtonGroup from "react-bootstrap/ButtonGroup";

export const Materias = () => {
  const [materia, setMateria] = useState("");
  const [carga, setCarga] = useState("");
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState([]);
  const [idMat, setIdMat] = useState("");

  const addMateria = () => {
    Axios.post("http://localhost:3000/createMateria", {
      materia: materia,
      carga: carga,
    })
      .then(function (response) {
       // alert("Materia Registrada");
      })
      .catch(function (error) {
        console.log(response);
        alert("Error de materia");
      });
  };

  //añadir los materias al componente
  const listaMateria = () => {
    Axios.get("http://localhost:3000/server/materia")
      .then((response) => {
        setData(response.data);
        // console.log("AL SACAR DE DB",response);
      })
      .catch((error) => {
        console.error("Error al obtener materias:", error);
      });
  };

  useEffect(() => {
    listaMateria();
  }, []);

  const editMateria = (valor) => {
    setEdit(true);
    //console.log(valor);
    setMateria(valor.Nombre);
    setCarga(valor.Carga_horaria);
    setIdMat(valor.idMaterias);
  };
  //actualizar alumnos
  const updateMaterias = () => {
    Axios.put("http://localhost:3000/updateMateria", {
      idMaterias: idMat,
      materia: materia,
      carga: carga,
    })
      .then(function (response) {
        listaMateria();
        // console.log("entro en then: ", response);
        alert("Materia Actualizada");
        clean();
      })
      .catch(function (error) {
        console.log("Error en axios: ", error);
        alert("Error al actualizar");
      });
  };

  const deleteMaterias = (idMaterias) => {
    Axios.delete(`http://localhost:3000/deleteMateria/${idMaterias}`)
      .then(function (response) {
        listaMateria();
        // console.log("entro en then: ", response);
        alert("Materia Eliminada");
      })
      .catch(function (error) {
        console.log("Error en axios: ", error);
        alert("Hubo un error, intente de nuevo");
      });
  };


  const handleInputCarga = (event) => {
    const inputValue = event.target.value;
    if (/^\d{0,10}$/.test(inputValue)) {
      setCarga(inputValue);
    }
  };

  //limpiar campos
  const clean = () => {
    setEdit(false);
    setMateria("");
    setCarga("");
  };

  return (
    <>
      <Container>
        <div className="d-flex justify-content-center align-items-center">
          <Card>
            <Card.Header className="text-center" as="h3">
              Añadir Materias
            </Card.Header>
            <Card.Body>
              <Form onSubmit={addMateria}>
                <Row className="mb-3">
                  <Form.Group as={Col} md="6" controlId="materias">
                    <Form.Label>Nombre de la materia*</Form.Label>
                    <Form.Control
                      required
                      pattern="^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ ]*$"
                      onChange={(event) => {
                        setMateria(event.target.value);
                      }}
                      type="text"
                      placeholder="Nombre"
                      value={materia}
                      maxLength="20"
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="cargah">
                    <Form.Label>Carga Horaria*</Form.Label>
                    <Form.Control
                      required
                      onChange={handleInputCarga}
                      type="number"
                      placeholder="En horas"
                      value={carga}
                      
                    />
                  </Form.Group>
                </Row>
                <Card.Footer className="text-muted">
                  <div className="d-grid gap-2">
                    {edit ? (
                      <ButtonGroup aria-label="botones">
                        <Button
                          variant="warning"
                          size="lg"
                          onClick={updateMaterias}
                        >
                          Guardar Cambios
                        </Button>
                        <Button variant="danger" size="lg" onClick={clean}>
                          Cancelar
                        </Button>
                      </ButtonGroup>
                    ) : (
                      <Button variant="success" size="lg" type="submit">
                        Registrar
                      </Button>
                    )}
                  </div>
                </Card.Footer>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Container>

      <Container>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Materia</th>
              <th>Carga Horaria</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((value, idx) => {
              return (
                <tr key={value.idMaterias}>
                  <td scope="row">{idx}</td>
                  <td>{value.Nombre}</td>
                  <td>{value.Carga_horaria}</td>
                  <td>
                    <ButtonGroup aria-label="Basic example">
                      <Button
                        variant="warning"
                        onClick={() => {
                          //console.log(value);
                          editMateria(value);
                        }}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => {
                          deleteMaterias(value.idMaterias);
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
