package com.ecme.com.repository;

import com.ecme.com.domain.CANTIDADXTIPO;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the CANTIDADXTIPO entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CANTIDADXTIPORepository extends JpaRepository<CANTIDADXTIPO, Long> {}
