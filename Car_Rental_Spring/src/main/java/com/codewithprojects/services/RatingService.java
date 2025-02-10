package com.codewithprojects.services;

import com.codewithprojects.entity.Rating;
import com.codewithprojects.repository.RatingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RatingService {

    @Autowired
    private RatingRepository ratingRepository;

    public void saveRating(Rating rating) {
        ratingRepository.save(rating);
    }

    public List<Rating> getRatingsByCarId(Long carId) {
        // This method will now call findByCar_Id and work correctly
        return ratingRepository.findByCar_Id(carId);
    }

    public double getAverageRatingByCarId(Long carId) {
        return ratingRepository.findAverageRatingByCarId(carId);
    }
}
