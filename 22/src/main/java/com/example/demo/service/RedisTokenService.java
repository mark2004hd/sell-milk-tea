package com.example.demo.service;
import com.example.demo.entity.InvalidatedToken;
import com.example.demo.exception.AppException;
import com.example.demo.exception.ErrorCode;
import com.example.demo.repository.RedisTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class RedisTokenService {
    private final RedisTokenRepository redisTokenRepository;

    public void save(InvalidatedToken token) {
        redisTokenRepository.save(token);
    }

    public void remove(String id) {
        isExists(id);
        redisTokenRepository.deleteById(id);
    }

    public boolean isExists(String id) {
        if (!redisTokenRepository.existsById(id)) {
            throw new AppException(ErrorCode.TOKEN_NOT_FOUND);
        }
        return true;
    }

}
