// StatisticsDTO.java
package com.codewithprojects.dto;

import java.util.List;
import java.util.Map;

public class StatisticsDTO {
    private long totalBookings;
    private double totalRevenue;
    private long activeCars;
    private long cancelledReservations;
    private Map<String, Long> genderDistribution;
    private Map<String, Long> ageDistribution;
    private List<MonthlyDataDTO> monthlyRevenue;
    private List<MonthlyDataDTO> monthlyBookings;

    // Getters and Setters
    public long getTotalBookings() {
        return totalBookings;
    }

    public void setTotalBookings(long totalBookings) {
        this.totalBookings = totalBookings;
    }

    public double getTotalRevenue() {
        return totalRevenue;
    }

    public void setTotalRevenue(double totalRevenue) {
        this.totalRevenue = totalRevenue;
    }

    public long getActiveCars() {
        return activeCars;
    }

    public void setActiveCars(long activeCars) {
        this.activeCars = activeCars;
    }

    public long getCancelledReservations() {
        return cancelledReservations;
    }

    public void setCancelledReservations(long cancelledReservations) {
        this.cancelledReservations = cancelledReservations;
    }

    public Map<String, Long> getGenderDistribution() {
        return genderDistribution;
    }

    public void setGenderDistribution(Map<String, Long> genderDistribution) {
        this.genderDistribution = genderDistribution;
    }

    public Map<String, Long> getAgeDistribution() {
        return ageDistribution;
    }

    public void setAgeDistribution(Map<String, Long> ageDistribution) {
        this.ageDistribution = ageDistribution;
    }

    public List<MonthlyDataDTO> getMonthlyRevenue() {
        return monthlyRevenue;
    }

    public void setMonthlyRevenue(List<MonthlyDataDTO> monthlyRevenue) {
        this.monthlyRevenue = monthlyRevenue;
    }

    public List<MonthlyDataDTO> getMonthlyBookings() {
        return monthlyBookings;
    }

    public void setMonthlyBookings(List<MonthlyDataDTO> monthlyBookings) {
        this.monthlyBookings = monthlyBookings;
    }

    public static class MonthlyDataDTO {
        private String month;
        private double value;


        public MonthlyDataDTO(String month, double value) {
            this.month = month;
            this.value = value;
        }

        // Getters and Setters
        public String getMonth() {
            return month;
        }

        public void setMonth(String month) {
            this.month = month;
        }

        public double getValue() {
            return value;
        }

        public void setValue(double value) {
            this.value = value;
        }
    }
}