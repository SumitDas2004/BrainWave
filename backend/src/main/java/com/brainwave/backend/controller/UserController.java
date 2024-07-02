package com.brainwave.backend.controller;

import com.brainwave.backend.dto.user.LoginDTO;
import com.brainwave.backend.dto.user.RegisterDTO;
import com.brainwave.backend.entity.User;
import com.brainwave.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {
    @Autowired
    UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginDTO request){
        String[] res = userService.login(request);
        Map<String, Object> map = new HashMap<>();
        map.put("status", 1);
        map.put("message", "Success");
        map.put("token", res[0]);
        map.put("data", userService.getUserDetails(res[1]));
        return new ResponseEntity<>(map, HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterDTO request){
        String[] res = userService.register(request);
        Map<String, Object> map = new HashMap<>();
        map.put("status", 1);
        map.put("message", "Success");
        map.put("token", res[0]);
        map.put("data", userService.getUserDetails(res[1]));
        return new ResponseEntity<>(map, HttpStatus.OK);
    }

    @GetMapping("/details")
    public ResponseEntity<?> getUserDetails(){
        Map<String, Object> map = new HashMap<>();
        map.put("status", 1);
        map.put("message", "Success");
        map.put("data", userService.getUserDetails(((User)SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getEmail()));
        return new ResponseEntity<>(map, HttpStatus.OK);
    }

}
