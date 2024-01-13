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

//obtener alumnos
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
                    return res
                      .status(200)
                      .send("Profesor registrado con éxito");
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
  const query = "DELETE FROM profesores WHERE idProfesores = ?";
  db.query(query, idProfesores, (err, result) => {
    if (err) {
      console.error("Error al eliminar el profesor:", err);
      return res.status(500).send("Error al eliminar el profesor");
    }
    return res
      .status(200)
      .send(`Profesor con ID ${idProfesores} eliminado correctamente`);
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
      const updateQuery = `
        UPDATE semestre
        SET
          Materias_idMaterias = ${data.Materias_idMaterias},
          Profesores_idProfesores = ${data.Profesores_idProfesores}
        WHERE idSemestre = ${data.idSemestre};
      `;
      db.query(updateQuery, (err, results) => {
        if (err) {
          console.error("Error al ejecutar la consulta:", err);
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
    queryPromises.push(queryPromise);
  });
  Promise.all(queryPromises)
    .then(() => {
      res.status(200).json({ message: "Cambios guardados con éxito" });
    })
    .catch((error) => {
      res.status(500).json({ error: "Error al ejecutar la consulta" });
    });
});

//insertar el semestre y seccion correspondiente a alumno
app.put("/inputSemestreAlumno", (req, res) => {
  const { alumnosSeleccionados } = req.body;
  const semestreNombre = req.body.semestreSeleccionado;
  const seccionNombre = req.body.seccionSeleccionada;
  //id secccionn
  const seccionQuery = `
    SELECT idSeccion
    FROM seccion
    WHERE descripcion = '${seccionNombre}';
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
      WHERE Nombre = '${semestreNombre}' AND Seccion_idSeccion = ${seccionId};
    `;
    db.query(semestreQuery, (err, semestreResults) => {
      if (err) {
        console.error("Error al obtener la ID del semestre:", err);
        return res
          .status(500)
          .json({ error: "Error al actualizar los registros" });
      }
      const semestreId = semestreResults[0].idSemestre;
      const updateQueries = alumnosSeleccionados.map((alumno) => {
        return `
          UPDATE alumnos
          SET Semestre_idSemestre = ${semestreId},
              Seccion = '${seccionNombre}'
          WHERE idAlumnos = ${alumno.idAlumnos};
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
          db.query(query, (err, results) => {
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
        //coooommmmmmmmiiiiiiit AAAAAAAAAAAAAAAAAAAAAAAAA
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
          res
            .status(200)
            .json({
              success: true,
              message: "Registros actualizados con éxito",
            });
        });
      });
    });
  });
});

app.listen(3000, () => {
  console.log("Funca puerto 3000");
});
