package com.codewithprojects.services;

import com.codewithprojects.entity.Booking;
import com.codewithprojects.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    public Booking createBooking(Booking booking) {
        long days = ChronoUnit.DAYS.between(booking.getFromDate(), booking.getToDate());
        booking.setDays((int) days);
        // Ensure that we calculate the total price using the car's daily price.
        // You might need to adjust this calculation depending on your Car entity.
        // Here we assume the Booking entity has access to Car through a relationship,
        // but since we're using carId only in this model, you may need to set totalPrice on the front end or fetch the Car's price.
        // For now, we'll assume that the Booking passed in has enough information:
        double totalPrice = days * booking.getTotalPrice(); // Adjust as necessary.
//        booking.setTotalPrice(totalPrice);
        return bookingRepository.save(booking);
    }

    public Optional<Booking> getBookingById(Long id) {
        return bookingRepository.findById(id);
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }
    public Booking editBooking(Long id, Booking updatedBooking) {
        Optional<Booking> existingBookingOpt = bookingRepository.findById(id);
        if (existingBookingOpt.isPresent()) {
            Booking existingBooking = existingBookingOpt.get();

            System.out.println("Ancienne date de début: " + existingBooking.getFromDate());
            System.out.println("Nouvelle date de début: " + updatedBooking.getFromDate());

            // Mise à jour des champs modifiables
            existingBooking.setFromDate(updatedBooking.getFromDate());
            existingBooking.setToDate(updatedBooking.getToDate());
            existingBooking.setDays(updatedBooking.getDays());
            existingBooking.setTotalPrice(updatedBooking.getTotalPrice());

            Booking savedBooking = bookingRepository.save(existingBooking);
            System.out.println("Réservation mise à jour: " + savedBooking);
            return savedBooking;
        }
        throw new RuntimeException("Booking not found");
    }


    public Booking updateBookingStatus(Long id, String status) {
        Optional<Booking> optionalBooking = bookingRepository.findById(id);
        if (optionalBooking.isPresent()) {
            Booking booking = optionalBooking.get();
            booking.setStatus(status);
            return bookingRepository.save(booking);
        }
        return null;
    }

    public void deleteBooking(Long id) {
        bookingRepository.deleteById(id);
    }
    public List<Booking> getBookingsByUserId(Long userId) {
        return bookingRepository.findByUserId(userId);
    }

}
