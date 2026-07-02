package com.gany.domain;

import java.time.LocalDateTime;
import javax.persistence.*;

@Entity
@Table(name = "users")
public class User {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @Column(nullable = false, unique = true)
  private String email;
  @Column(nullable = false)
  private String password;
  @Column(nullable = false)
  private String name;
  private String phone;
  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private Role role = Role.USER;
  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;

  @PrePersist void onCreate() { createdAt = updatedAt = LocalDateTime.now(); }
  @PreUpdate void onUpdate() { updatedAt = LocalDateTime.now(); }

  public Long getId() { return id; }
  public String getEmail() { return email; }
  public void setEmail(String email) { this.email = email; }
  public String getPassword() { return password; }
  public void setPassword(String password) { this.password = password; }
  public String getName() { return name; }
  public void setName(String name) { this.name = name; }
  public String getPhone() { return phone; }
  public void setPhone(String phone) { this.phone = phone; }
  public Role getRole() { return role; }
}
