package com.dexentri.starship_finder.service;

import com.dexentri.starship_finder.model.Starship;
import com.dexentri.starship_finder.model.StarshipResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.ArrayList;
import java.util.List;

@Service
public class StarshipService {

    // RestTemplate to make HTTP GET requests to the SWAPI
    private final RestTemplate restTemplate = new RestTemplate();
    // Link to SWAPI to fetch starship data
    private static final String BASE_URL = "https://swapi.dev/api/starships/";

    /**
     * Fetches all starships from the SWAPI without pagination in the final response.
     *
     * @return List of all starships
     */
    public List<Starship> getAllStarshipsWithoutPagination() {
        // List to store all the starships retrieved
        List<Starship> allStarships = new ArrayList<>();
        // URL of the next page to fetch; starts with the base URL
        String nextPageUrl = BASE_URL;

        // Fetch all pages and gather all starships
        while (nextPageUrl != null) {
            // Send a GET request to the current page URL and map the response to StarshipResponse
            StarshipResponse response = restTemplate.getForObject(nextPageUrl, StarshipResponse.class);
            if (response != null) {
                // Add all starships from the current page to the list
                allStarships.addAll(response.getResults());
                // Update nextPageUrl to the URL of the next page
                nextPageUrl = response.getNext();
            } else {
                break;
            }
        }

        return allStarships;
    }
}
