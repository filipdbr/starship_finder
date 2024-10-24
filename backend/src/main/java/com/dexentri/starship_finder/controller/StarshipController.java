package com.dexentri.starship_finder.controller;

import com.dexentri.starship_finder.model.Starship;
import com.dexentri.starship_finder.service.StarshipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Controller responsible for handling requests related to starships.
 *
 * This controller fetches starship data from the SWAPI and returns it
 * in the form of a JSON response.
 */
@RestController
@RequestMapping("/api")
public class StarshipController {

    @Autowired
    private StarshipService starshipService;

    @GetMapping("/starships")
    public ResponseEntity<List<Starship>> getAllStarships() {
        // Use the injected service instance
        return ResponseEntity.ok(starshipService.getAllStarshipsWithoutPagination());
    }
}
