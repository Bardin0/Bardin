package com.bardin.backend.admin;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * VisitorManagementController
 */
@RestController
@RequestMapping("/admin")
public class VisitorManagementController {

    @GetMapping("/health") 
    public String health(){
        return "Server is healthy!";
    } 
    
}
