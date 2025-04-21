package com.example.demo.service;

import com.example.demo.dto.request.UserCreateRequest;
import com.example.demo.dto.response.BaseResponse;
import com.example.demo.entity.User;
import com.example.demo.exception.AppException;
import com.example.demo.exception.ErrorCode;
import com.example.demo.repository.UserRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class UserService {
    UserRepository userRepository;
    EmailServiceImpl emailService;
    PasswordEncoder passwordEncoder;

    private void validateUsernameAndPassword(UserCreateRequest request) {
        if (request.getUsername() == null || request.getUsername().isBlank()) {
            throw new AppException(ErrorCode.USERNAME_INVALID);
        }

        if (request.getPassword() == null || request.getPassword().isBlank()) {
            throw new AppException(ErrorCode.PASSWORD_INVALID);
        }
        if (request.getEmail() == null || request.getEmail().isBlank()) {
            throw new AppException(ErrorCode.EMAIL_INVALID);
        }


    }

    public BaseResponse<?> create(UserCreateRequest request){
        validateUsernameAndPassword(request);
        if(userRepository.existsByUsername(request.getUsername()))
            throw new AppException(ErrorCode.USER_EXISTED);

        User user=new User();
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setId(String.valueOf(UUID.randomUUID()));
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        userRepository.save(user);
        sendEMailActive(user.getEmail());
        return new BaseResponse<>();
    }
    public void sendEMailActive(String email){
        String subject="hello";
        String text="chao mung ban";
        emailService.sendEmail("dodinhtuanyb2k4@gmail.com",email,text,subject);
    }
}
