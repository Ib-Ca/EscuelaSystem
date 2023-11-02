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
  let idCivil;
  let idTipodocu;
  let idPais;
  let idMovilidad;
  let idestado = 1;
  //query movilidad insert e id
  db.query(
    "INSERT INTO movilidad (descripcion, distancia, tiempo) VALUES (?,?,?)",
    [transporte, distancia, tiempo],
    function (err, result) {
      if (err) {
        console.log(err);
        return res.status(500).send("Error en movilidades");
      } else {
        idMovilidad = result.insertId;
        console.log("ID de movilidad:", idMovilidad);
      }
      //query nacionalidad id
      db.query(
        "SELECT idNacionalidad, Descripcion FROM nacionalidad WHERE idNacionalidad=?",
        [pais],
        function (err, result) {
          if (err) {
            console.log(err);
            return res.status(500).send("Error en paises");
          } else {
            if (result && result.length > 0) {
              idPais = result[0].idNacionalidad;
              //const nombre = result[0].Descripcion;
              console.log("ID de pais: ", idPais);
              //console.log("nombre de pais: ", nombre);
            } else {
              console.log("no se encontro na en paises");
            }
          }
          //query documento id
          db.query(
            "SELECT idDocumento, Tipo_docu FROM documento WHERE idDocumento=?",
            [tipo_docu],
            function (err, result) {
              if (err) {
                console.log(err);
                return res.status(500).send("Error en tipo documento");
              } else {
                if (result && result.length > 0) {
                  idTipodocu = result[0].idDocumento;
                  //const nombredocu = result[0].Tipo_docu;
                  console.log("id docu: ", idTipodocu);
                  //console.log("nombre docutipo: ", nombredocu);
                } else {
                  console.log("no se encontro coincidencia en tipo documento");
                }
              }
              //query estado civil id
              db.query(
                "SELECT idEstado_civil, Descripcion FROM estado_civil WHERE idEstado_civil=?",
                [civil],
                function (err, result) {
                  if (err) {
                    console.log(err);
                    return res.status(500).send("Error en estado civil");
                  } else {
                    if (result && result.length > 0) {
                      idCivil = result[0].idEstado_civil;
                      //const nombrecivil = result[0].Descripcion;
                      console.log("id estado civil: ", idCivil);
                      //console.log("nombre de estado civil: ", nombrecivil);
                    } else {
                      console.log(
                        "No se encontro coincidencias en estado civil"
                      );
                    }
                  }
                  //query insertar alumno
                  db.query(
                    "INSERT INTO alumnos (Nombre,Apellido,Numero_docu,Numero_telefono,Lugar_nacimiento,Fecha_nacimiento,Correo,Estado_civil_idEstado_civil,Documento_idDocumento,Nacionalidad_idNacionalidad,Estado_alumno_idEstado_alumno,Movilidad_idMovilidad) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
                    [
                      nombre,
                      apellidos,
                      nro_docu,
                      telefono,
                      l_naci,
                      f_naci,
                      correo,
                      idCivil,
                      idTipodocu,
                      idPais,
                      idestado,
                      idMovilidad,
                    ],
                    function (err, result) {
                      if (err) {
                        console.log(err);
                        return res
                          .status(500)
                          .send("Error en ingreso de alumno");
                      } else {
                        const idAlumno = result.insertId;
                        console.log("El id del alumno es: ", idAlumno);
                        return res
                          .status(200)
                          .send("Alumno registrado con éxito");
                      }
                      //
                    }
                  );
                }
              );
            }
          );
        }
      );
    }
  );
});

app.get("/server/alumnos", (req, res) => {
  const datos_alumnos =
    "SELECT *, DATE_FORMAT(Fecha_nacimiento, '%Y-%m-%d') AS Fecha_nacimiento FROM alumnos";
  db.query(datos_alumnos, (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result);
  });
});

//SACAR DATOS DE LA TABLA MOVILIDAD

app.listen(3000, () => {
  console.log("Funca puerto 3000");
});
