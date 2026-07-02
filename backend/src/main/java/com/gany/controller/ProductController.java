package com.gany.controller;

import com.gany.dto.ProductResponse;
import com.gany.service.ProductService;
import java.util.List;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/products")
public class ProductController {
  private final ProductService productService;

  public ProductController(ProductService productService) {
    this.productService = productService;
  }

  @GetMapping
  public List<ProductResponse> list(@RequestParam(required = false) String category,
                                    @RequestParam(required = false) String search) {
    return productService.list(category, search);
  }

  @GetMapping("/{id}")
  public ProductResponse detail(@PathVariable Long id) {
    return productService.detail(id);
  }
}
