package com.example.demo.dto.request;

import lombok.Data;

@Data
public class AddToCartRequest {
    private String userId;
    private String teaId;
    private String quantity;
}
