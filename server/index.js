const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "userId",
    secret: "Hx~x.uLLtxNctssF1RShbferV-LVnn",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24 * 1000,
    },
  })
);

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

//obtener movilidadeds
app.get("/server/movilidad", (req, res) => {
  const datos_movilidad = "SELECT * FROM movilidad";
  db.query(datos_movilidad, (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result);
  });
});

//obtener paises
app.get("/server/paises", (req, res) => {
  const datos_paises = "SELECT * FROM nacionalidad";
  db.query(datos_paises, (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result);
  });
});

//obtener tipo de documento
app.get("/server/documento_tipo", (req, res) => {
  const datos_docu = "SELECT * FROM documento";
  db.query(datos_docu, (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result);
  });
});

//obtener estado civil
app.get("/server/civil", (req, res) => {
  const civil = "SELECT * FROM estado_civil";
  db.query(civil, (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result);
  });
});

//crear alumnos
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
                        return res.status(200).json({
                          message: "Alumno registrado con éxito",
                          alumnoCreado: true,
                          idAlumno: idAlumno,
                        });
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

//obtener alumnos
app.get("/server/alumnos", (req, res) => {
  const datos_alumnos = `
    SELECT a.*, s.Nombre AS NombreSemestre, DATE_FORMAT(a.Fecha_nacimiento, '%Y-%m-%d') AS Fecha_nacimiento
    FROM alumnos a
    LEFT JOIN semestre s ON a.Semestre_idSemestre = s.idSemestre
  `;
  db.query(datos_alumnos, (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result);
  });
});

//actualizar alumno
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

//query borrar alumno
app.delete("/deleteAlumno/:idAlumno", (req, res) => {
  const idAlumno = req.params.idAlumno;
  //eliminar usuario primero para que no salte error por foranea
  const deleteUsuarioQuery = "DELETE FROM usuario WHERE Alumnos_idAlumnos = ?";
  db.query(deleteUsuarioQuery, idAlumno, (errUsuario, resultUsuario) => {
    if (errUsuario) {
      console.error("Error al eliminar usuario:", errUsuario);
      return res.status(500).send("Error al eliminar usuario");
    }
    //delete user
    const deleteAlumnoQuery = "DELETE FROM alumnos WHERE idAlumnos = ?";
    db.query(deleteAlumnoQuery, idAlumno, (errAlumno, resultAlumno) => {
      if (errAlumno) {
        console.error("Error al eliminar el alumno:", errAlumno);
        return res.status(500).send("Error al eliminar el alumno");
      }
      return res
        .status(200)
        .send(`Alumno con ID ${idAlumno} eliminado correctamente`);
    });
  });
});

//query crear materia
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

//query obtener materias
app.get("/server/materia", (req, res) => {
  const datos_materia = "SELECT * FROM materias";
  db.query(datos_materia, (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result);
  });
});

//query actualizar materias
app.put("/updateMateria", (req, res) => {
  const idMaterias = req.body.idMaterias;
  const materia = req.body.materia;
  const carga = req.body.carga;
  console.log("la id es: ", idMaterias);
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

//borrar materia
app.delete("/deleteMateria/:idMaterias", (req, res) => {
  const idMaterias = req.params.idMaterias;
  const query = "DELETE FROM materias WHERE idMaterias = ?";
  db.query(query, idMaterias, (err, result) => {
    if (err) {
      console.error("Error al eliminar la materia:", err);
      return res.status(500).send("Error al eliminar la materia");
    }
    return res
      .status(200)
      .send(`Alumno con ID ${idMaterias} eliminado correctamente`);
  });
});

//crear profesor
app.post("/createProfesor", (req, res) => {
  const nombre = req.body.nombre;
  const apellidos = req.body.apellidos;
  const pais = req.body.pais;
  const nro_docu = req.body.nro_docu;
  const tipo_docu = req.body.tipo_docu;
  const civil = req.body.civil;
  const telefono = req.body.telefono;
  const correo = req.body.correo;
  let idCivil;
  let idTipodocu;
  let idPais;
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
                  console.log("No se encontro coincidencias en estado civil");
                }
              }
              //query insertar profesor
              db.query(
                "INSERT INTO profesores (Nombre, Apellido, Correo, Numero_telefono, Numero_docu, Estado_civil_idEstado_civil, Nacionalidad_idNacionalidad, Documento_idDocumento) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                [
                  nombre,
                  apellidos,
                  correo,
                  telefono,
                  nro_docu,
                  idCivil,
                  idPais,
                  idTipodocu,
                ],
                function (err, result) {
                  if (err) {
                    console.log(err);
                    return res.status(500).send("Error en ingreso de Profesor");
                  } else {
                    const idProfesor = result.insertId;
                    console.log("El id del profesor es: ", idProfesor);
                    return res.status(200).json({
                      profeCreado: true,
                      idProfesor: idProfesor,
                    });
                  }
                }
              );
            }
          );
        }
      );
    }
  );
});

//obtener profes
app.get("/server/profesores", (req, res) => {
  const datos_profesores = "SELECT * FROM profesores";
  db.query(datos_profesores, (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result);
  });
});

//borrar profe
app.delete("/deleteProfe/:idProfesores", (req, res) => {
  const idProfesores = req.params.idProfesores;
  const getUsuarioIdQuery =
    "SELECT usuario_idusuario FROM profesores WHERE idProfesores = ?";
  db.query(getUsuarioIdQuery, idProfesores, (err, result) => {
    if (err) {
      console.error("Error al obtener el usuario_idusuario:", err);
      return res.status(500).send("Error al eliminar el profesor y su usuario");
    }
    const usuarioId = result[0].usuario_idusuario;
    // Eliminar el profesor
    const deleteProfeQuery = "DELETE FROM profesores WHERE idProfesores = ?";
    db.query(deleteProfeQuery, idProfesores, (err, result) => {
      if (err) {
        console.error("Error al eliminar el profesor:", err);
        return res
          .status(500)
          .send("Error al eliminar el profesor y su usuario");
      }
      // Si se encuentra un usuario asociado, eliminarlo
      if (usuarioId) {
        const deleteUsuarioQuery = "DELETE FROM usuario WHERE idusuario = ?";
        db.query(deleteUsuarioQuery, usuarioId, (err, result) => {
          if (err) {
            console.error("Error al eliminar el usuario:", err);
            return res.status(500).send("Error al eliminar el usuario");
          }

          return res
            .status(200)
            .send(
              `Profesor con ID ${idProfesores} y su usuario eliminados correctamente`
            );
        });
      } else {
        return res
          .status(200)
          .send(`Profesor con ID ${idProfesores} eliminado correctamente`);
      }
    });
  });
});

//actualizar profe
app.put("/updateProfe", (req, res) => {
  const idProfesores = req.body.idProfesores;
  const nombre = req.body.nombre;
  const apellidos = req.body.apellidos;
  const pais = req.body.pais;
  const nro_docu = req.body.nro_docu;
  const tipo_docu = req.body.tipo_docu;
  const civil = req.body.civil;
  const telefono = req.body.telefono;
  const correo = req.body.correo;
  let idCivil;
  let idTipodocu;
  let idPais;
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
                  console.log("No se encontro coincidencias en estado civil");
                }
              }
              //query insertar alumno
              db.query(
                "UPDATE profesores SET Nombre = ?, Apellido = ?, Correo = ?,  Numero_telefono = ?,Numero_docu = ?, Estado_civil_idEstado_civil = ?,Nacionalidad_idNacionalidad = ?, Documento_idDocumento = ? WHERE idProfesores = ?",
                [
                  nombre,
                  apellidos,
                  correo,
                  telefono,
                  nro_docu,
                  idCivil,
                  idPais,
                  idTipodocu,
                  idProfesores,
                ],
                function (err, result) {
                  if (err) {
                    console.log(err);
                    return res
                      .status(500)
                      .send("Error en actualización de profesor");
                  } else {
                    console.log("El profesor se ha actualizado con éxito");
                    return res
                      .status(200)
                      .send("Profesor actualizado con éxito");
                  }
                }
              );
            }
          );
        }
      );
    }
  );
});

