package com.ecme.com.repository;

import com.ecme.com.domain.Recurso;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Recurso entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RecursoRepository extends JpaRepository<Recurso, Long> {}
