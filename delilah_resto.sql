-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-11-2020 a las 18:14:54
-- Versión del servidor: 10.4.14-MariaDB
-- Versión de PHP: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `delilah_resto`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `total` decimal(10,0) NOT NULL,
  `status_id` int(11) NOT NULL,
  `pay_method_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `active` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `orders`
--

INSERT INTO `orders` (`order_id`, `total`, `status_id`, `pay_method_id`, `user_id`, `active`) VALUES
(7, '500', 1, 1, 1, 1),
(8, '450', 1, 2, 1, 1),
(9, '450', 1, 2, 1, 1),
(10, '850', 1, 2, 1, 1),
(11, '850', 1, 2, 1, 1),
(12, '850', 1, 2, 1, 1),
(13, '850', 1, 2, 1, 1),
(14, '850', 1, 2, 1, 1),
(15, '850', 1, 2, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `payment_method`
--

CREATE TABLE `payment_method` (
  `pay_method_id` int(11) NOT NULL,
  `pay_method_name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `payment_method`
--

INSERT INTO `payment_method` (`pay_method_id`, `pay_method_name`) VALUES
(1, 'efectivo'),
(2, 'credito'),
(3, 'debito');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product`
--

CREATE TABLE `product` (
  `product_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` decimal(20,0) NOT NULL,
  `img_url` varchar(2048) DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `product`
--

INSERT INTO `product` (`product_id`, `name`, `price`, `img_url`, `active`) VALUES
(1, 'milanesa con papafritas', '500', 'https://t1.rg.ltmcdn.com/es/images/2/0/9/img_milanesa_de_papas_32902_600_square.jpg', 0),
(2, 'carne al horno con guarnicion', '700', 'https://www.lamoonrestaurantmiami.com/img/lomo-de-cordero-al-horno-con-guarnicion-238.jpg', 1),
(3, 'pastas', '300', 'https://i.pinimg.com/736x/a0/3c/9f/a03c9f688480d53e44d65fdc68596a90.jpg', 1),
(4, 'lomito', '500', 'https://img-global.cpcdn.com/recipes/56ddd577fcdedc2e/1200x630cq70/photo.jpg', 1),
(5, 'hamburguesa con papas', '450', 'https://cocina-casera.com/wp-content/uploads/2016/11/hamburguesa-queso-receta.jpg', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product_order`
--

CREATE TABLE `product_order` (
  `order_id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `product_order`
--

INSERT INTO `product_order` (`order_id`, `product_id`, `quantity`) VALUES
(15, 2, 3),
(15, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `status_order`
--

CREATE TABLE `status_order` (
  `status_id` int(11) NOT NULL,
  `status_name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `status_order`
--

INSERT INTO `status_order` (`status_id`, `status_name`) VALUES
(1, 'nuevo'),
(2, 'confirmado'),
(3, 'preparando'),
(4, 'enviando'),
(5, 'entregado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `fullname` varchar(70) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` int(100) NOT NULL,
  `adress` varchar(100) NOT NULL,
  `pass` varchar(100) NOT NULL,
  `admin` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`user_id`, `username`, `fullname`, `email`, `phone`, `adress`, `pass`, `admin`) VALUES
(1, 'IgnacioNinci', 'Ignancio Ninci', 'nachoninci@gmail.com', 2147483647, 'av siempre viva', 'dfgnfsfbsf', 1),
(3, 'pipaBenedetto', 'Dario Benedetto', 'pipa@gmail.com', 1546332, 'av marsella', 'qwertyuiop', 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `status_id` (`status_id`),
  ADD KEY `pay_method_id` (`pay_method_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `payment_method`
--
ALTER TABLE `payment_method`
  ADD PRIMARY KEY (`pay_method_id`);

--
-- Indices de la tabla `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indices de la tabla `product_order`
--
ALTER TABLE `product_order`
  ADD KEY `product_id` (`product_id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indices de la tabla `status_order`
--
ALTER TABLE `status_order`
  ADD PRIMARY KEY (`status_id`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `payment_method`
--
ALTER TABLE `payment_method`
  MODIFY `pay_method_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `status_order`
--
ALTER TABLE `status_order`
  MODIFY `status_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`status_id`) REFERENCES `status_order` (`status_id`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`pay_method_id`) REFERENCES `payment_method` (`pay_method_id`),
  ADD CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Filtros para la tabla `product_order`
--
ALTER TABLE `product_order`
  ADD CONSTRAINT `product_order_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`),
  ADD CONSTRAINT `product_order_ibfk_2` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
