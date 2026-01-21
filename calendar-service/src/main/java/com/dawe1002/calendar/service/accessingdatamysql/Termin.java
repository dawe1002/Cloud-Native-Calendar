package com.dawe1002.calendar.service.accessingdatamysql;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "termine")
public class Termin {
  @Id
  @GeneratedValue(strategy=GenerationType.IDENTITY)
  private Integer termin_id;
  private Integer benutzer_id;
  private String titel;
  private String beschreibung;
  private String termin_datetime;
  private Boolean is_notified;

  
  // Getter & Setter
  public Integer getTermin_id() {
      return termin_id;
  }

  public void setTermin_id(Integer termin_id) {
      this.termin_id = termin_id;
  }

  public Integer getBenutzer_id() {
      return benutzer_id;
  }

  public void setBenutzer_id(Integer benutzer_id) {
      this.benutzer_id = benutzer_id;
  }

  public String getTitel() {
      return titel;
  }

  public void setTitel(String titel) {
      this.titel = titel;
  }

  public String getBeschreibung() {
      return beschreibung;
  }

  public void setBeschreibung(String beschreibung) {
      this.beschreibung = beschreibung;
  }

  public String getTermin_datetime() {
      return termin_datetime;
  }

  public void setTermin_datetime(String termin_datetime) {
      this.termin_datetime = termin_datetime;
  }

public Boolean getIs_notified() {
      return is_notified;
  }
    
  public void setIs_notified(Boolean is_notified) {
        this.is_notified = is_notified;
    }

  @Override
  public String toString() {
      return String.format(
          "Termin[termin_id=%d, benutzer_id=&d titel='%s', beschreibung='%s', termin_datetime='%s', is_notified='%s']",
          termin_id, benutzer_id, titel, beschreibung, termin_datetime, is_notified);
  }
}
