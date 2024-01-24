import Axios from "axios";
import Button from "react-bootstrap/Button";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Table from "react-bootstrap/esm/Table";
import { useParams, useNavigate, Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Pagination from "react-bootstrap/Pagination";
import Form from "react-bootstrap/Form";
function Asistencias({ User }) {
  const { username } = useParams();
  const navigate = useNavigate();
  const [currentDay, setCurrentDay] = useState("");
  const [horariosGet, setHorarioGet] = useState([]);
  //obtener dia actual
  useEffect(() => {
    const today = new Date();
    const options = { weekday: "long" };
    const formattedDay = today.toLocaleDateString("es-ES", options);
    setCurrentDay(formattedDay);
  }, []);
  //check url y user log
  useEffect(() => {
    if (!(User && User.user.username === username)) {
      navigate("/home");
    }
  }, [User, username, navigate]);
  //obtener horarios
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (User.user.idusuario) {
          const response = await Axios.get(
            `http://localhost:3000/server/getHorario/${User.user.idusuario}`
          );
          setHorarioGet(response.data);
          //console.log(response.data);
        } else {
          console.error("Error");
        }
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };
    fetchData();
  }, []);

  ///////////////////////////////////PAGINACION/////////////////////
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 7;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = horariosGet.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(horariosGet.length / itemsPerPage);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };
  const filteredItems = currentItems.filter((item) =>
    item.NombreSemestre.toLowerCase().includes(searchTerm.toLowerCase())
  );
  ///////////////////////////////////PAGINACION/////////////////////
  return User && User.user.username === username ? (
    <>
      <Container>
        <Card>
          <Card.Header>Featured</Card.Header>
          <Card.Body>
            <Form.Group controlId="formSearch">
              <Form.Control
                type="text"
                placeholder="Buscar por semestre..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </Form.Group>
            <Table bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Semestre</th>
                  <th>Sección</th>
                  <th>Materia</th>
                  <th>Día</th>
                  <th>Hora Inicio</th>
                  <th>Hora Fin</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item, idx) => {
                  const isDisabled =
                    item.dia.toLowerCase() !== currentDay.toLowerCase();
                  return (
                    <tr key={idx}>
                      <td>{idx}</td>
                      <td>{item.NombreSemestre}</td>
                      <td>{item.DescripcionSeccion}</td>
                      <td>{item.NombreMateria}</td>
                      <td>{item.dia}</td>
                      <td>{item.inicio}</td>
                      <td>{item.fin}</td>
                      <td>
                        <Link
                          to={`/tomar-asistencia/${item.idHorario}/${item.idSemestre}/${item.dia}/${item.NombreMateria}/${item.NombreSemestre}/${item.DescripcionSeccion}/${user}`}
                        >
                          <Button disabled={isDisabled}>
                            Tomar Asistencia
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <Pagination>
              <Pagination.First onClick={() => handlePageChange(1)} />
              <Pagination.Prev
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              />
              {Array.from({ length: totalPages }, (_, index) => (
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
              <Pagination.Last onClick={() => handlePageChange(totalPages)} />
            </Pagination>
          </Card.Body>
        </Card>
      </Container>
    </>
  ) : null;
}

export default Asistencias;
