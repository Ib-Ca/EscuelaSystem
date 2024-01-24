import { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "bootstrap-icons/font/bootstrap-icons.css";
import Nav from "react-bootstrap/Nav";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import Axios from "axios";
import { Link } from "react-router-dom";
export default function NavbarDefault({ User }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const buttonIconStyle = {
    marginRight: "5px",
  };
  Axios.defaults.withCredentials = true;

  const handleLogout = () => {
    Axios.get("http://localhost:3000/server/logout").then((response) => {
      location.reload(false);
    });
  };
  return (
    <Navbar className="bg-body-tertiary" style={{ marginBottom: "26px" }}>
      <Container>
        <Navbar.Brand href="/home">IFD Santa Clara</Navbar.Brand>
        <Navbar.Toggle />
        <NavbarCollapse>
          <Nav className="me-auto">
            {User && User.user.rol === 1 && (
              <NavDropdown title="ADMINISTRACIÓN" id="admin">
                <NavDropdown.Item href="/alumnoAdd">Alumnos</NavDropdown.Item>
                <NavDropdown.Item href="/materiaAdd">Materias</NavDropdown.Item>
                <NavDropdown.Item href="/profesorAdd">
                  Profesores
                </NavDropdown.Item>
                <NavDropdown.Item href="/semestreCreate">
                  Semestres
                </NavDropdown.Item>
                <NavDropdown.Item href="/horario">Horarios</NavDropdown.Item>
                <NavDropdown.Item
                  href={`/usuarios/${User && User.user && User.user.username}`}
                >
                  Usuarios
                </NavDropdown.Item>
              </NavDropdown>
            )}

            {User && (User.user.rol === 1 || User.user.rol === 2) && (
              <NavDropdown title="DOCENTES" id="doc">
                <NavDropdown.Item
                  href={`/profesor/alumno/${
                    User && User.user && User.user.username
                  }`}
                >
                  Alumnos--Obs
                </NavDropdown.Item>
                <NavDropdown.Item
                  href={`/profesor/observaciones/${
                    User && User.user && User.user.username
                  }`}
                >
                  Lista Observaciones
                </NavDropdown.Item>
                <NavDropdown.Item
                  href={`/profesor/procesos/${
                    User && User.user && User.user.username
                  }`}
                >
                  Procesos
                </NavDropdown.Item>
                <NavDropdown.Item
                  href={`/asistencias/${
                    User && User.user && User.user.username
                  }`}
                >
                  Asistencias
                </NavDropdown.Item>
              </NavDropdown>
            )}
            {User && (User.user.rol === 1 || User.user.rol === 3) && (
              <NavDropdown title="ALUMNOS" id="alumnos">
                <NavDropdown.Item
                  href={`/alumno/${User && User.user && User.user.username}`}
                >
                  Ver Observaciones
                </NavDropdown.Item>
                <NavDropdown.Item href="">Placeholder2</NavDropdown.Item>
                <NavDropdown.Item href="">Placeholder3</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
          <Nav>
            <NavDropdown
              title={
                User && User.user.idusuario
                  ? User.user.username
                  : "Usuario no autenticado"
              }
              id="usuario_nav"
            >
              <NavDropdown.Item href="">Info</NavDropdown.Item>
              <NavDropdown.Item href="" onClick={handleLogout}>
                Cerrar Sesión
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </NavbarCollapse>
      </Container>
    </Navbar>
  );
}
