package com.dexentri.starship_finder.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.Instant;

@Data  // Lombok annotation to generate getters, setters etc
@NoArgsConstructor  // Lombok annotation to generate a no-args constructor
@AllArgsConstructor  // Lombok annotation to generate a constructor with all fields
@Document(collection = "queries")
public class Query {

    @Id
    private String id;
    private String queryText;
    private String timestamp;

    // Constructor to automatically set timestamp to the current time
    public Query(String queryText) {
        this.queryText = queryText;
        this.timestamp = Instant.now().toString();
    }
}
