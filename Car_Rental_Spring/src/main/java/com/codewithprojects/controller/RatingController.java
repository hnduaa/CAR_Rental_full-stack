package com.codewithprojects.controller;

import com.codewithprojects.entity.Rating;
import com.codewithprojects.entity.Car;
import com.codewithprojects.entity.User;
import com.codewithprojects.services.RatingService;
import com.codewithprojects.repository.CarRepository;
import com.codewithprojects.repository.UserRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@RestController
@RequestMapping("/ratings")
public class RatingController {

    @Autowired
    private RatingService ratingService;

    @Autowired
    private CarRepository carRepository;  // Inject CarRepository

    @Autowired
    private UserRepository userRepository;  // Inject UserRepository

    // Endpoint to submit a new rating
    @PostMapping("/submit")
    public ResponseEntity<Void> submitRating(@RequestParam Long carId, @RequestParam Long userId, @RequestParam int rating) {
        // Find the car and user by their IDs using the injected repositories
        Car car = carRepository.findById(carId).orElseThrow(() -> new RuntimeException("Car not found"));
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        // Create a new Rating object and save it using RatingService
        Rating newRating = new Rating(car, user, rating);
        ratingService.saveRating(newRating);

        return ResponseEntity.ok().build(); // Return a successful response
    }

    // Endpoint to get the average rating of a car
    @GetMapping("/average/{carId}")
    public double getAverageRating(@PathVariable Long carId) {
        return ratingService.getAverageRatingByCarId(carId); // Get average rating using RatingService
    }

    // Endpoint to get all ratings for a car
    @GetMapping("/{carId}")
    public List<Rating> getRatings(@PathVariable Long carId) {
        return ratingService.getRatingsByCarId(carId); // Get all ratings for a car
    }
}
