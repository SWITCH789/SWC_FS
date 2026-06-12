package com.example.bookingservice.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/booking")
public class BookingController {

    @GetMapping
    public List<Map<String, Object>> getBookings() {
        return List.of(Map.of("id", 1, "movie", "Neon Horizon", "status", "Confirmed"));
    }

    @PostMapping
    public Map<String, Object> createBooking(@RequestBody Map<String, Object> request) {
        return Map.of("status", "Booked", "movie", request.get("movie"));
    }
}
