package com.gany.domain;

import java.time.LocalDateTime;
import javax.persistence.*;

@Entity
@Table(name = "cart_items", uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "product_id"}))
public class CartItem {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "user_id", nullable = false)
  private User user;
  @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "product_id", nullable = false)
  private Product product;
  private int quantity;
  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;

  @PrePersist void onCreate() { createdAt = updatedAt = LocalDateTime.now(); }
  @PreUpdate void onUpdate() { updatedAt = LocalDateTime.now(); }

  public Long getId() { return id; }
  public User getUser() { return user; }
  public void setUser(User user) { this.user = user; }
  public Product getProduct() { return product; }
  public void setProduct(Product product) { this.product = product; }
  public int getQuantity() { return quantity; }
  public void setQuantity(int quantity) { this.quantity = quantity; }
}
