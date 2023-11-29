-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-11-2023 a las 16:58:06
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

--
-- Volcado de datos para la tabla `comentarios`
--

INSERT INTO `comentarios` (`id`, `destino_id`, `nombre_usuario`, `comentario`, `fecha_comentario`) VALUES
(1, 2, 'Lisa Simpson', 'Esto es un comentario sobre Barcelona.', '2023-11-24 07:28:29'),
(2, 2, 'Bart Simpson', 'Esto es otro comentario sobre Barcelona ', '2023-11-24 07:29:11'),
(9, 4, 'lisa simpson', 'Hice el camino de santiago en avion', '2023-11-25 12:46:21'),
(10, 4, 'lisa simpson', 'Muy bonito pero llovia', '2023-11-25 12:49:42'),
(11, 5, 'lisa simpson', 'Sevilla tiene un color especial', '2023-11-25 12:50:47'),
(12, 5, 'lisa simpson', 'Sevilla tiene un color diferente', '2023-11-25 12:51:00'),
(14, 5, 'homer simpson', 'Esto es un comentario sobre Sevilla', '2023-11-25 16:11:49'),
(15, 1, 'javier gonzalez', 'no he ido', '2023-11-25 16:13:04'),
(16, 2, 'Noelia Martín', 'Viva España', '2023-11-26 10:34:01'),
(18, 5, 'Anónimo', 'Mas comentarios sobre Sevilla', '2023-11-29 15:42:33');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `destinos`
--

