package com.dexentri.starship_finder.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

@Data  // Lombok annotation to generate getters, setters etc
@NoArgsConstructor  // Lombok annotation to generate a no-args constructor
@AllArgsConstructor  // Lombok annotation to generate a constructor with all fields
@Document(collection = "queries")
public class Query {

    @Id
    private String id;

    @Field("query")
    private String queryText;

    private String timestamp;

    // Constructor to set timestamp automatically
    public Query(String queryText, String ip) {
        this.queryText = queryText;
        this.timestamp = ZonedDateTime.now(ZoneId.of("Europe/Paris"))
                .format(DateTimeFormatter.ISO_OFFSET_DATE_TIME);
    }
}
