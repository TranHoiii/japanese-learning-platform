package com.japanese.learning.common.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    OpenAPI japaneseLearningOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Japanese Learning Platform API")
                        .version("v1")
                        .description("REST API for Japanese Learning Platform"));
    }
}
