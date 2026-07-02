package com.gany.repository;

import com.gany.domain.CustomerOrder;
import com.gany.domain.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<CustomerOrder, Long> {
  List<CustomerOrder> findByUserOrderByIdDesc(User user);
  Optional<CustomerOrder> findByIdAndUser(Long id, User user);
}
