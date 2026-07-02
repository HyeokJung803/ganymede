package com.gany.config;

import com.gany.domain.Category;
import com.gany.domain.Product;
import com.gany.domain.ProductImage;
import com.gany.repository.ProductRepository;
import java.math.BigDecimal;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {
  private final ProductRepository productRepository;

  public DataSeeder(ProductRepository productRepository) {
    this.productRepository = productRepository;
  }

  @Override
  public void run(String... args) {
    if (productRepository.count() > 0) return;
    add("Maison Leather Tote", "Structured black leather tote with a quiet atelier silhouette.", "1290000", Category.BAGS, true, "/images/products/maison-tote.svg");
    add("Atelier Mini Bag", "Deep green compact bag finished with warm metal hardware.", "980000", Category.BAGS, true, "/images/products/atelier-mini.svg");
    add("Silk Signature Scarf", "Ivory silk scarf with an original abstract border motif.", "360000", Category.ACCESSORIES, false, "/images/products/silk-scarf.svg");
    add("Classic Leather Loafer", "Polished black loafer shaped for everyday ceremony.", "720000", Category.SHOES, false, "/images/products/classic-loafer.svg");
    add("Cashmere Long Coat", "Camel wool cashmere coat with a soft architectural drape.", "2450000", Category.APPAREL, true, "/images/products/cashmere-coat.svg");
    add("Minimal Gold Bracelet", "Slim bracelet with a restrained high-polish finish.", "540000", Category.ACCESSORIES, false, "/images/products/gold-bracelet.svg");
    add("Burgundy Compact Wallet", "Small grained leather wallet in a deep burgundy tone.", "420000", Category.ACCESSORIES, false, "/images/products/burgundy-wallet.svg");
    add("Soft Cashmere Knit", "Cream cashmere knit with a clean neckline and relaxed fit.", "690000", Category.APPAREL, false, "/images/products/cashmere-knit.svg");
  }

  private void add(String name, String description, String price, Category category, boolean isNew, String imageUrl) {
    Product product = new Product();
    product.setName(name);
    product.setDescription(description);
    product.setPrice(new BigDecimal(price));
    product.setCategory(isNew ? Category.NEW_ARRIVALS : category);
    product.setThumbnailUrl(imageUrl);
    product.setStock(20);
    product.setNew(isNew);
    ProductImage image = new ProductImage();
    image.setProduct(product);
    image.setImageUrl(imageUrl);
    image.setSortOrder(1);
    product.getImages().add(image);
    productRepository.save(product);
  }
}
