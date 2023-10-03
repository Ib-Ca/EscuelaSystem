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
  `Numero_docu` int NOT NULL,
  `Numero_telefono` int NOT NULL,
  `Lugar_nacimiento` varchar(45) DEFAULT NULL,
  `Fecha_nacimiento` date DEFAULT NULL,
  `Correo` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `Estado_civil_idEstado_civil` int NOT NULL,
  `Documento_idDocumento` int NOT NULL,
  `Nacionalidad_idNacionalidad` int NOT NULL,
  `Semestre_idSemestre` int NOT NULL,
  `Estado_alumno_idEstado_alumno` int NOT NULL,
  `Movilidad_idMovilidad` int NOT NULL,
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla proyecto_db.alumnos: ~0 rows (aproximadamente)

-- Volcando estructura para tabla proyecto_db.asistencias
CREATE TABLE IF NOT EXISTS `asistencias` (
  `idAsistencias` int NOT NULL AUTO_INCREMENT,
  `Horario_idHorario` int NOT NULL,
  `fecha` date NOT NULL,
  PRIMARY KEY (`idAsistencias`),
  KEY `fk_Asistencias_Horario1_idx` (`Horario_idHorario`),
  CONSTRAINT `fk_Asistencias_Horario1` FOREIGN KEY (`Horario_idHorario`) REFERENCES `horario` (`idHorario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla proyecto_db.asistencias: ~0 rows (aproximadamente)

-- Volcando estructura para tabla proyecto_db.avisos
CREATE TABLE IF NOT EXISTS `avisos` (
  `idAvisos` int NOT NULL AUTO_INCREMENT,
  `fecha` date NOT NULL,
  `tipo` varchar(45) DEFAULT NULL,
  `descripcion` varchar(45) DEFAULT NULL,
  `autor` varchar(45) NOT NULL,
  `usuario_idusuario` int NOT NULL,
  PRIMARY KEY (`idAvisos`),
  KEY `fk_Avisos_usuario1_idx` (`usuario_idusuario`),
  CONSTRAINT `fk_Avisos_usuario1` FOREIGN KEY (`usuario_idusuario`) REFERENCES `usuario` (`idusuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla proyecto_db.avisos: ~0 rows (aproximadamente)

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
	(1, 'activo'),
	(2, 'graduado'),
	(3, 'expulsado');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla proyecto_db.gravedad_observacion: ~0 rows (aproximadamente)

-- Volcando estructura para tabla proyecto_db.horario
CREATE TABLE IF NOT EXISTS `horario` (
  `idHorario` int NOT NULL AUTO_INCREMENT,
  `dias` varchar(45) NOT NULL,
  `fin` varchar(45) NOT NULL,
  `año` int NOT NULL,
  `estado` varchar(45) NOT NULL,
  `Semestre_idSemestre` int NOT NULL,
  PRIMARY KEY (`idHorario`),
  KEY `fk_Horario_Semestre1_idx` (`Semestre_idSemestre`),
  CONSTRAINT `fk_Horario_Semestre1` FOREIGN KEY (`Semestre_idSemestre`) REFERENCES `semestre` (`idSemestre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla proyecto_db.horario: ~0 rows (aproximadamente)

-- Volcando estructura para tabla proyecto_db.indicadores
CREATE TABLE IF NOT EXISTS `indicadores` (
  `idIndicadores` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(45) NOT NULL,
  PRIMARY KEY (`idIndicadores`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla proyecto_db.indicadores: ~0 rows (aproximadamente)

-- Volcando estructura para tabla proyecto_db.indicadores_proceso
CREATE TABLE IF NOT EXISTS `indicadores_proceso` (
  `Procesos_idProcesos` int NOT NULL AUTO_INCREMENT,
  `Indicadores_idIndicadores` int NOT NULL,
  `Alumnos_idAlumnos` int NOT NULL,
  `logrado` int NOT NULL,
  PRIMARY KEY (`Procesos_idProcesos`,`Indicadores_idIndicadores`,`Alumnos_idAlumnos`),
  KEY `fk_Indicadores_proceso_Indicadores1_idx` (`Indicadores_idIndicadores`),
  KEY `fk_Indicadores_proceso_Alumnos1_idx` (`Alumnos_idAlumnos`),
  CONSTRAINT `fk_Indicadores_proceso_Alumnos1` FOREIGN KEY (`Alumnos_idAlumnos`) REFERENCES `alumnos` (`idAlumnos`),
  CONSTRAINT `fk_Indicadores_proceso_Indicadores1` FOREIGN KEY (`Indicadores_idIndicadores`) REFERENCES `indicadores` (`idIndicadores`),
  CONSTRAINT `fk_Indicadores_proceso_Procesos1` FOREIGN KEY (`Procesos_idProcesos`) REFERENCES `procesos` (`idProcesos`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla proyecto_db.indicadores_proceso: ~0 rows (aproximadamente)

-- Volcando estructura para tabla proyecto_db.materias
CREATE TABLE IF NOT EXISTS `materias` (
  `idMaterias` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(45) NOT NULL,
  `Carga horaria` int NOT NULL,
  PRIMARY KEY (`idMaterias`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla proyecto_db.materias: ~0 rows (aproximadamente)

-- Volcando estructura para tabla proyecto_db.movilidad
CREATE TABLE IF NOT EXISTS `movilidad` (
  `idMovilidad` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(49) NOT NULL,
  `distancia` int DEFAULT NULL,
  `tiempo` int DEFAULT NULL,
  PRIMARY KEY (`idMovilidad`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla proyecto_db.movilidad: ~0 rows (aproximadamente)

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
  `descripcion` varchar(45) NOT NULL,
  `fecha` varchar(45) NOT NULL,
  `Profesores_idProfesores` int NOT NULL,
  `Gravedad_observacion_idGravedad_observacion` int NOT NULL,
  PRIMARY KEY (`idObservacion`),
  KEY `fk_Observacion_Alumnos1_idx` (`Alumnos_idAlumnos`),
  KEY `fk_Observacion_Profesores1_idx` (`Profesores_idProfesores`),
  KEY `fk_Observacion_Gravedad_observacion1_idx` (`Gravedad_observacion_idGravedad_observacion`),
  CONSTRAINT `fk_Observacion_Alumnos1` FOREIGN KEY (`Alumnos_idAlumnos`) REFERENCES `alumnos` (`idAlumnos`),
  CONSTRAINT `fk_Observacion_Gravedad_observacion1` FOREIGN KEY (`Gravedad_observacion_idGravedad_observacion`) REFERENCES `gravedad_observacion` (`idGravedad_observacion`),
  CONSTRAINT `fk_Observacion_Profesores1` FOREIGN KEY (`Profesores_idProfesores`) REFERENCES `profesores` (`idProfesores`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla proyecto_db.observacion: ~0 rows (aproximadamente)

-- Volcando estructura para tabla proyecto_db.presencia
CREATE TABLE IF NOT EXISTS `presencia` (
  `idPresencia` int NOT NULL AUTO_INCREMENT,
  `Alumnos_idAlumnos` int NOT NULL,
  `Asistencias_idAsistencias` int NOT NULL,
  PRIMARY KEY (`idPresencia`,`Alumnos_idAlumnos`,`Asistencias_idAsistencias`),
  KEY `fk_Presencia_Alumnos1_idx` (`Alumnos_idAlumnos`),
  KEY `fk_Presencia_Asistencias1_idx` (`Asistencias_idAsistencias`),
  CONSTRAINT `fk_Presencia_Alumnos1` FOREIGN KEY (`Alumnos_idAlumnos`) REFERENCES `alumnos` (`idAlumnos`),
  CONSTRAINT `fk_Presencia_Asistencias1` FOREIGN KEY (`Asistencias_idAsistencias`) REFERENCES `asistencias` (`idAsistencias`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla proyecto_db.presencia: ~0 rows (aproximadamente)

-- Volcando estructura para tabla proyecto_db.procesos
CREATE TABLE IF NOT EXISTS `procesos` (
  `idProcesos` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `fecha` varchar(45) NOT NULL,
  `fecha_entrega` varchar(45) NOT NULL,
  `total_puntos` int NOT NULL,
  `Tipo_proceso_idTipo_proceso` int NOT NULL,
  `Semestre_idSemestre` int NOT NULL,
  PRIMARY KEY (`idProcesos`),
  KEY `fk_Procesos_Tipo_proceso1_idx` (`Tipo_proceso_idTipo_proceso`),
  KEY `fk_Procesos_Semestre1_idx` (`Semestre_idSemestre`),
  CONSTRAINT `fk_Procesos_Semestre1` FOREIGN KEY (`Semestre_idSemestre`) REFERENCES `semestre` (`idSemestre`),
  CONSTRAINT `fk_Procesos_Tipo_proceso1` FOREIGN KEY (`Tipo_proceso_idTipo_proceso`) REFERENCES `tipo_proceso` (`idTipo_proceso`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla proyecto_db.procesos: ~0 rows (aproximadamente)

-- Volcando estructura para tabla proyecto_db.procesosxalumno
CREATE TABLE IF NOT EXISTS `procesosxalumno` (
  `Procesos_idProcesos` int NOT NULL AUTO_INCREMENT,
  `Alumnos_idAlumnos` int NOT NULL,
  `logrado_puntos` int NOT NULL,
  PRIMARY KEY (`Procesos_idProcesos`,`Alumnos_idAlumnos`),
  KEY `fk_ProcesosxAlumno_Alumnos1_idx` (`Alumnos_idAlumnos`),
  CONSTRAINT `fk_ProcesosxAlumno_Alumnos1` FOREIGN KEY (`Alumnos_idAlumnos`) REFERENCES `alumnos` (`idAlumnos`),
  CONSTRAINT `fk_ProcesosxAlumno_Procesos1` FOREIGN KEY (`Procesos_idProcesos`) REFERENCES `procesos` (`idProcesos`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla proyecto_db.procesosxalumno: ~0 rows (aproximadamente)

-- Volcando estructura para tabla proyecto_db.profesores
CREATE TABLE IF NOT EXISTS `profesores` (
  `idProfesores` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(45) NOT NULL,
  `Apellido` varchar(45) NOT NULL,
  `Correo` varchar(45) DEFAULT NULL,
  `Numero_telefono` int NOT NULL,
  `Numero_docu` int NOT NULL,
  `Estado_civil_idEstado_civil` int NOT NULL,
  `Nacionalidad_idNacionalidad` int NOT NULL,
  `Documento_idDocumento` int NOT NULL,
  `usuario_idusuario` int NOT NULL,
  PRIMARY KEY (`idProfesores`),
  KEY `fk_Profesores_Estado_civil_idx` (`Estado_civil_idEstado_civil`),
  KEY `fk_Profesores_Nacionalidad1_idx` (`Nacionalidad_idNacionalidad`),
  KEY `fk_Profesores_Documento1_idx` (`Documento_idDocumento`),
  KEY `fk_Profesores_usuario1_idx` (`usuario_idusuario`),
  CONSTRAINT `fk_Profesores_Documento1` FOREIGN KEY (`Documento_idDocumento`) REFERENCES `documento` (`idDocumento`),
  CONSTRAINT `fk_Profesores_Estado_civil` FOREIGN KEY (`Estado_civil_idEstado_civil`) REFERENCES `estado_civil` (`idEstado_civil`),
  CONSTRAINT `fk_Profesores_Nacionalidad1` FOREIGN KEY (`Nacionalidad_idNacionalidad`) REFERENCES `nacionalidad` (`idNacionalidad`),
  CONSTRAINT `fk_Profesores_usuario1` FOREIGN KEY (`usuario_idusuario`) REFERENCES `usuario` (`idusuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla proyecto_db.profesores: ~0 rows (aproximadamente)

-- Volcando estructura para tabla proyecto_db.seccion
CREATE TABLE IF NOT EXISTS `seccion` (
  `idSeccion` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(45) NOT NULL,
  PRIMARY KEY (`idSeccion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla proyecto_db.seccion: ~0 rows (aproximadamente)

-- Volcando estructura para tabla proyecto_db.semestre
CREATE TABLE IF NOT EXISTS `semestre` (
  `idSemestre` int NOT NULL AUTO_INCREMENT,
  `Seccion_idSeccion` int NOT NULL,
  `Semestre_numeros_idSemestre_numeros` int NOT NULL,
  `Materias_idMaterias` int NOT NULL,
  `Profesores_idProfesores` int NOT NULL,
  PRIMARY KEY (`idSemestre`),
  KEY `fk_Semestre_Seccion1_idx` (`Seccion_idSeccion`),
  KEY `fk_Semestre_Semestre_numeros1_idx` (`Semestre_numeros_idSemestre_numeros`),
  KEY `fk_Semestre_Materias1_idx` (`Materias_idMaterias`),
  KEY `fk_Semestre_Profesores1_idx` (`Profesores_idProfesores`),
  CONSTRAINT `fk_Semestre_Materias1` FOREIGN KEY (`Materias_idMaterias`) REFERENCES `materias` (`idMaterias`),
  CONSTRAINT `fk_Semestre_Profesores1` FOREIGN KEY (`Profesores_idProfesores`) REFERENCES `profesores` (`idProfesores`),
  CONSTRAINT `fk_Semestre_Seccion1` FOREIGN KEY (`Seccion_idSeccion`) REFERENCES `seccion` (`idSeccion`),
  CONSTRAINT `fk_Semestre_Semestre_numeros1` FOREIGN KEY (`Semestre_numeros_idSemestre_numeros`) REFERENCES `semestre_numeros` (`idSemestre_numeros`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla proyecto_db.semestre: ~0 rows (aproximadamente)

-- Volcando estructura para tabla proyecto_db.semestre_numeros
CREATE TABLE IF NOT EXISTS `semestre_numeros` (
  `idSemestre_numeros` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(45) NOT NULL,
  PRIMARY KEY (`idSemestre_numeros`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla proyecto_db.semestre_numeros: ~0 rows (aproximadamente)

-- Volcando estructura para tabla proyecto_db.tipo_proceso
CREATE TABLE IF NOT EXISTS `tipo_proceso` (
  `idTipo_proceso` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(45) NOT NULL,
  PRIMARY KEY (`idTipo_proceso`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla proyecto_db.tipo_proceso: ~0 rows (aproximadamente)

-- Volcando estructura para tabla proyecto_db.tipo_usuario
CREATE TABLE IF NOT EXISTS `tipo_usuario` (
  `idTipo_usuario` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idTipo_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla proyecto_db.tipo_usuario: ~0 rows (aproximadamente)

-- Volcando estructura para tabla proyecto_db.usuario
CREATE TABLE IF NOT EXISTS `usuario` (
  `idusuario` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `estado` varchar(45) DEFAULT NULL,
  `Tipo_usuario_idTipo_usuario` int NOT NULL,
  `Alumnos_idAlumnos` int NOT NULL,
  PRIMARY KEY (`idusuario`),
  KEY `fk_usuario_Tipo_usuario1_idx` (`Tipo_usuario_idTipo_usuario`),
  KEY `fk_usuario_Alumnos1_idx` (`Alumnos_idAlumnos`),
  CONSTRAINT `fk_usuario_Alumnos1` FOREIGN KEY (`Alumnos_idAlumnos`) REFERENCES `alumnos` (`idAlumnos`),
  CONSTRAINT `fk_usuario_Tipo_usuario1` FOREIGN KEY (`Tipo_usuario_idTipo_usuario`) REFERENCES `tipo_usuario` (`idTipo_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- Volcando datos para la tabla proyecto_db.usuario: ~0 rows (aproximadamente)

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
