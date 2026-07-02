USE ganymede_db;

INSERT INTO products (name, description, price, category, thumbnail_url, stock, is_new, created_at, updated_at) VALUES
('Maison Leather Tote', 'Structured black leather tote with a quiet atelier silhouette.', 1290000, 'BAGS', '/images/products/maison-tote.svg', 20, 1, NOW(), NOW()),
('Atelier Mini Bag', 'Deep green compact bag finished with warm metal hardware.', 980000, 'NEW_ARRIVALS', '/images/products/atelier-mini.svg', 20, 1, NOW(), NOW()),
('Silk Signature Scarf', 'Ivory silk scarf with an original abstract border motif.', 360000, 'ACCESSORIES', '/images/products/silk-scarf.svg', 20, 0, NOW(), NOW()),
('Classic Leather Loafer', 'Polished black loafer shaped for everyday ceremony.', 720000, 'SHOES', '/images/products/classic-loafer.svg', 20, 0, NOW(), NOW()),
('Cashmere Long Coat', 'Camel wool cashmere coat with a soft architectural drape.', 2450000, 'NEW_ARRIVALS', '/images/products/cashmere-coat.svg', 20, 1, NOW(), NOW()),
('Minimal Gold Bracelet', 'Slim bracelet with a restrained high-polish finish.', 540000, 'ACCESSORIES', '/images/products/gold-bracelet.svg', 20, 0, NOW(), NOW()),
('Burgundy Compact Wallet', 'Small grained leather wallet in a deep burgundy tone.', 420000, 'ACCESSORIES', '/images/products/burgundy-wallet.svg', 20, 0, NOW(), NOW()),
('Soft Cashmere Knit', 'Cream cashmere knit with a clean neckline and relaxed fit.', 690000, 'APPAREL', '/images/products/cashmere-knit.svg', 20, 0, NOW(), NOW());

INSERT INTO product_images (product_id, image_url, sort_order)
SELECT id, thumbnail_url, 1 FROM products;
