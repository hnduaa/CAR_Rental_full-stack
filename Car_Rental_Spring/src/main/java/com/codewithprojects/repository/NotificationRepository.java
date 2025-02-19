package com.codewithprojects.repository;

import com.codewithprojects.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

    // Retrieve notifications for a specific user
    List<Notification> findByUserIdOrderByCreatedAtDesc(Long userId);

    // Retrieve admin notifications (where userId is null)
    List<Notification> findByUserIdIsNullOrderByCreatedAtDesc();
}
