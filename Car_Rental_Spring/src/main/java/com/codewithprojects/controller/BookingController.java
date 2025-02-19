package com.codewithprojects.controller;

import com.codewithprojects.entity.Booking;
import com.codewithprojects.entity.User;
import com.codewithprojects.entity.Car;
import com.codewithprojects.enums.NotificationType;
import com.codewithprojects.services.BookingService;
import com.codewithprojects.services.NotificationService;
import com.codewithprojects.repository.UserRepository;
import com.codewithprojects.repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin("*")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CarRepository carRepository;

    @PostMapping("/create")
    public ResponseEntity<Booking> createBooking(@RequestBody Booking booking) {
        Booking createdBooking = bookingService.createBooking(booking);

        Optional<User> userOpt = userRepository.findById(createdBooking.getUserId());
        Optional<Car> carOpt = carRepository.findById(createdBooking.getCarId());

        String userName = userOpt.map(User::getUsername).orElse("Utilisateur inconnu");
        String carName = carOpt.map(Car::getName).orElse("Voiture inconnue");

        notificationService.createNotification(
                null,
                "New reservation submited by : " + userName + " for this Car : " + carName,
                NotificationType.BOOKING_CREATED
        );

        return new ResponseEntity<>(createdBooking, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Booking>> getAllBookings() {
        List<Booking> bookings = bookingService.getAllBookings();
        return new ResponseEntity<>(bookings, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Booking> getBookingById(@PathVariable Long id) {
        Optional<Booking> booking = bookingService.getBookingById(id);
        return booking.map(b -> new ResponseEntity<>(b, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/update-status/{id}")
    public ResponseEntity<Booking> updateBookingStatus(@PathVariable Long id, @RequestParam String status) {
        Booking updatedBooking = bookingService.updateBookingStatus(id, status);

        if (updatedBooking != null) {
            Optional<Car> carOpt = carRepository.findById(updatedBooking.getCarId());
            String carName = carOpt.map(Car::getName).orElse("unkown Car");

            notificationService.createNotification(
                    updatedBooking.getUserId(),
                    "your reservation of " + carName + " has been " + status,
                    NotificationType.BOOKING_STATUS_UPDATED
            );

            return new ResponseEntity<>(updatedBooking, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteBooking(@PathVariable Long id) {
        bookingService.deleteBooking(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/edit/{id}")
    public ResponseEntity<Booking> editBooking(@PathVariable Long id, @RequestBody Booking updatedBooking) {
        try {
            Booking booking = bookingService.editBooking(id, updatedBooking);
            return ResponseEntity.ok(booking);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Booking>> getBookingsByUser(@PathVariable Long userId) {
        List<Booking> bookings = bookingService.getBookingsByUserId(userId);
        return new ResponseEntity<>(bookings, HttpStatus.OK);
    }
}
