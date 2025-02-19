package com.codewithprojects.controller;

import com.codewithprojects.entity.Rating;
import com.codewithprojects.entity.Car;
import com.codewithprojects.entity.User;
import com.codewithprojects.enums.NotificationType;
import com.codewithprojects.services.RatingService;
import com.codewithprojects.services.NotificationService;
import com.codewithprojects.repository.CarRepository;
import com.codewithprojects.repository.UserRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@RestController
@RequestMapping("/ratings")
@CrossOrigin("*")
public class RatingController {

    @Autowired
    private RatingService ratingService;

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private NotificationService notificationService;

    @PostMapping("/submit")
    public ResponseEntity<Void> submitRating(@RequestParam Long carId,
                                             @RequestParam Long userId,
                                             @RequestParam int rating) {
        Car car = carRepository.findById(carId)
                .orElseThrow(() -> new RuntimeException("Car not found"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Rating newRating = new Rating(car, user, rating);
        ratingService.saveRating(newRating);

        // Notify admin (userId null) about the new rating submission
        notificationService.createNotification(
                null,
                "Your Application user  " + user.getUsername() + " rates " + rating +
                        " stars for : " + car.getName(),
                NotificationType.RATING_SUBMITTED
        );

        return ResponseEntity.ok().build();
    }

    @GetMapping("/average/{carId}")
    public double getAverageRating(@PathVariable Long carId) {
        return ratingService.getAverageRatingByCarId(carId);
    }

    @GetMapping("/{carId}")
    public List<Rating> getRatings(@PathVariable Long carId) {
        return ratingService.getRatingsByCarId(carId);
    }
}
