import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Inicio = () => {
  const [user, setUser] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    Axios.defaults.withCredentials = true;
    Axios.get("http://localhost:3000/testeoLogin")
      .then((response) => {
        if (response.data.logIn) {
          setUser(response.data.user.username);
          console.log(response.data);
        } else {
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return <div>pantalla de bienvenidA HOLAAAA {user}</div>;
};
