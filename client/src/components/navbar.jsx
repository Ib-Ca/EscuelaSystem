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
        <Navbar.Brand href="/">IFD Santa Clara</Navbar.Brand>
        <Navbar.Toggle />
        <NavbarCollapse>
          <Nav className="me-auto">
            <Button className="ml-auto" variant="primary" onClick={handleShow}>
              <i className="bi bi-window-sidebar" style={buttonIconStyle}></i>
              Navegacion
            </Button>
            <Offcanvas show={show} onHide={handleClose}>
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>PÁGINAS</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <DropdownButton id="admin" title="ADMINISTRADORES">
                  <Dropdown.Item href="/alumnoAdd">Añadir Alumno</Dropdown.Item>
                  <Dropdown.Item href="">Placeholder2</Dropdown.Item>
                  <Dropdown.Item href="">Placeholder3</Dropdown.Item>
                </DropdownButton>
                <DropdownButton id="admin" title="DOCENTES">
                  <Dropdown.Item href="">Placeholder1</Dropdown.Item>
                  <Dropdown.Item href="">Placeholder2</Dropdown.Item>
                  <Dropdown.Item href="">Placeholder3</Dropdown.Item>
                </DropdownButton>
                <DropdownButton id="admin" title="ALUMNOS">
                  <Dropdown.Item href="">Placeholder1</Dropdown.Item>
                  <Dropdown.Item href="">Placeholder2</Dropdown.Item>
                  <Dropdown.Item href="">Placeholder3</Dropdown.Item>
                </DropdownButton>
              </Offcanvas.Body>
            </Offcanvas>
          </Nav>
          <Nav>
            <NavDropdown title="Usuario" id="usuario_nav">
              <NavDropdown.Item href="">Info</NavDropdown.Item>
              <NavDropdown.Item href="">Cerrar Sesión</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </NavbarCollapse>
      </Container>
    </Navbar>
  );
}
