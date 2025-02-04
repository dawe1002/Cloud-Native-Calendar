package com.dawe1002.calendar.service;

import org.springframework.boot.SpringApplication;

import com.dawe1002.calendar.service.TestcontainersConfiguration;
import com.dawe1002.calendar.service.accessingdatamysql.AccessingDataMysqlApplication;

public class TestCalendarServiceApplication {

	public static void main(String[] args) {
		SpringApplication.from(AccessingDataMysqlApplication::main).with(TestcontainersConfiguration.class).run(args);
	}

}
