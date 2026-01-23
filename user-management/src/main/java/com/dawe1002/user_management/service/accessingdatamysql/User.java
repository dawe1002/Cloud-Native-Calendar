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
  public Integer getUser_id() {
      return benutzer_id;
  }

  public void setUser_id(Integer id) {
      this.benutzer_id = id;
  }

  public String getUser_vorname() {
      return vorname;
  }

  public void setUser_vorname(String vorname) {
      this.vorname = vorname;
  }

  public String getUser_nachname() {
      return nachname;
  }

  public void setUser_nachname(String nachname) {
      this.nachname = nachname;
  }

  public String getUser_email() {
      return email;
  }

  public void setUser_email(String email) {
      this.email = email;
  }

  public String getUser_passwort() {
      return passwort;
  }

  public void setUser_passwort(String passwort) {
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
