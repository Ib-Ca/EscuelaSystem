import { useState, useEffect, useRef } from "react";
import "./App.css";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { Link } from "react-router-dom";

function ProfesoresForm({User}) {
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [pais, setPais] = useState([]);
  const [nro_docu, setNro_docu] = useState("");
  const [tipo_docu, setTipo_docu] = useState([]);
  const [civil, setCivil] = useState([]);
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [profesores, setProfesores] = useState([]);
  const [idAl, setIdal] = useState();
  const [edit, setEdit] = useState(false);

  const [selectedpais, setSelectedpais] = useState("");
  //obtener paises de db y component
  useEffect(() => {
    Axios.get("http://localhost:3000/server/paises").then((response) => {
      setPais(response.data);
    });
  }, []);
  //cambiar pais en select
  const handle_paischange = (e) => {
    setSelectedpais(e.target.value);
  };

  //obtener estado civil db y componente
  const [selectedcivil, setSelectedcivil] = useState("");
  useEffect(() => {
    Axios.get("http://localhost:3000/server/civil").then((response) => {
      setCivil(response.data);
      const civilpredeterminado = response.data.find(
        (option) => option.idEstado_civil === 1
      );
      if (civilpredeterminado) {
        setSelectedcivil(civilpredeterminado.idEstado_civil.toString());
      }
    });
  }, []);

  //cambiar civil en select
  const handle_civilchange = (e) => {
    setSelectedcivil(e.target.value);
  };

  //obtener tipos de documento db y mostarr en componente
  const [selecteddocu, setSelecteddocu] = useState("");
  useEffect(() => {
    Axios.get("http://localhost:3000/server/documento_tipo").then(
      (response) => {
        setTipo_docu(response.data);
        const tipodocu_predeterminado = response.data.find(
          (option) => option.idDocumento === 1
        );
        if (tipodocu_predeterminado) {
          setSelecteddocu(tipodocu_predeterminado.idDocumento.toString());
        }
      }
    );
  }, []);

  //cambiar documento en select
  const handle_docuchange = (e) => {
    setSelecteddocu(e.target.value);
  };

  //añadir profesores
  const addProfesor = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3000/createProfesor", {
      nombre: nombre,
      apellidos: apellidos,
      pais: selectedpais,
      nro_docu: nro_docu,
      tipo_docu: selecteddocu,
      civil: selectedcivil,
      telefono: telefono,
      correo: correo,
      idUsuario: User.user.idusuario
    })
      .then(function (response) {
        if (response.data.profeCreado === true) {
          return Axios.post("http://localhost:3000/createUser2", {
            username: nro_docu,
            password: nro_docu,
            idProfesor: response.data.idProfesor,
          });
        } else {
          throw new Error("Hubo un problema al crear el profesor");
        }
      })
      .then(function (response) {
        //setUsername(response.data.username);
        clean();
        listaProfesor();
        //console.log(response.data);
      })
      .catch(function (error) {
        console.log("Error en axios: ", error);
        alert(error.message || "Hubo un error");
      });
  };

  //añadir los profesores al componente
  const listaProfesor = () => {
    Axios.get("http://localhost:3000/server/profesores")
      .then((response) => {
        setProfesores(response.data);
        // console.log("AL SACAR DE DB",response);
      })
      .catch((error) => {
        console.error("Error al obtener profesores:", error);
      });
  };

  useEffect(() => {
    listaProfesor();
  }, []);

  //actualizar profesores
  const updateProfesor = () => {
    Axios.put("http://localhost:3000/updateProfe", {
      idProfesores: idAl,
      nombre: nombre,
      apellidos: apellidos,
      pais: selectedpais,
      nro_docu: nro_docu,
      tipo_docu: selecteddocu,
      civil: selectedcivil,
      telefono: telefono,
      correo: correo,
      idUsuario: User.user.idusuario
    })
      .then(function (response) {
        listaProfesor();
        // console.log("entro en then: ", response);
        alert("Profesor Actualizado");
        clean();
      })
      .catch(function (error) {
        console.log("Error en axios: ", error);
        alert("hubo un error");
      });
  };

  //eliminar profesores
  const edeleteProfe = (idProfesores) => {
    Axios.delete(`http://localhost:3000/deleteProfe/${idProfesores}/${User.user.idusuario}`)
      .then(function (response) {
        listaProfesor();
        // console.log("entro en then: ", response);
      })
      .catch(function (error) {
        console.log("Error en axios: ", error);
        alert(
          "El profesor esta asignado a una o varias materias, no puede ser eliminado."
        );
      });
  };

  //rellenar el formulario al presionar editar
  const editaProfe = (valor) => {
    setEdit(true);
    //console.log(valor);
    setNombre(valor.Nombre);
    setApellidos(valor.Apellido);
    setSelectedpais(valor.Nacionalidad_idNacionalidad);
    setNro_docu(valor.Numero_docu);
    setSelecteddocu(valor.Documento_idDocumento);
    setSelectedcivil(valor.Estado_civil_idEstado_civil);
    setTelefono(valor.Numero_telefono);
    setCorreo(valor.Correo);
    setIdal(valor.idProfesores);
    //console.log(idAl);
  };
  //limpiar
  const clean = () => {
    setEdit(false);
    formRef.current.reset();
    setNombre("");
    setApellidos("");
    setSelectedpais(1);
    setNro_docu("");
    setSelecteddocu(1);
    setSelectedcivil(1);
    setTelefono("");
    setCorreo("");
    //console.log(idAl);
  };

  const handleInputDocu = (event) => {
    const inputValue = event.target.value;
    if (/^\d{0,10}$/.test(inputValue)) {
      setNro_docu(inputValue);
    }
  };

  const handleInputTele = (event) => {
    const inputValue = event.target.value;
    if (/^\d{0,19}$/.test(inputValue)) {
      setTelefono(inputValue);
    }
  };

  const formRef = useRef(null);
  return (
    <>
      <Container>
        <div className="d-flex justify-content-center align-items-center">
          <Card>
            <Card.Header className="text-center" as="h3">
              Añadir Profesores
            </Card.Header>
            <Card.Body>
              <Form ref={formRef} onSubmit={addProfesor}>
                <Row className="mb-3">
                  <Form.Group as={Col} md="6" controlId="nombres">
                    <Form.Label>Nombres*</Form.Label>
                    <Form.Control
                      required
                      pattern="^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ ]*$"
                      onChange={(event) => {
                        setNombre(event.target.value);
                      }}
                      type="text"
                      placeholder="Ingrese nombres"
                      value={nombre}
                      maxLength="45"
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="apellidos">
                    <Form.Label>Apellidos*</Form.Label>
                    <Form.Control
                      required
                      pattern="^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ ]*$"
                      onChange={(event) => {
                        setApellidos(event.target.value);
                      }}
                      type="text"
                      placeholder="Ingrese apellidos"
                      value={apellidos}
                      maxLength="45"
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} md="3" controlId="nrodocu">
                    <Form.Label>Nro de Documento*</Form.Label>
                    <Form.Control
                      required
                      onChange={handleInputDocu}
                      type="number"
                      placeholder="Documento"
                      value={nro_docu}
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="3" controlId="tipodocu">
                    <Form.Label>Tipo de documento</Form.Label>
                    <Form.Select
                      required
                      value={selecteddocu}
                      onChange={handle_docuchange}
                    >
                      {tipo_docu.map((tipo_docu) => (
                        <option
                          key={tipo_docu.idDocumento}
                          value={tipo_docu.idDocumento}
                        >
                          {tipo_docu.Tipo_docu}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} md="3" controlId="civil">
                    <Form.Label>Estado Civil</Form.Label>
                    <Form.Select
                      required
                      value={selectedcivil}
                      onChange={handle_civilchange}
                    >
                      {civil.map((civil) => (
                        <option
                          key={civil.idEstado_civil}
                          value={civil.idEstado_civil}
                        >
                          {civil.Descripcion}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} md="3" controlId="pais">
                    <Form.Label>Selecciona un País</Form.Label>
                    <Form.Select
                      required
                      value={selectedpais}
                      onChange={handle_paischange}
                    >
                      {pais.map((pais) => (
                        <option
                          key={pais.idNacionalidad}
                          value={pais.idNacionalidad}
                        >
                          {pais.Descripcion}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} md="5" controlId="telefono">
                    <Form.Label>Número de telefono*</Form.Label>
                    <Form.Control
                      required
                      onChange={handleInputTele}
                      type="number"
                      placeholder="Ingrese nro de telefono"
                      value={telefono}
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="7" controlId="email">
                    <Form.Label> Correo*</Form.Label>
                    <Form.Control
                      required
                      onChange={(event) => {
                        setCorreo(event.target.value);
                      }}
                      type="email"
                      placeholder="Ingrese correo"
                      value={correo}
                      maxLength="50"
                    />
                  </Form.Group>
                </Row>
                <Card.Footer className="text-muted">
                  <div className="d-grid gap-2">
                    {edit ? (
                      <ButtonGroup aria-label="Basic example">
                        <Button
                          variant="warning"
                          size="lg"
                          onClick={updateProfesor}
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
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Nro.Documento</th>
              <th>Correo</th>
              <th>Teléfono</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {profesores.map((value, idx) => {
              return (
                <tr key={value.idProfesores}>
                  <td scope="row">{idx}</td>
                  <td>{value.Nombre}</td>
                  <td>{value.Apellido}</td>
                  <td>{value.Numero_docu}</td>
                  <td>{value.Correo}</td>
                  <td>{value.Numero_telefono}</td>
                  <td>
                    <ButtonGroup aria-label="botones">
                    <Link
                        to={`/profes/${User.user.username}/${value.idProfesores}`}
                      >
                        <Button variant="primary">Info</Button>
                      </Link>
                      <Button
                        variant="warning"
                        onClick={() => {
                          //console.log(value);
                          editaProfe(value);
                        }}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => {
                          edeleteProfe(value.idProfesores);
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
}

export default ProfesoresForm;
