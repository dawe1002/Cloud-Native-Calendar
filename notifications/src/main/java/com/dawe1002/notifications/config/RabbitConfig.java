package com.dawe1002.notifications.config;

import com.dawe1002.events.RabbitConstants;
import org.springframework.amqp.core.*;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitConfig {

    @Bean
    public Queue appointmentCreatedQueue() {
        return QueueBuilder
                .durable(RabbitConstants.QUEUE_APPOINTMENT_CREATED)
                .build();
    }

    @Bean
    public DirectExchange appointmentsExchange() {
        return new DirectExchange(
                RabbitConstants.EXCHANGE_APPOINTMENTS,
                true,
                false
        );
    }

    @Bean
    public Binding appointmentCreatedBinding(
            Queue appointmentCreatedQueue,
            DirectExchange appointmentsExchange
    ) {
        return BindingBuilder
                .bind(appointmentCreatedQueue)
                .to(appointmentsExchange)
                .with(RabbitConstants.ROUTING_KEY_APPOINTMENT_CREATED);
    }

    @Bean
    public Jackson2JsonMessageConverter messageConverter() {
        return new Jackson2JsonMessageConverter();
    }
}