//query obtener secciones
app.get("/server/secciones", (req, res) => {
  const datos_seccion = "SELECT * FROM seccion";
  db.query(datos_seccion, (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result);
  });
});

//crear semestre
app.post("/createSemestre", (req, res) => {
  const { nombre, seccion, materia, profesor } = req.body;
  // Obtener el ID de la materia
  const materiaIdQuery = "SELECT idMaterias FROM materias WHERE Nombre = ?";
  db.query(materiaIdQuery, [materia], (err, materiaIdRows) => {
    if (err) {
      console.error("Error al obtener el ID de la materia:", err);
      return res.status(500).send("Error interno del servidor");
    }
    const materiaId = materiaIdRows[0].idMaterias;
    // Obtener el ID del profesor
    const profesorIdQuery =
      "SELECT idProfesores FROM profesores WHERE Nombre = ?";
    db.query(profesorIdQuery, [profesor], (err, profesorIdRows) => {
      if (err) {
        console.error("Error al obtener el ID del profesor:", err);
        return res.status(500).send("Error interno del servidor");
      }
      if (!profesorIdRows || profesorIdRows.length === 0) {
        console.error(
          "No se encontraron resultados para el profesor:",
          profesor
        );
        return res.status(500).send("Error interno del servidor");
      }
      const profesorId = profesorIdRows[0].idProfesores;
      // id seccion
      const seccionId = seccion;
      // Insertar datos
      const sql =
        "INSERT INTO semestre (Nombre, Seccion_idSeccion, Materias_idMaterias, Profesores_idProfesores) VALUES (?, ?, ?, ?)";
      db.query(sql, [nombre, seccionId, materiaId, profesorId], (err) => {
        if (err) {
          console.error("Error:", err);
          return res.status(500).send("Error interno del servidor");
        }
        //console.log("Datos insertados");
        res.status(200).send("Datos insertados correctamente");
      });
    });
  });
});

//obtener semestres
app.get("/server/semestres", (req, res) => {
  const datos_semestres =
    "SELECT idSemestre, Nombre, Seccion_idSeccion, Materias_idMaterias, Profesores_idProfesores FROM semestre";
  db.query(datos_semestres, (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result);
  });
});

//obtener semestres para editar
app.get("/editSemestre/:Nombre", (req, res) => {
  const nombreSemestre = req.params.Nombre;

  const consulta = `
    SELECT 
        s.idSemestre,
        s.Nombre,
        s.Seccion_idSeccion,
        sec.descripcion AS SeccionDescripcion,
        s.Materias_idMaterias,
        mat.Nombre AS MateriaNombre,
        mat.Carga_horaria AS CargaHoraria,
        s.Profesores_idProfesores,
        prof.Nombre AS ProfesorNombre,
        prof.Apellido AS ProfesorApellido
    FROM 
        semestre s
    JOIN 
        seccion sec ON s.Seccion_idSeccion = sec.idSeccion
    JOIN 
        materias mat ON s.Materias_idMaterias = mat.idMaterias
    JOIN 
        profesores prof ON s.Profesores_idProfesores = prof.idProfesores
    WHERE 
        s.Nombre = ?;
  `;
  db.query(consulta, [nombreSemestre], (err, result) => {
    if (err) {
      console.error("Error al obtener el semestre:", err);
      res.status(500).send("Error interno del servidor");
      return;
    }

    res.json(result);
  });
});

//edicion de materia y profe en semestre
app.put("/completeEditSemestre", (req, res) => {
  const updatedInfo = req.body.updatedInfo;
  const queryPromises = [];

  updatedInfo.forEach((data) => {
    const queryPromise = new Promise((resolve, reject) => {
      if (data.idSemestre) {
        // Si hay idSemestre, es una actualización
        const updateQuery = `
          UPDATE semestre
          SET
            Materias_idMaterias = ${data.Materias_idMaterias},
            Profesores_idProfesores = ${data.Profesores_idProfesores}
          WHERE idSemestre = ${data.idSemestre}
          AND Seccion_idSeccion = (SELECT idSeccion FROM seccion WHERE descripcion = '${data.SeccionDescripcion}');
        `;

        db.query(updateQuery, (err, results) => {
          if (err) {
            console.error(
              "Error al ejecutar la consulta de actualización:",
              err
            );
            reject(err);
          } else {
            resolve(results);
          }
        });
      } else {
        // No hay idSemestre, es agregar o eliminar
        // Verificar si existe materia y profesor
        const checkExistingQuery = `
          SELECT * FROM semestre
          WHERE Seccion_idSeccion = (SELECT idSeccion FROM seccion WHERE descripcion = '${data.SeccionDescripcion}')
          AND Materias_idMaterias = ${data.Materias_idMaterias}
          AND Profesores_idProfesores = ${data.Profesores_idProfesores};
        `;

        db.query(checkExistingQuery, (err, existingResults) => {
          if (err) {
            console.error("Error al verificar existencia:", err);
            reject(err);
          } else {
            if (existingResults.length > 0) {
              // Combinación de Sección, Materia y Profesor ya existe
              console.error(
                "La combinación de Sección, Materia y Profesor ya existe en la base de datos."
              );
              reject(
                new Error(
                  "La combinación de Sección, Materia y Profesor ya existe en la base de datos."
                )
              );
            } else {
              // No existe, se guarda
              const insertQuery = `
                INSERT INTO semestre (Nombre, Seccion_idSeccion, Materias_idMaterias, Profesores_idProfesores)
                VALUES ('${data.Nombre}', (SELECT idSeccion FROM seccion WHERE descripcion = '${data.SeccionDescripcion}'), ${data.Materias_idMaterias}, ${data.Profesores_idProfesores});
              `;

              db.query(insertQuery, (err, results) => {
                if (err) {
                  console.error(
                    "Error al ejecutar la consulta de adición:",
                    err
                  );
                  reject(err);
                } else {
                  resolve(results);
                }
              });
            }
          }
        });
      }
    });

    queryPromises.push(queryPromise);
  });

  // Eliminar filas con el botón eliminar
  const deleteQuery = `
    DELETE FROM semestre
    WHERE Seccion_idSeccion = (SELECT idSeccion FROM seccion WHERE descripcion = '${
      updatedInfo[0].SeccionDescripcion
    }')
    AND idSemestre NOT IN (${updatedInfo
      .filter((data) => data.idSemestre)
      .map((data) => data.idSemestre)
      .join(",")});
  `;

  db.query(deleteQuery, (err, results) => {
    if (err) {
      console.error("Error al ejecutar la consulta de eliminación:", err);
      res.status(500).json({ error: "Error al ejecutar la consulta" });
    } else {
      Promise.all(queryPromises)
        .then(() => {
          res.status(200).json({ message: "Cambios guardados con éxito" });
        })
        .catch((error) => {
          res.status(500).json({ error: "Error al ejecutar la consulta" });
        });
    }
  });
});

