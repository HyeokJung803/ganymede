package com.gany.dto;

import com.gany.domain.CartItem;
import java.math.BigDecimal;

public class CartDtos {
  public static class CartRequest {
    public Long productId;
    public int quantity;
  }

  public static class CartItemResponse {
    public Long id;
    public Long productId;
    public String name;
    public String imageUrl;
    public BigDecimal price;
    public int quantity;

    public static CartItemResponse from(CartItem item) {
      CartItemResponse response = new CartItemResponse();
      response.id = item.getId();
      response.productId = item.getProduct().getId();
      response.name = item.getProduct().getName();
      response.imageUrl = item.getProduct().getThumbnailUrl();
      response.price = item.getProduct().getPrice();
      response.quantity = item.getQuantity();
      return response;
    }
  }
}
