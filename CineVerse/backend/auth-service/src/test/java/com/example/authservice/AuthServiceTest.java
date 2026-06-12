package com.example.authservice;

import com.example.authservice.dto.LoginRequest;
import com.example.authservice.dto.RegisterRequest;
import com.example.authservice.entity.Role;
import com.example.authservice.entity.User;
import com.example.authservice.repository.UserRepository;
import com.example.authservice.security.JwtService;
import com.example.authservice.service.AuthService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtService jwtService;

    @InjectMocks
    private AuthService authService;

    @Test
    void registerShouldCreateUserAndReturnToken() {
        RegisterRequest request = new RegisterRequest();
        request.setName("Ada");
        request.setEmail("ada@example.com");
        request.setPassword("Password123");
        request.setRole("USER");

        when(userRepository.existsByEmail("ada@example.com")).thenReturn(false);
        when(passwordEncoder.encode("Password123")).thenReturn("encoded");
        when(jwtService.generateToken(any(User.class))).thenReturn("token-123");

        User savedUser = new User();
        savedUser.setId(1L);
        savedUser.setName("Ada");
        savedUser.setEmail("ada@example.com");
        savedUser.setPassword("encoded");
        savedUser.setRole(Role.USER);

        when(userRepository.save(any(User.class))).thenReturn(savedUser);

        var response = authService.register(request);

        assertNotNull(response);
        assertEquals("token-123", response.getToken());
        assertEquals("ada@example.com", response.getEmail());
    }

    @Test
    void loginShouldAuthenticateExistingUser() {
        LoginRequest request = new LoginRequest();
        request.setEmail("ada@example.com");
        request.setPassword("Password123");

        User existingUser = new User();
        existingUser.setId(1L);
        existingUser.setName("Ada");
        existingUser.setEmail("ada@example.com");
        existingUser.setPassword("encoded");
        existingUser.setRole(Role.USER);

        when(userRepository.findByEmail("ada@example.com")).thenReturn(Optional.of(existingUser));
        when(passwordEncoder.matches("Password123", "encoded")).thenReturn(true);
        when(jwtService.generateToken(existingUser)).thenReturn("token-456");

        var response = authService.login(request);

        assertNotNull(response);
        assertEquals("token-456", response.getToken());
        assertEquals("Ada", response.getName());
    }
}
