package com.gany.dto;

import com.gany.domain.CustomerOrder;
import com.gany.domain.OrderItem;
import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

public class OrderDtos {
  public static class CreateOrderRequest {
    public String recipientName;
    public String recipientPhone;
    public String address;
    public String detailAddress;
    public String postalCode;
  }

  public static class OrderResponse {
    public Long id;
    public BigDecimal totalPrice;
    public String status;
    public String recipientName;
    public String address;
    public List<OrderItemResponse> items;

    public static OrderResponse from(CustomerOrder order) {
      OrderResponse response = new OrderResponse();
      response.id = order.getId();
      response.totalPrice = order.getTotalPrice();
      response.status = order.getStatus().name();
      response.recipientName = order.getRecipientName();
      response.address = order.getAddress();
      response.items = order.getItems().stream().map(OrderItemResponse::from).collect(Collectors.toList());
      return response;
    }
  }

  public static class OrderItemResponse {
    public String productName;
    public BigDecimal productPrice;
    public int quantity;
    public String imageUrl;

    static OrderItemResponse from(OrderItem item) {
      OrderItemResponse response = new OrderItemResponse();
      response.productName = item.getProductName();
      response.productPrice = item.getProductPrice();
      response.quantity = item.getQuantity();
      response.imageUrl = item.getImageUrl();
      return response;
    }
  }
}
