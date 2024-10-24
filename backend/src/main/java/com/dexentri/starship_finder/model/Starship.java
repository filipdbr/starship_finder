package com.dexentri.starship_finder.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Data;
import java.util.List;

/**
 * Represents a starship from the SWAPI.
 * This class contains various details about a starship such as its name,
 * model, manufacturer, cost, dimensions, crew capacity, and more.
 *
 * The information is mapped from the JSON response of the Star Wars API.
 */
@Data // Lombok package. Creates getters, setters and other basic methods
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class) // Mapping snake_case to camelCase
public class Starship {
    private String name;
    private String model;
    private String manufacturer;
    private String costInCredits;
    private String length;
    private String maxAtmospheringSpeed;
    private String crew;
    private String passengers;
    private String cargoCapacity;
    private String consumables;
    private String hyperdriveRating;

    @JsonProperty("MGLT") // this field doesn't fit the snake_case, hence modified manually by this annotation
    private String mglt;

    private String starshipClass;
    private List<String> pilots;
    private List<String> films;
    private String created;
    private String edited;
    private String url;
}
