import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/esm/Container";
import Table from "react-bootstrap/esm/Table";
import Axios from "axios";
import Form from "react-bootstrap/Form";
import Pagination from "react-bootstrap/Pagination";

function UsuarioLista({ User }) {
  const { username } = useParams();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  useEffect(() => {
    if (!(User && User.user.username === username)) {
      navigate("/home");
    }
  }, [User, username, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const datos = await Axios.get("http://localhost:3000/server/getUsers");
        setUsuario(datos.data);
        console.log(datos.data);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };
    fetchData();
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredUsuarios = usuario.filter((item) =>
    item.username.toString().includes(filtro.toString())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsuarios.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredUsuarios.length / itemsPerPage);

  const restore = async (username) => {
    try {
      const response = await Axios.put(
        `http://localhost:3000/restorePass/${username}`,
        {}
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  return User && User.user.username === username ? (
    <Container>
      <Card>
        <Card.Header as="h4">Lista de Usuarios</Card.Header>
        <Card.Body>
          <Form className="float-right">
            <Form.Control
              type="number"
              placeholder="Buscar usuario..."
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              style={{ border: "5px solid #ced4da", borderRadius: "5px" }}
            />
          </Form>
          <Table bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Usuario</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, idx) => (
                <tr key={idx + indexOfFirstItem}>
                  <td>{idx + indexOfFirstItem}</td>
                  <td>{item.username}</td>
                  <td>
                    <Button
                      variant="success"
                      onClick={() => restore(item.username)}
                    >
                      Restaurar Contraseña
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination>
            <Pagination.Prev
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />
            {Array.from({ length: totalPages }).map((_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </Card.Body>
      </Card>
    </Container>
  ) : null;
}

export default UsuarioLista;
