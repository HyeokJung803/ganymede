package com.gany.dto;

import com.gany.domain.Product;
import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

public class ProductResponse {
  public Long id;
  public String name;
  public String description;
  public BigDecimal price;
  public String category;
  public String thumbnailUrl;
  public int stock;
  public boolean isNew;
  public List<String> images;

  public static ProductResponse from(Product product) {
    ProductResponse response = new ProductResponse();
    response.id = product.getId();
    response.name = product.getName();
    response.description = product.getDescription();
    response.price = product.getPrice();
    response.category = product.getCategory().name();
    response.thumbnailUrl = product.getThumbnailUrl();
    response.stock = product.getStock();
    response.isNew = product.isNew();
    response.images = product.getImages().stream().map(image -> image.getImageUrl()).collect(Collectors.toList());
    return response;
  }
}
