package com.dawe1002.calendar.service.config;

import com.dawe1002.events.RabbitConstants;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitConfig {

    @Bean
    public DirectExchange appointmentExchange() {
        return new DirectExchange(
                RabbitConstants.EXCHANGE_APPOINTMENTS,
                true,
                false
        );
    }

    @Bean
    public Jackson2JsonMessageConverter messageConverter() {
        return new Jackson2JsonMessageConverter();
    }
}
