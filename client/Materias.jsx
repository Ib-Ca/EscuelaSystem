import React from "react";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";

export const Materias = () => {
  return (
<Container>
        <div className="d-flex justify-content-center align-items-center">
          <Card>
            <Card.Header className="text-center" as="h3">
              Añadir Materias
            </Card.Header>
            <Card.Body>
              <Form  onSubmit="">
                <Row className="mb-3">
                  <Form.Group as={Col} md="6" controlId="materias">
                    <Form.Label>Nombre de la materia*</Form.Label>
                    <Form.Control
                      required
                      pattern="^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ ]*$"
                     /* onChange={(event) => {
                        setNombre(event.target.value);
                      }} */
                      type="text"
                      placeholder="Ingrese nombres"
                      value=""
                    />
                  </Form.Group>
                  <Form.Group as={Col} md="6" controlId="cargah">
                    <Form.Label>Carga Horaria*</Form.Label>
                    <Form.Control
                      required
                     /* onChange={(event) => {
                        setApellidos(event.target.value);
                      }} */
                      type="number"
                      placeholder="Ingrese carga horaria"
                      value=""
                    />
                  </Form.Group>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Container>
  );
};
