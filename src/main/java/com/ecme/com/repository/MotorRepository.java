package com.ecme.com.repository;

import com.ecme.com.domain.Motor;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Motor entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MotorRepository extends JpaRepository<Motor, Long> {}
