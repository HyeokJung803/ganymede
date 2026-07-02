package com.gany.domain;

import javax.persistence.*;

@Entity
@Table(name = "product_images")
public class ProductImage {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "product_id", nullable = false)
  private Product product;
  @Column(nullable = false)
  private String imageUrl;
  private int sortOrder;

  public Long getId() { return id; }
  public Product getProduct() { return product; }
  public void setProduct(Product product) { this.product = product; }
  public String getImageUrl() { return imageUrl; }
  public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
  public int getSortOrder() { return sortOrder; }
  public void setSortOrder(int sortOrder) { this.sortOrder = sortOrder; }
}
