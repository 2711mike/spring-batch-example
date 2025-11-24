package com.furkankayam.config;

import lombok.Data;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.List;

@Data
@Configuration
@ConfigurationProperties(prefix = "app.cors")
public class CorsConfig implements WebMvcConfigurer {

    private List<String> allowedOrigins;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(allowedOrigins.toArray(new String[0]))
                .allowedMethods("GET", "POST", "UPDATE", "DELETE")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
    }
}