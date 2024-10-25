package com.dexentri.starship_finder.service;

import com.dexentri.starship_finder.model.Query;
import com.dexentri.starship_finder.repository.QueryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class QueryService {

    @Autowired
    private QueryRepository queryRepository;

    public void saveQuery(String queryText, String ip) {
        Query query = new Query(queryText, ip);
        queryRepository.save(query);
    }
}
