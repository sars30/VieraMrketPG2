-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 16-05-2024 a las 05:39:34
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `vieramrkt`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lote`
--

CREATE TABLE `lote` (
  `Cod_Lote` text NOT NULL,
  `Fecha_ingreso` date NOT NULL,
  `Fecha_venc` date NOT NULL,
  `Fecha_fabri` date NOT NULL,
  `Unidades` int(5) NOT NULL,
  `Descripcion` text NOT NULL,
  `estado` int(1) NOT NULL,
  `Id_Producto` int(11) NOT NULL,
  `Id_Proveedor` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `lote`
--

INSERT INTO `lote` (`Cod_Lote`, `Fecha_ingreso`, `Fecha_venc`, `Fecha_fabri`, `Unidades`, `Descripcion`, `estado`, `Id_Producto`, `Id_Proveedor`) VALUES
('AAAHBR123J', '2024-05-01', '2024-05-31', '2024-04-29', 30, '30 bolsas de libra', 1, 2, 2),
('HKJBD54HB', '2024-05-02', '2024-05-27', '2024-04-29', 12, 'latas por 150g', 1, 1, 1),
('AAATT123J', '2024-05-01', '2024-05-31', '2024-04-29', 20, '20 bolsas de libra', 1, 2, 2),
('AAAAAAYUREQ4', '2024-05-14', '2024-05-13', '2024-03-11', 50, 'lata de 120 g', 0, 3, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `Id_Producto` int(11) NOT NULL,
  `Nombre` text NOT NULL,
  `Descripcion` text NOT NULL,
  `estado` int(1) NOT NULL,
  `Cedula` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`Id_Producto`, `Nombre`, `Descripcion`, `estado`, `Cedula`) VALUES
(1, 'sardina', 'lata de 250g', 1, 123456),
(2, 'arroz', 'bolsa de libra', 1, 654321),
(3, 'sardinas', 'lata de 290g', 1, 123456);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedor`
--

CREATE TABLE `proveedor` (
  `Id_Proveedor` int(11) NOT NULL,
  `nombre` text NOT NULL,
  `estado` int(1) NOT NULL,
  `telefono` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `proveedor`
--

INSERT INTO `proveedor` (`Id_Proveedor`, `nombre`, `estado`, `telefono`) VALUES
(1, 'la soberana', 0, 232323),
(2, 'diana', 1, 566655),
(3, 'alpina s.a', 0, 6378912);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `Id_Rol` int(11) NOT NULL,
  `Nom_Rol` text NOT NULL,
  `estado` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`Id_Rol`, `Nom_Rol`, `estado`) VALUES
(1, 'empleado', 1),
(2, 'admin', 1),
(3, 'coordinador(prueba)', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `Cedula` int(11) NOT NULL,
  `nombre` text NOT NULL,
  `apellido` text NOT NULL,
  `direccion` text NOT NULL,
  `correo` text NOT NULL,
  `fecha_nac` date NOT NULL,
  `contrasena` text NOT NULL,
  `Id_Rol` int(11) NOT NULL,
  `estado` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`Cedula`, `nombre`, `apellido`, `direccion`, `correo`, `fecha_nac`, `contrasena`, `Id_Rol`, `estado`) VALUES
(123456, 'sergio', 'ramirez', 'calle', 'calle 11', '2001-12-30', 'sars', 1, 0),
(654321, 'andres', 'sanchez', 'calle12', 'andrew@gmail.com', '2000-06-08', 'sars', 2, 1),
(12345689, 'Carlos', 'Perez Rodriguez', 'calle 95 # 10-59', 'carlo1@gmail.com', '1990-12-30', 'car30*', 1, 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `lote`
--
ALTER TABLE `lote`
  ADD KEY `fk_lote_proveedor` (`Id_Proveedor`),
  ADD KEY `fk_lote_producto` (`Id_Producto`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`Id_Producto`),
  ADD KEY `fk_producto_usuario` (`Cedula`);

--
-- Indices de la tabla `proveedor`
--
ALTER TABLE `proveedor`
  ADD PRIMARY KEY (`Id_Proveedor`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`Id_Rol`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`Cedula`),
  ADD KEY `fk_rol_usu` (`Id_Rol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `Id_Producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `proveedor`
--
ALTER TABLE `proveedor`
  MODIFY `Id_Proveedor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `Id_Rol` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `lote`
--
ALTER TABLE `lote`
  ADD CONSTRAINT `fk_lote_producto` FOREIGN KEY (`Id_Producto`) REFERENCES `producto` (`Id_Producto`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_lote_proveedor` FOREIGN KEY (`Id_Proveedor`) REFERENCES `proveedor` (`Id_Proveedor`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `fk_producto_usuario` FOREIGN KEY (`Cedula`) REFERENCES `usuario` (`Cedula`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `fk_rol_usu` FOREIGN KEY (`Id_Rol`) REFERENCES `rol` (`Id_Rol`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
