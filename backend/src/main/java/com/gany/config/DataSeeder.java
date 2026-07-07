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
    add("Ganymede Black Coat", "Black wool coat with a subtle gold GANYMEDE chest crest.", "2450000", Category.APPAREL, true, "/images/products/ganymede-black-coat.png", "/images/products/ganymede-black-coat-model.png");
    add("Ganymede Women's Leather Coat", "Long dark-brown leather coat with a tailored lapel and subtle gold GANYMEDE crest.", "2860000", Category.APPAREL, true, "/images/products/ganymede-womens-leather-coat.png", "/images/products/ganymede-womens-leather-coat-model.png");
    add("Ganymede Men's White Shirt", "Relaxed white shirt with an open camp collar and subtle gold GANYMEDE crest.", "520000", Category.APPAREL, true, "/images/products/ganymede-mens-white-shirt.png", "/images/products/ganymede-mens-white-shirt-model.png");
    add("Ganymede Women's Ivory Blouse", "Ivory blouse with a soft asymmetric collar and fluid drape.", "560000", Category.APPAREL, true, "/images/products/ganymede-womens-ivory-blouse.png", "/images/products/ganymede-womens-ivory-blouse-model.png");
    add("Ganymede Black Bifold Wallet", "Black leather bifold wallet with card slots and a gold GANYMEDE monogram.", "420000", Category.ACCESSORIES, true, "/images/products/ganymede-black-bifold-wallet.png", "/images/products/ganymede-black-bifold-wallet-open.png");
    add("Ganymede Black Leather Belt", "Black leather belt with a polished gold GANYMEDE monogram buckle.", "360000", Category.ACCESSORIES, true, "/images/products/ganymede-black-leather-belt.png");
    add("Ganymede Black Card Wallet", "Slim black leather card wallet with stitched edges and a gold GANYMEDE monogram.", "290000", Category.ACCESSORIES, true, "/images/products/ganymede-black-card-wallet.png", "/images/products/ganymede-black-card-wallet-back.png");
    add("Ganymede Women's Ivory Wide Trouser", "Ivory wide-leg trouser with front pleats and a fluid tailored drape.", "620000", Category.APPAREL, true, "/images/products/ganymede-womens-ivory-wide-trouser.png", "/images/products/ganymede-womens-ivory-wide-trouser-model.png");
    add("Ganymede Women's Black Wide Trouser", "Black wide-leg trouser with sharp front pleats and a fluid tailored drape.", "620000", Category.APPAREL, true, "/images/products/ganymede-womens-black-wide-trouser.png", "/images/products/ganymede-womens-black-wide-trouser-model.png");
    add("Ganymede Men's Black Slacks", "Black straight-leg slack with pressed front creases and a clean tailored waistband.", "590000", Category.APPAREL, true, "/images/products/ganymede-mens-black-slacks.png", "/images/products/ganymede-mens-black-slacks-model.png");
    add("Ganymede Black Tote Bag", "Structured black leather tote with long shoulder handles and a gold GANYMEDE monogram.", "1290000", Category.BAGS, true, "/images/products/ganymede-black-tote-bag.png", "/images/products/ganymede-black-tote-bag-model.png");
    add("Ganymede Black Mini Tote Bag", "Compact black leather tote with short handles and a gold GANYMEDE monogram.", "980000", Category.BAGS, true, "/images/products/ganymede-black-mini-tote-bag.png", "/images/products/ganymede-black-mini-tote-bag-model.png");
    add("Ganymede Brown Leather Loafer", "Brown leather penny loafer with a polished finish and subtle gold GANYMEDE hardware.", "720000", Category.SHOES, true, "/images/products/ganymede-brown-leather-loafer.png", "/images/products/ganymede-brown-leather-loafer-model.png");
    add("Ganymede Brown Leather Pump", "Brown pointed-toe leather pump with a slim heel and subtle gold GANYMEDE hardware.", "760000", Category.SHOES, true, "/images/products/ganymede-brown-leather-pump.png", "/images/products/ganymede-brown-leather-pump-model.png");
    add("Minimal Gold Bracelet", "Slim bracelet with a restrained high-polish finish.", "540000", Category.ACCESSORIES, false, "/images/products/gold-bracelet.svg");
    add("Burgundy Compact Wallet", "Small grained leather wallet in a deep burgundy tone.", "420000", Category.ACCESSORIES, false, "/images/products/burgundy-wallet.svg");
    add("Ganymede Black Knit", "Black heavyweight crewneck with a refined oversized silhouette and clean unbranded finish.", "690000", Category.APPAREL, false, "/images/products/ganymede-black-knit.png", "/images/products/ganymede-black-knit-model.png");
  }

  private void add(String name, String description, String price, Category category, boolean isNew, String imageUrl, String... extraImageUrls) {
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
    for (int i = 0; i < extraImageUrls.length; i++) {
      ProductImage extraImage = new ProductImage();
      extraImage.setProduct(product);
      extraImage.setImageUrl(extraImageUrls[i]);
      extraImage.setSortOrder(i + 2);
      product.getImages().add(extraImage);
    }
    productRepository.save(product);
  }
}
