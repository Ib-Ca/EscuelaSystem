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
  const [transporte, setTransporte] = useState("Automóvil");
  const [distancia, setDistancia] = useState("");
  const [tiempo, setTiempo] = useState("");
  const [alumnos, setAlumnos] = useState([]);



  const [selectedpais, setSelectedpais] = useState("");
  //obtener paises de db
  useEffect(() => {
    Axios.get("http://localhost:3000/server/paises").then((response) => {
      setPais(response.data);
      const paisPredeterminado = response.data.find(
        (option) => option.idNacionalidad === 14
      );
      if (paisPredeterminado) {
        setSelectedpais(paisPredeterminado.idNacionalidad.toString());
      }
    });
  }, []);
  //cambiar pais en select
  const handle_paischange = (e) => {
    setSelectedpais(e.target.value);
  };

  //obtener estado civil db
  const [selectedcivil, setSelectedcivil] = useState("");
  useEffect(() => {
    Axios.get("http://localhost:3000/server/civil").then((response) => {
      setCivil(response.data);
      const civilpredeterminado = response.data.find(
        (option) => option.idEstado_civil === 1
      );
      if (civilpredeterminado) {
        setSelectedcivil(civilpredeterminado.idEstado_civil.toString());
      }
    });
  }, []);

  //cambiar civil en select
  const handle_civilchange = (e) => {
    setSelectedcivil(e.target.value);
  };

  //obtener tipos de documento db
  const [selecteddocu, setSelecteddocu] = useState("");
  useEffect(() => {
    Axios.get("http://localhost:3000/server/documento_tipo").then(
      (response) => {
        setTipo_docu(response.data);
        const tipodocu_predeterminado = response.data.find(
          (option) => option.idDocumento === 1
        );
        if (tipodocu_predeterminado) {
          setSelecteddocu(tipodocu_predeterminado.idDocumento.toString());
        }
      }
    );
  }, []);

  //cambiar documento en select
  const handle_docuchange = (e) => {
    setSelecteddocu(e.target.value);
  };

  const addAlumno = () => {
    //alert("presiono boton")
    console.log("presion boton")
    Axios.post("http://localhost:3000/createAlumno", {
      nombre: nombre,
      apellidos: apellidos,
      pais: selectedpais,
      nro_docu: nro_docu,
      tipo_docu: selecteddocu,
      civil: selectedcivil,
      telefono: telefono,
      correo: correo,
      l_naci: l_naci,
      f_naci: f_naci,
      transporte: transporte,
      distancia: distancia,
      tiempo: tiempo,
    })
    .then(function (response) {
      listaAlumnos();
      console.log("entro en then: ", response);
      alert("Alumno Registrado");
    })
    .catch(function (error) {
      console.log("Error en axios: ", error);
      alert("hubo un error");
    });
};

  const listaAlumnos = () => {
    Axios.get("http://localhost:3000/server/alumnos")
      .then((response) => {
        setAlumnos(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener alumnos:", error);
      });
  };

  useEffect(() => {
    listaAlumnos;
  }, []);

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
            value={transporte}
          >
            <option value="Automóvil">Automóvil</option>
            <option value="Caminando">Caminando</option>
            <option value="Motocicleta">Motocicleta</option>
            <option value="Carreta">Carreta</option>
            <option value="Colectivo">Colectivo</option>
            <option value="Bicicleta">Bicicleta</option>
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
      <div className="alumnos_lisa">
        <button onClick={listaAlumnos}>Mostrar Alumnos</button>
        {alumnos.map((value, key) => {
          return (
            <div key={key} className="">
              {value.Nombre}
            </div>
          );
        })}
      </div>
  
    </>
  );
}

export default App;
