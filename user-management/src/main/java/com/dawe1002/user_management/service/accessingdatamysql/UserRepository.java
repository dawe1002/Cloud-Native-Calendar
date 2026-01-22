package com.dawe1002.user_management.service.accessingdatamysql;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.dawe1002.user_management.service.accessingdatamysql.User;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface UserRepository extends CrudRepository<User, Integer> {

	Optional<User> findByEmail(String email);
	Optional<User> findByToken(String token);


}