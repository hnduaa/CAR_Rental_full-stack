package com.codewithprojects.dto;

import com.codewithprojects.enums.Gender;
import com.codewithprojects.enums.UserRole;
import java.time.LocalDateTime;

public class UserDto{
    private Long id;
    private String firstname;
    private String lastname;
    private String email;
    private String phoneNumber;
    private int age;
    private Gender gender;
    private UserRole userRole;
    private LocalDateTime createdAt;

    // Constructor
    public UserDto(Long id, String firstname, String lastname, String email, String phoneNumber, int age, Gender gender, UserRole userRole, LocalDateTime createdAt) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.age = age;
        this.gender = gender;
        this.userRole = userRole;
        this.createdAt = createdAt;
    }

    // Getters
    public Long getId() { return id; }
    public String getFirstname() { return firstname; }
    public String getLastname() { return lastname; }
    public String getEmail() { return email; }
    public String getPhoneNumber() { return phoneNumber; }
    public int getAge() { return age; }
    public Gender getGender() { return gender; }
    public UserRole getUserRole() { return userRole; }
    public LocalDateTime getCreatedAt() { return createdAt; }

    // Setters
    public void setId(Long id) { this.id = id; }
    public void setFirstname(String firstname) { this.firstname = firstname; }
    public void setLastname(String lastname) { this.lastname = lastname; }
    public void setEmail(String email) { this.email = email; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }
    public void setAge(int age) { this.age = age; }
    public void setGender(Gender gender) { this.gender = gender; }
    public void setUserRole(UserRole userRole) { this.userRole = userRole; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
