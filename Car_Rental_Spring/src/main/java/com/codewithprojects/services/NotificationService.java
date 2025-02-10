package com.codewithprojects.services;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {

    private final SimpMessagingTemplate simpMessagingTemplate;

    public NotificationService(SimpMessagingTemplate simpMessagingTemplate) {
        this.simpMessagingTemplate = simpMessagingTemplate;
    }

    /**
     * Sends a generic system notification to all subscribers of the /topic/system channel.
     */
    public void sendNotification(String message) {
        simpMessagingTemplate.convertAndSend("/topic/system", message);
    }

    /**
     * Sends a notification to a specific user. The user receives this on the /queue/notifications channel.
     */
    public void sendNotificationToUser(String userId, String message) {
        simpMessagingTemplate.convertAndSendToUser(userId, "/queue/notifications", message);
    }

    /**
     * Sends a notification to all admins on the /topic/admin-notifications channel.
     */
    public void sendNotificationToAdmin(String message) {
        simpMessagingTemplate.convertAndSend("/topic/admin-notifications", message);
    }
}
