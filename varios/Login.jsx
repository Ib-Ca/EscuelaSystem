import React, { useState } from "react";
export const Login = () => {
  const [documento, setDocumento] = useState("");
  const [pass, setPass] = useState("");
  const [opciones, setopciones] = useState("Cédula");
  const enviar_datos = (e) => {
    e.preventDefault();
    console.log(documento, opciones);
  };
  return (
    <div className="login_form_container">
      <form className="form_login" onSubmit={enviar_datos}>
        <label htmlFor="documento">Número de Documento</label>
        <input
          value={documento}
          onChange={(e) => setDocumento(e.target.value)}
          type="number"
          placeholder="Número de Documento"
          id="documento"
          name="documento"
        ></input>

        <label htmlFor="tipo_cedula">Tipo de Documento</label>
        <select
          name="tipo_cedula"
          value={opciones}
          id="tipo_cedula"
          onChange={(e) => {
            const elegido = e.target.value;
            setopciones(elegido);
          }}
        >
          <option value="cedula">Cédula</option>
          <option value="dni">DNI</option>
          <option value="otro">Otro</option>
        </select>

        <label htmlFor="password">Contraseña</label>
        <input
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          type="password"
          placeholder="********"
          id="password"
          name="password"
        ></input>
        <button type="submit">Ingresar</button>
      </form>

      <button>Ir a Registrar</button>
    </div>
  );
};
