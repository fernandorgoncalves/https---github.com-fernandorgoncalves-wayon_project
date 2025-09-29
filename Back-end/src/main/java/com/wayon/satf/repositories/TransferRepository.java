package com.wayon.satf.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.wayon.satf.entities.Transfer;

public interface TransferRepository extends JpaRepository<Transfer, Long> {

}