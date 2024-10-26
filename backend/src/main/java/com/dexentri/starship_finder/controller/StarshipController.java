package com.dexentri.starship_finder.controller;

import com.dexentri.starship_finder.model.Starship;
import com.dexentri.starship_finder.service.QueryService;
import com.dexentri.starship_finder.service.StarshipService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller responsible for handling requests related to starships.
 *
 * This controller fetches starship data from the SWAPI and returns it
 * in the form of a JSON response.
 */
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class StarshipController {

    @Autowired
    private QueryService queryService;

    @Autowired
    private StarshipService starshipService;

    @GetMapping("/starships")
    public ResponseEntity<List<Starship>> getAllStarships() {
        // Use the injected service instance
        return ResponseEntity.ok(starshipService.getAllStarshipsWithoutPagination());
    }

    @PostMapping("/queries")
    public ResponseEntity<Void> saveQuery(@RequestBody String queryText, HttpServletRequest request) {
        String ipAddress = request.getRemoteAddr();
        queryService.saveQuery(queryText, ipAddress);
        return ResponseEntity.ok().build();
    }
}
