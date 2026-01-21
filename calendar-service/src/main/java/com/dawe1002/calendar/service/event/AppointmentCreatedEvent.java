package com.dawe1002.calendar.service.event;

import java.time.LocalDateTime;

public class AppointmentCreatedEvent {

    private Long terminId;
    private Long benutzerId;
    private String titel;
    private LocalDateTime terminDatetime;
    private Boolean is_notified;  

    public AppointmentCreatedEvent() {
    }

    public AppointmentCreatedEvent(
            Long terminId,
            Long benutzerId,
            String titel,
            LocalDateTime terminDatetime,
            Boolean is_notified
    ) {
        this.terminId = terminId;
        this.benutzerId = benutzerId;
        this.titel = titel;
        this.terminDatetime = terminDatetime;
        this.is_notified = is_notified;
    }

    public Long getTerminId() {
        return terminId;
    }

    public Long getBenutzerId() {
        return benutzerId;
    }

    public String getTitel() {
        return titel;
    }

    public LocalDateTime getTerminDatetime() {
        return terminDatetime;
    }

    public Boolean getIs_notified() {
        return is_notified;
    }
}
