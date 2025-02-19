package com.codewithprojects.services;

import com.codewithprojects.dto.StatisticsDTO;
import com.codewithprojects.entity.Booking;
import com.codewithprojects.entity.Car;
import com.codewithprojects.entity.User;
import com.codewithprojects.repository.BookingRepository;
import com.codewithprojects.repository.CarRepository;
import com.codewithprojects.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class StatisticsService {
    private final BookingRepository bookingRepository;
    private final CarRepository carRepository;
    private final UserRepository userRepository;

    public StatisticsService(BookingRepository bookingRepository,
                             CarRepository carRepository,
                             UserRepository userRepository) {
        this.bookingRepository = bookingRepository;
        this.carRepository = carRepository;
        this.userRepository = userRepository;
    }

    public StatisticsDTO getStatistics() {
        StatisticsDTO statistics = new StatisticsDTO();

        // Calcul des KPI
        statistics.setTotalBookings(bookingRepository.count());
        statistics.setActiveCars(carRepository.count());
        statistics.setCancelledReservations(
                bookingRepository.countByStatus("Refused")
        );

        // Calcul du revenu total (uniquement pour les réservations acceptées)
        double totalRevenue = bookingRepository.findAll().stream()
                .filter(b -> "Accepted".equals(b.getStatus()))
                .mapToDouble(Booking::getTotalPrice)
                .sum();
        statistics.setTotalRevenue(totalRevenue);

        // Distribution par genre
        Map<String, Long> genderDistribution = userRepository.findAll().stream()
                .collect(Collectors.groupingBy(
                        user -> user.getGender().toString(),
                        Collectors.counting()
                ));
        statistics.setGenderDistribution(genderDistribution);

        // Distribution par tranche d'âge
        Map<String, Long> ageDistribution = calculateAgeDistribution();
        statistics.setAgeDistribution(ageDistribution);

        // Calcul des données mensuelles
        statistics.setMonthlyRevenue(calculateMonthlyRevenue());
        statistics.setMonthlyBookings(calculateMonthlyBookings());

        return statistics;
    }

    private Map<String, Long> calculateAgeDistribution() {
        Map<String, Long> distribution = new HashMap<>();
        List<User> users = userRepository.findAll();

        for (User user : users) {
            String ageGroup = getAgeGroup(user.getAge());
            distribution.merge(ageGroup, 1L, Long::sum);
        }

        return distribution;
    }

    private String getAgeGroup(int age) {
        if (age <= 25) return "18-25";
        if (age <= 35) return "26-35";
        if (age <= 45) return "36-45";
        if (age <= 55) return "46-55";
        return "55+";
    }

    private List<StatisticsDTO.MonthlyDataDTO> calculateMonthlyRevenue() {
        // On ne prend en compte que les réservations acceptées
        List<Booking> acceptedBookings = bookingRepository.findAll().stream()
                .filter(b -> "Accepted".equals(b.getStatus()))
                .collect(Collectors.toList());

        // Regroupement par mois (année-mois)
        Map<YearMonth, Double> revenueByMonth = acceptedBookings.stream()
                .collect(Collectors.groupingBy(
                        b -> YearMonth.from(b.getBookingDate()),
                        Collectors.summingDouble(Booking::getTotalPrice)
                ));

        // Transformation en DTO et tri par mois
        return revenueByMonth.entrySet().stream()
                .sorted(Map.Entry.comparingByKey())
                .map(e -> new StatisticsDTO.MonthlyDataDTO(e.getKey().toString(), e.getValue()))
                .collect(Collectors.toList());
    }

    private List<StatisticsDTO.MonthlyDataDTO> calculateMonthlyBookings() {
        List<Booking> bookings = bookingRepository.findAll();

        // Regroupement par mois (année-mois)
        Map<YearMonth, Long> bookingsByMonth = bookings.stream()
                .collect(Collectors.groupingBy(
                        b -> YearMonth.from(b.getBookingDate()),
                        Collectors.counting()
                ));

        // Transformation en DTO et tri par mois
        return bookingsByMonth.entrySet().stream()
                .sorted(Map.Entry.comparingByKey())
                .map(e -> new StatisticsDTO.MonthlyDataDTO(e.getKey().toString(), e.getValue().doubleValue()))
                .collect(Collectors.toList());
    }
}