//insertar el semestre y seccion correspondiente a alumno
app.put("/inputSemestreAlumno", (req, res) => {
  const { idsAlumnos, semestre, seccion } = req.body;
  //id seccion
  const seccionQuery = `
    SELECT idSeccion
    FROM seccion
    WHERE descripcion = '${seccion}';
  `;
  db.query(seccionQuery, (err, seccionResults) => {
    if (err) {
      console.error("Error al obtener la ID de la sección:", err);
      return res
        .status(500)
        .json({ error: "Error al actualizar los registros" });
    }
    const seccionId = seccionResults[0].idSeccion;
    //id semestre
    const semestreQuery = `
      SELECT idSemestre
      FROM semestre
      WHERE Nombre = '${semestre}' AND Seccion_idSeccion = ${seccionId};
    `;
    db.query(semestreQuery, (err, semestreResults) => {
      if (err) {
        console.error("Error al obtener la ID del semestre:", err);
        return res
          .status(500)
          .json({ error: "Error al actualizar los registros" });
      }
      const semestreId = semestreResults[0].idSemestre;
      //actualizar alumno
      const updateQueries = idsAlumnos.map((idAlumno) => {
        return `
          UPDATE alumnos
          SET Semestre_idSemestre = ${semestreId},
              Seccion = '${seccion}'
          WHERE idAlumnos = ${idAlumno};
        `;
      });
      db.beginTransaction((err) => {
        if (err) {
          console.error("Error al iniciar la transacción:", err);
          return res
            .status(500)
            .json({ error: "Error al actualizar los registros" });
        }
        updateQueries.forEach((query) => {
          db.query(query, (err) => {
            if (err) {
              return db.rollback(() => {
                console.error("Error al ejecutar la consulta:", err);
                res
                  .status(500)
                  .json({ error: "Error al actualizar los registros" });
              });
            }
          });
        });
        db.commit((err) => {
          if (err) {
            return db.rollback(() => {
              console.error("Error al hacer commit de la transacción:", err);
              res
                .status(500)
                .json({ error: "Error al actualizar los registros" });
            });
          }
          console.log("Registros actualizados con éxito");
          res.status(200).json({
            success: true,
            message: "Registros actualizados con éxito",
          });
        });
      });
    });
  });
});

//quitar asignacion de semestre y seccion en el alumno
app.put("/unassignAlumno", (req, res) => {
  const idAlumno = req.body.idAlumno;
  const sqlQuery = `
    UPDATE alumnos
    SET Semestre_idSemestre = NULL, Seccion = NULL
    WHERE idAlumnos = ?;
  `;
  db.query(sqlQuery, [idAlumno], (err, result) => {
    if (err) {
      console.error("Error al actualizar datos del alumno:", err);
      res.status(500).json({
        success: false,
        error: "Error al actualizar datos del alumno",
      });
    } else {
      console.log("Datos del alumno actualizados correctamente");
      res.status(200).json({
        success: true,
        message: "Datos del alumno actualizados correctamente",
      });
    }
  });
});

//eliminar seccion en semestre
app.delete("/deleteSeccionSemestre", (req, res) => {
  const seccionNombre = req.body.seccionNombre;
  // Obtener la ID de la sección
  const obtenerIdSeccionQuery = `
    SELECT idSeccion
    FROM seccion
    WHERE descripcion = ?;
  `;
  db.query(obtenerIdSeccionQuery, [seccionNombre], (err, results) => {
    if (err) {
      console.error("Error al obtener la ID de la sección:", err);
      return res.status(500).json({ error: "Error al eliminar semestres" });
    }
    if (results.length === 0) {
      console.error("No se encontró la sección con el nombre proporcionado");
      return res.status(404).json({ error: "Sección no encontrada" });
    }
    const idSeccion = results[0].idSeccion;
    const verificarHorariosQuery = `
      SELECT COUNT(*) AS total
      FROM horario
      WHERE Semestre_idSemestre IN (SELECT idSemestre FROM semestre WHERE Seccion_idSeccion = ?);
    `;
    db.query(verificarHorariosQuery, [idSeccion], (err, countResult) => {
      if (err) {
        console.error("Error al verificar horarios asociados:", err);
        return res.status(500).json({ error: "Error al eliminar semestres" });
      }
      const totalHorarios = countResult[0].total;
      if (totalHorarios > 0) {
        return res.status(400).json({
          error: "No se puede eliminar la sección. Tiene horarios asociados.",
        });
      }
      const eliminarSemestresQuery = `
        DELETE FROM semestre
        WHERE Seccion_idSeccion = ?;
      `;
      db.query(eliminarSemestresQuery, [idSeccion], (err, deleteResults) => {
        if (err) {
          console.error("Error al eliminar semestres:", err);
          return res.status(500).json({ error: "Error al eliminar semestres" });
        }

        console.log(
          `Se eliminaron ${deleteResults.affectedRows} semestres con la ID de sección ${idSeccion}`
        );
        res
          .status(200)
          .json({ success: true, message: "Semestres eliminados con éxito" });
      });
    });
  });
});

//obtener TODOS los datos de alumno
app.get("/server/allAlumno", (req, res) => {
  const consulta = `
    SELECT 
      a.idAlumnos,
      a.Nombre,
      a.Apellido,
      a.Numero_docu,
      a.Numero_telefono,
      a.Lugar_nacimiento,
      a.Fecha_nacimiento,
      a.Correo,
      a.Estado_civil_idEstado_civil,
      ec.Descripcion AS EstadoCivilDescripcion,
      a.Documento_idDocumento,
      d.Tipo_docu AS TipoDocumento,
      a.Nacionalidad_idNacionalidad,
      n.Descripcion AS NacionalidadDescripcion,
      a.Semestre_idSemestre,
      s.Nombre AS SemestreNombre,
      s.Seccion_idSeccion,
      secc.descripcion AS SeccionDescripcion,
      a.Estado_alumno_idEstado_alumno,
      ea.descripcion AS EstadoAlumnoDescripcion,
      a.Movilidad_idMovilidad,
      m.descripcion AS MovilidadDescripcion,
      a.tiempo,
      a.distancia,
      a.Seccion
    FROM 
      alumnos a
    JOIN 
      estado_civil ec ON a.Estado_civil_idEstado_civil = ec.idEstado_civil
    JOIN 
      documento d ON a.Documento_idDocumento = d.idDocumento
    JOIN 
      nacionalidad n ON a.Nacionalidad_idNacionalidad = n.idNacionalidad
    LEFT JOIN
      semestre s ON a.Semestre_idSemestre = s.idSemestre
    LEFT JOIN
      seccion secc ON s.Seccion_idSeccion = secc.idSeccion
    JOIN
      estado_alumno ea ON a.Estado_alumno_idEstado_alumno = ea.idEstado_alumno
    JOIN
      movilidad m ON a.Movilidad_idMovilidad = m.idMovilidad;
  `;
  db.query(consulta, (err, result) => {
    if (err) {
      console.error("Error al obtener datos de alumnos:", err);
      return res
        .status(500)
        .json({ error: "Error al obtener datos de alumnos" });
    }
    res.status(200).json(result);
  });
});

