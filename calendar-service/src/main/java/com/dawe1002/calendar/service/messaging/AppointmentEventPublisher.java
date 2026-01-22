package com.dawe1002.calendar.service.messaging;

import com.dawe1002.calendar.service.config.RabbitConfig;
import com.dawe1002.calendar.service.event.AppointmentCreatedEvent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

@Component
public class AppointmentEventPublisher {

    private static final Logger log =
            LoggerFactory.getLogger(AppointmentEventPublisher.class);

    private final RabbitTemplate rabbitTemplate;

    public AppointmentEventPublisher(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    public void publishAppointmentCreated(AppointmentCreatedEvent event) {
        try {
            rabbitTemplate.convertAndSend(
                    RabbitConfig.EXCHANGE_NAME,
                    RabbitConfig.ROUTING_KEY_APPOINTMENT_CREATED,
                    event
            );

            log.info(
                "AppointmentCreatedEvent published: terminId={}, benutzerId={}",
                event.getTermin_id(),
                event.getBenutzer_id()
            );

        } catch (Exception e) {
            log.error(
                "Failed to publish AppointmentCreatedEvent: terminId={}",
                event.getTermin_id(),
                e
            );
        }
    }
}
