package com.codewithprojects.controller;

import com.codewithprojects.entity.Car;
import com.codewithprojects.dto.CarWithRatingDTO;
import com.codewithprojects.services.car.CarService;
import com.codewithprojects.services.RatingService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/cars")
@CrossOrigin("*") // Allow frontend (Angular) to access this API
public class CarController {

    private static final Logger logger = LoggerFactory.getLogger(CarController.class);

    @Autowired
    private CarService carService;

    @Autowired
    private RatingService ratingService;  // Inject RatingService

    // Post a new car
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
            String imagePath = saveImage(carImage);

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
            car.setImagePath(imagePath);

            Car savedCar = carService.postCar(car);
            return new ResponseEntity<>(savedCar, HttpStatus.CREATED);
        } catch (Exception e) {
            logger.error("Error while posting car: ", e);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Get all cars
    @GetMapping("/all")
    public ResponseEntity<List<Car>> getAllCars() {
        List<Car> cars = (List<Car>) carService.getAllCars();
        return new ResponseEntity<>(cars, HttpStatus.OK);
    }

    // Get a car by ID
    @GetMapping("/{id}")
    public ResponseEntity<Car> getCarById(@PathVariable Long id) {
        Car car = carService.getCarById(id);
        if (car != null) {
            // Normalize the image path to ensure no double slashes
            String normalizedPath = car.getImagePath().replace("\\", "/");
            car.setImagePath(normalizedPath);
            return new ResponseEntity<>(car, HttpStatus.OK);
        } else {
            logger.warn("Car with ID {} not found", id);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Endpoint to get the car image by name
    @GetMapping("/image/{imageName}")
    public ResponseEntity<Resource> getImage(@PathVariable String imageName) throws IOException {
        // Get the path to the image in the uploads folder
        Path imagePath = Paths.get("uploads").resolve(imageName);
        logger.info("Requesting image from path: " + imagePath.toString());

        if (Files.exists(imagePath)) {
            Resource resource = new UrlResource(imagePath.toUri());
            // Set the content type based on the image file type
            String contentType = Files.probeContentType(imagePath);
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .body(resource);
        } else {
            logger.error("Image not found at path: " + imagePath.toString());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    // Update a car
    @PutMapping("/update/{id}")
    public ResponseEntity<Car> updateCar(@PathVariable Long id, @RequestBody Car carDetails) {
        Car existingCar = carService.getCarById(id);
        if (existingCar != null) {
            carDetails.setId(id);
            Car updatedCar = carService.updateCar(id, carDetails);
            return new ResponseEntity<>(updatedCar, HttpStatus.OK);
        } else {
            logger.warn("Car with ID {} not found for update", id);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Delete a car
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteCar(@PathVariable Long id) {
        Car existingCar = carService.getCarById(id);
        if (existingCar != null) {
            carService.deleteCar(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            logger.warn("Car with ID {} not found for deletion", id);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Save image method
    private String saveImage(MultipartFile image) throws IOException {
        Path uploadDir = Paths.get("uploads");
        if (!Files.exists(uploadDir)) {
            Files.createDirectories(uploadDir); // Create the uploads folder if it doesn't exist
        }
        // Save the image with its original filename
        Path imagePath = uploadDir.resolve(image.getOriginalFilename());
        Files.copy(image.getInputStream(), imagePath, StandardCopyOption.REPLACE_EXISTING);
        // Normalize the path to use forward slashes for consistency
        String normalizedPath = imagePath.toString().replace("\\", "/");
        return image.getOriginalFilename();  // Only return the image filename
    }

    // Get a car by ID including average rating using the DTO
    @GetMapping("/{id}/details")
    public ResponseEntity<?> getCarWithRating(@PathVariable Long id) {
        Car car = carService.getCarById(id);
        if (car != null) {
            double averageRating = ratingService.getAverageRatingByCarId(id);
            // Create and return a DTO instead of trying to set a non-existent averageRating field on Car
            CarWithRatingDTO carWithRatingDTO = new CarWithRatingDTO(car, averageRating);
            return new ResponseEntity<>(carWithRatingDTO, HttpStatus.OK);
        } else {
            logger.warn("Car with ID {} not found", id);
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/top-rated")
    public ResponseEntity<List<Car>> getTopRatedCars() {
        List<Car> topRatedCars = carService.getTopRatedCars();
        return new ResponseEntity<>(topRatedCars, HttpStatus.OK);
    }

}
