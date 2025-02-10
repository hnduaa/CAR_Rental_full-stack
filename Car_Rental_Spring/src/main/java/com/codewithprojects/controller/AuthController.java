package com.codewithprojects.controller;

import com.codewithprojects.dto.LoginRequest;
import com.codewithprojects.dto.SignupRequest;
import com.codewithprojects.dto.UserDto;
import com.codewithprojects.services.auth.AuthService;
import com.codewithprojects.services.auth.UserDetailsImpl;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

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
            // Log the incoming signupRequest
            System.out.println("Received signup request: " + signupRequest.getFirstname() + " " + signupRequest.getLastname());

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

    // AuthController.java
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest, HttpSession session) {
        try {
            Authentication authentication = authService.authenticateUser(loginRequest);
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

            // Fetch the user ID using the new getId() method
            Long userId = userDetails.getId();

            // Log user details for debugging
            System.out.println("User logged in: " + userDetails.getUsername());
            System.out.println("User role: " + userDetails.getAuthorities().stream().findFirst().get().getAuthority());
            System.out.println("User ID: " + userId);  // Log the user ID for debugging

            // Create response map including user ID
            Map<String, Object> response = new HashMap<>();
            response.put("id", userId);  // Include user ID
            response.put("email", userDetails.getUsername());
            response.put("role", userDetails.getAuthorities().stream().findFirst().get().getAuthority());
            response.put("message", "Login successful");

            // Store user info in session
            session.setAttribute("USER_ID", userDetails.getUsername());

            // Print the response being sent to frontend
            System.out.println("Response to be sent to frontend: " + response);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Invalid email or password"));
        }
    }





}
