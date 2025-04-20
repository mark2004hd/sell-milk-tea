package com.example.demo.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class CartResponse {
    private String response;
    private int totalResults;
    private List<CartItemResponse> cart;
}
