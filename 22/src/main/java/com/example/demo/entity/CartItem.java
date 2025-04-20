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
public class CartItem {
    @Id
    @Column(name = "id")
    String id;
    @Column(name = "cart_item_id")
    String cartItemId;
    @Column(name = "cart_id")
    String cartId;
    String TeaId;
    String imageId;
    @Column(name = "quantity")
    Integer quantity;
    Double price;


}
