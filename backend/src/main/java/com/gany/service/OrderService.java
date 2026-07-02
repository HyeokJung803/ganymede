package com.gany.service;

import com.gany.domain.CartItem;
import com.gany.domain.CustomerOrder;
import com.gany.domain.OrderItem;
import com.gany.dto.OrderDtos.CreateOrderRequest;
import com.gany.dto.OrderDtos.OrderResponse;
import com.gany.repository.CartItemRepository;
import com.gany.repository.OrderRepository;
import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class OrderService {
  private final OrderRepository orderRepository;
  private final CartItemRepository cartItemRepository;
  private final UserService userService;

  public OrderService(OrderRepository orderRepository, CartItemRepository cartItemRepository, UserService userService) {
    this.orderRepository = orderRepository;
    this.cartItemRepository = cartItemRepository;
    this.userService = userService;
  }

  @Transactional
  public OrderResponse create(CreateOrderRequest request) {
    var user = userService.currentUser();
    List<CartItem> cart = cartItemRepository.findByUser(user);
    if (cart.isEmpty()) {
      throw new IllegalArgumentException("Cart is empty");
    }
    CustomerOrder order = new CustomerOrder();
    order.setUser(user);
    order.setRecipientName(request.recipientName);
    order.setRecipientPhone(request.recipientPhone);
    order.setAddress(request.address);
    order.setDetailAddress(request.detailAddress);
    order.setPostalCode(request.postalCode);
    BigDecimal total = BigDecimal.ZERO;
    for (CartItem cartItem : cart) {
      OrderItem item = new OrderItem();
      item.setOrder(order);
      item.setProduct(cartItem.getProduct());
      item.setProductName(cartItem.getProduct().getName());
      item.setProductPrice(cartItem.getProduct().getPrice());
      item.setQuantity(cartItem.getQuantity());
      item.setImageUrl(cartItem.getProduct().getThumbnailUrl());
      order.getItems().add(item);
      total = total.add(cartItem.getProduct().getPrice().multiply(BigDecimal.valueOf(cartItem.getQuantity())));
    }
    order.setTotalPrice(total);
    CustomerOrder saved = orderRepository.save(order);
    cartItemRepository.deleteByUser(user);
    return OrderResponse.from(saved);
  }

  public List<OrderResponse> list() {
    return orderRepository.findByUserOrderByIdDesc(userService.currentUser()).stream()
        .map(OrderResponse::from).collect(Collectors.toList());
  }

  public OrderResponse detail(Long id) {
    return OrderResponse.from(orderRepository.findByIdAndUser(id, userService.currentUser()).orElseThrow());
  }
}
