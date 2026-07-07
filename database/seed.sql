USE ganymede_db;

INSERT INTO products (name, description, price, category, thumbnail_url, stock, is_new, created_at, updated_at) VALUES
('Maison Leather Tote', 'Structured black leather tote with a quiet atelier silhouette.', 1290000, 'BAGS', '/images/products/maison-tote.svg', 20, 1, NOW(), NOW()),
('Atelier Mini Bag', 'Deep green compact bag finished with warm metal hardware.', 980000, 'NEW_ARRIVALS', '/images/products/atelier-mini.svg', 20, 1, NOW(), NOW()),
('Silk Signature Scarf', 'Ivory silk scarf with an original abstract border motif.', 360000, 'ACCESSORIES', '/images/products/silk-scarf.svg', 20, 0, NOW(), NOW()),
('Classic Leather Loafer', 'Polished black loafer shaped for everyday ceremony.', 720000, 'SHOES', '/images/products/classic-loafer.svg', 20, 0, NOW(), NOW()),
('Ganymede Black Coat', 'Black wool coat with a subtle gold GANYMEDE chest crest.', 2450000, 'NEW_ARRIVALS', '/images/products/ganymede-black-coat.png', 20, 1, NOW(), NOW()),
('Ganymede Women''s Leather Coat', 'Long dark-brown leather coat with a tailored lapel and subtle gold GANYMEDE crest.', 2860000, 'NEW_ARRIVALS', '/images/products/ganymede-womens-leather-coat.png', 20, 1, NOW(), NOW()),
('Ganymede Men''s White Shirt', 'Relaxed white shirt with an open camp collar and subtle gold GANYMEDE crest.', 520000, 'NEW_ARRIVALS', '/images/products/ganymede-mens-white-shirt.png', 20, 1, NOW(), NOW()),
('Ganymede Women''s Ivory Blouse', 'Ivory blouse with a soft asymmetric collar and fluid drape.', 560000, 'NEW_ARRIVALS', '/images/products/ganymede-womens-ivory-blouse.png', 20, 1, NOW(), NOW()),
('Ganymede Black Bifold Wallet', 'Black leather bifold wallet with card slots and a gold GANYMEDE monogram.', 420000, 'NEW_ARRIVALS', '/images/products/ganymede-black-bifold-wallet.png', 20, 1, NOW(), NOW()),
('Ganymede Black Leather Belt', 'Black leather belt with a polished gold GANYMEDE monogram buckle.', 360000, 'NEW_ARRIVALS', '/images/products/ganymede-black-leather-belt.png', 20, 1, NOW(), NOW()),
('Ganymede Black Card Wallet', 'Slim black leather card wallet with stitched edges and a gold GANYMEDE monogram.', 290000, 'NEW_ARRIVALS', '/images/products/ganymede-black-card-wallet.png', 20, 1, NOW(), NOW()),
('Ganymede Women''s Ivory Wide Trouser', 'Ivory wide-leg trouser with front pleats and a fluid tailored drape.', 620000, 'NEW_ARRIVALS', '/images/products/ganymede-womens-ivory-wide-trouser.png', 20, 1, NOW(), NOW()),
('Ganymede Women''s Black Wide Trouser', 'Black wide-leg trouser with sharp front pleats and a fluid tailored drape.', 620000, 'NEW_ARRIVALS', '/images/products/ganymede-womens-black-wide-trouser.png', 20, 1, NOW(), NOW()),
('Ganymede Men''s Black Slacks', 'Black straight-leg slack with pressed front creases and a clean tailored waistband.', 590000, 'NEW_ARRIVALS', '/images/products/ganymede-mens-black-slacks.png', 20, 1, NOW(), NOW()),
('Ganymede Black Tote Bag', 'Structured black leather tote with long shoulder handles and a gold GANYMEDE monogram.', 1290000, 'NEW_ARRIVALS', '/images/products/ganymede-black-tote-bag.png', 20, 1, NOW(), NOW()),
('Ganymede Black Mini Tote Bag', 'Compact black leather tote with short handles and a gold GANYMEDE monogram.', 980000, 'NEW_ARRIVALS', '/images/products/ganymede-black-mini-tote-bag.png', 20, 1, NOW(), NOW()),
('Ganymede Brown Leather Loafer', 'Brown leather penny loafer with a polished finish and subtle gold GANYMEDE hardware.', 720000, 'NEW_ARRIVALS', '/images/products/ganymede-brown-leather-loafer.png', 20, 1, NOW(), NOW()),
('Ganymede Brown Leather Pump', 'Brown pointed-toe leather pump with a slim heel and subtle gold GANYMEDE hardware.', 760000, 'NEW_ARRIVALS', '/images/products/ganymede-brown-leather-pump.png', 20, 1, NOW(), NOW()),
('Minimal Gold Bracelet', 'Slim bracelet with a restrained high-polish finish.', 540000, 'ACCESSORIES', '/images/products/gold-bracelet.svg', 20, 0, NOW(), NOW()),
('Burgundy Compact Wallet', 'Small grained leather wallet in a deep burgundy tone.', 420000, 'ACCESSORIES', '/images/products/burgundy-wallet.svg', 20, 0, NOW(), NOW()),
('Ganymede Black Knit', 'Black heavyweight crewneck with a refined oversized silhouette and clean unbranded finish.', 690000, 'APPAREL', '/images/products/ganymede-black-knit.png', 20, 0, NOW(), NOW());

