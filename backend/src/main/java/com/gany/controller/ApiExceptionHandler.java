package com.gany.controller;

import java.util.Map;
import java.util.NoSuchElementException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestControllerAdvice
public class ApiExceptionHandler {
  @ExceptionHandler({IllegalArgumentException.class, NoSuchElementException.class})
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  public Map<String, String> badRequest(RuntimeException ex) {
    return Map.of("message", ex.getMessage() == null ? "Bad request" : ex.getMessage());
  }
}