CREATE TABLE `destinos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `precio` decimal(10,2) DEFAULT NULL,
  `itinerario` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `destinos`
--

INSERT INTO `destinos` (`id`, `nombre`, `descripcion`, `imagen`, `precio`, `itinerario`) VALUES
(1, 'Madrid', 'Madrid, capital de España, combina historia y cultura en una vibrante metrópolis con arte, gastronomía y arquitectura impresionantes.', 'images/madrid.png', 19.99, 'Descubre Madrid, la vibrante capital de España. Comienza tu día explorando el majestuoso Palacio Real y sus jardines. Dirígete al animado Mercado de San Miguel para saborear tapas auténticas. Explora el arte en el famoso Museo del Prado y relájate en el Parque del Retiro. Disfruta de la arquitectura en la Puerta del Sol y la Plaza Mayor. Culmina la jornada en los eclécticos barrios de Malasaña o Chueca, llenos de vida nocturna y cultura.'),
(2, 'Barcelona', 'Barcelona es una vibrante ciudad española conocida por su arquitectura modernista, playas y vida nocturna.', 'images/barcelona.png', 8.76, 'Descubre Barcelona, una ciudad cautivadora en la costa mediterránea. Explora la arquitectura modernista de Gaudí en la Sagrada Familia y el Parque Güell. Pasea por Las Ramblas, sumérgete en la historia en el Barrio Gótico y disfruta de la playa de la Barceloneta. Saborea la deliciosa gastronomía en mercados como La Boquería y vive la vibrante vida nocturna en el Barrio El Born. Con su rica cultura, arte y ambiente único, Barcelona te espera con experiencias inolvidables.'),
(3, 'Benavente', 'Benavente es una encantadora ciudad española con historia, cultura y una vibrante vida local. Solo Marcos sabe donde está.', 'images/benavente.png', 0.05, 'Benavente, ubicada en la provincia de Zamora, España, cautiva con su rica historia y encanto medieval. Explora la Plaza Mayor, flanqueada por arcos y la iglesia de Santa María del Azogue. Sumérgete en el pasado en el Parador de Turismo, una antigua fortaleza. Descubre la belleza natural a orillas del río Órbigo y déjate seducir por la gastronomía local en sus acogedores restaurantes. Con eventos culturales y festividades, Benavente te invita a disfrutar de su autenticidad y hospitalidad.'),
(4, 'Santiago de Compostela ', 'Santiago de Compostela, en Galicia, España, es famosa por su catedral gótica y ser destino del Camino de Santiago.', 'images/santiago.png', 89.65, 'Santiago de Compostela, en el noroeste de España, es una ciudad histórica y espiritual. Explora la Catedral, destino de peregrinos del Camino de Santiago. Descubre la Plaza del Obradoiro, rodeada de edificios emblemáticos. Pasea por las estrechas calles de la zona antigua y degusta la gastronomía local en la Rúa do Franco. Sumérgete en la rica cultura gallega visitando el Museo de las Peregrinaciones y disfruta de la serenidad en los parques de Alameda y Belvís.'),
(5, 'Sevilla', 'Sevilla, en el sur de España, es famosa por su historia, arquitectura impresionante y pasión por el flamenco. No tiene playa.', 'images/sevilla.png', 12.98, 'Sevilla, ciudad vibrante en el sur de España, cautiva con su rica historia, arquitectura morisca y bulliciosas calles. Explora la imponente Catedral de Sevilla, declarada Patrimonio de la Humanidad, y la Giralda. Pasea por el encantador Barrio de Santa Cruz, descubre la Plaza de España con su arquitectura única y relájate en los jardines de María Luisa. Disfruta de la auténtica cocina andaluza en tabernas locales y siente el flamenco en el histórico barrio de Triana.'),
(6, 'Toledo', 'Toledo, ciudad histórica de España, famosa por su arquitectura medieval y su rica herencia cultural. La mitad de tiendas son de espadas.', 'images/toledo.png', 54.34, 'Toledo, ciudad medieval de España, cautiva con sus calles empedradas y murallas antiguas. El Alcázar y la catedral gótica destacan en el horizonte. Explora la rica historia en el Museo El Greco y pasea por el barrio judío, donde la Sinagoga de Santa María la Blanca revela la convivencia de culturas. Saborea la gastronomía local en la Plaza Zocodover y admira el puente de Alcántara sobre el río Tajo. Toledo, ciudad encantadora, fusiona arte, arquitectura y tradición en cada rincón.');

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
(4, 1, 'José María Álvarez', 'JMA@gmail.com', '2023-11-23'),
(5, 2, 'pruebaViaje viaje', 'pb@gmail.com', '2023-11-22'),
(6, 1, 'Lidia Gonzalez', 'prueba@gmail.com', '2023-11-24'),
(7, 2, 'Lidia Gonzalez', 'lidia@gmail.com', '2023-11-30'),
(8, 2, '  asd', 'lidia@gmail.com', '2023-11-07'),
(9, 2, 'Lidia  ', 'lidia@gmail.com', '2023-12-06'),
(10, 2, 'Lidia 123', '123@a', '2023-10-30'),
(11, 2, 'Lidia Gonzalez', 'lidia@gmail.com', '2023-10-31'),
(12, 2, 'Noelia Martin', 'noelia@gmail.com', '2023-11-30');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `correo` varchar(255) NOT NULL,
  `contraseña` varchar(255) NOT NULL,
  `salt` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`nombre`, `apellido`, `correo`, `contraseña`, `salt`) VALUES
('bart', 'simpson', 'bart@gmail.com', '$2b$10$kWrNq3uCA9cz1eMhcKLet.7CyYh5WVKEG7DW1VVInKn4gJyfjgX7G', '$2b$10$kWrNq3uCA9cz1eMhcKLet.'),
('homer', 'simpson', 'homer@gmail.com', '$2b$10$mwY.3RoyQQzSSwbAkpC9ju6tJ2oEKKk4nZ4.7JSXFPZUgIseusdda', '$2b$10$mwY.3RoyQQzSSwbAkpC9ju'),
('lisa', 'simpson', 'lisa@gmail.com', '$2b$10$nCoLT0XGzS/V.A7GgLrW8e6d7oBQArZEuf8eSzOMwjnyM6aR/UlFG', '$2b$10$nCoLT0XGzS/V.A7GgLrW8e');

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
-- Indices de la tabla `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`correo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `destinos`
--
ALTER TABLE `destinos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `reservas`
--
ALTER TABLE `reservas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

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
