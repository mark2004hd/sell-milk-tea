package com.example.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Id;

public class CartItem {
    @Id
    @Column(name = "id")
    String id;
    @Column(name = "cart_item_id")
    String cartItemId;
    @Column(name = "cart_id")
    String cartId;
    String quantity;
    Double price;

}
