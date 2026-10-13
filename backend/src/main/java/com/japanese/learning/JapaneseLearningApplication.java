package com.japanese.learning;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.web.config.EnableSpringDataWebSupport;

@SpringBootApplication
@EnableSpringDataWebSupport(pageSerializationMode = EnableSpringDataWebSupport.PageSerializationMode.VIA_DTO)
public class JapaneseLearningApplication {

    public static void main(String[] args) {
        SpringApplication.run(JapaneseLearningApplication.class, args);
    }
}
