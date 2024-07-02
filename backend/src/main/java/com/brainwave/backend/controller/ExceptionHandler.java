package com.brainwave.backend.controller;

import com.brainwave.backend.exceptions.InvalidPasswordException;
import com.brainwave.backend.exceptions.InvalidPasswordFormatException;
import com.brainwave.backend.exceptions.UserAlreadyExistsException;
import com.brainwave.backend.exceptions.UserDoesNotExistException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class ExceptionHandler {
    @org.springframework.web.bind.annotation.ExceptionHandler(Exception.class)
    public ResponseEntity<?> internalServerError(Exception e){
        e.printStackTrace();
        Map<String, Object> map = new HashMap<>();
        map.put("status", 1);
        map.put("error", "Something went wrong.");
        return new ResponseEntity<>(map, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @org.springframework.web.bind.annotation.ExceptionHandler({InvalidPasswordException.class, InvalidPasswordFormatException.class})
    public ResponseEntity<?> notAcceptable(Exception e){
        Map<String, Object> map = new HashMap<>();
        map.put("status", 0);
        map.put("error", e.getMessage());
        return new ResponseEntity<>(map, HttpStatus.NOT_ACCEPTABLE);
    }

    @org.springframework.web.bind.annotation.ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> methodArgumentNotValid(MethodArgumentNotValidException e){
        Map<String, Object> map = new HashMap<>();
        map.put("status", 0);
        map.put("error", "Some fields are invalid.");
        return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
    }

    @org.springframework.web.bind.annotation.ExceptionHandler({UserAlreadyExistsException.class, UserDoesNotExistException.class})
    public ResponseEntity<?> badRequests(Exception e){
        Map<String, Object> map = new HashMap<>();
        map.put("status", 0);
        map.put("error", e.getMessage());
        return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
    }




}
