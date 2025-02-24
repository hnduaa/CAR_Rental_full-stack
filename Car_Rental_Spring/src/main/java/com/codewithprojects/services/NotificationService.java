package com.codewithprojects.services;

import com.codewithprojects.entity.Notification;
import com.codewithprojects.enums.NotificationType;
import com.codewithprojects.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    /**
     * Creates a new notification.
     * @param userId
     * @param message the notification message
     * @param type the type of notification
     */
    public void createNotification(Long userId, String message, NotificationType type) {
        Notification notification = new Notification();

        // If userId is null, set it to admin's ID (which is 1)
        if (userId == null) {
            notification.setUserId(1L);  // Set the admin's ID here
        } else {
            notification.setUserId(userId);
        }

        notification.setMessage(message);
        notification.setType(type);
        notificationRepository.save(notification);
    }

    /**
     * Retrieves notifications for a specific user.
     * @param userId the user's ID
     * @return list of notifications
     */
    public List<Notification> getNotificationsForUser(Long userId) {
        return notificationRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    /**
     * Retrieves admin notifications (notifications where userId is null).
     * @return list of admin notifications
     */
    public List<Notification> getAdminNotifications() {
        return notificationRepository.findByUserIdIsNullOrderByCreatedAtDesc();
    }

    /**
     * Marks a notification as read.
     * @param id the notification ID
     */
    public void markAsRead(Long id) {
        Notification notification = notificationRepository.findById(id).orElse(null);
        if (notification != null) {
            notification.setRead(true);
            notificationRepository.save(notification);
        }
    }
}
