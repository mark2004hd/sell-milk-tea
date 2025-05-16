package com.example.demo.controller;

import com.example.demo.dto.request.AddToCartRequest;
import com.example.demo.dto.request.CartRequest;
import com.example.demo.dto.request.RemoveCartItemRequest;
import com.example.demo.dto.response.BaseResponse;
import com.example.demo.dto.response.CartResponse;
import com.example.demo.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {
    private final CartService cartService;



    @PostMapping("/getByUserId")
    public CartResponse getCartByUserId(@RequestBody CartRequest request) {
        return cartService.getCartByUserId(request);
    }
    @PostMapping("/add-to-cart")
    public BaseResponse<?> addToCart(@RequestBody AddToCartRequest request) {
        cartService.addToCart(request);
        return new BaseResponse<>();
    }

    @PostMapping("/delete")
    public ResponseEntity<String> removeCartItem(@RequestBody RemoveCartItemRequest request) {
        cartService.removeCartItem(request);
        return ResponseEntity.ok("Đã xóa item khỏi giỏ hàng.");
    }
}
