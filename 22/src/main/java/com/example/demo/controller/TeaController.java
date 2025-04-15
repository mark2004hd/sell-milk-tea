package com.example.demo.controller;

import com.example.demo.dto.response.TeaResponse;
import com.example.demo.service.TeaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/tea")
@RequiredArgsConstructor
public class TeaController {
    public final TeaService teaService;
    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public TeaResponse getAllProducts() {
        return teaService.getAllProducts();
    }
}
