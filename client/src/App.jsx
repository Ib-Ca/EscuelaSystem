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

function FormularioAñadir() {
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [pais, setPais] = useState([]);
  const [nro_docu, setNro_docu] = useState("");
  const [tipo_docu, setTipo_docu] = useState([]);
  const [civil, setCivil] = useState([]);
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [l_naci, setL_naci] = useState("");
  const [f_naci, setF_naci] = useState(undefined);
  const [tipo_movi, settipo_movi] = useState([]);
  const [distancia, setDistancia] = useState("");
  const [tiempo, setTiempo] = useState("");
  const [alumnos, setAlumnos] = useState([]);
  const [idAl, setIdal] = useState();
  const [edit, setEdit] = useState(false);

  const [selectedpais, setSelectedpais] = useState("");
  //obtener paises de db y component
  useEffect(() => {
    Axios.get("http://localhost:3000/server/paises").then((response) => {
      setPais(response.data);
      const paisPredeterminado = response.data.find(
        (option) => option.idNacionalidad === 14
      );
      if (paisPredeterminado) {
        setSelectedpais(paisPredeterminado.idNacionalidad.toString());
      }
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

  const [selectedtransp, setSelectedtransp] = useState("");
  //obtener movilidad de db y component
  useEffect(() => {
    Axios.get("http://localhost:3000/server/movilidad").then((response) => {
      settipo_movi(response.data);

      const movilidadPredeterminada = response.data.find(
        (option) => option.idMovilidad === 0
      );
      if (movilidadPredeterminada) {
        setSelectedtransp(movilidadPredeterminada.idMovilidad.toString());
      }
    });
  }, []);
  //cambiar movilidad en select
  const handle_movichange = (e) => {
    setSelectedtransp(e.target.value);
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

  //añadir alumnos
  const addAlumno = () => {
    Axios.post("http://localhost:3000/createAlumno", {
      nombre: nombre,
      apellidos: apellidos,
      pais: selectedpais,
      nro_docu: nro_docu,
      tipo_docu: selecteddocu,
      civil: selectedcivil,
      telefono: telefono,
      correo: correo,
      l_naci: l_naci,
      f_naci: f_naci,
      tipo_movi: selectedtransp,
      tiempo: tiempo,
      distancia: distancia,
    })
      .then(function (response) {
        listaAlumnos();
        // console.log("entro en then: ", response);
        //alert("Alumno Registrado");
      })
      .catch(function (error) {
        console.log("Error en axios: ", error);
        alert("hubo un error");
      });
  };
  //añadir los alumnos al componente
  const listaAlumnos = () => {
    Axios.get("http://localhost:3000/server/allAlumno")
      .then((response) => {
        setAlumnos(response.data);
        // console.log("AL SACAR DE DB",response);
      })
      .catch((error) => {
        console.error("Error al obtener alumnos:", error);
      });
  };
  console.log("alumno:", alumnos);

  useEffect(() => {
    listaAlumnos();
  }, []);

  //actualizar alumnos
  const updateAlumno = () => {
    Axios.put("http://localhost:3000/updateAlumno", {
      idAlumno: idAl,
      nombre: nombre,
      apellidos: apellidos,
      pais: selectedpais,
      nro_docu: nro_docu,
      tipo_docu: selecteddocu,
      civil: selectedcivil,
      telefono: telefono,
      correo: correo,
      l_naci: l_naci,
      f_naci: f_naci,
      tipo_movi: selectedtransp,
      tiempo: tiempo,
      distancia: distancia,
    })
      .then(function (response) {
        listaAlumnos();
        // console.log("entro en then: ", response);
        alert("Alumno Actualizado");
        clean();
      })
      .catch(function (error) {
        console.log("Error en axios: ", error);
        alert("hubo un error");
      });
  };

  //eliminar alumnos
  const deleteAlumno = (idAlumno) => {
    Axios.delete(`http://localhost:3000/deleteAlumno/${idAlumno}`)
      .then(function (response) {
        listaAlumnos();
        // console.log("entro en then: ", response);
        alert("Alumno Eliminado");
      })
      .catch(function (error) {
        console.log("Error en axios: ", error);
        alert("Hubo un error, intente de nuevor");
      });
  };

  //rellenar el formulario al presionar editar
  const editalumn = (valor) => {
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
    setL_naci(valor.Lugar_nacimiento);
    setF_naci(valor.Fecha_nacimiento);
    setSelectedtransp(valor.Movilidad_idMovilidad);
    setDistancia(valor.distancia);
    setTiempo(valor.tiempo);
    setIdal(valor.idAlumnos);
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
    setL_naci("");
    setF_naci();
    setSelectedtransp(1);
    setDistancia("");
    setTiempo("");
    setIdal("");
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
              Añadir Alumnos
            </Card.Header>
            <Card.Body>
              <Form ref={formRef} onSubmit={addAlumno}>
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
                <Row className="mb-3">
                  <Form.Group as={Col} md="8" controlId="lnacimiento">
                    <Form.Label>Lugar de Nacimiento*</Form.Label>
                    <Form.Control
                      required
                      pattern="^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ ]*$"
                      onChange={(event) => {
                        setL_naci(event.target.value);
                      }}
                      type="text"
                      placeholder="Ingrese lugar de nacimiento"
                      value={l_naci}
                      maxLength="45"
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="4" controlId="fnacimiento">
                    <Form.Label>Fecha de Nacimiento</Form.Label>
                    <Form.Control
                      required
                      onChange={(event) => {
                        setF_naci(event.target.value);
                      }}
                      type="date"
                      value={f_naci || ""}
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} md="4" controlId="tiempo">
                    <Form.Label>Tiempo en llegar*</Form.Label>
                    <Form.Control
                      required
                      onChange={(event) => {
                        setTiempo(event.target.value);
                      }}
                      type="number"
                      placeholder="En min"
                      value={tiempo}
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="4" controlId="distancia">
                    <Form.Label>Distancia*</Form.Label>
                    <Form.Control
                      required
                      onChange={(event) => {
                        setDistancia(event.target.value);
                      }}
                      type="number"
                      placeholder="En km"
                      value={distancia}
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="4" controlId="tipo_movi">
                    <Form.Label>Tipo de Movilidad</Form.Label>
                    <Form.Select
                      required
                      value={selectedtransp}
                      onChange={handle_movichange}
                    >
                      {tipo_movi.map((tipo_movi) => (
                        <option
                          key={tipo_movi.idMovilidad}
                          value={tipo_movi.idMovilidad}
                        >
                          {tipo_movi.descripcion}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Row>
                <Card.Footer className="text-muted">
                  <div className="d-grid gap-2">
                    {edit ? (
                      <ButtonGroup aria-label="Basic example">
                        <Button
                          variant="warning"
                          size="lg"
                          onClick={updateAlumno}
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
              <th>Semestre</th>
              <th>Sección</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {alumnos.map((value, idx) => {
              return (
                <tr key={value.idAlumnos}>
                  <td scope="row">{idx}</td>
                  <td>{value.Nombre}</td>
                  <td>{value.Apellido}</td>
                  <td>{value.Numero_docu}</td>
                  <td>{value.Correo}</td>
                  <td>{value.Numero_telefono}</td>
                  <td>{value.SemestreNombre}</td>
                  <td>{value.Seccion}</td>
                  <td>{value.EstadoAlumnoDescripcion}</td>
                  <td>
                    <ButtonGroup aria-label="botones">
                      <Button variant="primary">Info</Button>
                      <Button
                        variant="warning"
                        onClick={() => {
                          //console.log(value);
                          editalumn(value);
                        }}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => {
                          deleteAlumno(value.idAlumnos);
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

export default FormularioAñadir;
