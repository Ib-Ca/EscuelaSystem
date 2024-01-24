import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Axios from "axios";

function CambiarPass({ User }) {
  Axios.defaults.withCredentials = true;
  const { username } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //check url y user log
  useEffect(() => {
    if (!(User && User.user.username === username)) {
      navigate("/home");
    }
  }, [User, username, navigate]);
  const handle = () => {
    if (password === confirmPassword) {
      Axios.put("http://localhost:3000/server/changePass", {
        idUsuario: User.user.idusuario,
        password: password,
      }).then((response) => {
        if (response.data.message) {
          alert("Actualizado con éxito");
          navigate("/home");
          navigate(0);
        } else {
          alert("Intentelo de nuevo");
          //console.log("Inicio de sesión fallido");
        }
      });
    } else {
      alert("Las contraseñas no coinciden");
    }
  };

  return User && User.user.username === username ? (
    <>
      <div className={styles.clase}>
        <div className={styles.LoginContainer}>
          <div className={styles.LoginHeadline}>
            <h2>Cambiar Contraseña</h2>
          </div>
          <Form>
            <Form.Group md="4" controlId="password">
              <FloatingLabel
                controlId="passwordinput"
                label="Contraseña"
                className="mb-3"
              >
                <Form.Control
                  className={styles.TextInput}
                  required
                  type="password"
                  value={password}
                  maxLength={45}
                  placeholder="Contraseña"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group md="4" controlId="confirmpassword">
              <FloatingLabel
                controlId="passinput"
                label="Confirme Contraseña"
                className="mb-3"
              >
                <Form.Control
                  className={styles.TextInput}
                  required
                  type="password"
                  placeholder="Confirme Contraseña"
                  value={confirmPassword}
                  maxLength={45}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                />
              </FloatingLabel>
            </Form.Group>
            <Button onClick={handle} variant="success" className={styles.Boton}>
              Cambiar
            </Button>
          </Form>
        </div>
      </div>
    </>
  ) : null;
}

export default CambiarPass;
