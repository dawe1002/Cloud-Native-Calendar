package com.dawe1002.calendar.service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.test.context.SpringBootTest;

import com.dawe1002.calendar.service.TestcontainersConfiguration;
import com.dawe1002.calendar.service.AccessingDataMysqlApplication;


@SpringBootTest(classes = AccessingDataMysqlApplication.class)
public class TestCalendarServiceApplication {

	public static void main(String[] args) {
		SpringApplication.from(AccessingDataMysqlApplication::main).with(TestcontainersConfiguration.class).run(args);
	}

}
