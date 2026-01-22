package com.dawe1002.calendar.service.event;

import java.time.LocalDateTime;

public class AppointmentCreatedEvent {

    private Integer termin_id;
    private Integer benutzer_id;
    private String titel;
    private String beschreibung;
    private LocalDateTime termin_datetime;
    private Boolean is_notified; 

    public AppointmentCreatedEvent() {
    }

    public AppointmentCreatedEvent(
            Integer termin_id,
            Integer benutzer_id,
            String titel,
            String beschreibung,
            LocalDateTime termin_datetime,
            Boolean is_notified
    ) {
        this.termin_id = termin_id;
        this.benutzer_id = benutzer_id;
        this.titel = titel;
        this.beschreibung = beschreibung;
        this.termin_datetime = termin_datetime;
        this.is_notified = is_notified;
    }

    public Integer getTermin_id() {
        return termin_id;
    }

    public Integer getBenutzer_id() {
        return benutzer_id;
    }

    public String getTitel() {
        return titel;
    }

    public String getBeschreibung() {
        return beschreibung;
    }

    public LocalDateTime getTermin_datetime() {
        return termin_datetime;
    }

    public Boolean getIs_notified() {
        return is_notified;
    }
}
