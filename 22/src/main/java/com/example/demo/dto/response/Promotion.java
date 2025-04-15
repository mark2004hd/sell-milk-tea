package com.example.demo.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Promotion {
    private String image;
    private String product;
    private String tagColor;
    private Double price;
    private String description;
    private String tag;
    private String title;

}
