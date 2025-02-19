package com.codewithprojects.controller;

import com.codewithprojects.dto.UserDeleteRequest;
import com.codewithprojects.dto.UserDto;
import com.codewithprojects.entity.User;
import com.codewithprojects.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:4200") // Allow frontend access
public class UserController {

    @Autowired
    private UserService userService;

    // Inject password encoder for password comparison
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // Endpoint to fetch user profile using POST
    @PostMapping("/profile")
    public ResponseEntity<?> getUserProfile(@RequestBody Map<String, String> request) {
        String email = request.get("email"); // Get email from request body
        Optional<UserDto> userProfile = userService.getUserProfile(email); // Get user profile

        // Return 200 OK if user profile is found, 404 if not found
        return userProfile.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Endpoint for deleting user account
    @PostMapping("/delete")
    public ResponseEntity<Map<String, String>> deleteUser(@RequestBody UserDeleteRequest request) {
        String email = request.getEmail();
        String password = request.getPassword();

        User user = userService.findByEmail(email);

        if (user != null && passwordEncoder.matches(password, user.getPassword())) {
            userService.deleteUser(user);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Account deleted successfully");
            return ResponseEntity.ok(response);
        } else {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Invalid email or password");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        Optional<UserDto> userProfile = userService.getUserById(id);
        return userProfile.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

}
