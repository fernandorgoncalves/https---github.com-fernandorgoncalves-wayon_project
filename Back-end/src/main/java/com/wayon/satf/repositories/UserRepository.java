package com.wayon.satf.repositories;
import org.springframework.data.jpa.repository.JpaRepository;

import com.wayon.satf.entities.User;

public interface UserRepository extends JpaRepository<User,Long> {

}