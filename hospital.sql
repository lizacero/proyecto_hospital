CREATE DATABASE hospital;

USE hospital;

CREATE TABLE `medicos` (
  `cedulaM` int PRIMARY KEY,
  `nombreM` varchar(100),
  `apellidoM` varchar(100),
  `especialidad` varchar(150),
  `consultorio` char(3),
  `correo` varchar(100)
);

CREATE TABLE `pacientes` (
  `cedulaP` int PRIMARY KEY,
  `nombreP` varchar(100),
  `apellidoP` varchar(100),
  `edad` int,
  `telefono` int
);

CREATE TABLE `cita_medica` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `id_paciente` int,
  `id_medico` int,
  `fecha` date
);

ALTER TABLE `cita_medica` ADD FOREIGN KEY (`id_paciente`) REFERENCES `pacientes` (`cedulaP`);

ALTER TABLE `cita_medica` ADD FOREIGN KEY (`id_medico`) REFERENCES `medicos` (`cedulaM`);