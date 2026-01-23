package com.dawe1002.notifications.listener;

import com.dawe1002.events.AppointmentCreatedEvent;
import com.dawe1002.events.RabbitConstants;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class AppointmentCreatedListener {

    @RabbitListener(queues = RabbitConstants.QUEUE_APPOINTMENT_CREATED)
    public void handle(AppointmentCreatedEvent event) {
        System.out.println("Appointment Event empfangen!");
        System.out.println("Termin-ID: " + event.getTermin_id());
        System.out.println("User-ID: " + event.getBenutzer_id());
        System.out.println("Titel: " + event.getTitel());
        System.out.println("Beschreibung: " + event.getBeschreibung());
        System.out.println("Termin-Datetime: " + event.getTermin_datetime());

    }
}
