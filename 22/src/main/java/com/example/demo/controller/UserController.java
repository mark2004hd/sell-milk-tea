package com.example.demo.controller;
import com.example.demo.dto.request.UserCreateRequest;
import com.example.demo.dto.response.BaseResponse;
import com.example.demo.service.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
@Tag(name = "User Controller")
public class UserController {
    UserService userService;

    @PostMapping
    BaseResponse<?> createUser(@RequestBody UserCreateRequest request){
        return new BaseResponse<>(userService.create(request));
    }
    @PostMapping("/test")
    BaseResponse<?> test(){
        var auth= SecurityContextHolder.getContext().getAuthentication();
        log.info("username {}",auth.getName());
        auth.getAuthorities().forEach(grantedAuthority -> log.info(grantedAuthority.getAuthority()));
        return new BaseResponse<>();
    }


}
