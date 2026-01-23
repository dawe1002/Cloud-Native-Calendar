package com.dawe1002.calendar.service.accessingdatamysql;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface TerminRepository extends CrudRepository<Termin, Integer> {

	Optional<Termin> findById(int termin_id);

}