package com.wayon.satf.services;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.wayon.satf.entities.Account;
import com.wayon.satf.entities.Transfer;
import com.wayon.satf.entities.User;
import com.wayon.satf.repositories.AccountRepository;
import com.wayon.satf.repositories.TransferRepository;

@Service
public class TransferService {
 
	@Autowired
	private TransferRepository repository;
 
	@Autowired
	private AccountRepository accountRepository;

	@Autowired
	private AccountService accountService;
 
	public List<Transfer> findAll() {
		return repository.findAll();
	}
 
	@Transactional
	public Transfer scheduleTransfer(Transfer transfer) {
		if (transfer.getSourceAccount().equals(transfer.getDestinationAccount())) {
			throw new IllegalArgumentException("A conta de origem e destino não podem ser a mesma.");
		}
		// Busca ou cria as contas de origem e destino
		Account sourceAccount = accountService.findOrCreateAccount(transfer.getSourceAccount());
		accountService.findOrCreateAccount(transfer.getDestinationAccount());

		// Associa o cliente da conta de origem à transferência.
		User client = sourceAccount.getClient(); // Pega o User da Account
		if (client == null) {
			// Se a conta de origem não tiver um cliente associado, algo está errado.
			throw new IllegalStateException("A conta de origem não possui um cliente associado.");
		}
		transfer.setClient(client); // Define o cliente na transferência

		// Garante que a data de agendamento seja sempre a data atual do servidor.
		transfer.setSchedulingDate(LocalDate.now());

		long days = ChronoUnit.DAYS.between(transfer.getSchedulingDate(), transfer.getTransferDate());

		if (days < 0) { 
			throw new IllegalArgumentException("A data de transferência não pode ser anterior à data de hoje.");
		}

		return repository.save(transfer);
	}
 
	public Transfer findById(Long id) {
		Optional<Transfer> obj = repository.findById(id);
		return obj.orElseThrow(() -> new EntityNotFoundException("Transferência não encontrada com o id: " + id));
	}
}
