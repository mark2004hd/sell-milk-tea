package com.example.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Cart {
    @Id
    @Column(name = "id")
    String id;
    @Column(name = "cart_id")
    String cartId;
    @Column(name = "user_id")
    String userId;
    String quantity;
    Double total;
}
