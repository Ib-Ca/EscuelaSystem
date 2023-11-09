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

app.get("/server/movilidad", (req, res) => {
  const datos_movilidad = "SELECT * FROM movilidad";
  db.query(datos_movilidad, (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result);
  });
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
  const tipo_movi = req.body.tipo_movi;
  const tiempo = req.body.tiempo;
  const distancia = req.body.distancia;
  let idCivil;
  let idTipodocu;
  let idPais;
  let idMovilidad;
  let idestado = 1;
  console.log("civil es: ", civil);
  //query movilidad insert e id
  db.query(
    "SELECT  idMovilidad FROM movilidad WHERE idMovilidad=?",
    [tipo_movi],
    function (err, result) {
      if (err) {
        console.log(err);
        return res.status(500).send("Error en movilidades");
      } else {
        if (result && result.length > 0) {
          idMovilidad = result[0].idMovilidad;
          //const nombre = result[0].Descripcion;
          console.log("ID de movilidad: ", idMovilidad);
          //console.log("nombre de pais: ", nombre);
        } else {
          console.log("no se encontro na en movilidades");
        }
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
                    "INSERT INTO alumnos (Nombre, Apellido, Numero_docu, Numero_telefono, Lugar_nacimiento, Fecha_nacimiento, Correo, Estado_civil_idEstado_civil, Documento_idDocumento, Nacionalidad_idNacionalidad, Estado_alumno_idEstado_alumno, Movilidad_idMovilidad, tiempo, distancia) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
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
                      tiempo,
                      distancia,
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

app.put("/updateAlumno", (req, res) => {
  const idAlumno = req.body.idAlumno;
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
  const tipo_movi = req.body.tipo_movi;
  const tiempo = req.body.tiempo;
  const distancia = req.body.distancia;
  let idCivil;
  let idTipodocu;
  let idPais;
  let idMovilidad;
  let idestado = 1;
  console.log("civil es: ", civil);
  //query movilidad insert e id
  db.query(
    "SELECT  idMovilidad FROM movilidad WHERE idMovilidad=?",
    [tipo_movi],
    function (err, result) {
      if (err) {
        console.log(err);
        return res.status(500).send("Error en movilidades");
      } else {
        if (result && result.length > 0) {
          idMovilidad = result[0].idMovilidad;
          //const nombre = result[0].Descripcion;
          console.log("ID de movilidad: ", idMovilidad);
          //console.log("nombre de pais: ", nombre);
        } else {
          console.log("no se encontro na en movilidades");
        }
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
                    "UPDATE alumnos SET Nombre = ?, Apellido = ?, Numero_docu = ?, Numero_telefono = ?, Lugar_nacimiento = ?, Fecha_nacimiento = ?, Correo = ?, Estado_civil_idEstado_civil = ?, Documento_idDocumento = ?, Nacionalidad_idNacionalidad = ?, Estado_alumno_idEstado_alumno = ?, Movilidad_idMovilidad = ?, tiempo = ?, distancia = ? WHERE idAlumnos = ?",
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
                      tiempo,
                      distancia,
                      idAlumno, // ¡Asegúrate de tener el ID del alumno aquí!
                    ],
                    function (err, result) {
                      if (err) {
                        console.log(err);
                        return res
                          .status(500)
                          .send("Error en actualización de alumno");
                      } else {
                        console.log("El alumno se ha actualizado con éxito");
                        return res
                          .status(200)
                          .send("Alumno actualizado con éxito");
                      }
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

app.delete("/deleteAlumno/:idAlumno", (req, res) => {
  const idAlumno = req.params.idAlumno;
  const query = "DELETE FROM alumnos WHERE idAlumnos = ?";
  db.query(query, idAlumno, (err, result) => {
    if (err) {
      console.error("Error al eliminar el alumno:", err);
      return res.status(500).send("Error al eliminar el alumno");
    }
    return res
      .status(200)
      .send(`Alumno con ID ${idAlumno} eliminado correctamente`);
  });
});

app.post("/createMateria", (req, res) => {
  const materia = req.body.materia;
  const carga = req.body.carga;
  db.query(
    "INSERT INTO materias(Nombre, Carga_horaria) VALUES (?,?)",
    [materia, carga],
    function (err, result) {
      if (err) {
        console.log(err);
        return res.status(500).send("Error en el ingreso de materia");
      } else {
        return res.status(200).send("Materia guardada");
      }
    }
  );
});

app.get("/server/materia", (req, res) => {
  const datos_materia = "SELECT * FROM materias";
  db.query(datos_materia, (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result);
  });
});

app.put("/updateMateria", (req, res) => {
  const idMaterias = req.body.idMaterias;
  const materia = req.body.materia;
  const carga = req.body.carga;
  console.log("la id es: ",idMaterias);
  console.log(materia);
  console.log(carga);
  db.query(
    "UPDATE materias SET Nombre=?, Carga_horaria=? WHERE idMaterias=?",
    [materia, carga, idMaterias],
    function (err, result) {
      if (err) {
        console.log(err);
        return res.status(500).send("Error en la actualizacion de la materia");
      } else {
        console.log("Actualizado con exito");
        return res.status(200).send("Alumno actualizado con exito");
      }
    }
  );
});

app.listen(3000, () => {
  console.log("Funca puerto 3000");
});
