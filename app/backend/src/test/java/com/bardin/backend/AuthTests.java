package com.bardin.backend;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.time.Instant;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientResponseException;

import com.bardin.backend.auth.User;
import com.bardin.backend.auth.dto.LoginRequest;
import com.bardin.backend.auth.enums.Role;
import com.bardin.backend.auth.repository.UserRepository;

/**
 * AuthTests
 */
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class AuthTests {

    @LocalServerPort
    private int port;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private static final String TEST_ADMIN_USERNAME = "test-admin";
    private static final String TEST_ADMIN_PASSWORD = "test-password";

    @BeforeEach
    void setup() {

        userRepository.deleteAll();

        User admin = new User();
        admin.setUsername(TEST_ADMIN_USERNAME);
        admin.setPassword(passwordEncoder.encode(TEST_ADMIN_PASSWORD));
        admin.setRole(Role.ADMIN);
        admin.setCreatedAt(Instant.now());

        userRepository.save(admin);

    }

    @Test
    public void validLoginCreatesSession() {

        RestClient client = RestClient.builder().baseUrl("http://localhost:" + port).build();

        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setUsername(TEST_ADMIN_USERNAME);
        loginRequest.setPassword(TEST_ADMIN_PASSWORD);
        ResponseEntity<Void> response = login(client, loginRequest);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertThat(cookieValue(response.getHeaders().get(HttpHeaders.SET_COOKIE), "JSESSIONID")).isNotBlank();

    }

    @Test
    public void denyInvalidLoginRequest() {

        RestClient client = RestClient.builder().baseUrl("http://localhost:" + port).build();

        String username = "Fake username";
        String password = "Fake password";

        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setUsername(username);
        loginRequest.setPassword(password);

        RestClientResponseException ex = assertThrows(RestClientResponseException.class,
            () -> login(client, loginRequest));

        assertEquals(HttpStatus.FORBIDDEN, ex.getStatusCode());

    }

    @Test
    public void getProtectedEndpointWithSession() {

        RestClient client = RestClient.builder()
                .baseUrl("http://localhost:" + port)
                .build();

        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setUsername(TEST_ADMIN_USERNAME);
        loginRequest.setPassword(TEST_ADMIN_PASSWORD);

        ResponseEntity<Void> loginResponse = login(client, loginRequest);
        String sessionCookie = cookieHeader(loginResponse.getHeaders().get(HttpHeaders.SET_COOKIE), "JSESSIONID");

        ResponseEntity<String> response = client.get()
                .uri("/admin/health")
            .header(HttpHeaders.COOKIE, sessionCookie)
                .retrieve()
                .toEntity(String.class);

        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    public void getProtectedEndpointWithoutSession() {
        RestClient client = RestClient.builder()
                .baseUrl("http://localhost:" + port)
                .build();

        RestClientResponseException ex = assertThrows(RestClientResponseException.class, () -> client.get()
                .uri("/admin/health")
                .retrieve()
                .toEntity(String.class));

        assertEquals(HttpStatus.FORBIDDEN, ex.getStatusCode());
    }

    private ResponseEntity<Void> login(RestClient client, LoginRequest request) {
        return client.post()
                .uri("/api/auth/login")
                .body(request)
                .retrieve()
                .toBodilessEntity();
    }

    private String cookieHeader(List<String> setCookies, String name) {
        return name + "=" + cookieValue(setCookies, name);
    }

    private String cookieValue(List<String> setCookies, String name) {
        String prefix = name + "=";
        return setCookies.stream()
                .filter(cookie -> cookie.startsWith(prefix))
                .map(cookie -> cookie.substring(prefix.length(), cookie.indexOf(';')))
                .findFirst()
                .orElseThrow();
    }

}
