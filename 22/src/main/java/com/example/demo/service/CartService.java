package com.example.demo.service;

import com.example.demo.dto.request.AddToCartRequest;
import com.example.demo.dto.request.CartRequest;
import com.example.demo.dto.request.RemoveCartItemRequest;
import com.example.demo.dto.response.BaseResponse;
import com.example.demo.dto.response.CartItemResponse;
import com.example.demo.dto.response.CartResponse;
import com.example.demo.entity.Cart;
import com.example.demo.entity.CartItem;
import com.example.demo.entity.Image;
import com.example.demo.entity.Tea;
import com.example.demo.repository.CartItemRepository;
import com.example.demo.repository.CartRepository;
import com.example.demo.repository.ImageRepository;
import com.example.demo.repository.TeaRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class CartService {
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ImageRepository imageRepository;
    private final TeaRepository teaRepository;
    public CartResponse getCartByUserId(CartRequest request) {
        // Lấy cart theo userId
        log.info("loggg {}",request.getUserId());
        Cart cart = cartRepository.findByUserId(request.getUserId());
        if (cart == null) {
            throw new RuntimeException("Cart not found for user: " + request.getUserId());
        }

        List<CartItem> listCartItem = cartItemRepository.findAllByCartId(cart.getCartId());


        List<CartItemResponse> itemResponses = listCartItem.stream().map(item -> {

            Image image = imageRepository.findByImageId(item.getImageId());

            Tea tea = teaRepository.findByTeaId(item.getTeaId());
            log.info("loggg tea{}",tea.getPrice());
            return CartItemResponse.builder()
                    .id(item.getId())
                    .cartId(item.getCartId())
                    .userId(request.getUserId())
                    .image(image.getImageData())
                    .quantity(item.getQuantity())
                    .price(tea.getPrice())
                    .description(tea != null ? tea.getDescription() : "")
                    .title(tea != null ? tea.getTitle() : "")
                    .build();
        }).toList();


        return CartResponse.builder()
                .response("Success")
                .totalResults(itemResponses.size())
                .cart(itemResponses)
                .build();
    }

    public BaseResponse<?> addToCart(AddToCartRequest request) {
        // Tìm cart hiện có theo userId
        Cart cart = cartRepository.findByUserId(request.getUserId());

        if (cart == null) {
            cart = new Cart();
            cart.setId(UUID.randomUUID().toString());
            cart.setCartId(UUID.randomUUID().toString());
            cart.setUserId(request.getUserId());
            cart.setQuantity("0");
            cart.setTotal(0.0);

            cartRepository.save(cart);
        }

        // Kiểm tra nếu sản phẩm đã tồn tại trong cart thì tăng số lượng
        List<CartItem> items = cartItemRepository.findAllByCartId(cart.getCartId());
        Optional<CartItem> existingItemOpt = items.stream()
                .filter(item -> item.getTeaId().equals(request.getTeaId()))
                .findFirst();

        Tea tea = teaRepository.findByTeaId(request.getTeaId());

        if (tea == null) {
            throw new RuntimeException("Sản phẩm không tồn tại");
        }

        if (existingItemOpt.isPresent()) {
            CartItem existingItem = existingItemOpt.get();
            int newQuantity = existingItem.getQuantity() + Integer.parseInt(request.getQuantity());
            existingItem.setQuantity(newQuantity);
            existingItem.setPrice(tea.getPrice());
            cartItemRepository.save(existingItem);
        } else {
            // Tạo item mới
            Image image=imageRepository.findByTeaId(request.getTeaId());
            CartItem newItem = new CartItem();
            newItem.setId(UUID.randomUUID().toString());
            newItem.setCartItemId(UUID.randomUUID().toString());
            newItem.setCartId(cart.getCartId());
            newItem.setTeaId(request.getTeaId());
            newItem.setImageId(image.getImageId());
            newItem.setQuantity(Integer.valueOf(request.getQuantity()));
            newItem.setPrice(tea.getPrice());
            cartItemRepository.save(newItem);
        }

        cartRepository.save(cart);
        return new BaseResponse<>();
    }
    public void removeCartItem(RemoveCartItemRequest request) {
        // Tìm cart item theo cartItemId
        CartItem cartItem = cartItemRepository.findByCartItemId(request.getCartItemId());
        if (cartItem == null) {
            throw new RuntimeException("Cart item không tồn tại.");
        }


        Cart cart = cartRepository.findByUserId(request.getUserId());
        if (cart == null || !cart.getCartId().equals(cartItem.getCartId())) {
            throw new RuntimeException("Không có quyền xóa item này.");
        }

        // Xóa cart item
        cartItemRepository.delete(cartItem);

        cartRepository.save(cart);
    }


}

