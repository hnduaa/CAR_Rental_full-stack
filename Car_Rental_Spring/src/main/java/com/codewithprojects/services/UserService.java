package com.codewithprojects.services;

import com.codewithprojects.dto.UserDto;
import com.codewithprojects.entity.User;
import com.codewithprojects.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Method to get user profile
    public Optional<UserDto> getUserProfile(String email) {
        return userRepository.findFirstByEmail(email)
                .map(user -> new UserDto(
                        user.getId(),
                        user.getFirstname(),
                        user.getLastname(),
                        user.getEmail(),
                        user.getPhoneNumber(),
                        user.getAge(),
                        user.getGender(),
                        user.getUserRole(),
                        user.getCreatedAt()
                ));
    }

    // Method to find user by email
    public User findByEmail(String email) {
        return userRepository.findFirstByEmail(email).orElse(null);
    }
    // ✅ **New method to find user by ID**
    public Optional<UserDto> getUserById(Long id) {
        return userRepository.findById(id)
                .map(user -> new UserDto(
                        user.getId(),
                        user.getFirstname(),
                        user.getLastname(),
                        user.getEmail(),
                        user.getPhoneNumber(),
                        user.getAge(),
                        user.getGender(),
                        user.getUserRole(),
                        user.getCreatedAt()
                ));
    }

    // Method to delete user
    public void deleteUser(User user) {
        userRepository.delete(user);  // Delete the user from the database
    }
}
