package com.dexentri.starship_finder.repository;

import com.dexentri.starship_finder.model.Query;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface QueryRepository extends MongoRepository<Query, String> {
}
