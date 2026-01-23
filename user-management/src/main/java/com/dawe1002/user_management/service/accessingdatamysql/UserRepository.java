package com.dawe1002.user_management.service.accessingdatamysql;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Integer> {

	Optional<User> findByEmail(String email);
	Optional<User> findByToken(String token);


}