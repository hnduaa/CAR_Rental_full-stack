package com.codewithprojects.repository;


import com.codewithprojects.entity.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarRepository extends JpaRepository<Car, Long> {
    @Query("SELECT c FROM Car c LEFT JOIN c.ratings r GROUP BY c.id ORDER BY AVG(r.rating) DESC")
    List<Car> findTopRatedCars();

}

