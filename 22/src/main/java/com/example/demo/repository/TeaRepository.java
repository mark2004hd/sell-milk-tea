package com.example.demo.repository;

import com.example.demo.entity.Image;
import com.example.demo.entity.Tea;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeaRepository extends JpaRepository<Tea, Integer> {

}
