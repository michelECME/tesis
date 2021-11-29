package com.ecme.com.repository;

import com.ecme.com.domain.AgregadoXChofer;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the AgregadoXChofer entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AgregadoXChoferRepository extends JpaRepository<AgregadoXChofer, Long> {}
