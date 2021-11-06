-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.6.4-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para opem
DROP DATABASE IF EXISTS `opem`;
CREATE DATABASE IF NOT EXISTS `opem` /*!40100 DEFAULT CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish_ci */;
USE `opem`;

-- Volcando estructura para tabla opem.certificaciones
DROP TABLE IF EXISTS `certificaciones`;
CREATE TABLE IF NOT EXISTS `certificaciones` (
  `id_cer` int(11) NOT NULL AUTO_INCREMENT,
  `fechainicio_cer` date DEFAULT NULL,
  `fechafin_cer` date DEFAULT NULL,
  `horas_cer` int(11) DEFAULT NULL,
  `idcur_cer` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_cer`),
  KEY `FK_certificaciones_cursos` (`idcur_cer`),
  CONSTRAINT `FK_certificaciones_cursos` FOREIGN KEY (`idcur_cer`) REFERENCES `cursos` (`id_cur`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

-- Volcando datos para la tabla opem.certificaciones: ~9 rows (aproximadamente)
DELETE FROM `certificaciones`;
/*!40000 ALTER TABLE `certificaciones` DISABLE KEYS */;
INSERT INTO `certificaciones` (`id_cer`, `fechainicio_cer`, `fechafin_cer`, `horas_cer`, `idcur_cer`) VALUES
	(1, '2021-04-12', '2021-11-01', 48, 1),
	(2, '2021-04-12', '2021-11-01', 48, 1),
	(3, '2021-04-12', '2021-11-01', 48, 1),
	(4, '2021-04-12', '2021-11-01', 48, 1),
	(5, '2021-04-12', '2021-11-01', 48, 1),
	(6, '2021-04-12', '2021-11-01', 48, 1),
	(7, '2021-04-12', '2021-11-01', 48, 1),
	(8, '2021-04-12', '2021-11-01', 48, 1),
	(9, '2021-04-12', '2021-11-01', 48, 1);
/*!40000 ALTER TABLE `certificaciones` ENABLE KEYS */;

-- Volcando estructura para tabla opem.certificaciones_colaboradores
DROP TABLE IF EXISTS `certificaciones_colaboradores`;
CREATE TABLE IF NOT EXISTS `certificaciones_colaboradores` (
  `id_ceco` int(11) NOT NULL AUTO_INCREMENT,
  `idcer_ceco` int(11) NOT NULL,
  `idcol_ceco` int(11) DEFAULT NULL,
  `idemp_ceco` int(11) DEFAULT NULL,
  `estado_ceco` int(11) DEFAULT NULL,
  `descargado_ceco` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_ceco`),
  KEY `FK_certificaciones_colaboradores_certificaciones` (`idcer_ceco`),
  KEY `FK_certificaciones_colaboradores_colaboradores` (`idcol_ceco`),
  CONSTRAINT `FK_certificaciones_colaboradores_certificaciones` FOREIGN KEY (`idcer_ceco`) REFERENCES `certificaciones` (`id_cer`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_certificaciones_colaboradores_colaboradores` FOREIGN KEY (`idcol_ceco`) REFERENCES `colaboradores` (`id_col`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

-- Volcando datos para la tabla opem.certificaciones_colaboradores: ~0 rows (aproximadamente)
DELETE FROM `certificaciones_colaboradores`;
/*!40000 ALTER TABLE `certificaciones_colaboradores` DISABLE KEYS */;
/*!40000 ALTER TABLE `certificaciones_colaboradores` ENABLE KEYS */;

-- Volcando estructura para tabla opem.colaboradores
DROP TABLE IF EXISTS `colaboradores`;
CREATE TABLE IF NOT EXISTS `colaboradores` (
  `id_col` int(11) NOT NULL AUTO_INCREMENT,
  `paisdocumento_col` int(11) NOT NULL DEFAULT 0,
  `tipodocumento_col` int(11) NOT NULL DEFAULT 0,
  `numerodocumento_col` int(11) NOT NULL DEFAULT 0,
  `nombres_col` varchar(200) COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  `apellidos_col` varchar(200) COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  `fechanacimiento_col` date DEFAULT NULL,
  `correopersonal_col` varchar(200) COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  `telefono_col` varchar(15) COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  `direccion_col` varchar(100) COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  `idemp_col` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_col`),
  KEY `FK_colaboradores_empresa` (`idemp_col`),
  CONSTRAINT `FK_colaboradores_empresa` FOREIGN KEY (`idemp_col`) REFERENCES `empresa` (`id_emp`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

-- Volcando datos para la tabla opem.colaboradores: ~3 rows (aproximadamente)
DELETE FROM `colaboradores`;
/*!40000 ALTER TABLE `colaboradores` DISABLE KEYS */;
INSERT INTO `colaboradores` (`id_col`, `paisdocumento_col`, `tipodocumento_col`, `numerodocumento_col`, `nombres_col`, `apellidos_col`, `fechanacimiento_col`, `correopersonal_col`, `telefono_col`, `direccion_col`, `idemp_col`) VALUES
	(1, 0, 0, 1095811763, 'Jorge Enrique', 'Mojica', '1992-04-12', 'jorge.mojica92@gmail.com', '3175391309', 'calle falsa 123', 1),
	(2, 0, 0, 321654987, 'Emilio', 'Mojica', '1965-11-03', 'emilio@gmail.com', '3152587456', 'calle 45', 1),
	(3, 0, 0, 1095811763, 'Pepito Enrique', 'Perez', '1992-04-12', 'pepo.perez@gmail.com', '3175391309', 'calle falsa 123', 1);
/*!40000 ALTER TABLE `colaboradores` ENABLE KEYS */;

-- Volcando estructura para tabla opem.cursos
DROP TABLE IF EXISTS `cursos`;
CREATE TABLE IF NOT EXISTS `cursos` (
  `id_cur` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_cur` varchar(200) COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  `descripcion_cur` varchar(2000) COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`id_cur`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

-- Volcando datos para la tabla opem.cursos: ~2 rows (aproximadamente)
DELETE FROM `cursos`;
/*!40000 ALTER TABLE `cursos` DISABLE KEYS */;
INSERT INTO `cursos` (`id_cur`, `nombre_cur`, `descripcion_cur`) VALUES
	(1, 'Desarrollo web', 'Desarrollar en los diferentes frameworks'),
	(2, 'Pruebas', 'Prueba');
/*!40000 ALTER TABLE `cursos` ENABLE KEYS */;

-- Volcando estructura para tabla opem.departamentos
DROP TABLE IF EXISTS `departamentos`;
CREATE TABLE IF NOT EXISTS `departamentos` (
  `id_dep` int(11) NOT NULL,
  `codigo_dep` int(11) DEFAULT NULL,
  `nombre_dep` varchar(40) COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  `idpais_dep` int(11) DEFAULT 1,
  PRIMARY KEY (`id_dep`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

-- Volcando datos para la tabla opem.departamentos: ~33 rows (aproximadamente)
DELETE FROM `departamentos`;
/*!40000 ALTER TABLE `departamentos` DISABLE KEYS */;
INSERT INTO `departamentos` (`id_dep`, `codigo_dep`, `nombre_dep`, `idpais_dep`) VALUES
	(5, 5, 'ANTIOQUIA', 1),
	(8, 8, 'ATLANTICO', 1),
	(11, 11, 'BOGOTA', 1),
	(13, 13, 'BOLIVAR', 1),
	(15, 15, 'BOYACA', 1),
	(17, 17, 'CALDAS', 1),
	(18, 18, 'CAQUETA', 1),
	(19, 19, 'CAUCA', 1),
	(20, 20, 'CESAR', 1),
	(23, 23, 'CORDOBA', 1),
	(25, 25, 'CUNDINAMARCA', 1),
	(27, 27, 'CHOCO', 1),
	(41, 41, 'HUILA', 1),
	(44, 44, 'LA GUAJIRA', 1),
	(47, 47, 'MAGDALENA', 1),
	(50, 50, 'META', 1),
	(52, 52, 'NARIÑO', 1),
	(54, 54, 'N. DE SANTANDER', 1),
	(63, 63, 'QUINDIO', 1),
	(66, 66, 'RISARALDA', 1),
	(68, 68, 'SANTANDER', 1),
	(70, 70, 'SUCRE', 1),
	(73, 73, 'TOLIMA', 1),
	(76, 76, 'VALLE DEL CAUCA', 1),
	(81, 81, 'ARAUCA', 1),
	(85, 85, 'CASANARE', 1),
	(86, 86, 'PUTUMAYO', 1),
	(88, 88, 'SAN ANDRES', 1),
	(91, 91, 'AMAZONAS', 1),
	(94, 94, 'GUAINIA', 1),
	(95, 95, 'GUAVIARE', 1),
	(97, 97, 'VAUPES', 1),
	(99, 99, 'VICHADA', 1);
/*!40000 ALTER TABLE `departamentos` ENABLE KEYS */;

-- Volcando estructura para tabla opem.empresa
DROP TABLE IF EXISTS `empresa`;
CREATE TABLE IF NOT EXISTS `empresa` (
  `id_emp` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_emp` varchar(80) COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  `nit_emp` varchar(12) COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  `telefono_emp` varchar(11) COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  `correo_emp` varchar(200) COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  `direccion_emp` varchar(200) COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  `personacontacto_emp` varchar(200) COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`id_emp`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

-- Volcando datos para la tabla opem.empresa: ~0 rows (aproximadamente)
DELETE FROM `empresa`;
/*!40000 ALTER TABLE `empresa` DISABLE KEYS */;
INSERT INTO `empresa` (`id_emp`, `nombre_emp`, `nit_emp`, `telefono_emp`, `correo_emp`, `direccion_emp`, `personacontacto_emp`) VALUES
	(1, 'urv marin valencia', '800456123', '3175391309', 'malval@marval.com.co', 'calle 29 47-56', 'Deyson Delgado');
/*!40000 ALTER TABLE `empresa` ENABLE KEYS */;

-- Volcando estructura para tabla opem.pais
DROP TABLE IF EXISTS `pais`;
CREATE TABLE IF NOT EXISTS `pais` (
  `id_pais` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_pais` varchar(200) COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  `inicianles_pais` varchar(3) COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`id_pais`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

-- Volcando datos para la tabla opem.pais: ~2 rows (aproximadamente)
DELETE FROM `pais`;
/*!40000 ALTER TABLE `pais` DISABLE KEYS */;
INSERT INTO `pais` (`id_pais`, `nombre_pais`, `inicianles_pais`) VALUES
	(1, 'Colombia', 'CO'),
	(2, 'Venezuela', 'VE');
/*!40000 ALTER TABLE `pais` ENABLE KEYS */;

-- Volcando estructura para tabla opem.tipodocumento
DROP TABLE IF EXISTS `tipodocumento`;
CREATE TABLE IF NOT EXISTS `tipodocumento` (
  `id_tipo` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_tipo` varchar(80) COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  `iniciales_tipo` varchar(4) COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`id_tipo`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

-- Volcando datos para la tabla opem.tipodocumento: ~0 rows (aproximadamente)
DELETE FROM `tipodocumento`;
/*!40000 ALTER TABLE `tipodocumento` DISABLE KEYS */;
INSERT INTO `tipodocumento` (`id_tipo`, `nombre_tipo`, `iniciales_tipo`) VALUES
	(1, 'Cedula Ciudadania', 'CC');
/*!40000 ALTER TABLE `tipodocumento` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
