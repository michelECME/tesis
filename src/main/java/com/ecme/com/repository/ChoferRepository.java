package com.ecme.com.repository;

import com.ecme.com.domain.Chofer;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Chofer entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ChoferRepository extends JpaRepository<Chofer, Long> {}
