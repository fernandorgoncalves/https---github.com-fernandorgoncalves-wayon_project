package com.wayon.satf.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wayon.satf.entities.Account;

public interface AccountRepository extends JpaRepository<Account, Long> {
    Optional<Account> findByAccountNumber(Integer accountNumber);
}