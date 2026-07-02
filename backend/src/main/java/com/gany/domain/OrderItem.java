package com.gany.domain;

import java.math.BigDecimal;
import javax.persistence.*;

@Entity
@Table(name = "order_items")
public class OrderItem {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "order_id", nullable = false)
  private CustomerOrder order;
  @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "product_id", nullable = false)
  private Product product;
  private String productName;
  private BigDecimal productPrice;
  private int quantity;
  private String imageUrl;

  public Long getId() { return id; }
  public CustomerOrder getOrder() { return order; }
  public void setOrder(CustomerOrder order) { this.order = order; }
  public Product getProduct() { return product; }
  public void setProduct(Product product) { this.product = product; }
  public String getProductName() { return productName; }
  public void setProductName(String productName) { this.productName = productName; }
  public BigDecimal getProductPrice() { return productPrice; }
  public void setProductPrice(BigDecimal productPrice) { this.productPrice = productPrice; }
  public int getQuantity() { return quantity; }
  public void setQuantity(int quantity) { this.quantity = quantity; }
  public String getImageUrl() { return imageUrl; }
  public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
}
