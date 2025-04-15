package com.example.demo.service;

import com.example.demo.dto.response.Promotion;
import com.example.demo.dto.response.TeaResponse;
import com.example.demo.entity.Image;
import com.example.demo.entity.Tea;
import com.example.demo.repository.ImageRepository;
import com.example.demo.repository.TeaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TeaService {
    public final TeaRepository teaRepository;
    public final ImageRepository imageRepository;
    public TeaResponse getAllProducts() {
        List<Tea> products = teaRepository.findAll();

        List<Promotion> promotions = products.stream()
                .map(p -> {
                    Image image = imageRepository.findByTeaId(p.getId());
                    String imageUrl = image != null ? image.getImageData() : "";

                    return new Promotion(
                            p.getId(),
                            imageUrl,
                            p.getProduct(),            // product
                            p.getTagColor(),              // tagColor - giả sử hardcoded
                            p.getPrice(),
                            p.getDescription(),
                            p.getTag(),                 // tag - giả sử
                            p.getTitle()             // title - có thể là tên sản phẩm
                    );
                })
                .collect(Collectors.toList());

        TeaResponse teaResponse = new TeaResponse("Success", promotions.size(), promotions);

        return teaResponse;
    }
}
