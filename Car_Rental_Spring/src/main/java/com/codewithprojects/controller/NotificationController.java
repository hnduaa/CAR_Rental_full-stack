package com.codewithprojects.controller;


import com.codewithprojects.services.NotificationService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @PostMapping("/sendNotification")
    public String sendNotification() {
        notificationService.sendNotification("This is a test notification!");
        return "Notification sent!";
    }
}
