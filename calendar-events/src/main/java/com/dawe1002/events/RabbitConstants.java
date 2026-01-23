package com.dawe1002.events;

public final class RabbitConstants {

    private RabbitConstants() {}

    public static final String EXCHANGE_APPOINTMENTS = "appointments.exchange";
    public static final String QUEUE_APPOINTMENT_CREATED = "appointment.created.queue";
    public static final String ROUTING_KEY_APPOINTMENT_CREATED = "appointment.created";
}
