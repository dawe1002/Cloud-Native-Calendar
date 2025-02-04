package com.dawe1002.calendar.service.accessingdatamysql;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfiguration {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    	// Disable the default web security mechanisms, as this is not a MVC-Application relying on a security API but the security API itself.
    	
        http.sessionManagement((sessionManagement) -> {
        	sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS); // Do not use spring session management (sets jsessionid cookie, modifies url, redirects).
       	});
        http.authorizeHttpRequests((auth) -> {
        	auth.anyRequest().permitAll(); // Do not use HTTP Basic or framework authentication in addition to our own authentication.
        });
        http.csrf().disable(); // CSRF protection causes infinite redirects without specific frontend config 

        return http.build();
    }

}