//eliminar semestre
app.delete("/deleteSemestre", (req, res) => {
  const semestreNombre = req.body.Semestre.Nombre;

  const deleteQuery = `
    DELETE FROM semestre
    WHERE Nombre = ?;
  `;
  db.query(deleteQuery, [semestreNombre], (err, result) => {
    if (err) {
      // Verificar si el error es debido a restricciones de clave externa (foreign key)
      if (err.code === "ER_ROW_IS_REFERENCED_2") {
        console.error("Error al eliminar semestre:", err);
        return res.status(400).json({
          error: "Este Semestre tiene asignaciones, no puede ser eliminado",
        });
      }
      console.error("Error al eliminar semestre:", err);
      return res.status(500).json({ error: "Error al eliminar el semestre" });
    }
    console.log("Semestre eliminado con éxito");
    res.status(200).json({
      success: true,
      message: "Semestre eliminado con éxito",
    });
  });
});

//crear user alumno
app.post("/createUser", async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const idAlumno = req.body.idAlumno;
    //hasheo
    bcrypt.hash(password, saltRounds, async (err, hash) => {
      if (err) {
        console.error("Error al generar el hash de la contraseña:", err);
        res.status(500).send("Hubo un error al crear el usuario");
        return;
      }
      //rol alumno
      const idTipoUsuario = 3;
      await db.query(
        "INSERT INTO usuario (username, password, Tipo_usuario_idTipo_usuario, Alumnos_idAlumnos) VALUES (?, ?, ?, ?)",
        [username, hash, idTipoUsuario, idAlumno]
      );
      res.status(200).json({
        message: "Usuario registrado con éxito",
        username: username,
      });
    });
  } catch (error) {
    console.error("Error en createUser:", error);
    res.status(500).send("Hubo un error al crear el usuario");
  }
});

//crear user profesor
app.post("/createUser2", (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const idProfesor = req.body.idProfesor;
    bcrypt.hash(password, saltRounds, async (err, hash) => {
      if (err) {
        console.error("Error al generar el hash de la contraseña:", err);
        res.status(500).send("Hubo un error al crear el usuario");
        return;
      }
      //rol profe
      const idTipoUsuario = 2;
      db.query(
        "INSERT INTO usuario (username, password, Tipo_usuario_idTipo_usuario) VALUES (?, ?, ?)",
        [username, hash, idTipoUsuario],
        (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).send("Error en ingreso de Usuario");
            return;
          }
          const idUsuario = result.insertId;
          db.query(
            "UPDATE profesores SET usuario_idusuario = ? WHERE idProfesores = ?",
            [idUsuario, idProfesor],
            (err, updateResult) => {
              if (err) {
                //console.error(err);
                res
                  .status(500)
                  .send(
                    "Error al actualizar el profesor con el ID del usuario"
                  );
                return;
              }
              res.status(200).json({
                message: "Usuario de profesor registrado con éxito",
                username: username,
                idUsuario: idUsuario,
              });
            }
          );
        }
      );
    });
  } catch (error) {
    //console.error("Error en createUser2:", error);
    res.status(500).send("Hubo un error al crear el usuario");
  }
});

//login HACER LOGIN
app.post("/server/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  db.query(
    "SELECT * FROM usuario WHERE username=?",
    username,
    (err, result) => {
      if (err) {
        res.send({ error: err });
      } else {
        if (result.length > 0) {
          bcrypt.compare(password, result[0].password, (error, response) => {
            if (response) {
              req.session.user = {
                idusuario: result[0].idusuario,
                username: result[0].username,
                rol: result[0].Tipo_usuario_idTipo_usuario,
                Alumnos_idAlumnos: result[0].Alumnos_idAlumnos,
              };
              res.send({
                logIn: true,
                user: req.session.user,
              });
            } else {
              res.send({
                logIn: false,
                message: "Contraseña/Usuario equivocado",
              });
            }
          });
        } else {
          res.send({ logIn: false, message: "Contraseña/Usuario equivocado" });
        }
      }
    }
  );
});

//COMPRUEBA SI ESTA LOGUEADO O NO
app.get("/testeoLogin", (req, res) => {
  if (req.session.user) {
    res.send({ logIn: true, user: req.session.user });
  } else {
    res.send({ logIn: false });
  }
});

//log out
app.get("/server/logout", (req, res) => {
  if (req.session.user) {
    res.clearCookie("userId");
    res.send({ loggedIn: false });
  }
});

//fetch userRoles
app.get("/server/roles", (req, res) => {
  const datos_roles = "SELECT * from tipo_usuario";
  db.query(datos_roles, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.json(result);
    }
  });
});

//crear horario
app.post("/createHorario", (req, res) => {
  const { Nombre, Seccion, materia, profesor, year, times } = req.body;
  // Obtener id de materia
  db.query(
    "SELECT idMaterias FROM materias WHERE Nombre = ?",
    [materia],
    function (err, resultMateria) {
      if (err) {
        console.log(err);
        return res.status(500).send("Error al obtener la id de la materia");
      } else {
        const idMaterias = resultMateria[0] && resultMateria[0].idMaterias;
        console.log("ID de la materia:", idMaterias);

        // Obtener id de profesor
        db.query(
          "SELECT idProfesores FROM profesores WHERE Nombre = ?",
          [profesor],
          function (err, resultProfesor) {
            if (err) {
              console.log(err);
              return res
                .status(500)
                .send("Error al obtener la id del profesor");
            } else {
              const idProfesores =
                resultProfesor[0] && resultProfesor[0].idProfesores;
              console.log("ID del profesor:", idProfesores);

              // Obtener id de sección
              db.query(
                "SELECT idSeccion FROM seccion WHERE descripcion = ?",
                [Seccion],
                function (err, resultSeccion) {
                  if (err) {
                    console.log(err);
                    return res
                      .status(500)
                      .send("Error al obtener la id de la sección");
                  } else {
                    const idSeccion =
                      resultSeccion[0] && resultSeccion[0].idSeccion;
                    console.log("ID de la sección:", idSeccion);

                    // Obtener id de semestre
                    const querySemestre =
                      "SELECT idSemestre FROM semestre WHERE Nombre = ? AND Seccion_idSeccion = ? AND Materias_idMaterias = ? AND Profesores_idProfesores = ?";
                    db.query(
                      querySemestre,
                      [Nombre, idSeccion, idMaterias, idProfesores],
                      function (err, resultSemestre) {
                        if (err) {
                          console.log(err);
                          return res
                            .status(500)
                            .send("Error al obtener la id del semestre");
                        } else {
                          const idSemestre =
                            resultSemestre[0] && resultSemestre[0].idSemestre;
                          console.log("ID del semestre:", idSemestre);

                          // Insertar horarios en la tabla 'horario'
                          times.forEach(
                            async ({ day, horaInicial, horaFinal }) => {
                              try {
                                const queryHorario =
                                  "INSERT INTO horario (dia, año, estado, inicio, fin, Semestre_idSemestre) VALUES (?, ?, ?, ?, ?, ?)";
                                await db.query(queryHorario, [
                                  day,
                                  year,
                                  "Activo",
                                  horaInicial,
                                  horaFinal,
                                  idSemestre,
                                ]);
                              } catch (error) {
                                console.error(
                                  "Error al insertar horario:",
                                  error
                                );
                                return res.status(500).json({
                                  error:
                                    "Error interno del servidor al insertar horario",
                                });
                              }
                            }
                          );

                          res.status(200).json({
                            message: "Horarios guardados exitosamente.",
                          });
                        }
                      }
                    );
                  }
                }
              );
            }
          }
        );
      }
    }
  );
});

