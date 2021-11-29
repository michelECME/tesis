package com.ecme.com.repository;

import com.ecme.com.domain.Asignacion;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Asignacion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AsignacionRepository extends JpaRepository<Asignacion, Long> {}
