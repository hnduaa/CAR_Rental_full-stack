package com.codewithprojects.controller;

import com.codewithprojects.entity.Car;
import com.codewithprojects.services.car.CarService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/cars")
public class CarController {

    @Autowired
    private CarService carService;

    // Endpoint to post a car for rent with an image
    @PostMapping("/post")
    public ResponseEntity<Car> postCar(
            @RequestParam("brandName") String brandName,
            @RequestParam("carName") String carName,
            @RequestParam("carType") String carType,
            @RequestParam("transmission") String transmission,
            @RequestParam("carColor") String carColor,
            @RequestParam("modelYear") int modelYear,
            @RequestParam("pricePerDay") double pricePerDay,
            @RequestParam("description") String description,
            @RequestParam("postedAt") String postedAt,
            @RequestParam("carImage") MultipartFile carImage) {

        try {
            // Save the image file
            String imagePath = saveImage(carImage);

            // Create car object and set its properties
            Car car = new Car();
            car.setBrandName(brandName);
            car.setCarName(carName);
            car.setCarType(carType);
            car.setTransmission(transmission);
            car.setCarColor(carColor);
            car.setModelYear(modelYear);
            car.setPricePerDay(pricePerDay);
            car.setDescription(description);
            car.setPostedDate(LocalDateTime.parse(postedAt));
            car.setImagePath(imagePath);  // Set image path

            // Save car to the database
            Car savedCar = carService.postCar(car);
            return new ResponseEntity<>(savedCar, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Helper method to save the image to a folder
    private String saveImage(MultipartFile image) throws IOException {
        // Define the path where images will be saved
        Path imagePath = Paths.get("uploads/" + image.getOriginalFilename());
        Files.copy(image.getInputStream(), imagePath, StandardCopyOption.REPLACE_EXISTING);
        return imagePath.toString();  // Save the file path to store in database
    }
}
