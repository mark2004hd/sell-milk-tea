package com.example.demo.repository;
import com.example.demo.entity.InvalidatedToken;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RedisTokenRepository extends CrudRepository<InvalidatedToken, String> {

}
