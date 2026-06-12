package com.example.movieservice.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/movies")
public class MovieController {

    private final List<Map<String, Object>> movies = List.of(
            Map.of("id", 1, "title", "Neon Horizon", "rating", 4.8, "genre", "Sci-Fi"),
            Map.of("id", 2, "title", "Midnight Sonata", "rating", 4.6, "genre", "Drama")
    );

    @GetMapping
    public List<Map<String, Object>> getMovies() {
        return movies;
    }

    @GetMapping("/{id}")
    public Map<String, Object> getMovie(@PathVariable Long id) {
        return movies.stream().filter(movie -> ((Number) movie.get("id")).longValue() == id).findFirst().orElse(Map.of("id", id, "title", "Unknown"));
    }
}
