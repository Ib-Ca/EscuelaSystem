-- --------------------------------------------------------
-- Host:                         localhost
-- Versión del servidor:         8.0.34 - MySQL Community Server - GPL
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para proyecto_db
CREATE DATABASE IF NOT EXISTS `proyecto_db` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `proyecto_db`;

-- Volcando estructura para tabla proyecto_db.alumnos
CREATE TABLE IF NOT EXISTS `alumnos` (
  `idAlumnos` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(45) NOT NULL,
  `Apellido` varchar(45) NOT NULL,
  `Numero_docu` bigint NOT NULL DEFAULT '0',
  `Numero_telefono` bigint NOT NULL DEFAULT '0',
  `Lugar_nacimiento` varchar(45) DEFAULT NULL,
  `Fecha_nacimiento` date DEFAULT NULL,
  `Correo` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `Estado_civil_idEstado_civil` int NOT NULL,
  `Documento_idDocumento` int NOT NULL,
  `Nacionalidad_idNacionalidad` int NOT NULL,
  `Semestre_idSemestre` int DEFAULT NULL,
  `Estado_alumno_idEstado_alumno` int NOT NULL,
  `Movilidad_idMovilidad` int NOT NULL,
  `tiempo` int NOT NULL,
  `distancia` int NOT NULL,
  `Seccion` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idAlumnos`),
  KEY `fk_Alumnos_Estado_civil1_idx` (`Estado_civil_idEstado_civil`),
  KEY `fk_Alumnos_Documento1_idx` (`Documento_idDocumento`),
  KEY `fk_Alumnos_Nacionalidad1_idx` (`Nacionalidad_idNacionalidad`),
  KEY `fk_Alumnos_Semestre1_idx` (`Semestre_idSemestre`),
  KEY `fk_Alumnos_Estado_alumno1_idx` (`Estado_alumno_idEstado_alumno`),
  KEY `fk_Alumnos_Movilidad1_idx` (`Movilidad_idMovilidad`),
  CONSTRAINT `fk_Alumnos_Documento1` FOREIGN KEY (`Documento_idDocumento`) REFERENCES `documento` (`idDocumento`),
  CONSTRAINT `fk_Alumnos_Estado_alumno1` FOREIGN KEY (`Estado_alumno_idEstado_alumno`) REFERENCES `estado_alumno` (`idEstado_alumno`),
  CONSTRAINT `fk_Alumnos_Estado_civil1` FOREIGN KEY (`Estado_civil_idEstado_civil`) REFERENCES `estado_civil` (`idEstado_civil`),
  CONSTRAINT `fk_Alumnos_Movilidad1` FOREIGN KEY (`Movilidad_idMovilidad`) REFERENCES `movilidad` (`idMovilidad`),
  CONSTRAINT `fk_Alumnos_Nacionalidad1` FOREIGN KEY (`Nacionalidad_idNacionalidad`) REFERENCES `nacionalidad` (`idNacionalidad`),
  CONSTRAINT `fk_Alumnos_Semestre1` FOREIGN KEY (`Semestre_idSemestre`) REFERENCES `semestre` (`idSemestre`)
) ENGINE=InnoDB AUTO_INCREMENT=108 DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla proyecto_db.alumnos: ~7 rows (aproximadamente)
INSERT INTO `alumnos` (`idAlumnos`, `Nombre`, `Apellido`, `Numero_docu`, `Numero_telefono`, `Lugar_nacimiento`, `Fecha_nacimiento`, `Correo`, `Estado_civil_idEstado_civil`, `Documento_idDocumento`, `Nacionalidad_idNacionalidad`, `Semestre_idSemestre`, `Estado_alumno_idEstado_alumno`, `Movilidad_idMovilidad`, `tiempo`, `distancia`, `Seccion`) VALUES
	(99, 'terratemblor', 'nuevamente', 2626, 230660, 'dasdsa', '2024-01-25', 'lm@daspokdp.om', 1, 1, 14, NULL, 1, 0, 12, 62, NULL),
	(100, 'Martin', 'Martinez', 1650, 1265, 'dsadsa', '2024-01-02', 'dsa@7878', 1, 1, 14, NULL, 1, 0, 22, 33, NULL),
	(101, 'Gonzalo Gonzalin', 'Gonzales Gonzalo', 1456165, 906651, 'sad', '2024-01-25', 'ifd2021.carlos.ibarra@gmail.com', 1, 1, 14, NULL, 1, 0, 33, 33, NULL),
	(102, 'Alumno', 'Apellido', 412421, 12312321, 'adsa', '2024-01-02', 'hital12.ci@gmail.com', 1, 1, 14, NULL, 1, 0, 33, 33, NULL),
	(103, 'Marco', 'Aurelio', 4917107, 312321321, 'dasdsads', '2023-12-31', 'dsa@7878', 1, 1, 14, NULL, 1, 0, 33, 33, NULL),
	(104, 'Fredo', 'Godofredo', 3213215, 15909819, 'Casa', '2024-01-19', 'ifd2021.carlos.ibarra@gmail.com', 1, 1, 14, NULL, 1, 1, 33, 33, NULL),
	(105, 'Freddy', 'Mercury', 16513513, 23032035, 'dasdsads', '2024-02-02', 'hital12.ci@gmail.com', 1, 1, 1, NULL, 1, 0, 22, 22, NULL);

-- Volcando estructura para tabla proyecto_db.asistencias
CREATE TABLE IF NOT EXISTS `asistencias` (
  `idAsistencias` int NOT NULL AUTO_INCREMENT,
  `Horario_idHorario` int NOT NULL,
  `fecha` date NOT NULL,
  PRIMARY KEY (`idAsistencias`),
  KEY `fk_Asistencias_Horario1_idx` (`Horario_idHorario`),
  CONSTRAINT `fk_Asistencias_Horario1` FOREIGN KEY (`Horario_idHorario`) REFERENCES `horario` (`idHorario`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla proyecto_db.asistencias: ~0 rows (aproximadamente)

-- Volcando estructura para tabla proyecto_db.documento
CREATE TABLE IF NOT EXISTS `documento` (
  `idDocumento` int NOT NULL AUTO_INCREMENT,
  `Tipo_docu` varchar(45) NOT NULL,
  PRIMARY KEY (`idDocumento`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla proyecto_db.documento: ~3 rows (aproximadamente)
INSERT INTO `documento` (`idDocumento`, `Tipo_docu`) VALUES
	(1, 'Cédula'),
	(2, 'DNI'),
	(3, 'Otro');

-- Volcando estructura para tabla proyecto_db.estado_alumno
CREATE TABLE IF NOT EXISTS `estado_alumno` (
  `idEstado_alumno` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(45) NOT NULL,
  PRIMARY KEY (`idEstado_alumno`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla proyecto_db.estado_alumno: ~3 rows (aproximadamente)
INSERT INTO `estado_alumno` (`idEstado_alumno`, `descripcion`) VALUES
	(1, 'Activo'),
	(2, 'Graduado'),
	(3, 'Expulsado');

-- Volcando estructura para tabla proyecto_db.estado_civil
CREATE TABLE IF NOT EXISTS `estado_civil` (
  `idEstado_civil` int NOT NULL AUTO_INCREMENT,
  `Descripcion` varchar(45) NOT NULL,
  PRIMARY KEY (`idEstado_civil`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla proyecto_db.estado_civil: ~4 rows (aproximadamente)
INSERT INTO `estado_civil` (`idEstado_civil`, `Descripcion`) VALUES
	(1, 'Soltero/a'),
	(2, 'Casado/a'),
	(3, 'Divorciado/a'),
	(4, 'Viudo/a');

-- Volcando estructura para tabla proyecto_db.gravedad_observacion
CREATE TABLE IF NOT EXISTS `gravedad_observacion` (
  `idGravedad_observacion` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(45) NOT NULL,
  PRIMARY KEY (`idGravedad_observacion`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla proyecto_db.gravedad_observacion: ~3 rows (aproximadamente)
INSERT INTO `gravedad_observacion` (`idGravedad_observacion`, `descripcion`) VALUES
	(1, 'Leve'),
	(2, 'Grave'),
	(3, 'Muy Grave');

-- Volcando estructura para tabla proyecto_db.historial
CREATE TABLE IF NOT EXISTS `historial` (
  `idHistorial` int NOT NULL AUTO_INCREMENT,
  `fecha` date NOT NULL,
  `donde` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `tipo_cambio` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `datos_anteriores` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `usuario_idusuario` int NOT NULL,
  PRIMARY KEY (`idHistorial`) USING BTREE,
  KEY `fk_Avisos_usuario1_idx` (`usuario_idusuario`),
  CONSTRAINT `fk_Avisos_usuario1` FOREIGN KEY (`usuario_idusuario`) REFERENCES `usuario` (`idusuario`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla proyecto_db.historial: ~14 rows (aproximadamente)
INSERT INTO `historial` (`idHistorial`, `fecha`, `donde`, `tipo_cambio`, `datos_anteriores`, `usuario_idusuario`) VALUES
	(1, '2024-01-24', 'Alumnos', 'Creación', '', 5),
	(2, '2024-01-24', 'Alumnos', 'Actualización', '{"idAlumnos":101,"Nombre":"Gonzalo Gonzalin","Apellido":"Gonzales Gonzalo","Numero_docu":1456165,"Numero_telefono":906651,"Lugar_nacimiento":"sad","Fecha_nacimiento":"2024-01-02T03:00:00.000Z","Correo":"ifd2021.carlos.ibarra@gmail.com","Estado_civil_idEstado_civil":1,"Documento_idDocumento":1,"Nacionalidad_idNacionalidad":14,"Semestre_idSemestre":null,"Estado_alumno_idEstado_alumno":1,"Movilidad_idMovilidad":0,"tiempo":33,"distancia":33,"Seccion":null}', 5),
	(4, '2024-01-24', 'Materias', 'Creación', '', 5),
	(5, '2024-01-24', 'Materias', 'Actualización', '{"Nombre":"Castellano","Carga_horaria":33}', 5),
	(6, '2024-01-24', 'Materias', 'Eliminación', '{"idMaterias":15,"Nombre":"Patología","Carga_horaria":200}', 5),
	(7, '2024-01-24', 'Profesor', 'Creación', '', 5),
	(8, '2024-01-24', 'Profesor', 'Creación', '', 5),
	(9, '2024-01-24', 'Profesor', 'Creación', '', 5),
	(10, '2024-01-24', 'Profesor', 'Eliminación', '{"idProfesores":42,"Nombre":"Albert Einstein","Apellido":"Hawkings Junior","Correo":"hital12.ci@gmail.com","Numero_telefono":312321,"Numero_docu":312321,"Estado_civil_idEstado_civil":1,"Nacionalidad_idNacionalidad":3,"Documento_idDocumento":1,"usuario_idusuario":38}', 5),
	(11, '2024-01-24', 'Profesor', 'Actualización', '{"idProfesores":39,"Nombre":"Richard","Apellido":"Hawkings Junior","Correo":"hital12.ci@gmail.com","Numero_telefono":166,"Numero_docu":741252397,"Estado_civil_idEstado_civil":1,"Nacionalidad_idNacionalidad":14,"Documento_idDocumento":1,"usuario_idusuario":31}', 5),
	(12, '2024-01-24', 'Alumnos', 'Creación', '', 5),
	(13, '2024-01-24', 'Alumnos', 'Actualización', '{"idAlumnos":107,"Nombre":"Pedro","Apellido":"Chupacabra","Numero_docu":4916132,"Numero_telefono":156165165,"Lugar_nacimiento":"bkjj","Fecha_nacimiento":"2024-01-26T03:00:00.000Z","Correo":"asda@asd","Estado_civil_idEstado_civil":1,"Documento_idDocumento":1,"Nacionalidad_idNacionalidad":14,"Semestre_idSemestre":null,"Estado_alumno_idEstado_alumno":1,"Movilidad_idMovilidad":0,"tiempo":33,"distancia":33,"Seccion":null}', 5),
	(14, '2024-01-24', 'Materias', 'Actualización', '{"Nombre":"Matemática","Carga_horaria":5165146}', 5),
	(15, '2024-01-24', 'Alumnos', 'Eliminación', '{"idAlumnos":107,"Nombre":"Pedro","Apellido":"Chupacabra","Numero_docu":4916132,"Numero_telefono":156165165,"Lugar_nacimiento":"bkjj","Fecha_nacimiento":"2024-01-26T03:00:00.000Z","Correo":"asda@asd","Estado_civil_idEstado_civil":1,"Documento_idDocumento":1,"Nacionalidad_idNacionalidad":14,"Semestre_idSemestre":null,"Estado_alumno_idEstado_alumno":1,"Movilidad_idMovilidad":0,"tiempo":33,"distancia":33,"Seccion":null}', 5);

-- Volcando estructura para tabla proyecto_db.horario
CREATE TABLE IF NOT EXISTS `horario` (
  `idHorario` int NOT NULL AUTO_INCREMENT,
  `dia` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `año` int NOT NULL,
  `estado` varchar(45) NOT NULL,
  `inicio` varchar(45) NOT NULL,
  `fin` varchar(45) NOT NULL,
  `Semestre_idSemestre` int NOT NULL,
  PRIMARY KEY (`idHorario`),
  KEY `fk_Horario_Semestre1_idx` (`Semestre_idSemestre`),
  CONSTRAINT `fk_Horario_Semestre1` FOREIGN KEY (`Semestre_idSemestre`) REFERENCES `semestre` (`idSemestre`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla proyecto_db.horario: ~0 rows (aproximadamente)

-- Volcando estructura para tabla proyecto_db.indicadores
CREATE TABLE IF NOT EXISTS `indicadores` (
  `idIndicadores` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `idTipoIndicador` int DEFAULT NULL,
  `puntos` int DEFAULT NULL,
  `idProcesos` int DEFAULT NULL,
  PRIMARY KEY (`idIndicadores`),
  KEY `FK_indicadores_tipo_indicador` (`idTipoIndicador`),
  KEY `FK_indicadores_procesos` (`idProcesos`),
  CONSTRAINT `FK_indicadores_procesos` FOREIGN KEY (`idProcesos`) REFERENCES `procesos` (`idProcesos`),
  CONSTRAINT `FK_indicadores_tipo_indicador` FOREIGN KEY (`idTipoIndicador`) REFERENCES `tipo_indicador` (`idTipoIndicador`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla proyecto_db.indicadores: ~0 rows (aproximadamente)

-- Volcando estructura para tabla proyecto_db.materias
CREATE TABLE IF NOT EXISTS `materias` (
  `idMaterias` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(45) NOT NULL,
  `Carga_horaria` int NOT NULL,
  PRIMARY KEY (`idMaterias`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla proyecto_db.materias: ~11 rows (aproximadamente)
INSERT INTO `materias` (`idMaterias`, `Nombre`, `Carga_horaria`) VALUES
	(2, 'Castellano', 34),
	(3, 'Matemáticas', 445),
	(4, 'Física', 99),
	(5, 'Práctica', 4545),
	(6, 'Aritmetica', 4212),
	(7, 'Matemática Aplicada', 800),
	(8, 'Educación', 800),
	(9, 'Inclusión', 3444),
	(10, 'Teoría de la Educ', 900),
	(11, 'Física Cuantica', 150),
	(12, 'Matemática', 51651);

-- Volcando estructura para tabla proyecto_db.movilidad
CREATE TABLE IF NOT EXISTS `movilidad` (
  `idMovilidad` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(49) NOT NULL,
  PRIMARY KEY (`idMovilidad`)
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla proyecto_db.movilidad: ~6 rows (aproximadamente)
INSERT INTO `movilidad` (`idMovilidad`, `descripcion`) VALUES
	(0, 'Automóvil'),
	(1, 'Caminando'),
	(2, 'Motocicleta'),
	(3, 'Carreta'),
	(4, 'Colectivo'),
	(5, 'Bicicleta');

-- Volcando estructura para tabla proyecto_db.nacionalidad
CREATE TABLE IF NOT EXISTS `nacionalidad` (
  `idNacionalidad` int NOT NULL AUTO_INCREMENT,
  `Descripcion` varchar(45) NOT NULL,
  PRIMARY KEY (`idNacionalidad`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla proyecto_db.nacionalidad: ~17 rows (aproximadamente)
INSERT INTO `nacionalidad` (`idNacionalidad`, `Descripcion`) VALUES
	(1, 'Alemania'),
	(2, 'Argentina'),
	(3, 'Brasil'),
	(4, 'Canadá'),
	(5, 'Chile'),
	(6, 'Colombia'),
	(7, 'Ecuador'),
	(8, 'España'),
	(9, 'Estados Unidos'),
	(10, 'Francia'),
	(11, 'Italia'),
	(12, 'México'),
	(13, 'Perú'),
	(14, 'Paraguay'),
	(15, 'Reino Unido'),
	(16, 'Venezuela'),
	(17, 'Otro');

-- Volcando estructura para tabla proyecto_db.observacion
CREATE TABLE IF NOT EXISTS `observacion` (
  `idObservacion` int NOT NULL AUTO_INCREMENT,
  `Alumnos_idAlumnos` int NOT NULL,
  `descripcion` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `fecha` date NOT NULL,
  `Profesores_idProfesores` int NOT NULL,
  `Gravedad_observacion_idGravedad_observacion` int NOT NULL,
  PRIMARY KEY (`idObservacion`),
  KEY `fk_Observacion_Alumnos1_idx` (`Alumnos_idAlumnos`),
  KEY `fk_Observacion_Profesores1_idx` (`Profesores_idProfesores`),
  KEY `fk_Observacion_Gravedad_observacion1_idx` (`Gravedad_observacion_idGravedad_observacion`),
  CONSTRAINT `fk_Observacion_Alumnos1` FOREIGN KEY (`Alumnos_idAlumnos`) REFERENCES `alumnos` (`idAlumnos`),
  CONSTRAINT `fk_Observacion_Gravedad_observacion1` FOREIGN KEY (`Gravedad_observacion_idGravedad_observacion`) REFERENCES `gravedad_observacion` (`idGravedad_observacion`),
  CONSTRAINT `fk_Observacion_Profesores1` FOREIGN KEY (`Profesores_idProfesores`) REFERENCES `profesores` (`idProfesores`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla proyecto_db.observacion: ~0 rows (aproximadamente)

-- Volcando estructura para tabla proyecto_db.presencia
CREATE TABLE IF NOT EXISTS `presencia` (
  `idPresencia` int NOT NULL AUTO_INCREMENT,
  `Alumnos_idAlumnos` int NOT NULL,
  `Asistencias_idAsistencias` int NOT NULL,
  `Asistio` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idPresencia`,`Alumnos_idAlumnos`,`Asistencias_idAsistencias`),
  KEY `fk_Presencia_Alumnos1_idx` (`Alumnos_idAlumnos`),
  KEY `fk_Presencia_Asistencias1_idx` (`Asistencias_idAsistencias`),
  CONSTRAINT `fk_Presencia_Alumnos1` FOREIGN KEY (`Alumnos_idAlumnos`) REFERENCES `alumnos` (`idAlumnos`),
  CONSTRAINT `fk_Presencia_Asistencias1` FOREIGN KEY (`Asistencias_idAsistencias`) REFERENCES `asistencias` (`idAsistencias`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla proyecto_db.presencia: ~0 rows (aproximadamente)

-- Volcando estructura para tabla proyecto_db.procesos
CREATE TABLE IF NOT EXISTS `procesos` (
  `idProcesos` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `fecha_entrega` varchar(45) NOT NULL,
  `total_puntos` int NOT NULL,
  `Tipo_proceso_idTipo_proceso` int NOT NULL,
  `Semestre_idSemestre` int NOT NULL,
  PRIMARY KEY (`idProcesos`),
  KEY `fk_Procesos_Tipo_proceso1_idx` (`Tipo_proceso_idTipo_proceso`),
  KEY `fk_Procesos_Semestre1_idx` (`Semestre_idSemestre`),
  CONSTRAINT `fk_Procesos_Semestre1` FOREIGN KEY (`Semestre_idSemestre`) REFERENCES `semestre` (`idSemestre`),
  CONSTRAINT `fk_Procesos_Tipo_proceso1` FOREIGN KEY (`Tipo_proceso_idTipo_proceso`) REFERENCES `tipo_proceso` (`idTipo_proceso`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla proyecto_db.procesos: ~0 rows (aproximadamente)

-- Volcando estructura para tabla proyecto_db.procesosxalumno
CREATE TABLE IF NOT EXISTS `procesosxalumno` (
  `Procesos_idProcesos` int NOT NULL AUTO_INCREMENT,
  `Alumnos_idAlumnos` int NOT NULL,
  `logrado_puntos` int DEFAULT NULL,
  `estado` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT 'No entregado',
  `fecha_entregado` date DEFAULT NULL,
  PRIMARY KEY (`Procesos_idProcesos`,`Alumnos_idAlumnos`),
  KEY `fk_ProcesosxAlumno_Alumnos1_idx` (`Alumnos_idAlumnos`),
  CONSTRAINT `fk_ProcesosxAlumno_Alumnos1` FOREIGN KEY (`Alumnos_idAlumnos`) REFERENCES `alumnos` (`idAlumnos`),
  CONSTRAINT `fk_ProcesosxAlumno_Procesos1` FOREIGN KEY (`Procesos_idProcesos`) REFERENCES `procesos` (`idProcesos`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla proyecto_db.procesosxalumno: ~0 rows (aproximadamente)

-- Volcando estructura para tabla proyecto_db.profesores
CREATE TABLE IF NOT EXISTS `profesores` (
  `idProfesores` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(45) NOT NULL,
  `Apellido` varchar(45) NOT NULL,
  `Correo` varchar(45) DEFAULT NULL,
  `Numero_telefono` bigint NOT NULL DEFAULT '0',
  `Numero_docu` bigint NOT NULL DEFAULT '0',
  `Estado_civil_idEstado_civil` int NOT NULL,
  `Nacionalidad_idNacionalidad` int NOT NULL,
  `Documento_idDocumento` int NOT NULL,
  `usuario_idusuario` int DEFAULT NULL,
  PRIMARY KEY (`idProfesores`),
  KEY `fk_Profesores_Estado_civil_idx` (`Estado_civil_idEstado_civil`),
  KEY `fk_Profesores_Nacionalidad1_idx` (`Nacionalidad_idNacionalidad`),
  KEY `fk_Profesores_Documento1_idx` (`Documento_idDocumento`),
  KEY `fk_Profesores_usuario1_idx` (`usuario_idusuario`),
  CONSTRAINT `fk_Profesores_Documento1` FOREIGN KEY (`Documento_idDocumento`) REFERENCES `documento` (`idDocumento`),
  CONSTRAINT `fk_Profesores_Estado_civil` FOREIGN KEY (`Estado_civil_idEstado_civil`) REFERENCES `estado_civil` (`idEstado_civil`),
  CONSTRAINT `fk_Profesores_Nacionalidad1` FOREIGN KEY (`Nacionalidad_idNacionalidad`) REFERENCES `nacionalidad` (`idNacionalidad`),
  CONSTRAINT `fk_Profesores_usuario1` FOREIGN KEY (`usuario_idusuario`) REFERENCES `usuario` (`idusuario`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla proyecto_db.profesores: ~6 rows (aproximadamente)
INSERT INTO `profesores` (`idProfesores`, `Nombre`, `Apellido`, `Correo`, `Numero_telefono`, `Numero_docu`, `Estado_civil_idEstado_civil`, `Nacionalidad_idNacionalidad`, `Documento_idDocumento`, `usuario_idusuario`) VALUES
	(33, 'Profesor', 'Jirafalaes', 'dsa@7878', 165165, 111111, 1, 14, 1, 24),
	(34, 'Maestrongo', 'Maestroli', 'hital12.ci@gmail.com', 10998, 65135, 1, 1, 1, 25),
	(35, 'Pepe', 'Frestes', 'ifd2021.carlos.ibarra@gmail.com', 321213, 2323, 1, 1, 1, 26),
	(37, 'Julio', 'Merendez', 'hital12.ci@gmail.com', 321321, 3123, 1, 14, 1, 29),
	(38, 'Alfonso', 'Gutierrez', 'asdsa@das.com', 321, 32131331, 1, 1, 1, 30),
	(39, 'Richard', 'Hawkings Junior', 'hital12.ci@gmail.com', 166, 741252397, 1, 14, 1, 31);

-- Volcando estructura para tabla proyecto_db.seccion
CREATE TABLE IF NOT EXISTS `seccion` (
  `idSeccion` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(45) NOT NULL,
  PRIMARY KEY (`idSeccion`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla proyecto_db.seccion: ~10 rows (aproximadamente)
INSERT INTO `seccion` (`idSeccion`, `descripcion`) VALUES
	(1, 'A'),
	(2, 'B'),
	(3, 'C'),
	(4, 'D'),
	(5, 'E'),
	(6, 'F'),
	(7, 'G'),
	(8, 'H'),
	(9, 'I'),
	(10, 'J');

-- Volcando estructura para tabla proyecto_db.semestre
CREATE TABLE IF NOT EXISTS `semestre` (
  `idSemestre` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(50) NOT NULL,
  `Seccion_idSeccion` int DEFAULT NULL,
  `Materias_idMaterias` int NOT NULL,
  `Profesores_idProfesores` int NOT NULL,
  PRIMARY KEY (`idSemestre`),
  KEY `fk_Semestre_Seccion1_idx` (`Seccion_idSeccion`),
  KEY `fk_Semestre_Materias1_idx` (`Materias_idMaterias`),
  KEY `fk_Semestre_Profesores1_idx` (`Profesores_idProfesores`),
  CONSTRAINT `fk_Semestre_Materias1` FOREIGN KEY (`Materias_idMaterias`) REFERENCES `materias` (`idMaterias`),
  CONSTRAINT `fk_Semestre_Profesores1` FOREIGN KEY (`Profesores_idProfesores`) REFERENCES `profesores` (`idProfesores`),
  CONSTRAINT `fk_Semestre_Seccion1` FOREIGN KEY (`Seccion_idSeccion`) REFERENCES `seccion` (`idSeccion`)
) ENGINE=InnoDB AUTO_INCREMENT=112 DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla proyecto_db.semestre: ~0 rows (aproximadamente)

-- Volcando estructura para tabla proyecto_db.tipo_indicador
CREATE TABLE IF NOT EXISTS `tipo_indicador` (
  `idTipoIndicador` int NOT NULL AUTO_INCREMENT,
  `Descripcion` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idTipoIndicador`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla proyecto_db.tipo_indicador: ~3 rows (aproximadamente)
INSERT INTO `tipo_indicador` (`idTipoIndicador`, `Descripcion`) VALUES
	(1, 'General'),
	(2, 'Específico'),
	(3, 'Imprescindible');

-- Volcando estructura para tabla proyecto_db.tipo_proceso
CREATE TABLE IF NOT EXISTS `tipo_proceso` (
  `idTipo_proceso` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(45) NOT NULL,
  PRIMARY KEY (`idTipo_proceso`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla proyecto_db.tipo_proceso: ~5 rows (aproximadamente)
INSERT INTO `tipo_proceso` (`idTipo_proceso`, `descripcion`) VALUES
	(1, 'Sumativo'),
	(2, 'Práctico'),
	(3, 'Examen'),
	(4, 'Tarea Clase'),
	(5, 'Extraordinaria');

-- Volcando estructura para tabla proyecto_db.tipo_usuario
CREATE TABLE IF NOT EXISTS `tipo_usuario` (
  `idTipo_usuario` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idTipo_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla proyecto_db.tipo_usuario: ~3 rows (aproximadamente)
INSERT INTO `tipo_usuario` (`idTipo_usuario`, `descripcion`) VALUES
	(1, 'Admin'),
	(2, 'Profesor'),
	(3, 'Alumno');

-- Volcando estructura para tabla proyecto_db.usuario
CREATE TABLE IF NOT EXISTS `usuario` (
  `idusuario` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) DEFAULT NULL,
  `password` varchar(60) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `Tipo_usuario_idTipo_usuario` int NOT NULL,
  `Alumnos_idAlumnos` int DEFAULT NULL,
  PRIMARY KEY (`idusuario`),
  KEY `fk_usuario_Tipo_usuario1_idx` (`Tipo_usuario_idTipo_usuario`),
  KEY `fk_usuario_Alumnos1_idx` (`Alumnos_idAlumnos`),
  CONSTRAINT `fk_usuario_Alumnos1` FOREIGN KEY (`Alumnos_idAlumnos`) REFERENCES `alumnos` (`idAlumnos`),
  CONSTRAINT `fk_usuario_Tipo_usuario1` FOREIGN KEY (`Tipo_usuario_idTipo_usuario`) REFERENCES `tipo_usuario` (`idTipo_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla proyecto_db.usuario: ~17 rows (aproximadamente)
INSERT INTO `usuario` (`idusuario`, `username`, `password`, `Tipo_usuario_idTipo_usuario`, `Alumnos_idAlumnos`) VALUES
	(5, 'admin1', '$2b$10$7VI4AM1E3SFmULZoLyHsMe/CG7.Fzkws5zhYIUw0ZArAcq7TkuO8S', 1, NULL),
	(6, 'admin2', '$2b$10$kGkk6nslW2.sEhC80ozWmet.AqV/8gvCoB8BV7DgNNCV4NwZpYj0G', 1, NULL),
	(7, 'admin3', '$2b$10$7dMjI41aPEo8WSXRcSoIj.k9Q0O3/mA.6c/BessQYhXwz41DWpHjG', 1, NULL),
	(8, 'admin4', '$2b$10$quGNiQ8xoDt.IMh7Z0m2f.fWydO8AHhyFOlXmxJnhM11UBrC.049G', 1, NULL),
	(11, '2626', '$2b$10$twi2OOvm0Cfxx0wWBQyj7e5x2V7DB2a94Cr8FNjPtiO436SmFC/zK', 3, 99),
	(12, '1650', '$2b$10$Gt1CZsy7J4EiB9kEte6LtOzW0we68O3qKD8mt0DXXiWlKCMgyizAG', 3, 100),
	(23, '1456165', '$2b$10$rMnvRpim5/g1USAgHi3jbud1ZgyI992skfTwqpGOY/KyO6qjXdHby', 3, 101),
	(24, '111111', '$2b$10$RfPjbvY/rWx3oB.e6koaveBgcGqvg..0Q0M6oZrgom6oVrf9ssgq6', 2, NULL),
	(25, '65135', '$2b$10$O.if.xPAsDsCasCJFveROexhHmd.nAGNe3rqlX6ss8QYFLIhgwwNS', 2, NULL),
	(26, '2323', '$2b$10$fKjZI6ZVpzLgYMMBylZPP.DiSQqk3b8sWdea.zuXd6dI3RKJgvAUG', 2, NULL),
	(27, '412421', '$2b$10$MsPVIaQWNZ1N/tBCpfSo/OlJySkuxnQf/wEk93.L9BdQD9KoONj6W', 3, 102),
	(29, '3123', '$2b$10$ElIb7eM6yi.KrVn5yleOqu1nMi8ow5azuKAS1faQBvvs3H4UWsoqW', 2, NULL),
	(30, '32131331', '$2b$10$N9GmQ4I0EH9Wsn5/eznbA.9Wq3Lv3Qw3Ys8.2p6iWX4wXh5CsyX.q', 2, NULL),
	(31, '0741252397', '$2b$10$ry10T48HIxO/zY5GFSh6ee8ILDwpjGQ4GsSJWU1bgvZC4.pvdZdA6', 2, NULL),
	(32, '4917107', '$2b$10$eVtSbSlYoqBOimbhOscieOy6xNROx/aC5XQflqmTO0t4TWAzKy2qK', 3, 103),
	(33, '3213215', '$2b$10$wXsThcVOzZXmQSl0cUJtg.kjR0MhHdMTzNEXiS.s26SiEyFa0/q.y', 3, 104),
	(34, '16513513', '$2b$10$ZRj8j1CLSU3oKUyulhC22OHntRP9qvs1KKYazGajxVKA/0aO53TIa', 3, 105);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
