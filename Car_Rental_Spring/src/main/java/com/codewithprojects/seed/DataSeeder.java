package com.codewithprojects.seed;

import com.codewithprojects.entity.Booking;
import com.codewithprojects.entity.Car;
import com.codewithprojects.entity.Notification;
import com.codewithprojects.entity.Rating;
import com.codewithprojects.entity.User;
import com.codewithprojects.enums.NotificationType;
import com.codewithprojects.enums.UserRole;
import com.codewithprojects.enums.Gender;
import com.codewithprojects.repository.BookingRepository;
import com.codewithprojects.repository.CarRepository;
import com.codewithprojects.repository.NotificationRepository;
import com.codewithprojects.repository.RatingRepository;
import com.codewithprojects.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Component
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final CarRepository carRepository;
    private final BookingRepository bookingRepository;
    private final RatingRepository ratingRepository;
    private final NotificationRepository notificationRepository;

    @Autowired
    public DataSeeder(UserRepository userRepository,
                      CarRepository carRepository,
                      BookingRepository bookingRepository,
                      RatingRepository ratingRepository,
                      NotificationRepository notificationRepository) {
        this.userRepository = userRepository;
        this.carRepository = carRepository;
        this.bookingRepository = bookingRepository;
        this.ratingRepository = ratingRepository;
        this.notificationRepository = notificationRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // Seed Users if not present
        if (userRepository.count() == 0) {
            User admin = new User();
            admin.setFirstname("Admin");
            admin.setLastname("mol chi");
            admin.setEmail("admin@gmail.com");
            admin.setPassword("$2a$10$AhVNr60XL5zwsI76.TP6j.EqiQkzrfCfXEAhp9SkJ0H7FWsGHZTYW");
            admin.setPhoneNumber("0700060000");
            admin.setAge(30);
            admin.setGender(Gender.MALE);
            admin.setUserRole(UserRole.ADMIN);
            admin.setCreatedAt(LocalDateTime.now());
            userRepository.save(admin);

            User customer = new User();
            customer.setFirstname("Customer");
            customer.setLastname("User");
            customer.setEmail("user1@gmail.com");
            customer.setPassword("$2a$10$AhVNr60XL5zwsI76.TP6j.EqiQkzrfCfXEAhp9SkJ0H7FWsGHZTYW");
            customer.setPhoneNumber("0987654321");
            customer.setAge(25);
            customer.setGender(Gender.FEMALE);
            customer.setUserRole(UserRole.CUSTOMER);
            customer.setCreatedAt(LocalDateTime.now());
            userRepository.save(customer);

            System.out.println("Users seeded!");
        }

        // Seed Cars if not present
// Seed Cars if not present using provided data
        if (carRepository.count() == 0) {
            // Car 1
            Car car1 = new Car();
            car1.setBrandName("volvo");
            car1.setCarName("XC60");
            car1.setCarType("petrol");
            car1.setTransmission("automatic");
            car1.setCarColor("black");
            car1.setModelYear(2022);
            car1.setPricePerDay(400);
            car1.setDescription("Luxury SUV with advanced safety features.");
            car1.setImagePath("volvo.png");
            car1.setPostedDate(LocalDateTime.parse("2023-12-10T14:00:00"));
            carRepository.save(car1);

            // Car 2
            Car car2 = new Car();
            car2.setBrandName("peugeot");
            car2.setCarName("3008");
            car2.setCarType("hybrid");
            car2.setTransmission("automatic");
            car2.setCarColor("blue");
            car2.setModelYear(2021);
            car2.setPricePerDay(255);
            car2.setDescription("Stylish SUV with eco-friendly performance.");
            car2.setImagePath("peugeot.png");
            car2.setPostedDate(LocalDateTime.parse("2023-11-25T10:15:00"));
            carRepository.save(car2);

            // Car 3
            Car car3 = new Car();
            car3.setBrandName("mercedes");
            car3.setCarName("E-Class");
            car3.setCarType("petrol");
            car3.setTransmission("automatic");
            car3.setCarColor("silver");
            car3.setModelYear(2023);
            car3.setPricePerDay(400);
            car3.setDescription("Elegant and powerful luxury sedan.");
            car3.setImagePath("mercedes.png");
            car3.setPostedDate(LocalDateTime.parse("2023-10-05T09:30:00"));
            carRepository.save(car3);

            // Car 4
            Car car4 = new Car();
            car4.setBrandName("ford");
            car4.setCarName("Focus");
            car4.setCarType("petrol");
            car4.setTransmission("manual");
            car4.setCarColor("red");
            car4.setModelYear(2021);
            car4.setPricePerDay(280);
            car4.setDescription("Compact hatchback, sporty and economical.");
            car4.setImagePath("ford.png");
            car4.setPostedDate(LocalDateTime.parse("2024-01-15T18:13:10"));
            carRepository.save(car4);

            // Car 5
            Car car5 = new Car();
            car5.setBrandName("toyota");
            car5.setCarName("Corolla");
            car5.setCarType("hybrid");
            car5.setTransmission("automatic");
            car5.setCarColor("white");
            car5.setModelYear(2022);
            car5.setPricePerDay(350);
            car5.setDescription("Reliable and fuel-efficient sedan.");
            car5.setImagePath("toyotaCorolla.png");
            car5.setPostedDate(LocalDateTime.parse("2024-02-02T18:00:52"));
            carRepository.save(car5);

            // Car 6
            Car car6 = new Car();
            car6.setBrandName("toyota");
            car6.setCarName("Toyota Land Cruiser 250 Series");
            car6.setCarType("petrol");
            car6.setTransmission("automatic");
            car6.setCarColor("grey");
            car6.setModelYear(2024);
            car6.setPricePerDay(400);
            car6.setDescription("The all-new 4x4 SUV, ready for adventure.");
            car6.setImagePath("toyota.png");
            car6.setPostedDate(LocalDateTime.parse("2024-03-01T18:19:06"));
            carRepository.save(car6);

            System.out.println("Cars seeded successfully!");
        }


        // Seed Bookings if not present
        if (bookingRepository.count() == 0) {
            // Assume we want to create a booking for the customer and the first car
            User customer = userRepository.findFirstByEmail("user1@gmail.com").orElse(null);
            Car car = carRepository.findAll().get(0); // get the first car

            if (customer != null && car != null) {
                Booking booking = new Booking();
                booking.setUserId(customer.getId());
                booking.setCarId(car.getId());
                booking.setFromDate(LocalDate.now().minusMonths(1));
                booking.setToDate(booking.getFromDate().plusDays(4));
                booking.setDays(4);
                booking.setTotalPrice(car.getPricePerDay() * 4);
                booking.setStatus("Pending");
                bookingRepository.save(booking);
                System.out.println("Bookings seeded!");
            }
        }

        // Seed Ratings if not present
        if (ratingRepository.count() == 0) {
            // Create a rating for the first car by the customer
            User customer = userRepository.findFirstByEmail("user1@gmail.com").orElse(null);
            Car car = carRepository.findAll().get(0); // reuse the first car

            if (customer != null && car != null) {
                Rating rating = new Rating();
                rating.setCar(car);
                rating.setUser(customer);
                rating.setRating(5); // 5-star rating
                rating.setCreatedAt(LocalDateTime.now());
                ratingRepository.save(rating);
                System.out.println("Ratings seeded!");
            }
        }

        // Seed Notifications if not present
        if (notificationRepository.count() == 0) {
            // Create a notification for the customer
            User customer = userRepository.findFirstByEmail("user1@gmail.com").orElse(null);
            if (customer != null) {
                Notification notification = new Notification();
                notification.setUserId(customer.getId());
                notification.setMessage("Your booking has been created.");
                notification.setType(NotificationType.BOOKING_CREATED);
                notification.setCreatedAt(LocalDateTime.now());
                notificationRepository.save(notification);

                // You can also add an admin notification if needed (userId = null)
                Notification adminNotification = new Notification();
                adminNotification.setUserId(1L);
                adminNotification.setMessage("A new booking has been created.");
                adminNotification.setType(NotificationType.ADMIN_NOTIFICATION);
                adminNotification.setCreatedAt(LocalDateTime.now());
                notificationRepository.save(adminNotification);
                System.out.println("Notifications seeded!");
            }
        }
    }
}
