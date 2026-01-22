package com.dawe1002.user_management.service.accessingdatamysql;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "nutzerdaten")
public class User {
  @Id
  @GeneratedValue(strategy=GenerationType.IDENTITY)
  private Integer benutzer_id;
  private String vorname;
  private String nachname;
  private String email;
  private String passwort;
  private String token;

  
  // Getter & Setter
  public Integer getId() {
      return benutzer_id;
  }

  public void setId(Integer id) {
      this.benutzer_id = id;
  }

  public String getVorname() {
      return vorname;
  }

  public void setVorname(String vorname) {
      this.vorname = vorname;
  }

  public String getNachname() {
      return nachname;
  }

  public void setNachname(String nachname) {
      this.nachname = nachname;
  }

  public String getEmail() {
      return email;
  }

  public void setEmail(String email) {
      this.email = email;
  }

  public String getPasswort() {
      return passwort;
  }

  public void setPasswort(String passwort) {
      this.passwort = passwort;
  }

  public String getToken() {
      return token;
  }

  public void setToken(String token) {
      this.token = token;
  }

  @Override
  public String toString() {
      return String.format(
          "User[id=%d, vorname='%s', nachname='%s', email='%s', passwort='%s', token='%s']",
          benutzer_id, vorname, nachname, email, passwort, token);
  }
}
