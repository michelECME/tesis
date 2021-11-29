package com.ecme.com.repository;

import com.ecme.com.domain.CantidadXUEB;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the CantidadXUEB entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CantidadXUEBRepository extends JpaRepository<CantidadXUEB, Long> {}
