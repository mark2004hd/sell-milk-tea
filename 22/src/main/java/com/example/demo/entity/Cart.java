package com.example.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Id;

public class Cart {
    @Id
    @Column(name = "id")
    String id;
    @Column(name = "cart_id")
    String cartId;
    String quantity;
    String description;
    Double total;
}
