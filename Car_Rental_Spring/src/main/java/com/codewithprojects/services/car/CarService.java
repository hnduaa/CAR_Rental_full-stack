package com.codewithprojects.services.car;

import com.codewithprojects.entity.Car;
import com.codewithprojects.repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Optional;

@Service
public class CarService {

    private static final Logger logger = LoggerFactory.getLogger(CarService.class);

    @Autowired
    private CarRepository carRepository;

    // Post a new car for rent
    public Car postCar(Car car) {
        return carRepository.save(car);
    }

    // Get a car by ID
    public Car getCarById(Long id) {
        Optional<Car> car = carRepository.findById(id);
        if (car.isPresent()) {
            return car.get();
        } else {
            logger.warn("Car with ID {} not found", id);
            return null;
        }
    }

    // Get all cars
    public List<Car> getAllCars() {
        return carRepository.findAll();
    }

    // Update car details
    public Car updateCar(Long id, Car carDetails) {
        Optional<Car> existingCarOpt = carRepository.findById(id);
        if (existingCarOpt.isPresent()) {
            Car existingCar = existingCarOpt.get();
            existingCar.setBrandName(carDetails.getBrandName());
            existingCar.setCarName(carDetails.getCarName());
            existingCar.setCarType(carDetails.getCarType());
            existingCar.setTransmission(carDetails.getTransmission());
            existingCar.setCarColor(carDetails.getCarColor());
            existingCar.setModelYear(carDetails.getModelYear());
            existingCar.setPricePerDay(carDetails.getPricePerDay());
            existingCar.setDescription(carDetails.getDescription());
            existingCar.setPostedDate(carDetails.getPostedDate());
            existingCar.setImagePath(carDetails.getImagePath());

            return carRepository.save(existingCar);
        } else {
            logger.warn("Car with ID {} not found for update", id);
            return null;
        }
    }

    // Delete car by ID
    public boolean deleteCar(Long id) {
        if (carRepository.existsById(id)) {
            carRepository.deleteById(id);
            return true;
        } else {
            logger.warn("Car with ID {} not found for deletion", id);
            return false;
        }
    }


}
