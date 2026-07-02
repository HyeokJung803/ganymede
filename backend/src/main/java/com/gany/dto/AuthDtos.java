package com.gany.dto;

public class AuthDtos {
  public static class RegisterRequest {
    public String email;
    public String password;
    public String name;
    public String phone;
  }

  public static class LoginRequest {
    public String email;
    public String password;
  }

  public static class AuthResponse {
    public String token;
    public UserResponse user;

    public AuthResponse(String token, UserResponse user) {
      this.token = token;
      this.user = user;
    }
  }

  public static class UserResponse {
    public Long id;
    public String email;
    public String name;
    public String phone;

    public UserResponse(Long id, String email, String name, String phone) {
      this.id = id;
      this.email = email;
      this.name = name;
      this.phone = phone;
    }
  }
}
