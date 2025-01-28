package com.codewithprojects.services.auth;

import com.codewithprojects.dto.LoginRequest;
import com.codewithprojects.dto.SignupRequest;
import com.codewithprojects.dto.UserDto;
import org.springframework.security.core.Authentication;

public interface AuthService {
    UserDto createCustomer(SignupRequest signupRequest);
    boolean hasCustomerWithEmail(String email);
    Authentication authenticateUser(LoginRequest loginRequest);
}