//obtener TODOS los horarios
app.get("/server/fetchHorarios", (req, res) => {
  const consultaSQL = `
    SELECT 
      horario.*, 
      semestre.Nombre AS NombreSemestre,
      materias.*, 
      materias.Nombre AS NombreMateria,
      profesores.*, 
      seccion.descripcion AS DescripcionSeccion
    FROM horario
    INNER JOIN semestre ON horario.Semestre_idSemestre = semestre.idSemestre
    INNER JOIN materias ON semestre.Materias_idMaterias = materias.idMaterias
    INNER JOIN profesores ON semestre.Profesores_idProfesores = profesores.idProfesores
    INNER JOIN seccion ON semestre.Seccion_idSeccion = seccion.idSeccion
  `;
  db.query(consultaSQL, (error, results) => {
    if (error) {
      console.error("Error al realizar la consulta:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    } else {
      res.status(200).json(results);
    }
  });
});

//actualizar horarios
app.put("/updateHorario", async (req, res) => {
  const { Nombre, Seccion, materia, year, times, idMateria } = req.body;
  // Obtén el idSeccion utilizando la descripción
  const sqlGetSeccion = `
    SELECT idSeccion
    FROM seccion
    WHERE descripcion = ?;
  `;
  db.query(sqlGetSeccion, [Seccion], (errGetSeccion, resultGetSeccion) => {
    if (errGetSeccion) {
      console.error("Error al obtener idSeccion:", errGetSeccion);
      res.status(500).send("Error en el servidor al obtener idSeccion");
      return;
    }
    if (resultGetSeccion.length === 0) {
      console.error(
        "No se encontró el idSeccion para la descripción de sección especificada"
      );
      res
        .status(404)
        .send(
          "No se encontró el idSeccion para la descripción de sección especificada"
        );
      return;
    }

    const idSeccion = resultGetSeccion[0].idSeccion;

    // Obtén el idMaterias utilizando el nombre
    const sqlGetMateria = `
      SELECT idMaterias
      FROM materias
      WHERE Nombre = ?;
    `;

    db.query(sqlGetMateria, [materia], (errGetMateria, resultGetMateria) => {
      if (errGetMateria) {
        console.error("Error al obtener idMaterias:", errGetMateria);
        res.status(500).send("Error en el servidor al obtener idMaterias");
        return;
      }

      if (resultGetMateria.length === 0) {
        console.error(
          "No se encontró el idMaterias para el nombre de materia especificado"
        );
        res
          .status(404)
          .send(
            "No se encontró el idMaterias para el nombre de materia especificado"
          );
        return;
      }

      const idMaterias = resultGetMateria[0].idMaterias;

      // Obtén el idSemestre utilizando la información de NombreSemestre, idSeccion y idMaterias
      const sqlGetSemestre = `
        SELECT idSemestre
        FROM semestre
        WHERE Nombre = ? AND Seccion_idSeccion = ? AND Materias_idMaterias = ?;
      `;

      db.query(
        sqlGetSemestre,
        [Nombre, idSeccion, idMaterias],
        (errGetSemestre, resultGetSemestre) => {
          if (errGetSemestre) {
            console.error("Error al obtener idSemestre:", errGetSemestre);
            res.status(500).send("Error en el servidor al obtener idSemestre");
            return;
          }

          if (resultGetSemestre.length === 0) {
            console.error(
              "No se encontró el idSemestre para el semestre, sección y materia especificados"
            );
            res
              .status(404)
              .send(
                "No se encontró el idSemestre para el semestre, sección y materia especificados"
              );
            return;
          }

          const idSemestre = resultGetSemestre[0].idSemestre;

          // Luego, actualiza la información de los horarios asociados a ese semestre
          // Esto asume que los horarios ya están almacenados en la base de datos con una relación al semestre
          const sqlDeleteHorarios = `
            DELETE FROM horario
            WHERE Semestre_idSemestre = ?;
          `;

          db.query(
            sqlDeleteHorarios,
            [idSemestre],
            (errDeleteHorarios, resultDeleteHorarios) => {
              if (errDeleteHorarios) {
                console.error(
                  "Error al eliminar horarios antiguos:",
                  errDeleteHorarios
                );
                res
                  .status(500)
                  .send("Error en el servidor al eliminar horarios antiguos");
                return;
              }

              console.log("Eliminación de horarios antiguos exitosa");

              // Inserta los nuevos horarios si times no está vacío
              if (times.length > 0) {
                const sqlInsertHorarios = `
                  INSERT INTO horario (dia, año, estado, inicio, fin, Semestre_idSemestre)
                  VALUES ?;
                `;

                const horariosValues = times.map((horario) => [
                  horario.day,
                  year,
                  "Activo",
                  horario.horaInicial,
                  horario.horaFinal,
                  idSemestre,
                ]);

                db.query(
                  sqlInsertHorarios,
                  [horariosValues],
                  (errInsertHorarios, resultInsertHorarios) => {
                    if (errInsertHorarios) {
                      console.error(
                        "Error al insertar nuevos horarios:",
                        errInsertHorarios
                      );
                      res
                        .status(500)
                        .send(
                          "Error en el servidor al insertar nuevos horarios"
                        );
                      return;
                    }

                    console.log("Inserción de nuevos horarios exitosa");
                    res.status(200).send("Actualización exitosa");
                  }
                );
              } else {
                // Si times está vacío, simplemente envía una respuesta de éxito
                console.log("No se proporcionaron nuevos horarios");
                res
                  .status(200)
                  .send("Actualización exitosa (sin nuevos horarios)");
              }
            }
          );
        }
      );
    });
  });
});

//ver lista de semestres para los profesores
app.get("/server/getProfeSemestre/:username", (req, res) => {
  const { username } = req.params;
  const consultaSQL = `
    SELECT
      semestre.*,
      profesores.*,
      usuario.idusuario,
      usuario.username,
      usuario.Tipo_usuario_idTipo_usuario,
      usuario.Alumnos_idAlumnos,
      seccion.descripcion AS DescripcionSeccion,
      materias.Nombre AS NombreMateria,
      semestre.Nombre AS NombreSemestre
    FROM semestre
    INNER JOIN profesores ON semestre.Profesores_idProfesores = profesores.idProfesores
    INNER JOIN usuario ON profesores.usuario_idusuario = usuario.idusuario
    INNER JOIN seccion ON semestre.Seccion_idSeccion = seccion.idSeccion
    INNER JOIN materias ON semestre.Materias_idMaterias = materias.idMaterias
    WHERE usuario.username = ?
  `;

  db.query(consultaSQL, [username], (error, results) => {
    if (error) {
      console.error("Error al realizar la consulta:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    } else {
      res.status(200).json(results);
    }
  });
});

//ver lista de alumnos para los profesores
app.get("/server/fetchProfeAlumno", (req, res) => {
  const semestreNombre = req.query.semestre;
  const idSeccion = req.query.idSeccion;

  // Obtener idSemestre
  db.query(
    "SELECT idSemestre FROM semestre WHERE Nombre = ? AND Seccion_idSeccion = ? LIMIT 1",
    [semestreNombre, idSeccion],
    function (err, idSemestreQuery) {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ error: "Error al obtener la id del semestre" });
      }

      if (!idSemestreQuery || idSemestreQuery.length === 0) {
        return res.status(404).json({ error: "Semestre no encontrado" });
      }

      const idSemestre = idSemestreQuery[0].idSemestre;

      // Obtener alumnos
      db.query(
        "SELECT * FROM alumnos WHERE Semestre_idSemestre = ?",
        [idSemestre],
        function (err, alumnosQuery) {
          if (err) {
            console.log(err);
            return res
              .status(500)
              .json({ error: "Error al obtener datos de alumnos" });
          }

          res.json(alumnosQuery);
        }
      );
    }
  );
});

