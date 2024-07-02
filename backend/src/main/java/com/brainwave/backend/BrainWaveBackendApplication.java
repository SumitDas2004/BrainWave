package com.brainwave.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

@SpringBootApplication
@EnableJpaRepositories
@EnableWebSecurity
public class BrainWaveBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BrainWaveBackendApplication.class, args);
	}

}
