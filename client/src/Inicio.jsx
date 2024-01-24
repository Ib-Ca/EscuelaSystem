import Axios from "axios";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { useNavigate } from "react-router-dom";

export const Inicio = () => {
  const [user, setUser] = useState("");

  Axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  useEffect(() => {
    Axios.get("http://localhost:3000/testeoLogin")
      .then((response) => {
        if (response.data.logIn) {
          setUser(response.data.user.username);
          //console.log(response.data);
        } else {
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <Container style={{ textAlign: 'center' }}>
      <h3>Bienvenido {user}!!!!</h3>
    </Container>
  );
};
