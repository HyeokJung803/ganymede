package com.gany.controller;

import com.gany.dto.CartDtos.CartItemResponse;
import com.gany.dto.CartDtos.CartRequest;
import com.gany.service.CartService;
import java.util.List;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
public class CartController {
  private final CartService cartService;

  public CartController(CartService cartService) {
    this.cartService = cartService;
  }

  @GetMapping
  public List<CartItemResponse> list() {
    return cartService.list();
  }

  @PostMapping
  public CartItemResponse add(@RequestBody CartRequest request) {
    return cartService.add(request);
  }

  @PutMapping("/{id}")
  public CartItemResponse update(@PathVariable Long id, @RequestBody CartRequest request) {
    return cartService.update(id, request);
  }

  @DeleteMapping("/{id}")
  public void delete(@PathVariable Long id) {
    cartService.delete(id);
  }
}
