package com.gany.service;

import com.gany.domain.User;
import com.gany.dto.AuthDtos.AuthResponse;
import com.gany.dto.AuthDtos.LoginRequest;
import com.gany.dto.AuthDtos.RegisterRequest;
import com.gany.repository.UserRepository;
import com.gany.security.JwtTokenProvider;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtTokenProvider jwtTokenProvider;

  public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtTokenProvider jwtTokenProvider) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
    this.jwtTokenProvider = jwtTokenProvider;
  }

  public AuthResponse register(RegisterRequest request) {
    if (userRepository.existsByEmail(request.email)) {
      throw new IllegalArgumentException("Email already exists");
    }
    User user = new User();
    user.setEmail(request.email);
    user.setPassword(passwordEncoder.encode(request.password));
    user.setName(request.name);
    user.setPhone(request.phone);
    userRepository.save(user);
    return new AuthResponse(jwtTokenProvider.createToken(user.getEmail()), UserService.toResponse(user));
  }

  public AuthResponse login(LoginRequest request) {
    User user = userRepository.findByEmail(request.email).orElseThrow();
    if (!passwordEncoder.matches(request.password, user.getPassword())) {
      throw new IllegalArgumentException("Invalid credentials");
    }
    return new AuthResponse(jwtTokenProvider.createToken(user.getEmail()), UserService.toResponse(user));
  }
}
