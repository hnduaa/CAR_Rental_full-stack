package com.codewithprojects.controller;

import com.codewithprojects.services.NotificationService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
public class AdminController {

    private final NotificationService notificationService;

    public AdminController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @PostMapping("/approve-booking/{userId}")
    public String approveBooking(@PathVariable String userId) {
        notificationService.sendNotificationToUser(userId, "Your booking has been approved.");
        return "Booking approved and user notified";
    }

    @PostMapping("/reject-booking/{userId}")
    public String rejectBooking(@PathVariable String userId) {
        notificationService.sendNotificationToUser(userId, "Your booking has been rejected.");
        return "Booking rejected and user notified";
    }
}
