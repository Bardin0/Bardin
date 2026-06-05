package com.bardin.backend;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.resttestclient.TestRestTemplate;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.web.client.RestClient;

import static org.assertj.core.api.Assertions.assertThat;

import com.bardin.backend.auth.dto.LoginRequest;
import com.bardin.backend.auth.dto.LoginResponse;

/**
 * AuthTests
 */
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class AuthTests {
    
    @LocalServerPort
    private int port;

    @Test
    public void getJWTOnValidLogin() {

         RestClient client = RestClient.builder().baseUrl("http://localhost:" + port).build();

        String username = "admin";
        String password = "admin123";

        // Get a valid user
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setUsername(username);
        loginRequest.setPassword(password);
        LoginResponse response = client.post().uri("/api/auth/login").body(loginRequest).retrieve().body(LoginResponse.class);
        

        assertThat(response.getToken()).isNotBlank();

    }
    
}
