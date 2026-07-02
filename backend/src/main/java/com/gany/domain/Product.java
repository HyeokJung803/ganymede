package com.gany.domain;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.*;

@Entity
@Table(name = "products")
public class Product {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @Column(nullable = false)
  private String name;
  @Column(nullable = false, length = 1200)
  private String description;
  @Column(nullable = false)
  private BigDecimal price;
  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private Category category;
  @Column(nullable = false)
  private String thumbnailUrl;
  private int stock;
  private boolean isNew;
  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;
  @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
  @OrderBy("sortOrder ASC")
  private List<ProductImage> images = new ArrayList<>();

  @PrePersist void onCreate() { createdAt = updatedAt = LocalDateTime.now(); }
  @PreUpdate void onUpdate() { updatedAt = LocalDateTime.now(); }

  public Long getId() { return id; }
  public String getName() { return name; }
  public void setName(String name) { this.name = name; }
  public String getDescription() { return description; }
  public void setDescription(String description) { this.description = description; }
  public BigDecimal getPrice() { return price; }
  public void setPrice(BigDecimal price) { this.price = price; }
  public Category getCategory() { return category; }
  public void setCategory(Category category) { this.category = category; }
  public String getThumbnailUrl() { return thumbnailUrl; }
  public void setThumbnailUrl(String thumbnailUrl) { this.thumbnailUrl = thumbnailUrl; }
  public int getStock() { return stock; }
  public void setStock(int stock) { this.stock = stock; }
  public boolean isNew() { return isNew; }
  public void setNew(boolean aNew) { isNew = aNew; }
  public List<ProductImage> getImages() { return images; }
}
