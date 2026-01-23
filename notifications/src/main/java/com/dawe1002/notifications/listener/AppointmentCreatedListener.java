package com.dawe1002.notifications.listener;

import com.dawe1002.events.AppointmentCreatedEvent;
import com.dawe1002.events.RabbitConstants;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;

@Component
public class AppointmentCreatedListener {

      private final SimpMessagingTemplate messagingTemplate;

    public AppointmentCreatedListener(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @RabbitListener(queues = RabbitConstants.QUEUE_APPOINTMENT_CREATED)
    public void handle(AppointmentCreatedEvent event) {
        System.out.println("Termin Event empfangen!");
        System.out.println("Termin-ID: " + event.getTermin_id());
        System.out.println("User-ID: " + event.getBenutzer_id());
        System.out.println("Titel: " + event.getTitel());
        System.out.println("Beschreibung: " + event.getBeschreibung());
        System.out.println("Termin-Datetime: " + event.getTermin_datetime());

        String message =
            "Asynchrone Benachrichtigung von RabbitMQ:\n\n" +
            "Im Frontend wurde ein neuer Termin erstellt und an den calendar-service weitergeleitet (->Entry Point)/\n" +
            "Der calendar-service hat diesen Termin in der calendar-db gespeichert und dazu ein Termin-Event erstellt (->Producer/Publisher) /\n" +
            "Das Termin-Event wurde an die RabbitMQ-Message-Queue weitergeleitet (->Message Broker) /\n" +
            "Der notification-service hat das Termin-Event aus der Message-Queue konsumiert (->Consumer) /\n" +
            "Der notification-service hat diese Popup-Nachricht an das Frontend weitergeleitet (->WebSocket)\n\n" +
            "Der Termin " + event.getTitel() + " wurde erfolgreich angelegt!";

        messagingTemplate.convertAndSend(
            "/topic/notifications",
            message
        );

    }
}
