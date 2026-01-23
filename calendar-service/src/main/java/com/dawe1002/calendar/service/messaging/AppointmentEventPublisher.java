package com.dawe1002.calendar.service.messaging;

import com.dawe1002.events.AppointmentCreatedEvent;
import com.dawe1002.events.RabbitConstants;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

@Component
public class AppointmentEventPublisher {

    private final RabbitTemplate rabbitTemplate;

    public AppointmentEventPublisher(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    public void publish(AppointmentCreatedEvent event) {
        rabbitTemplate.convertAndSend(
                RabbitConstants.EXCHANGE_APPOINTMENTS,
                RabbitConstants.ROUTING_KEY_APPOINTMENT_CREATED,
                event
        );
    }
}
