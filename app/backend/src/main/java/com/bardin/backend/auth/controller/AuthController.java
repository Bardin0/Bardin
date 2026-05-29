package com.bardin.backend.auth.controller;

import com.bardin.backend.auth.dto.LoginRequest;
import com.bardin.backend.auth.dto.LoginResponse;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
   
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        System.out.println(request.getUsername());
        System.out.println(request.getPassword());

        String tempJWT = "jwt-token";

        return ResponseEntity.ok(
            new LoginResponse(tempJWT)
        );
        
    }
    
}
