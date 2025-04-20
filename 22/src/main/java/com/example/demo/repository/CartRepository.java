package com.example.demo.repository;

import com.example.demo.entity.Cart;
import com.example.demo.entity.InvalidToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart, String> {
    Cart findByUserId(String userId);
}
