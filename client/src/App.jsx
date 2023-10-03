import { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";

function App() {
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [pais, setPais] = useState([]);
  const [nro_docu, setNro_docu] = useState("");
  const [tipo_docu, setTipo_docu] = useState([]);
  const [civil, setCivil] = useState([]);
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [l_naci, setL_naci] = useState("");
  const [f_naci, setF_naci] = useState("");
  const [transporte, setTransporte] = useState("");
  const [distancia, setDistancia] = useState("");
  const [tiempo, setTiempo] = useState("");

  const [selectedpais, setSelectedpais] = useState("");
  useEffect(() => {
    Axios.get("http://localhost:3000/server/paises").then((response) => {
      setPais(response.data);
    });
  }, []);
  const handle_paischange = (e) => {
    setSelectedpais(e.target.value);
  };

  const [selectedcivil, setSelectedcivil] = useState("");
  useEffect(() => {
    Axios.get("http://localhost:3000/server/civil").then(
      (response) => {
        setCivil(response.data);
      }
    );
  }, []);
  const handle_civilchange = (e) => {
    setSelectedcivil(e.target.value);
  };

  const [selecteddocu, setSelecteddocu] = useState("");
  useEffect(() => {
    Axios.get("http://localhost:3000/server/documento_tipo").then(
      (response) => {
        setTipo_docu(response.data);
      }
    );
  }, []);
  const handle_docuchange = (e) => {
    setSelecteddocu(e.target.value);
  };

  const addAlumno = () => {
    Axios.post("http://localhost:3000/createAlumno", {
      nombre: nombre,
      apellidos: apellidos,
      pais: pais,
      nro_docu: nro_docu,
      tipo_docu: tipo_docu,
      civil: civil,
      telefono: telefono,
      correo: correo,
      l_naci: l_naci,
      f_naci: f_naci,
      transporte: transporte,
      distancia: distancia,
      tiempo: tiempo,
    }).then(() => {
      alert("Alumno Registrado");
    });
  };
  return (
    <>
      <div className="datos">
        <label>
          Nombres:{" "}
          <input
            onChange={(event) => {
              setNombre(event.target.value);
            }}
            type="text"
            name="nombre"
            id="nombre"
          />
        </label>{" "}
        <label>
          Apellidos:{" "}
          <input
            onChange={(event) => {
              setApellidos(event.target.value);
            }}
            type="text"
            name="apellido"
            id="apellido"
          />
        </label>{" "}
        <label>
          Selecciona un País:
          <select value={selectedpais} onChange={handle_paischange}>
            <option value="">Elige un pais</option>
            {pais.map((pais) => (
              <option key={pais.idNacionalidad} value={pais.idNacionalidad}>
                {pais.Descripcion}
              </option>
            ))}
          </select>
        </label>
        <label>
          Número de Documento:{" "}
          <input
            onChange={(event) => {
              setNro_docu(event.target.value);
            }}
            type="number"
            name="documento"
            id="documento"
          />
        </label>{" "}
        <label>
          Tipo de documento:
          <select value={selecteddocu} onChange={handle_docuchange}>
            <option value="">Elige un tipo de documento</option>
            {tipo_docu.map((tipo_docu) => (
              <option key={tipo_docu.idDocumento} value={tipo_docu.idDocumento}>
                {tipo_docu.Tipo_docu}
              </option>
            ))}
          </select>
        </label>
        <label>
          Estado Civil:{" "}
          <select value={selectedcivil} onChange={handle_civilchange}>
            <option value="">Elige el estado civil</option>
            {civil.map((civil) => (
              <option key={civil.idEstado_civil} value={civil.idEstado_civil}>
                {civil.Descripcion}
              </option>
            ))}
          </select>
        </label>{" "}
        <label>
          Número de telefono:{" "}
          <input
            onChange={(event) => {
              setTelefono(event.target.value);
            }}
            type="number"
            name=""
            id=""
          />
        </label>{" "}
        <label>
          Correo:{" "}
          <input
            onChange={(event) => {
              setCorreo(event.target.value);
            }}
            type="email"
            name=""
            id=""
          />
        </label>{" "}
        <label>
          Lugar de Nacimiento:{" "}
          <input
            onChange={(event) => {
              setL_naci(event.target.value);
            }}
            type="text"
            name=""
            id=""
          />
        </label>{" "}
        <label>
          Fecha de Nacimiento:{" "}
          <input
            onChange={(event) => {
              setF_naci(event.target.value);
            }}
            type="date"
            name=""
            id=""
          />
        </label>{" "}
        <label>
          Medio de Transporte:{" "}
          <select
            onChange={(event) => {
              setTransporte(event.target.value);
            }}
            name=""
            id=""
          >
            <option value="auto">Automóvil</option>
            <option value="camina">Caminando</option>
            <option value="moto">Motocicleta</option>
            <option value="carreta">Carreta</option>
            <option value="bus">Colectivo</option>
            <option value="bicicleta">Bicicleta</option>
          </select>
        </label>{" "}
        <label>
          Distancia para llegar a la Institución:{" "}
          <input
            onChange={(event) => {
              setDistancia(event.target.value);
            }}
            type="number"
            name=""
            id=""
          />
        </label>
        <label>
          Tiempo en llegar a la Institución:{" "}
          <input
            onChange={(event) => {
              setTiempo(event.target.value);
            }}
            type="number"
            name=""
            id=""
          />
        </label>
        <button onClick={addAlumno}>Guardar</button>
      </div>
    </>
  );
}

export default App;
