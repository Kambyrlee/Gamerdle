package com.example.gamerdle.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.web.bind.annotation.*;
import java.io.InputStream;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/words")
@CrossOrigin(origins = "http://localhost:5137")
public class WordController {

    @GetMapping("/dictionary")
    public List<Map<String, Object>> getDictionary() throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        InputStream inputStream = getClass().getResourceAsStream("/data/gamerDictionary.json");
        return mapper.readValue(inputStream, new TypeReference<>() {
        });
    }

    @GetMapping("/random")
    public Map<String, Object> getRandomWord() throws Exception {
        var list = getDictionary();
        return list.get((int) (Math.random() * list.size()));
    }

}
