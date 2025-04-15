package com.example.demo.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "image")
public class Image {
    @Id
    @Column(name = "image_id")
    private String imageId;

    @Column(name = "image_name")
    private String imageName;

    @Column(name = "image_data", columnDefinition = "LONGTEXT")
    @Lob
    private String imageData;
    private String teaId;

}
