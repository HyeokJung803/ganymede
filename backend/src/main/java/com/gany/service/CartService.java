package com.gany.service;

import com.gany.domain.CartItem;
import com.gany.domain.Product;
import com.gany.domain.User;
import com.gany.dto.CartDtos.CartItemResponse;
import com.gany.dto.CartDtos.CartRequest;
import com.gany.repository.CartItemRepository;
import com.gany.repository.ProductRepository;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CartService {
  private final CartItemRepository cartItemRepository;
  private final ProductRepository productRepository;
  private final UserService userService;

  public CartService(CartItemRepository cartItemRepository, ProductRepository productRepository, UserService userService) {
    this.cartItemRepository = cartItemRepository;
    this.productRepository = productRepository;
    this.userService = userService;
  }

  public List<CartItemResponse> list() {
    return cartItemRepository.findByUser(userService.currentUser()).stream()
        .map(CartItemResponse::from).collect(Collectors.toList());
  }

  @Transactional
  public CartItemResponse add(CartRequest request) {
    User user = userService.currentUser();
    Product product = productRepository.findById(request.productId).orElseThrow();
    CartItem item = cartItemRepository.findByUserAndProduct(user, product).orElseGet(() -> {
      CartItem next = new CartItem();
      next.setUser(user);
      next.setProduct(product);
      next.setQuantity(0);
      return next;
    });
    item.setQuantity(item.getQuantity() + Math.max(1, request.quantity));
    return CartItemResponse.from(cartItemRepository.save(item));
  }

  @Transactional
  public CartItemResponse update(Long id, CartRequest request) {
    CartItem item = cartItemRepository.findByIdAndUser(id, userService.currentUser()).orElseThrow();
    item.setQuantity(Math.max(1, request.quantity));
    return CartItemResponse.from(item);
  }

  public void delete(Long id) {
    CartItem item = cartItemRepository.findByIdAndUser(id, userService.currentUser()).orElseThrow();
    cartItemRepository.delete(item);
  }
}
