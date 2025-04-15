package com.example.demo.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpStatus;

import java.io.Serializable;
import java.util.List;

@Data
@AllArgsConstructor
public class BaseResponse<T> implements Serializable {
    private Integer status;
    private String errorCode;
    private String message;
    private Object body;

    public BaseResponse() {
        this.status = HttpStatus.OK.value();
        this.errorCode = HttpStatus.OK.name();
        this.message = "SUCCESS";
        this.body = null;
    }

    public BaseResponse(String message) {
        this.status = HttpStatus.OK.value();
        this.errorCode = HttpStatus.OK.name();
        this.message = message;
    }

    public BaseResponse(List<T> body) {
        this.status = HttpStatus.OK.value();
        this.errorCode = HttpStatus.OK.name();
        this.message = HttpStatus.OK.getReasonPhrase();
        this.body = body;
    }

    public BaseResponse(Object body) {
        this.status = HttpStatus.OK.value();
        this.errorCode = HttpStatus.OK.name();
        this.message = HttpStatus.OK.getReasonPhrase();
        this.body = body;
    }
}
