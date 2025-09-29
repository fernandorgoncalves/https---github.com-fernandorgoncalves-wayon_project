package com.wayon.satf.services;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.wayon.satf.entities.Account;
import com.wayon.satf.entities.User;
import com.wayon.satf.repositories.AccountRepository;
import com.wayon.satf.repositories.UserRepository;

@Service
public class AccountService {
	
	@Autowired
	private AccountRepository repository;

	@Autowired
	private UserRepository userRepository;

	public List<Account> findAll() {
		return repository.findAll();
	}

	public Account findById(Long id) {
		Optional<Account> obj = repository.findById(id);
		return obj.orElseThrow(() -> new EntityNotFoundException("Conta não encontrada com o id: " + id));
	}

	@Transactional
	public Account create(User user) {
		// 1. Salva o usuário primeiro para que o JPA/Hibernate gere e atribua um ID.
		// A instância 'user' agora é uma entidade gerenciada (managed).
		userRepository.save(user);

		// 1. Cria uma nova conta
		Account account = new Account();
		account.setBalance(BigDecimal.ZERO); // Inicializa o saldo com BigDecimal

		// 2. Gera e define um número de conta aleatório e único de 6 dígitos
		int accountNumber;
		do {
			Random random = new Random();
			accountNumber = 100000 + random.nextInt(900000);
		} while (repository.findByAccountNumber(accountNumber).isPresent());

		account.setAccountNumber(accountNumber);

		// 3. Associa a conta ao usuário gerenciado.
		account.setClient(user);

		// 4. Salva a conta. Como a Account é a "dona" da relação (com @JoinColumn),
		// o JPA agora pode usar o ID do usuário gerenciado para a chave estrangeira.
		repository.save(account);

		return account;
	}

	/**
	 * Busca uma conta pelo número. Se não existir, cria uma nova conta e um novo usuário.
	 * @param accountNumber O número da conta a ser buscada ou criada.
	 * @return A conta existente ou a nova conta criada.
	 */
	@Transactional
	public Account findOrCreateAccount(Integer accountNumber) {
		return repository.findByAccountNumber(accountNumber)
			.orElseGet(() -> {
				// Cria um novo usuário com um nome genérico
				User newUser = new User(null, "Usuário " + accountNumber);
				userRepository.save(newUser);

				// Cria a nova conta
				Account newAccount = new Account();
				newAccount.setAccountNumber(accountNumber);
				newAccount.setBalance(BigDecimal.ZERO); // Saldo inicial zero
				newAccount.setClient(newUser);

				repository.save(newAccount);
				return newAccount;
			});
	}

}