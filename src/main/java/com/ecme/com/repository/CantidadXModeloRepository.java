package com.ecme.com.repository;

import com.ecme.com.domain.CantidadXModelo;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the CantidadXModelo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CantidadXModeloRepository extends JpaRepository<CantidadXModelo, Long> {}