INSERT INTO product_images (product_id, image_url, sort_order)
SELECT id, thumbnail_url, 1 FROM products;

INSERT INTO product_images (product_id, image_url, sort_order)
SELECT id, '/images/products/ganymede-black-coat-model.png', 2 FROM products WHERE name = 'Ganymede Black Coat';

INSERT INTO product_images (product_id, image_url, sort_order)
SELECT id, '/images/products/ganymede-womens-leather-coat-model.png', 2 FROM products WHERE name = 'Ganymede Women''s Leather Coat';

INSERT INTO product_images (product_id, image_url, sort_order)
SELECT id, '/images/products/ganymede-mens-white-shirt-model.png', 2 FROM products WHERE name = 'Ganymede Men''s White Shirt';

INSERT INTO product_images (product_id, image_url, sort_order)
SELECT id, '/images/products/ganymede-womens-ivory-blouse-model.png', 2 FROM products WHERE name = 'Ganymede Women''s Ivory Blouse';

INSERT INTO product_images (product_id, image_url, sort_order)
SELECT id, '/images/products/ganymede-black-bifold-wallet-open.png', 2 FROM products WHERE name = 'Ganymede Black Bifold Wallet';

INSERT INTO product_images (product_id, image_url, sort_order)
SELECT id, '/images/products/ganymede-black-card-wallet-back.png', 2 FROM products WHERE name = 'Ganymede Black Card Wallet';

INSERT INTO product_images (product_id, image_url, sort_order)
SELECT id, '/images/products/ganymede-womens-ivory-wide-trouser-model.png', 2 FROM products WHERE name = 'Ganymede Women''s Ivory Wide Trouser';

INSERT INTO product_images (product_id, image_url, sort_order)
SELECT id, '/images/products/ganymede-womens-black-wide-trouser-model.png', 2 FROM products WHERE name = 'Ganymede Women''s Black Wide Trouser';

INSERT INTO product_images (product_id, image_url, sort_order)
SELECT id, '/images/products/ganymede-mens-black-slacks-model.png', 2 FROM products WHERE name = 'Ganymede Men''s Black Slacks';

INSERT INTO product_images (product_id, image_url, sort_order)
SELECT id, '/images/products/ganymede-black-tote-bag-model.png', 2 FROM products WHERE name = 'Ganymede Black Tote Bag';

INSERT INTO product_images (product_id, image_url, sort_order)
SELECT id, '/images/products/ganymede-black-mini-tote-bag-model.png', 2 FROM products WHERE name = 'Ganymede Black Mini Tote Bag';

INSERT INTO product_images (product_id, image_url, sort_order)
SELECT id, '/images/products/ganymede-brown-leather-loafer-model.png', 2 FROM products WHERE name = 'Ganymede Brown Leather Loafer';

INSERT INTO product_images (product_id, image_url, sort_order)
SELECT id, '/images/products/ganymede-brown-leather-pump-model.png', 2 FROM products WHERE name = 'Ganymede Brown Leather Pump';

INSERT INTO product_images (product_id, image_url, sort_order)
SELECT id, '/images/products/ganymede-black-knit-model.png', 2 FROM products WHERE name = 'Ganymede Black Knit';
