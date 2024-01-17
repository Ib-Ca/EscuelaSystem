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
export default function NavbarDefault() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const buttonIconStyle = {
    marginRight: "5px",
  };

  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/home">IFD Santa Clara</Navbar.Brand>
        <Navbar.Toggle />
        <NavbarCollapse>
          <Nav className="me-auto">
            <NavDropdown title="ADMINISTRACIÓN" id="admin">
              <NavDropdown.Item href="/alumnoAdd">Alumnos</NavDropdown.Item>
              <NavDropdown.Item href="/materiaAdd">Materias</NavDropdown.Item>
              <NavDropdown.Item href="/profesorAdd">Profesores</NavDropdown.Item>
              <NavDropdown.Item href="/semestreCreate">Semestres</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="DOCENTES" id="doc">
              <NavDropdown.Item href="">Placeholder1</NavDropdown.Item>
              <NavDropdown.Item href="">Placeholder2</NavDropdown.Item>
              <NavDropdown.Item href="">Placeholder3</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="ALUMNOS" id="alumnos">
              <NavDropdown.Item href="">Placeholder1</NavDropdown.Item>
              <NavDropdown.Item href="">Placeholder2</NavDropdown.Item>
              <NavDropdown.Item href="">Placeholder3</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <NavDropdown title="USUARIO" id="usuario_nav">
              <NavDropdown.Item href="">Info</NavDropdown.Item>
              <NavDropdown.Item href="">Cerrar Sesión</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </NavbarCollapse>
      </Container>
    </Navbar>
  );
}
