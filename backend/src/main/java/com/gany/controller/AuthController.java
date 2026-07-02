package com.gany.controller;

import com.gany.dto.AuthDtos.AuthResponse;
import com.gany.dto.AuthDtos.LoginRequest;
import com.gany.dto.AuthDtos.RegisterRequest;
import com.gany.dto.AuthDtos.UserResponse;
import com.gany.service.AuthService;
import com.gany.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
  private final AuthService authService;
  private final UserService userService;

  public AuthController(AuthService authService, UserService userService) {
    this.authService = authService;
    this.userService = userService;
  }

  @PostMapping("/register")
  public AuthResponse register(@RequestBody RegisterRequest request) {
    return authService.register(request);
  }

  @PostMapping("/login")
  public AuthResponse login(@RequestBody LoginRequest request) {
    return authService.login(request);
  }

  @GetMapping("/me")
  public UserResponse me() {
    return UserService.toResponse(userService.currentUser());
  }
}
