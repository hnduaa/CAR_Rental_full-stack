package com.codewithprojects.repository;

import com.codewithprojects.entity.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Long> {
    // Correct method to match the field 'id' in the Car entity
    List<Rating> findByCar_Id(Long carId);

    @Query("SELECT COALESCE(AVG(r.rating), 0) FROM Rating r WHERE r.car.id = :carId")
    double findAverageRatingByCarId(Long carId);
}
