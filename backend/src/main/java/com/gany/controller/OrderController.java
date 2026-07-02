package com.gany.controller;

import com.gany.dto.OrderDtos.CreateOrderRequest;
import com.gany.dto.OrderDtos.OrderResponse;
import com.gany.service.OrderService;
import java.util.List;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
  private final OrderService orderService;

  public OrderController(OrderService orderService) {
    this.orderService = orderService;
  }

  @PostMapping
  public OrderResponse create(@RequestBody CreateOrderRequest request) {
    return orderService.create(request);
  }

  @GetMapping
  public List<OrderResponse> list() {
    return orderService.list();
  }

  @GetMapping("/{id}")
  public OrderResponse detail(@PathVariable Long id) {
    return orderService.detail(id);
  }
}
