package com.bardin.backend.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.bardin.backend.auth.User;
import com.bardin.backend.auth.enums.Role;
import com.bardin.backend.auth.repository.UserRepository;

@Configuration
public class DataSeeder {
   
    @Bean
    CommandLineRunner seedAdminUser(
        UserRepository userRepository,
        PasswordEncoder passwordEncoder
    ) {
        return args -> {
            System.out.println("Data Seeder Started");
            if (!userRepository.existsByUsername("admin")) {
                
                User admin = new User();

                admin.setUsername("admin");

                admin.setPassword(
                        passwordEncoder.encode("admin123")
                );

                admin.setRole(Role.ADMIN);

                userRepository.save(admin);

                System.out.println("Admin user created");
            }else{
                System.out.println("Admin user found.");
            }
        };
    }
}
