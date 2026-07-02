package com.gany.repository;

import com.gany.domain.CartItem;
import com.gany.domain.Product;
import com.gany.domain.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
  List<CartItem> findByUser(User user);
  Optional<CartItem> findByUserAndProduct(User user, Product product);
  Optional<CartItem> findByIdAndUser(Long id, User user);
  void deleteByUser(User user);
}
