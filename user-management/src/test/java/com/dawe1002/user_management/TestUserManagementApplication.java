package com.dawe1002.user_management;

import org.springframework.boot.SpringApplication;
import com.dawe1002.user_management.service.AccessingDataMysqlApplication;

public class TestUserManagementApplication {

	public static void main(String[] args) {
		SpringApplication.from(AccessingDataMysqlApplication::main).with(TestcontainersConfiguration.class).run(args);
	}

}
