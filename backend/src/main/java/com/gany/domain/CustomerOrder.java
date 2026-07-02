package com.gany.domain;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.*;

@Entity
@Table(name = "orders")
public class CustomerOrder {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "user_id", nullable = false)
  private User user;
  @Column(nullable = false)
  private BigDecimal totalPrice;
  @Enumerated(EnumType.STRING)
  private OrderStatus status = OrderStatus.CREATED;
  private String recipientName;
  private String recipientPhone;
  private String address;
  private String detailAddress;
  private String postalCode;
  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;
  @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<OrderItem> items = new ArrayList<>();

  @PrePersist void onCreate() { createdAt = updatedAt = LocalDateTime.now(); }
  @PreUpdate void onUpdate() { updatedAt = LocalDateTime.now(); }

  public Long getId() { return id; }
  public User getUser() { return user; }
  public void setUser(User user) { this.user = user; }
  public BigDecimal getTotalPrice() { return totalPrice; }
  public void setTotalPrice(BigDecimal totalPrice) { this.totalPrice = totalPrice; }
  public OrderStatus getStatus() { return status; }
  public String getRecipientName() { return recipientName; }
  public void setRecipientName(String recipientName) { this.recipientName = recipientName; }
  public String getRecipientPhone() { return recipientPhone; }
  public void setRecipientPhone(String recipientPhone) { this.recipientPhone = recipientPhone; }
  public String getAddress() { return address; }
  public void setAddress(String address) { this.address = address; }
  public String getDetailAddress() { return detailAddress; }
  public void setDetailAddress(String detailAddress) { this.detailAddress = detailAddress; }
  public String getPostalCode() { return postalCode; }
  public void setPostalCode(String postalCode) { this.postalCode = postalCode; }
  public List<OrderItem> getItems() { return items; }
}
