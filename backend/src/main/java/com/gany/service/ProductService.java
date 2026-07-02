package com.gany.service;

import com.gany.domain.Category;
import com.gany.domain.Product;
import com.gany.dto.ProductResponse;
import com.gany.repository.ProductRepository;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;

@Service
public class ProductService {
  private final ProductRepository productRepository;

  public ProductService(ProductRepository productRepository) {
    this.productRepository = productRepository;
  }

  public List<ProductResponse> list(String category, String search) {
    List<Product> products;
    if (search != null && !search.isBlank()) {
      products = productRepository.findByNameContainingIgnoreCase(search);
    } else if (category != null && !category.isBlank()) {
      products = productRepository.findByCategory(Category.valueOf(category.toUpperCase()));
    } else {
      products = productRepository.findAll();
    }
    return products.stream().map(ProductResponse::from).collect(Collectors.toList());
  }

  public ProductResponse detail(Long id) {
    return ProductResponse.from(productRepository.findById(id).orElseThrow());
  }
}
