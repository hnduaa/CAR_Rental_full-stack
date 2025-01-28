package com.codewithprojects.services.auth;

import com.codewithprojects.dto.LoginRequest;
import com.codewithprojects.dto.SignupRequest;
import com.codewithprojects.dto.UserDto;
import com.codewithprojects.entity.User;
import com.codewithprojects.enums.UserRole;
import com.codewithprojects.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    @Autowired
    public AuthServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
    }

    @Override
    public UserDto createCustomer(SignupRequest signupRequest) {
        User user = new User();
        user.setFirstname(signupRequest.getFirstname());
        user.setLastname(signupRequest.getLastname());
        user.setEmail(signupRequest.getEmail());

        // Encrypt the password before saving
        user.setPassword(passwordEncoder.encode(signupRequest.getPassword()));
        user.setUserRole(UserRole.CUSTOMER);

        // Save user to the database
        User createdUser = userRepository.save(user);

        // Map to UserDto
        UserDto userDto = new UserDto();
        userDto.setId(createdUser.getId());
        userDto.setFirstname(createdUser.getFirstname());
        userDto.setLastname(createdUser.getLastname());
        userDto.setEmail(createdUser.getEmail());

        return userDto;
    }

    @Override
    public boolean hasCustomerWithEmail(String email) {
        return userRepository.findFirstByEmail(email).isPresent();
    }

    @Override
    public Authentication authenticateUser(LoginRequest loginRequest) {
        try {
            return authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getEmail(),
                            loginRequest.getPassword()
                    )
            );
        } catch (Exception e) {
            throw new RuntimeException("Invalid email or password");
        }
    }

}