//get gravedades
app.get("/server/gravedades", (req, res) => {
  const datos_gravedad = "SELECT * FROM gravedad_observacion";
  db.query(datos_gravedad, (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result);
  });
});

//crear obsrevaciones
app.post("/createObservacion", (req, res) => {
  const { alumnoObs, fecha, obs, idGravedad } = req.body;
  const insertObservationQuery = `
    INSERT INTO observacion 
    (Alumnos_idAlumnos, descripcion, fecha, Profesores_idProfesores, Gravedad_observacion_idGravedad_observacion) 
    VALUES (?, ?, ?, ?, ?)
  `;
  db.query(
    insertObservationQuery,
    [alumnoObs.idAlumno, obs, fecha, alumnoObs.idProfesor, idGravedad],
    (error, results) => {
      if (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Error insert" });
      } else {
        res.status(200).json({ message: "Completado con exito" });
      }
    }
  );
});

//fetch all observaciones
app.get("/server/observacion", (req, res) => {
  const observacion_datos = "SELECT * from observacion";
  db.query(observacion_datos, (err, result) => {
    if (err) {
      throw err;
    } else {
      res.json(result);
    }
  });
});

//obtener datos de profesor mediante idusuario
app.get("/server/getProfesor/:idUsuario", (req, res) => {
  const { idUsuario } = req.params;
  const query = "SELECT * FROM profesores WHERE usuario_idusuario = ?";
  db.query(query, [idUsuario], (error, results) => {
    if (error) {
      console.error("Error al obtener datos del profesor:", error);
      res.status(500).json({ error: "Error al obtener datos del profesor" });
    } else {
      if (results.length > 0) {
        const profesorData = results[0];
        res.status(200).json(profesorData);
      } else {
        res.status(404).json({ message: "Profesor no encontrado" });
      }
    }
  });
});

