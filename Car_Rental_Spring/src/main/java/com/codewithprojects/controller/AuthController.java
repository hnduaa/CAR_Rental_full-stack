package com.codewithprojects.controller;

import com.codewithprojects.dto.LoginRequest;
import com.codewithprojects.dto.SignupRequest;
import com.codewithprojects.dto.UserDto;
import com.codewithprojects.services.auth.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;

    // Constructor for Dependency Injection
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signupCustomer(@RequestBody SignupRequest signupRequest) {
        try {
            if (authService.hasCustomerWithEmail(signupRequest.getEmail())) {
                return new ResponseEntity<>("Customer already exists with this email", HttpStatus.NOT_ACCEPTABLE);
            }
            UserDto createdCustomer = authService.createCustomer(signupRequest);
            return new ResponseEntity<>(createdCustomer, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(
                    "Customer not created, please try again. Error: " + e.getMessage(),
                    HttpStatus.BAD_REQUEST
            );
        }
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            // Authenticate user
            Authentication authentication = authService.authenticateUser(loginRequest);

            // Return success response (you can include user details or token here if needed)
            return ResponseEntity.ok("Login successful");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }
    }

}
