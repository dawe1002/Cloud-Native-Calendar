package com.dawe1002.calendar.service.config;

import org.springframework.amqp.core.*;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitConfig {

    public static final String EXCHANGE_NAME = "calendar.exchange";
    public static final String QUEUE_NAME = "notifications.queue";
    public static final String ROUTING_KEY = "appointment.*";

    @Bean
    public TopicExchange calendarExchange() {
        return new TopicExchange(EXCHANGE_NAME);
    }

    @Bean
    public Queue notificationsQueue() {
        return new Queue(QUEUE_NAME, true);
    }

    @Bean
    public Binding binding(Queue notificationsQueue, TopicExchange calendarExchange) {
        return BindingBuilder
                .bind(notificationsQueue)
                .to(calendarExchange)
                .with(ROUTING_KEY);
    }

        @Bean
        public MessageConverter jacksonMessageConverter() {
            return new Jackson2JsonMessageConverter();
        }
}
