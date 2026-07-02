CREATE DATABASE IF NOT EXISTS ganymede_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE ganymede_db;

CREATE TABLE IF NOT EXISTS users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(50),
  role VARCHAR(30) NOT NULL DEFAULT 'USER',
  created_at DATETIME,
  updated_at DATETIME
);

CREATE TABLE IF NOT EXISTS products (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(1200) NOT NULL,
  price DECIMAL(12, 2) NOT NULL,
  category VARCHAR(50) NOT NULL,
  thumbnail_url VARCHAR(500) NOT NULL,
  stock INT NOT NULL DEFAULT 0,
  is_new BIT NOT NULL DEFAULT 0,
  created_at DATETIME,
  updated_at DATETIME
);

CREATE TABLE IF NOT EXISTS product_images (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  product_id BIGINT NOT NULL,
  image_url VARCHAR(500) NOT NULL,
  sort_order INT NOT NULL DEFAULT 1,
  CONSTRAINT fk_product_images_product FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE IF NOT EXISTS cart_items (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  product_id BIGINT NOT NULL,
  quantity INT NOT NULL,
  created_at DATETIME,
  updated_at DATETIME,
  UNIQUE KEY uk_cart_user_product (user_id, product_id),
  CONSTRAINT fk_cart_user FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT fk_cart_product FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE IF NOT EXISTS orders (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  total_price DECIMAL(12, 2) NOT NULL,
  status VARCHAR(30) NOT NULL,
  recipient_name VARCHAR(100),
  recipient_phone VARCHAR(50),
  address VARCHAR(255),
  detail_address VARCHAR(255),
  postal_code VARCHAR(30),
  created_at DATETIME,
  updated_at DATETIME,
  CONSTRAINT fk_orders_user FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS order_items (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  order_id BIGINT NOT NULL,
  product_id BIGINT NOT NULL,
  product_name VARCHAR(255),
  product_price DECIMAL(12, 2),
  quantity INT NOT NULL,
  image_url VARCHAR(500),
  CONSTRAINT fk_order_items_order FOREIGN KEY (order_id) REFERENCES orders(id),
  CONSTRAINT fk_order_items_product FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE IF NOT EXISTS wishlists (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  product_id BIGINT NOT NULL,
  created_at DATETIME,
  CONSTRAINT fk_wishlists_user FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT fk_wishlists_product FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE IF NOT EXISTS reviews (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT NOT NULL,
  product_id BIGINT NOT NULL,
  rating INT NOT NULL,
  content TEXT,
  created_at DATETIME,
  updated_at DATETIME,
  CONSTRAINT fk_reviews_user FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT fk_reviews_product FOREIGN KEY (product_id) REFERENCES products(id)
);
