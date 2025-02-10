package com.codewithprojects.dto;

import com.codewithprojects.entity.Car;

public class CarWithRatingDTO {

    private Car car;
    private double averageRating;

    public CarWithRatingDTO(Car car, double averageRating) {
        this.car = car;
        this.averageRating = averageRating;
    }

    public Car getCar() {
        return car;
    }

    public void setCar(Car car) {
        this.car = car;
    }

    public double getAverageRating() {
        return averageRating;
    }

    public void setAverageRating(double averageRating) {
        this.averageRating = averageRating;
    }
}
