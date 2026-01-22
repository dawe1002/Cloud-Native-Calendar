package com.dawe1002.calendar.service.accessingdatamysql;

import java.util.Map;
import java.util.Optional;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestHeader;

import com.dawe1002.calendar.service.event.AppointmentCreatedEvent;
import com.dawe1002.calendar.service.messaging.AppointmentEventPublisher;
import com.dawe1002.calendar.service.security.JwtUtil;

import jakarta.servlet.http.HttpSession;

@Controller // This class is a Controller
@RequestMapping(path="/api/calendar")
public class MainController {
  private final TerminRepository terminRepository;
  private final AppointmentEventPublisher appointmentEventPublisher;

  @Autowired
  public MainController(TerminRepository terminRepository, AppointmentEventPublisher appointmentEventPublisher) {
    this.terminRepository = terminRepository;
    this.appointmentEventPublisher = appointmentEventPublisher;
  }

  @PostMapping(path = "/add")
    public ResponseEntity<String> addAppointment(
            @RequestHeader("Authorization") String authorizationHeader,
            @RequestBody Map<String, Object> body
    ) {
        // Header prüfen
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Kein JWT vorhanden");
        }

        // Token extrahieren
        String token = authorizationHeader.substring(7);

        // Benutzer-ID aus JWT lesen
        Integer benutzer_id;
        try {
            benutzer_id = JwtUtil.extractUserId(token);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Ungültiges JWT");
        }

        // Request-Daten lesen
        String titel = body.get("titel").toString();
        String beschreibung = body.get("beschreibung").toString();
        LocalDateTime termin_datetime =
                LocalDateTime.parse(body.get("termin_datetime").toString());

        // Termin bauen
        Termin n = new Termin();
        n.setBenutzer_id(benutzer_id);
        n.setTitel(titel);
        n.setBeschreibung(beschreibung);
        n.setTermin_datetime(termin_datetime);
        n.setIs_notified(false);

        try {
            // Speichern
            Termin savedTermin = terminRepository.save(n);

            // Event erzeugen
            AppointmentCreatedEvent event =
                    new AppointmentCreatedEvent(
                            savedTermin.getTermin_id(),
                            savedTermin.getBenutzer_id(),
                            savedTermin.getTitel(),
                            savedTermin.getBeschreibung(),
                            savedTermin.getTermin_datetime(),
                            savedTermin.getIs_notified()
                    );

            appointmentEventPublisher.publishAppointmentCreated(event);

            return ResponseEntity.ok("Termin erfolgreich angelegt!");

        } catch (DataIntegrityViolationException e) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("Fehler: Termin nicht angelegt!");
        }
    }

  
    @PostMapping(path = "/delete")
    public ResponseEntity<Map<String, String>> deleteAppointment(
            @RequestHeader(value = "Authorization", required = false) String authorizationHeader,
            @RequestBody Map<String, Object> body
    ) {
        // JWT prüfen
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Nicht eingeloggt"));
        }

        String token = authorizationHeader.substring(7);

        Integer benutzerId;
        try {
            benutzerId = JwtUtil.extractUserId(token);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Ungültiges JWT"));
        }

        // Termin-ID lesen
        Integer terminId;
        try {
            terminId = Integer.parseInt(body.get("termin_id").toString());
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", "Ungültige Termin-ID"));
        }

        // Existenz prüfen
        var terminOpt = terminRepository.findById(terminId);
        if (terminOpt.isEmpty()) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "Termin nicht gefunden"));
        }

        // Ownership prüfen (WICHTIG)
        if (!terminOpt.get().getBenutzer_id().equals(benutzerId)) {
            return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .body(Map.of("error", "Keine Berechtigung für diesen Termin"));
        }

        // Löschen
        terminRepository.deleteById(terminId);

        return ResponseEntity.ok(
                Map.of("message", "Termin wurde erfolgreich gelöscht")
        );
    }




  @GetMapping(path="/all")
  public @ResponseBody Iterable<Termin>  getAllAppointments() {
    return terminRepository.findAll();
  }
}