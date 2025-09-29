package com.wayon.satf.config;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.annotation.Transactional;

import com.wayon.satf.entities.Account;
import com.wayon.satf.entities.Transfer;
import com.wayon.satf.entities.User;
import com.wayon.satf.repositories.AccountRepository;
import com.wayon.satf.repositories.UserRepository;
import com.wayon.satf.services.TransferService;

@Configuration
public class TestConfig implements CommandLineRunner {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private AccountRepository accountRepository;

	@Autowired 
	private TransferService transferService;

	@Override
	@Transactional
	public void run(String... args) throws Exception {
		
		
		User u1 = new User(null, "Camila"); 
		User u2 = new User(null, "Antonia");
		User u3 = new User(null, "Francisco"); 

		userRepository.saveAll(Arrays.asList(u1, u2, u3));


		Account acc1 = new Account(null, 123456, new BigDecimal("5000.00"), u1); 
		Account acc2 = new Account(null, 789012, new BigDecimal("3000.00"), u2); 
		Account acc3 = new Account(null, 345678, new BigDecimal("8000.00"), u3); 
		Account acc4 = new Account(null, 901234, new BigDecimal("2000.00"), u1); 

		accountRepository.saveAll(Arrays.asList(acc1, acc2, acc3, acc4));


		LocalDate today = LocalDate.now();

		Transfer t1 = new Transfer();
		t1.setSourceAccount(123456);
		t1.setDestinationAccount(789012);
		t1.setTransferValue(new BigDecimal("1000.00"));
		t1.setTransferDate(today.plusDays(10)); 
		t1.setSchedulingDate(today);
		
		transferService.scheduleTransfer(t1); 
	}
}