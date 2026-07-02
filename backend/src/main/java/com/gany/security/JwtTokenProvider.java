package com.gany.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.util.Date;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class JwtTokenProvider {
  @Value("${jwt.secret}")
  private String secret;
  @Value("${jwt.expiration-ms}")
  private long expirationMs;

  public String createToken(String email) {
    Date now = new Date();
    return Jwts.builder()
        .setSubject(email)
        .setIssuedAt(now)
        .setExpiration(new Date(now.getTime() + expirationMs))
        .signWith(SignatureAlgorithm.HS256, secret)
        .compact();
  }

  public String getEmail(String token) {
    return claims(token).getSubject();
  }

  public boolean validate(String token) {
    try {
      return claims(token).getExpiration().after(new Date());
    } catch (RuntimeException ex) {
      return false;
    }
  }

  private Claims claims(String token) {
    return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
  }
}
