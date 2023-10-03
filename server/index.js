const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root123",
  database: "proyecto_db",
});

db.connect(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("conectao pa");
  }
});

app.get("/server/paises", (req, res) => {
  const datos_paises = "SELECT * FROM nacionalidad";
  db.query(datos_paises, (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result);
  });
});

app.get("/server/documento_tipo", (req, res) => {
  const datos_docu = "SELECT * FROM documento";
  db.query(datos_docu, (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result);
  });
});


app.get("/server/civil", (req, res) => {
  const civil = "SELECT * FROM estado_civil";
  db.query(civil, (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result);
  });
});

app.post("/createAlumno", (req, res) => {
  const nombre = req.body.nombre;
  const apellidos = req.body.apellidos;
  const pais = req.body.pais;
  const nro_docu = req.body.nro_docu;
  const tipo_docu = req.body.tipo_docu;
  const civil = req.body.civil;
  const telefono = req.body.telefono;
  const correo = req.body.correo;
  const l_naci = req.body.l_naci;
  const f_naci = req.body.f_naci;
  const transporte = req.body.transporte;
  const distancia = req.body.distancia;
  const tiempo = req.body.tiempo;
  db.query(
    "INSERT INTO alumnos (Nombre,Apellido,Numero_docu,Numero_telefono,Lugar_nacimiento,Fecha_nacimiento, Correo) VALUES (?,?,?,?,?,?,?)",
    [nombre, apellidos, nro_docu, telefono, l_naci, f_naci, correo],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Funciono!!!");
      }
    }
  );
});

app.listen(3000, () => {
  console.log("Funca puerto 3000");
});
