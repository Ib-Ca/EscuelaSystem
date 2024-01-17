import React, { useEffect, useState } from "react";
import styles from "./Login.module.css";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Axios from "axios";
import Toast from "react-bootstrap/Toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const [show, setShow] = useState(false);
  let navigate = useNavigate();
  Axios.defaults.withCredentials = true;

  useEffect(() => {
    Axios.get("http://localhost:3000/testeoLogin")
      .then((response) => {
        if (response.data.logIn) {
          navigate("/home");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleLogin = () => {
    Axios.post("http://localhost:3000/server/login", {
      username: username,
      password: password,
    }).then((response) => {
      if (response.data.logIn) {
        setLoginStatus(response.data.message);
        //console.log("Inicio de sesión exitoso");
        //console.log(response.data.user); //datos del login
        navigate("/home");
      } else {
        setLoginStatus(response.data.message);
        setShow(true);
       //console.log("Inicio de sesión fallido");
      }
    });
  };
  


  return (
    <div className={styles.clase}>
      <div className={styles.LoginContainer}>
        <div className={styles.LoginHeadline}>
          <h2>Inicio de Sesión</h2>
        </div>
        <Form>
          <Form.Group md="4" controlId="username">
            <FloatingLabel
              controlId="userinput"
              label="Usuario"
              className="mb-3"
            >
              <Form.Control
                className={styles.TextInput}
                required
                type="text"
                maxLength={45}
                placeholder="usuario"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group md="4" controlId="password">
            <FloatingLabel
              controlId="passinput"
              label="Contraseña"
              className="mb-3"
            >
              <Form.Control
                className={styles.TextInput}
                required
                type="password"
                placeholder="Contraseña"
                maxLength={45}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </FloatingLabel>
          </Form.Group>
          <Button
            onClick={handleLogin}
            variant="success"
            className={styles.Boton}
          >
            Entrar
          </Button>
          <Toast
            onClose={() => setShow(false)}
            show={show}
            delay={3000}
            autohide
          >
            <Toast.Header>
              <img className="rounded me-2" alt="" />
            </Toast.Header>
            <Toast.Body>{loginStatus}</Toast.Body>
          </Toast>
        </Form>
      </div>
    </div>
  );
};

export default Login;
