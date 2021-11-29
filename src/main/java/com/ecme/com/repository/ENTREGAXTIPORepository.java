package com.ecme.com.repository;

import com.ecme.com.domain.ENTREGAXTIPO;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the ENTREGAXTIPO entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ENTREGAXTIPORepository extends JpaRepository<ENTREGAXTIPO, Long> {}
