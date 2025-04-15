package com.example.demo.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter

public enum ErrorCode {
    USERNAME_INVALID(1001, "Username must be at least {min} characters", HttpStatus.BAD_REQUEST),
    PASSWORD_INVALID(1002, "Password must be at least {min} characters", HttpStatus.BAD_REQUEST),
    EMAIL_INVALID(1003, "Email must include character '@'", HttpStatus.BAD_REQUEST),
    DOB_INVALID(1004, "Your age must be at least {min}", HttpStatus.BAD_REQUEST),
    INVALID_KEY(1111, "Invalid message key", HttpStatus.BAD_REQUEST),
    USER_NOT_EXISTED(2001, "Not found user", HttpStatus.NOT_FOUND),
    USER_EXISTED(1002, "User existed, try another", HttpStatus.BAD_REQUEST),
    PERMISSION_EXISTED(1012, "Permission existed, please enter the another", HttpStatus.BAD_REQUEST),
    ROLE_NOT_EXISTED(1013, "Error from server, role staff not found", HttpStatus.NOT_FOUND),
    BANK_NOT_EXISTED(1014, "Bank not found", HttpStatus.NOT_FOUND),
    UNAUTHENTICATED(3001, "Unauthenticated", HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED(3002, "Do not have permission", HttpStatus.FORBIDDEN),
    UNCATEGORIZED_EXCEPTION(9999, "Uncategorized error", HttpStatus.INTERNAL_SERVER_ERROR),
    ;
    private int code;
    private String message;
    private HttpStatusCode statusCode;
    ErrorCode(int code, String message, HttpStatusCode statusCode){
        this.code = code;
        this.message = message;
        this.statusCode = statusCode;
    }
}
