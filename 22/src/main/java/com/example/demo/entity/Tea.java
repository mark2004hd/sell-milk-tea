package com.example.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.sql.Timestamp;
import java.time.LocalDate;
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class Tea {
        @Id
        @Column(name = "id")
        String id;
        @Column(name = "tea_id")
        String teaId;
        String product;
        String quantity;
        String description;
        Double price;
        String title;
        String tag;
        String tagColor;
}