//obtener datos de alumno para observacione
app.post("/server/getAlumnosInfo", async (req, res) => {
  try {
    const { alumnosIds } = req.body;
    const consulta = `
      SELECT
        a.idAlumnos,
        a.Nombre,
        a.Apellido,
        a.Numero_docu,
        a.Numero_telefono,
        a.Correo,
        a.Semestre_idSemestre,
        a.Seccion,
        s.Nombre as NombreSemestre
      FROM alumnos a
      LEFT JOIN semestre s ON a.Semestre_idSemestre = s.idSemestre
      WHERE a.idAlumnos IN (?)
    `;
    db.query(consulta, [alumnosIds], (error, resultados) => {
      if (error) {
        console.error("Error al ejecutar la consulta:", error);
        res.status(500).json({ error: "Error interno del servidor" });
      } else {
        res.json(resultados);
      }
    });
  } catch (error) {
    console.error("Error al obtener información de los alumnos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

//actualizar obsservacion
app.put("/updateObs", async (req, res) => {
  try {
    const { idObservacion, descObs } = req.body;
    const updateQuery = `
      UPDATE observacion
      SET descripcion = ?
      WHERE idObservacion = ?
    `;
    db.query(updateQuery, [descObs, idObservacion], (error, results) => {
      if (error) {
        console.error("Error al actualizar la descripción:", error);
        res.status(500).json({ error: "Error interno del servidor" });
      } else {
        res.json({
          success: true,
          message: "Descripción actualizada exitosamente",
        });
      }
    });
  } catch (error) {
    console.error("Error al actualizar la descripción:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

//eliminar observacion
app.delete("/deleteObs", async (req, res) => {
  try {
    const { idObservacion } = req.body;
    const deleteQuery = `
      DELETE FROM observacion
      WHERE idObservacion = ?
    `;
    db.query(deleteQuery, [idObservacion], (error, results) => {
      if (error) {
        console.error("Error al eliminar la observación:", error);
        res.status(500).json({ error: "Error interno del servidor" });
      } else {
        res.json({
          success: true,
          message: "Observación eliminada exitosamente",
        });
      }
    });
  } catch (error) {
    console.error("Error al eliminar la observación:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

//tipos de proceso
app.get("/getTipoProceso", async (req, res) => {
  try {
    const selectQuery = "SELECT * FROM tipo_proceso";
    db.query(selectQuery, (error, results) => {
      if (error) {
        console.error("Error al obtener datos de tipo_proceso:", error);
        res.status(500).json({ error: "Error interno del servidor" });
      } else {
        res.json(results);
      }
    });
  } catch (error) {
    console.error("Error al obtener datos de tipo_proceso:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

//tipos de indicadores
app.get("/geTipoIndicadores", async (req, res) => {
  try {
    const selectQuery = "SELECT * FROM tipo_indicador";
    db.query(selectQuery, (error, results) => {
      if (error) {
        console.error("Error al obtener datos de indicadores:", error);
        res.status(500).json({ error: "Error interno del servidor" });
      } else {
        res.json(results);
      }
    });
  } catch (error) {
    console.error("Error al obtener datos de indicadores:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

//insertar proceso
app.post("/crearProceso", async (req, res) => {
  const { datos1, datos2 } = req.body;
  db.beginTransaction(function (err) {
    if (err) {
      console.error("Error al iniciar la transacción:", err);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
    // Obtener ID de tipo proceso
    db.query(
      "SELECT idTipo_proceso FROM tipo_proceso WHERE descripcion = ?",
      [datos1.selectTipoProc],
      function (err, tipoProcesoResult) {
        if (err) {
          db.rollback(function () {
            console.error("Error al obtener ID de tipo proceso:", err);
            res.status(500).json({ error: "Error interno del servidor" });
          });
        }
        if (tipoProcesoResult.length === 0) {
          db.rollback(function () {
            console.error("Tipo de proceso no encontrado");
            res.status(500).json({ error: "Tipo de proceso no encontrado" });
          });
        } else {
          const tipoProcesoId = tipoProcesoResult[0].idTipo_proceso;

          // Obtener ID de seccion
          db.query(
            "SELECT idSeccion FROM seccion WHERE descripcion = ?",
            [datos1.seccion],
            function (err, seccionResult) {
              if (err) {
                db.rollback(function () {
                  console.error("Error al obtener ID de sección:", err);
                  res.status(500).json({ error: "Error interno del servidor" });
                });
              }
              if (seccionResult.length === 0) {
                db.rollback(function () {
                  console.error("Sección no encontrada");
                  res.status(500).json({ error: "Sección no encontrada" });
                });
              } else {
                const seccionId = seccionResult[0].idSeccion;

                // Obtener ID de materia
                db.query(
                  "SELECT idMaterias FROM materias WHERE Nombre = ?",
                  [datos1.materia],
                  function (err, materiaResult) {
                    if (err) {
                      db.rollback(function () {
                        console.error("Error al obtener ID de materia:", err);
                        res
                          .status(500)
                          .json({ error: "Error interno del servidor" });
                      });
                    }
                    if (materiaResult.length === 0) {
                      db.rollback(function () {
                        console.error("Materia no encontrada");
                        res
                          .status(500)
                          .json({ error: "Materia no encontrada" });
                      });
                    } else {
                      const materiaId = materiaResult[0].idMaterias;

                      // Obtener ID de semestre
                      db.query(
                        "SELECT idSemestre FROM semestre WHERE Materias_idMaterias = ? AND Seccion_idSeccion = ? AND Nombre = ?",
                        [materiaId, seccionId, datos1.semestre],
                        function (err, semestreResult) {
                          if (err) {
                            db.rollback(function () {
                              console.error(
                                "Error al obtener ID de semestre:",
                                err
                              );
                              res
                                .status(500)
                                .json({ error: "Error interno del servidor" });
                            });
                          }
                          if (semestreResult.length === 0) {
                            db.rollback(function () {
                              console.error("Semestre no encontrado");
                              res
                                .status(500)
                                .json({ error: "Semestre no encontrado" });
                            });
                          } else {
                            const semestreId = semestreResult[0].idSemestre;

                            // Obtener ID de tipo indicador
                            const tipoIndicador = datos2.tablita[0].tipo; // Suponiendo que todos los indicadores tienen el mismo tipo
                            db.query(
                              "SELECT idTipoIndicador FROM tipo_indicador WHERE Descripcion = ?",
                              [tipoIndicador],
                              function (err, tipoIndicadorResult) {
                                if (err) {
                                  db.rollback(function () {
                                    console.error(
                                      "Error al obtener ID de tipo indicador:",
                                      err
                                    );
                                    res.status(500).json({
                                      error: "Error interno del servidor",
                                    });
                                  });
                                }
                                if (tipoIndicadorResult.length === 0) {
                                  db.rollback(function () {
                                    console.error(
                                      "Tipo de indicador no encontrado"
                                    );
                                    res.status(500).json({
                                      error: "Tipo de indicador no encontrado",
                                    });
                                  });
                                } else {
                                  const tipoIndicadorId =
                                    tipoIndicadorResult[0].idTipoIndicador;

                                  // Insertar datos en la tabla procesos
                                  db.query(
                                    "INSERT INTO procesos (nombre, fecha_entrega, total_puntos, Tipo_proceso_idTipo_proceso, Semestre_idSemestre) VALUES (?, ?, ?, ?, ?)",
                                    [
                                      datos1.nombreProc,
                                      datos1.fecha,
                                      datos1.totpuntos,
                                      tipoProcesoId,
                                      semestreId,
                                    ],
                                    function (err, procesoResult) {
                                      if (err) {
                                        db.rollback(function () {
                                          console.error(
                                            "Error al insertar datos en la tabla procesos:",
                                            err
                                          );
                                          res.status(500).json({
                                            error: "Error interno del servidor",
                                          });
                                        });
                                      }

                                      const procesoId = procesoResult.insertId;

                                      // Insertar datos en la tabla indicadores
                                      const indicadores = datos2.tablita;
                                      const indicadoresValues = indicadores.map(
                                        (indicador) => [
                                          indicador.indicador,
                                          indicador.puntos,
                                          tipoIndicadorId,
                                          procesoId,
                                        ]
                                      );

                                      db.query(
                                        "INSERT INTO indicadores (descripcion, puntos, idTipoIndicador, idProcesos) VALUES ?",
                                        [indicadoresValues],
                                        function (err, indicadoresResult) {
                                          if (err) {
                                            db.rollback(function () {
                                              console.error(
                                                "Error al insertar datos en la tabla indicadores:",
                                                err
                                              );
                                              res.status(500).json({
                                                error:
                                                  "Error interno del servidor",
                                              });
                                            });
                                          }

                                          // Commit la transacción
                                          db.commit(function (err) {
                                            if (err) {
                                              db.rollback(function () {
                                                console.error(
                                                  "Error al hacer commit de la transacción:",
                                                  err
                                                );
                                                res.status(500).json({
                                                  error:
                                                    "Error interno del servidor",
                                                });
                                              });
                                            }

                                            res.status(200).json({
                                              mensaje:
                                                "Proceso y indicadores creados exitosamente",
                                              idProceso: procesoId,
                                            });
                                          });
                                        }
                                      );
                                    }
                                  );
                                }
                              }
                            );
                          }
                        }
                      );
                    }
                  }
                );
              }
            }
          );
        }
      }
    );
  });
});

//conseguir proceso específico
app.post("/server/getProceso", (req, res) => {
  const { NombreSemestre, DescripcionSeccion, NombreMateria } = req.body;
  db.query(
    "SELECT idSemestre FROM semestre WHERE Nombre = ? AND Seccion_idSeccion = (SELECT idSeccion FROM seccion WHERE descripcion = ?) AND Materias_idMaterias = (SELECT idMaterias FROM materias WHERE Nombre = ?)",
    [NombreSemestre, DescripcionSeccion, NombreMateria],
    (err, result) => {
      if (err) {
        console.error("Error al obtener idSemestre:", err);
        res.status(500).json({ error: "Error interno del servidor" });
      } else {
        if (result.length === 0) {
          console.error("Semestre no encontrado");
          res.status(404).json({ error: "Semestre no encontrado" });
        } else {
          const idSemestre = result[0].idSemestre;

          // Obtener datos de procesos, tipo_proceso y nombre del semestre
          db.query(
            "SELECT p.*, tp.descripcion AS tipo_proceso_descripcion, s.Nombre AS nombre_semestre FROM procesos p " +
              "INNER JOIN tipo_proceso tp ON p.Tipo_proceso_idTipo_proceso = tp.idTipo_proceso " +
              "INNER JOIN semestre s ON p.Semestre_idSemestre = s.idSemestre " +
              "WHERE p.Semestre_idSemestre = ?",
            [idSemestre],
            (err, procesosResult) => {
              if (err) {
                console.error("Error al obtener datos de procesos:", err);
                res.status(500).json({ error: "Error interno del servidor" });
              } else {
                // Obtener datos de indicadores con tipo_indicador
                db.query(
                  "SELECT i.*, ti.Descripcion AS tipo_indicador_descripcion FROM indicadores i " +
                    "LEFT JOIN tipo_indicador ti ON i.idTipoIndicador = ti.idTipoIndicador " +
                    "WHERE i.idProcesos IN (?)",
                  [procesosResult.map((proceso) => proceso.idProcesos)],
                  (err, indicadoresResult) => {
                    if (err) {
                      console.error(
                        "Error al obtener datos de indicadores:",
                        err
                      );
                      res
                        .status(500)
                        .json({ error: "Error interno del servidor" });
                    } else {
                      const respuesta = {
                        procesos: procesosResult,
                        indicadores: indicadoresResult,
                      };
                      res.status(200).json(respuesta);
                    }
                  }
                );
              }
            }
          );
        }
      }
    }
  );
});

//editar proceso
app.put("/updateProceso", (req, res) => {
  const { datos } = req.body;
  const { datos1, datos2 } = datos;
  console.log(datos2);

  // Obtener la ID de tipo_proceso
  db.query(
    "SELECT idTipo_proceso FROM tipo_proceso WHERE descripcion = ?",
    [datos1.selectTipoProc],
    (err, tipoProcesoRows) => {
      if (err) {
        console.error("Error al obtener ID de tipo_proceso:", err);
        res.status(500).send("Error interno del servidor");
        return;
      }

      const tipoProcesoId = tipoProcesoRows[0].idTipo_proceso;

      // Actualizar la tabla procesos
      db.query(
        "UPDATE procesos SET nombre=?, fecha_entrega=?, total_puntos=?, Tipo_proceso_idTipo_proceso=?, Semestre_idSemestre=? WHERE idProcesos=?",
        [
          datos1.nombreProc,
          datos1.fecha,
          datos1.totpuntos,
          tipoProcesoId,
          datos1.idSemestre,
          datos1.idProcesos,
        ],
        (err, procesosResult) => {
          if (err) {
            console.error("Error al actualizar la tabla procesos:", err);
            res.status(500).send("Error interno del servidor");
            return;
          }
          let completedUpdates = 0;
          datos2.tablita.forEach((indicador) => {
            // Obtener la ID de tipo_indicador
            db.query(
              "SELECT idTipoIndicador FROM tipo_indicador WHERE Descripcion = ?",
              [indicador.tipo],
              (err, tipoIndicadorRows) => {
                if (err) {
                  console.error("Error al obtener ID de tipo_indicador:", err);
                  res.status(500).send("Error interno del servidor");
                  return;
                }

                const tipoIndicadorId = tipoIndicadorRows[0].idTipoIndicador;

                // Actualizar el indicador
                db.query(
                  "UPDATE indicadores SET descripcion=?, puntos=?, idTipoIndicador=? WHERE idProcesos=? AND idIndicadores=?",
                  [
                    indicador.indicador,
                    indicador.puntos,
                    tipoIndicadorId,
                    datos1.idProcesos,
                    indicador.id,
                  ],
                  (err) => {
                    if (err) {
                      console.error(
                        "Error al actualizar la tabla indicadores:",
                        err
                      );
                      res.status(500).send("Error interno del servidor");
                      return;
                    }
                    completedUpdates++;
                    if (completedUpdates === datos2.tablita.length) {
                      // Todas las actualizaciones de indicadores han sido completadas
                      res.status(200).send("Actualización exitosa");
                    }
                  }
                );
              }
            );
          });
        }
      );
    }
  );
});

//borrar proceso
app.delete("/deleteProc/:idAux", (req, res) => {
  const idAux = req.params.idAux;
  const deleteIndicadoresQuery = "DELETE FROM indicadores WHERE idProcesos = ?";
  db.query(deleteIndicadoresQuery, [idAux], (error, result) => {
    if (error) {
      console.error("Error al borrar indicadores:", error);
      res.status(500).json({ error: "Error interno del servidor" });
      return;
    }
    const deleteProcesoQuery = "DELETE FROM procesos WHERE idProcesos = ?";
    db.query(deleteProcesoQuery, [idAux], (error, result) => {
      if (error) {
        console.error("Error al borrar el proceso:", error);
        res.status(500).json({ error: "Error interno del servidor" });
        return;
      }
      res
        .status(200)
        .json({ message: "Proceso y sus indicadores borrados con éxito" });
    });
  });
});

//procesos pero mas facil
app.get("/server/getProc", (req, res) => {
  const idSemestre = req.query.idSemestre;
  if (!isNaN(idSemestre)) {
    const selectProcesosQuery =
      "SELECT procesos.*, " +
      "semestre.Nombre AS nombreSemestre, " +
      "materias.Nombre AS nombreMateria, " +
      "seccion.descripcion AS nombreSeccion, " +
      "tipo_proceso.descripcion AS tipoProcesoDescripcion " +
      "FROM procesos " +
      "JOIN semestre ON procesos.Semestre_idSemestre = semestre.idSemestre " +
      "JOIN materias ON semestre.Materias_idMaterias = materias.idMaterias " +
      "JOIN seccion ON semestre.Seccion_idSeccion = seccion.idSeccion " +
      "JOIN tipo_proceso ON procesos.Tipo_proceso_idTipo_proceso = tipo_proceso.idTipo_proceso " +
      "WHERE procesos.Semestre_idSemestre = ?";

    db.query(selectProcesosQuery, [idSemestre], (error, results) => {
      if (error) {
        console.error("Error al seleccionar procesos:", error);
        res.status(500).json({ error: "Error interno del servidor" });
        return;
      }
      res.json(results);
    });
  } else {
    res.status(400).json({ error: "El parámetro no es un número válido" });
  }
});

//obtener alumno segun semestre
app.get("/server/getAlumno", (req, res) => {
  const idSemestre = req.query.idSemestre;
  const semestreNombre = req.query.semestre;
  if (semestreNombre) {
    const selectAlumnosQuery =
      "SELECT a.*, pa.logrado_puntos, pa.estado, pa.fecha_entregado, p.total_puntos, p.fecha_entrega FROM alumnos a LEFT JOIN procesosxalumno pa ON a.idAlumnos = pa.Alumnos_idAlumnos LEFT JOIN procesos p ON pa.Procesos_idProcesos = p.idProcesos LEFT JOIN semestre s ON a.Semestre_idSemestre = s.idSemestre WHERE s.Nombre = ?";
    // Modificado: Usar el nombre del semestre en lugar de idSemestre
    db.query(selectAlumnosQuery, [semestreNombre], (error, results) => {
      if (error) {
        console.error("Error al seleccionar alumnos:", error);
        res.status(500).json({ error: "Error interno del servidor" });
        return;
      }
      res.json(results);
    });
  } else {
    res.status(400).json({ error: "El parámetro 'semestre' es requerido" });
  }
});



//obtenter lista de indicadores de proceso individual
app.get("/server/getIndicador", (req, res) => {
  const idProcesos = req.query.idProcesos;
  if (!isNaN(idProcesos)) {
    const selectIndicadoresQuery = `
      SELECT i.*, ti.Descripcion AS TipoIndicadorDescripcion
      FROM indicadores i
      LEFT JOIN tipo_indicador ti ON i.idTipoIndicador = ti.idTipoIndicador
      WHERE i.idProcesos = ?;
    `;
    db.query(selectIndicadoresQuery, [idProcesos], (error, results) => {
      if (error) {
        console.error("Error al seleccionar indicadores:", error);
        res.status(500).json({ error: "Error interno del servidor" });
        return;
      }
      res.json(results);
    });
  } else {
    res.status(400).json({ error: "El parámetro no es un número válido" });
  }
});

//guardar proceso hecho por el alumno
app.post("/procesoXalumno", (req, res) => {
  const { idProceso, idAlumno, logrado, entregado, estado } = req.body;
  if (
    !idProceso ||
    !idAlumno ||
    logrado === undefined ||
    estado === undefined
  ) {
    return res.status(400).json({ error: "Datos incompletos" });
  }
  const insertQuery =
    "INSERT INTO procesosxalumno (Procesos_idProcesos, Alumnos_idAlumnos, logrado_puntos, estado, fecha_entregado) VALUES (?, ?, ?, ?, ?)";
  db.query(
    insertQuery,
    [idProceso, idAlumno, logrado, estado, entregado],
    (error, results) => {
      if (error) {
        console.error("Error al insertar en procesosxalumno:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
      }
      res.json({ success: true });
    }
  );
});

//editar proceso hecho por alumno:
app.put("/procesoXalumno/:idProceso/:idAlumno", (req, res) => {
  const { idProceso, idAlumno } = req.params;
  const { logrado, entregado, estado } = req.body;
  const updateQuery =
    "UPDATE procesosxalumno SET logrado_puntos = ?, estado = ?, fecha_entregado = ? WHERE Procesos_idProcesos = ? AND Alumnos_idAlumnos = ?";
  db.query(
    updateQuery,
    [logrado, estado, entregado, idProceso, idAlumno],
    (error, results) => {
      if (error) {
        console.error("Error al actualizar en procesosxalumno:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
      }
      res.json({ success: true });
    }
  );
});

app.listen(3000, () => {
  console.log("Funca puerto 3000");
});
