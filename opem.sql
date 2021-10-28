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
  `id_cer` int(11) NOT NULL,
  `fechainicio_cer` date DEFAULT NULL,
  `fechafin_cer` date DEFAULT NULL,
  `horas_cer` int(11) DEFAULT NULL,
  `idcur_cer` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_cer`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

-- Volcando datos para la tabla opem.certificaciones: ~0 rows (aproximadamente)
DELETE FROM `certificaciones`;
/*!40000 ALTER TABLE `certificaciones` DISABLE KEYS */;
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
  CONSTRAINT `FK_certificaciones_colaboradores_certificaciones` FOREIGN KEY (`idcer_ceco`) REFERENCES `certificaciones` (`id_cer`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

-- Volcando datos para la tabla opem.certificaciones_colaboradores: ~0 rows (aproximadamente)
DELETE FROM `certificaciones_colaboradores`;
/*!40000 ALTER TABLE `certificaciones_colaboradores` DISABLE KEYS */;
/*!40000 ALTER TABLE `certificaciones_colaboradores` ENABLE KEYS */;

-- Volcando estructura para tabla opem.colaboradores
DROP TABLE IF EXISTS `colaboradores`;
CREATE TABLE IF NOT EXISTS `colaboradores` (
  `id_col` int(11) NOT NULL AUTO_INCREMENT,
  `documento_col` int(11) NOT NULL DEFAULT 0,
  `nombres_col` varchar(200) COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  `apellidos_col` varchar(200) COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  `fechanacimiento_col` date DEFAULT NULL,
  `correopersonal_col` varchar(200) COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  `telefono_col` varchar(15) COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  `direccion_col` varchar(100) COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  `idemp_col` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_col`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

-- Volcando datos para la tabla opem.colaboradores: ~0 rows (aproximadamente)
DELETE FROM `colaboradores`;
/*!40000 ALTER TABLE `colaboradores` DISABLE KEYS */;
/*!40000 ALTER TABLE `colaboradores` ENABLE KEYS */;

-- Volcando estructura para tabla opem.cursos
DROP TABLE IF EXISTS `cursos`;
CREATE TABLE IF NOT EXISTS `cursos` (
  `id_cur` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_cur` varchar(200) COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  `descripcion_cur` varchar(2000) COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`id_cur`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

-- Volcando datos para la tabla opem.cursos: ~0 rows (aproximadamente)
DELETE FROM `cursos`;
/*!40000 ALTER TABLE `cursos` DISABLE KEYS */;
/*!40000 ALTER TABLE `cursos` ENABLE KEYS */;

-- Volcando estructura para tabla opem.empresa
DROP TABLE IF EXISTS `empresa`;
CREATE TABLE IF NOT EXISTS `empresa` (
  `id_emp` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_emp` varchar(80) COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  `nit_emp` int(11) DEFAULT NULL,
  `telefono_emp` int(11) DEFAULT NULL,
  `correo_emp` varchar(200) COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  `direccion_emp` varchar(200) COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  `personacontacto_emp` varchar(200) COLLATE utf8mb3_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`id_emp`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish_ci;

-- Volcando datos para la tabla opem.empresa: ~0 rows (aproximadamente)
DELETE FROM `empresa`;
/*!40000 ALTER TABLE `empresa` DISABLE KEYS */;
/*!40000 ALTER TABLE `empresa` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
