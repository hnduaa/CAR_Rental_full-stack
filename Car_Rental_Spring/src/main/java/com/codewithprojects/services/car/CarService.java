package com.codewithprojects.services.car;

import com.codewithprojects.entity.Car;
import com.codewithprojects.repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CarService {

    @Autowired
    private CarRepository carRepository;

    // Post a new car for rent
    public Car postCar(Car car) {
        return carRepository.save(car);
    }

    // Get a car by ID
    public Car getCarById(Long id) {
        return carRepository.findById(id).orElse(null);
    }

    // Get all cars
    public Iterable<Car> getAllCars() {
        return carRepository.findAll();
    }

    // Update car details
    public Car updateCar(Long id, Car car) {
        if (carRepository.existsById(id)) {
            car.setId(id);
            return carRepository.save(car);
        }
        return null;
    }

    // Delete car by ID
    public void deleteCar(Long id) {
        carRepository.deleteById(id);
    }
}
