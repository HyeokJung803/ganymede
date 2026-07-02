package com.gany.service;

import com.gany.domain.User;
import com.gany.dto.AuthDtos.UserResponse;
import com.gany.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
  private final UserRepository userRepository;

  public UserService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  public User currentUser() {
    String email = SecurityContextHolder.getContext().getAuthentication().getName();
    return userRepository.findByEmail(email).orElseThrow();
  }

  public static UserResponse toResponse(User user) {
    return new UserResponse(user.getId(), user.getEmail(), user.getName(), user.getPhone());
  }
}
