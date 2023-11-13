-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-11-2023 a las 12:44:05
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `viajes`
--
CREATE DATABASE IF NOT EXISTS `viajes` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `viajes`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentarios`
--

CREATE TABLE `comentarios` (
  `id` int(11) NOT NULL,
  `destino_id` int(11) DEFAULT NULL,
  `nombre_usuario` varchar(255) NOT NULL,
  `comentario` text NOT NULL,
  `fecha_comentario` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `destinos`
--

CREATE TABLE `destinos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `precio` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `destinos`
--

INSERT INTO `destinos` (`id`, `nombre`, `descripcion`, `imagen`, `precio`) VALUES
(1, 'Madrid', 'Madrid, capital de España, combina historia y cultura en una vibrante metrópolis con arte, gastronomía y arquitectura impresionantes.', 'images/madrid.png', 19.99),
(2, 'Barcelona', 'Barcelona es una vibrante ciudad española conocida por su arquitectura modernista, playas y vida nocturna.', 'images/barcelona.png', 8.76),
(3, 'Benavente', 'Benavente es una encantadora ciudad española con historia, cultura y una vibrante vida local. Solo Marcos sabe donde está.', 'images/benavente.png', 0.05),
(4, 'Santiago de Compostela ', 'Santiago de Compostela, en Galicia, España, es famosa por su catedral gótica y ser destino del Camino de Santiago.', 'images/santiago.png', 89.65),
(5, 'Sevilla', 'Sevilla, en el sur de España, es famosa por su historia, arquitectura impresionante y pasión por el flamenco. No tiene playa.', 'images/sevilla.png', 12.98),
(6, 'Toledo', 'Toledo, ciudad histórica de España, famosa por su arquitectura medieval y su rica herencia cultural. La mitad de tiendas son de espadas.', 'images/toledo.png', 54.34);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imagendestino`
--

CREATE TABLE `imagendestino` (
  `idDestino` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `imagen` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `imagendestino`
--

INSERT INTO `imagendestino` (`idDestino`, `nombre`, `descripcion`, `imagen`) VALUES
(1, 'Palacio Real de Madrid', 'El Palacio Real de Madrid es el más grande de Europa Occidental y uno de los más grandes del mundo. Sus más de 135.000 metros cuadrados y 3.418 habitaciones han sido testigos de siglos de la historia de España.', 'images/madrid2.png'),
(1, 'Lago del Retiro', 'El Estanque Grande del Buen Retiro, conocido popularmente como el Estanque del Retiro, es una extensión de agua de origen natural, que se encuentra en el Parque del Retiro, en la ciudad española de Madrid.', 'images/madrid3.png'),
(1, 'Museo del Prado', 'El Museo del Prado, oficialmente Museo Nacional del Prado, es uno de los más sobresalientes del mundo​ y también figura entre los más visitados (el decimotercero en 2022 entre los dedicados al arte)', 'images/madrid4.png'),
(2, 'La Sagrada Familia', 'La Sagrada Familia, icónico templo de Gaudí en Barcelona, fusiona arquitectura modernista y elementos religiosos, una obra maestra en construcción.', 'images/barcelona2.png'),
(2, 'La Casa Batlló', 'Casa Batlló, creación de Gaudí en Barcelona, es un edificio modernista con fachada ondulante y detalles artísticos, un hito arquitectónico impresionante.', 'images/barcelona3.png'),
(3, 'Iglesia Benavente', 'La iglesia de Benavente es un antiguo templo gótico-renacentista en España, con una historia marcada por el paso del tiempo y la erosión.', 'images/benavente2.png'),
(4, 'Plaza do Obradoiro', 'La Plaza del Obradoiro, en Santiago de Compostela, es un lugar emblemático con la majestuosa Catedral de Santiago y edificios históricos que reflejan la riqueza cultural de Galicia.', 'images/santiago2.png'),
(4, 'Parque de la Alameda', 'El Parque de la Alameda en Santiago de Compostela es un hermoso espacio verde con árboles centenarios y estatuas, ideal para pasear y disfrutar de la naturaleza en el corazón de la ciudad.', 'images/santiago3.png'),
(5, 'Ciudad de Sevilla', 'Hacia el primer milenio a.c., coincidiendo con la colonización fenicia y la cultura tartésica, se remonta el origen de la ciudad de Sevilla. Su asentamiento en la confluencia de vías fluviales y terrestres facilitaron un rápido crecimiento económico ', 'images/sevilla2.png'),
(6, 'Santa Iglesia Catedral', 'La Santa Iglesia Catedral Primada de Toledo es una majestuosa catedral gótica en España, conocida por su rica historia y espléndida arquitectura.', 'images/toledo2.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservas`
--

CREATE TABLE `reservas` (
  `id` int(11) NOT NULL,
  `destino_id` int(11) DEFAULT NULL,
  `nombre_cliente` varchar(255) NOT NULL,
  `correo_cliente` varchar(255) NOT NULL,
  `fecha_reserva` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `reservas`
--

INSERT INTO `reservas` (`id`, `destino_id`, `nombre_cliente`, `correo_cliente`, `fecha_reserva`) VALUES
(1, 4, 'Lidia Gonzalez', 'lidia@gmail.com', '2023-11-10'),
(2, 4, 'Maria Garcia', 'maria@gmail.com', '2023-11-16'),
(3, 4, 'Mario Montes', '123@gmail.com', '2024-01-25'),
(4, 1, 'José María Álvarez', 'JMA@gmail.com', '2023-11-23');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `destino_id` (`destino_id`);

--
-- Indices de la tabla `destinos`
--
ALTER TABLE `destinos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `imagendestino`
--
ALTER TABLE `imagendestino`
  ADD PRIMARY KEY (`idDestino`,`imagen`);

--
-- Indices de la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `destino_id` (`destino_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `destinos`
--
ALTER TABLE `destinos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `reservas`
--
ALTER TABLE `reservas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD CONSTRAINT `comentarios_ibfk_1` FOREIGN KEY (`destino_id`) REFERENCES `destinos` (`id`);

--
-- Filtros para la tabla `imagendestino`
--
ALTER TABLE `imagendestino`
  ADD CONSTRAINT `r1` FOREIGN KEY (`idDestino`) REFERENCES `destinos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD CONSTRAINT `reservas_ibfk_1` FOREIGN KEY (`destino_id`) REFERENCES `destinos` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
