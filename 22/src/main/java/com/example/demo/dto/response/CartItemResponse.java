package com.example.demo.dto.response;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class CartItemResponse {
    private String id;
    private String cartId;
    private String userId;
    private String image;
    private Integer quantity;
    private Double price;
    private String description;
    private String title;

}
