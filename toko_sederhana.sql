/*
 Navicat Premium Data Transfer

 Source Server         : local
 Source Server Type    : MySQL
 Source Server Version : 50739 (5.7.39)
 Source Host           : localhost:8889
 Source Schema         : toko_sederhana

 Target Server Type    : MySQL
 Target Server Version : 50739 (5.7.39)
 File Encoding         : 65001

 Date: 09/12/2025 11:39:57
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for pembelian
-- ----------------------------
DROP TABLE IF EXISTS `pembelian`;
CREATE TABLE `pembelian` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) DEFAULT NULL,
  `qty` int(11) DEFAULT NULL,
  `total` int(11) DEFAULT NULL,
  `status` enum('success','canceled') DEFAULT 'success',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `pembelian_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of pembelian
-- ----------------------------
BEGIN;
INSERT INTO `pembelian` (`id`, `product_id`, `qty`, `total`, `status`, `created_at`) VALUES (1, 8, 1, NULL, 'success', '2025-12-09 11:25:05');
INSERT INTO `pembelian` (`id`, `product_id`, `qty`, `total`, `status`, `created_at`) VALUES (2, 8, 1, NULL, 'success', '2025-12-09 11:29:34');
INSERT INTO `pembelian` (`id`, `product_id`, `qty`, `total`, `status`, `created_at`) VALUES (3, 8, 1, NULL, 'success', '2025-12-09 11:33:28');
INSERT INTO `pembelian` (`id`, `product_id`, `qty`, `total`, `status`, `created_at`) VALUES (4, 8, 1, NULL, 'success', '2025-12-09 11:34:04');
INSERT INTO `pembelian` (`id`, `product_id`, `qty`, `total`, `status`, `created_at`) VALUES (5, 8, 1, NULL, 'success', '2025-12-09 11:34:17');
COMMIT;

-- ----------------------------
-- Table structure for products
-- ----------------------------
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `sku` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of products
-- ----------------------------
BEGIN;
INSERT INTO `products` (`id`, `name`, `price`, `sku`, `created_at`) VALUES (1, 'Produk A', 10000, 'SKU001', '2025-12-09 10:02:26');
INSERT INTO `products` (`id`, `name`, `price`, `sku`, `created_at`) VALUES (2, 'Produk B', 15000, 'SKU002', '2025-12-09 10:02:26');
INSERT INTO `products` (`id`, `name`, `price`, `sku`, `created_at`) VALUES (3, 'Produk C', 20000, 'SKU003', '2025-12-09 10:02:26');
INSERT INTO `products` (`id`, `name`, `price`, `sku`, `created_at`) VALUES (4, 'Produk D', 25000, 'SKU004', '2025-12-09 10:02:26');
INSERT INTO `products` (`id`, `name`, `price`, `sku`, `created_at`) VALUES (5, 'Produk E', 30000, 'SKU005', '2025-12-09 10:02:26');
INSERT INTO `products` (`id`, `name`, `price`, `sku`, `created_at`) VALUES (6, 'Produk F', 35000, 'SKU006', '2025-12-09 10:02:26');
INSERT INTO `products` (`id`, `name`, `price`, `sku`, `created_at`) VALUES (7, 'Produk G', 40000, 'SKU007', '2025-12-09 10:02:26');
INSERT INTO `products` (`id`, `name`, `price`, `sku`, `created_at`) VALUES (8, 'Produk H', 45000, 'SKU008', '2025-12-09 10:02:26');
INSERT INTO `products` (`id`, `name`, `price`, `sku`, `created_at`) VALUES (9, 'Produk I', 50000, 'SKU009', '2025-12-09 10:02:26');
INSERT INTO `products` (`id`, `name`, `price`, `sku`, `created_at`) VALUES (10, 'Produk J', 55000, 'SKU010', '2025-12-09 10:02:26');
COMMIT;

-- ----------------------------
-- Table structure for stock
-- ----------------------------
DROP TABLE IF EXISTS `stock`;
CREATE TABLE `stock` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) DEFAULT NULL,
  `qty` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `stock_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of stock
-- ----------------------------
BEGIN;
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
