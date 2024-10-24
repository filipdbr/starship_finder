package com.dexentri.starship_finder.model;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;
import java.util.List;

/**
 * Represents the response structure from the SWAPI for starships.
 *
 * This class holds the total count of starships, pagination links, and
 * a list of starship results from the API.
 */
@Data
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class) // // Mapping snake_case to camelCase
public class StarshipResponse {
    private int count;
    private String next;  // Field for pagination link
    private String previous;
    private List<Starship> results;
}
